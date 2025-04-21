import os
import re
import json
import time
import torch
import logging
import subprocess
import tempfile
import requests
from datetime import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.db import IntegrityError
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .models import UserProfile 
from moviepy.editor import VideoFileClip
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from google.oauth2 import id_token
from google.auth.transport.requests import Request

from .models import UserProfile, UploadedVideoLecture,LectureTranslation
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# ========== WHISPER UTILS ==========

def get_whisper_pipeline():
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    model_id = "openai/whisper-tiny.en"
    dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=dtype, low_cpu_mem_usage=True
    ).to(device)

    processor = AutoProcessor.from_pretrained(model_id)
    forced_ids = processor.get_decoder_prompt_ids(language="en", task="transcribe")
    model.config.forced_decoder_ids = forced_ids

    return pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        chunk_length_s=5,
        batch_size=8,
        torch_dtype=dtype,
        device=device
    )


def extract_audio(video_path, audio_path):
    command = [
        "ffmpeg", "-y", "-i", video_path, "-vn",
        "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", audio_path
    ]
    subprocess.run(command, check=True)


def clean_text(text):
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)
    text = re.sub(r'\b(\w+)( \1\b){2,}', r'\1', text)
    return text.strip()


def transcribe_audio(audio_path):
    whisper_pipeline = get_whisper_pipeline()
    result = whisper_pipeline(audio_path)
    return clean_text(result["text"]) if isinstance(result, dict) and "text" in result else clean_text(str(result))


# ========== VIEWS ==========

@csrf_exempt
def upload_and_transcribe(request):
    if request.method == 'POST' and request.FILES.get('file'):
        video_file = request.FILES['file']
        video_path = os.path.join(BASE_DIR, "uploaded_video.mp4")
        audio_dir = os.path.join(BASE_DIR, "audio")
        audio_path = os.path.join(audio_dir, "extracted_audio.wav")

        try:
            with open(video_path, 'wb') as f:
                for chunk in video_file.chunks():
                    f.write(chunk)

            os.makedirs(audio_dir, exist_ok=True)
            extract_audio(video_path, audio_path)
            transcript = transcribe_audio(audio_path)
            return JsonResponse({"transcript": transcript})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        finally:
            if os.path.exists(video_path):
                os.remove(video_path)
            if os.path.exists(audio_path):
                os.remove(audio_path)
    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def signup_google(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            token = data.get('token')

            if not token:
                return JsonResponse({'error': 'Google token is required.'}, status=400)

            try:
                id_info = id_token.verify_oauth2_token(token, Request())

                if id_info.get('exp') < time.time():
                    return JsonResponse({'error': 'Google token has expired.'}, status=400)

                email = id_info.get('email')
                name = id_info.get('name')

                user = UserProfile.objects.filter(email=email).first()
                if not user:
                    user = UserProfile.objects.create(email=email, username=email, full_name=name)

                return JsonResponse({'message': 'User signed up successfully via Google.'}, status=201)
            except ValueError:
                return JsonResponse({'error': 'Invalid Google token.'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)
import uuid
@csrf_exempt
def signup_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)

            if UserProfile.objects.filter(email=email).exists():
                return JsonResponse({'error': 'A user with this email already exists.'}, status=400)

            hashed_password = make_password(password)
            temp_username = str(uuid.uuid4())[:12]

            user = UserProfile.objects.create(
                email=email,
                password=hashed_password,
                username=temp_username,
                full_name="",
                interests=[]
            )

            # Generate JWT token manually (fake user object workaround)
            from django.contrib.auth.models import AnonymousUser
            user.id = user.pk  # Fake user object compatibility
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Optionally save the access token
            user.token = access_token
            user.save()

            return JsonResponse({
                'message': 'User signed up successfully.',
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
                'username': user.username
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)
from rest_framework_simplejwt.tokens import AccessToken
@csrf_exempt
def complete_profile(request):
    if request.method == 'POST':
        try:
            # Extract and verify token
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({'error': 'Missing or invalid token'}, status=401)

            token_str = auth_header.split(' ')[1]
            access_token = AccessToken(token_str)
            user_id = access_token['user_id']

            user = UserProfile.objects.filter(id=user_id).first()
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)

            # Get request data
            data = json.loads(request.body)
            username = data.get('username')
            full_name = data.get('full_name')
            interests = data.get('interests')

            if not all([username, full_name, interests]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            # Update user
            user.username = username
            user.full_name = full_name
            user.interests = interests
            user.save()

            return JsonResponse({'message': 'Profile completed successfully.'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)

from rest_framework.authtoken.models import Token
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            user = UserProfile.objects.get(email=email)

            if not user.check_password(password):  # Use check_password!
                return JsonResponse({"error": "Invalid email or password"}, status=400)

            # If user doesn't have a token, assign one
            if not user.token:
                user.token = str(uuid.uuid4())
                user.save()

            return JsonResponse({
                "message": "Login successful",
                "email": user.email,
                "username": user.username,
                "full_name": user.full_name,
                "interests": user.interests,
                "token": user.token,
            })

        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "Invalid email or password"}, status=400)

        except Exception as e:
            print("Login error:", e)
            return JsonResponse({"error": "Internal server error"}, status=500)

import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import UserProfile

@csrf_exempt
def update_interests(request):
    if request.method == 'POST':
        try:
            auth_header = request.headers.get('Authorization')

            if not auth_header or not auth_header.startswith('Token '):
                return JsonResponse({'error': 'Authorization header missing or invalid.'}, status=401)

            token = auth_header.split(' ')[1]

            try:
                user = UserProfile.objects.get(token=token)
            except UserProfile.DoesNotExist:
                return JsonResponse({'error': 'Invalid token.'}, status=401)

            data = json.loads(request.body.decode('utf-8'))
            interests = data.get('interests')

            if interests is None:
                return JsonResponse({'error': 'Interests are required.'}, status=400)

            user.interests = interests if isinstance(interests, list) else [interests]
            user.save()

            return JsonResponse({'status': 'success', 'message': 'Interests updated successfully.'})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.views import View
from .models import UserProfile  # or wherever you store users
import json

@method_decorator(csrf_exempt, name='dispatch')
class UpdatePasswordView(View):
    def post(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Unauthorized"}, status=401)

        token = auth_header.split(" ")[1]

        try:
            user = UserProfile.objects.get(token=token)

            data = json.loads(request.body)
            new_password = data.get("password")

            if not new_password:
                return JsonResponse({"error": "Password required"}, status=400)

            user.set_password(new_password)
            user.save()

            return JsonResponse({"message": "Password updated successfully"})

        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "Invalid token"}, status=401)
        except Exception as e:
            print("Error:", e)
            return JsonResponse({"error": "Something went wrong"}, status=500)

@csrf_exempt
def GenerateTranscript(request):
    if request.method == "OPTIONS":
        return JsonResponse({"message": "CORS preflight handled."}, status=200)

    if request.method == 'POST' and request.FILES.get('file'):
        video_file = request.FILES['file']
        upload_folder = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')
        os.makedirs(upload_folder, exist_ok=True)
        filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{video_file.name}"
        file_path = os.path.join(upload_folder, filename)

        try:
            with open(file_path, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)

            file_url = request.build_absolute_uri(settings.MEDIA_URL + 'uploaded_files/' + filename)
            return JsonResponse({'message': 'File saved successfully.', 'file_url': file_url}, status=201)

        except Exception as e:
            return JsonResponse({'error': f'Failed to save file: {str(e)}'}, status=500)

    return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)


def home(request):
    return JsonResponse({"message": "HOME here"})

from django.http import JsonResponse
from .models import UserProfile

def authenticate_user(view_func):
    def _wrapped_view(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Token "):
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        token = auth_header.split(" ")[1]
        try:
            user = UserProfile.objects.get(token=token)
            request.user_profile = user  # Attach user to request
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        return view_func(request, *args, **kwargs)
    return _wrapped_view


def get_video_metadata(video_path):
    command = [
        "ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", video_path
    ]
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    metadata = json.loads(result.stdout.decode())
    return metadata

def guess_category(text):
    text_lower = text.lower()
    categories = {
        "Banking": ["bank", "finance", "loan", "credit", "investment", "atm", "branch"],
        "Law": ["law", "legal", "justice", "court", "attorney", "contract", "crime"],
        "Agriculture": ["agriculture", "farm", "crop", "harvest", "irrigation", "fertilizer", "seeds"],
    }

    for category, keywords in categories.items():
        if any(keyword in text_lower for keyword in keywords):
            return category
    return "General"


@csrf_exempt
@authenticate_user
def process_transcript_upload(request):
    if request.method == 'OPTIONS':
        return JsonResponse({"message": "CORS preflight handled."}, status=200)

    if request.method == 'POST' and request.FILES.get('file'):
        try:
            # STEP 1: Save video to media
            video_file = request.FILES['file']
            upload_folder = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')
            os.makedirs(upload_folder, exist_ok=True)

            filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{video_file.name}"
            video_path = os.path.join(upload_folder, filename)
            with open(video_path, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)

            # STEP 2: Extract metadata
            # STEP 2: Extract metadata
                metadata = get_video_metadata(video_path)

                # Title fallback to filename (without extension) if not in metadata
                title_from_meta = metadata.get('format', {}).get('tags', {}).get('title')
                video_title = title_from_meta if title_from_meta else os.path.splitext(video_file.name)[0]

                # Description is optional – fallback to empty
                description = metadata.get('format', {}).get('tags', {}).get('description', '')

            # STEP 3: Extract audio
            audio_path = os.path.join(settings.MEDIA_ROOT, 'temp_audio.wav')
            extract_audio(video_path, audio_path)

            # STEP 4: Generate transcript
            transcript = transcribe_audio(audio_path)

            # STEP 5: Guess lecture category
            # STEP 5: Guess lecture category
            def guess_category(text):
                text_lower = text.lower()
                if "bank" in text_lower or "finance" in text_lower or "account" in text_lower:
                    return "Banking"
                elif "law" in text_lower or "legal" in text_lower or "court" in text_lower:
                    return "Law"
                elif "farm" in text_lower or "crop" in text_lower or "agriculture" in text_lower or "soil" in text_lower:
                    return "Agriculture"
                return "General"


            category = guess_category(transcript + " " + description)

            # STEP 6: Save to model
            user = request.user_profile  # ✅ Comes from your decorator
            video_instance = UploadedVideoLecture.objects.create(
                uploadedBy=user,
                videoTitle=video_title,
                video_file=os.path.join('videos', filename),
                lectureCategory=category,
                transcript=transcript
            )

            file_url = request.build_absolute_uri(settings.MEDIA_URL + f"videos/{filename}")
            # STEP 6.5: Save transcript to LectureTranslation as sourceText
            LectureTranslation.objects.create(
                video=video_instance,
                sourceText=transcript,
                status='undone'
            )
                        # Cleanup
            if os.path.exists(audio_path):
                os.remove(audio_path)

            return JsonResponse({
                'message': 'Transcript generated and saved.',
                'file_url': file_url,
                'transcript': transcript,
                'category': category,
                'videoId': str(video_instance.videoId)
            }, status=201)

        except Exception as e:
            return JsonResponse({'error': f'Failed to process file: {str(e)}'}, status=500)

    return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)

# @csrf_exempt
# def process_transcript_upload(request):
#     if request.method == 'OPTIONS':
#         return JsonResponse({"message": "CORS preflight handled."}, status=200)

#     if request.method == 'POST' and request.FILES.get('file'):
#         try:
#             # STEP 1: Save video to media
#             video_file = request.FILES['file']
#             upload_folder = os.path.join(settings.MEDIA_ROOT, 'videos')
#             os.makedirs(upload_folder, exist_ok=True)

#             filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{video_file.name}"
#             video_path = os.path.join(upload_folder, filename)
#             with open(video_path, 'wb+') as destination:
#                 for chunk in video_file.chunks():
#                     destination.write(chunk)

#             # STEP 2: Extract audio
#             audio_path = os.path.join(settings.MEDIA_ROOT, 'temp_audio.wav')
#             extract_audio(video_path, audio_path)

#             # STEP 3: Generate transcript
#             transcript = transcribe_audio(audio_path)

#             # STEP 4: Guess lecture category (VERY basic logic)
#             def guess_category(text):
#                 text_lower = text.lower()
#                 if "math" in text_lower:
#                     return "Mathematics"
#                 elif "physics" in text_lower:
#                     return "Physics"
#                 elif "biology" in text_lower:
#                     return "Biology"
#                 elif "chemistry" in text_lower:
#                     return "Chemistry"
#                 elif "computer" in text_lower:
#                     return "Computer Science"
#                 return "General"

#             category = guess_category(transcript)

#             # STEP 5: Save to model
#             user = request.user.userprofile  # assuming request.user is authenticated
#             video_instance = UploadedVideoLecture.objects.create(
#                 uploadedBy=user,
#                 videoTitle=filename,
#                 video_file=os.path.join('videos', filename),
#                 lectureCategory=category
#             )

#             file_url = request.build_absolute_uri(settings.MEDIA_URL + f"videos/{filename}")

#             # Cleanup
#             if os.path.exists(audio_path):
#                 os.remove(audio_path)

#             return JsonResponse({
#                 'message': 'Transcript generated and saved.',
#                 'file_url': file_url,
#                 'transcript': transcript,
#                 'category': category,
#                 'videoId': str(video_instance.videoId)
#             }, status=201)

#         except Exception as e:
#             return JsonResponse({'error': f'Failed to process file: {str(e)}'}, status=500)

#     return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)
# import subprocess
# import json

