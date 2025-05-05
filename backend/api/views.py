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
from .models import ufUserProfile 
from moviepy.editor import VideoFileClip
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.generics import ListAPIView
from .models import FAQ
from .serializers import FAQSerializer
from .models import ufUserProfile,UploadedVideoLecture,LectureTranslation
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
import json
import json
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import ufUserProfile
import json
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import ufUserProfile,Subject

from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import AccessToken
from django.http import JsonResponse
import json
import uuid
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def signup_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Validate email and password
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)

            # Check if email is already registered
            if ufUserProfile.objects.filter(email=email).exists():
                return JsonResponse({'error': 'A user with this email already exists.'}, status=400)

            # Hash password
            hashed_password = make_password(password)
            temp_username = str(uuid.uuid4())[:12]  # Placeholder username

            # Create the user object
            user = ufUserProfile.objects.create(
                email=email,
                password=hashed_password,
                username=temp_username,
                full_name="",  # Empty initially
                interests=[],  # Empty initially
            )

            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Optionally, save the access token in the user object (if you want to)
            user.token = access_token
            user.save()

            return JsonResponse({
                'message': 'User signed up successfully.',
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
                'username': user.username  # Placeholder username
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        except Exception as e:
            logger.error(f"Error during signup: {e}")
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)


@csrf_exempt
def complete_profile(request):
    if request.method == 'POST':
        try:
            # Extract and verify the token from the Authorization header
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return JsonResponse({'error': 'Missing or invalid token'}, status=401)

            token_str = auth_header.split(' ')[1]
            try:
                access_token = AccessToken(token_str)
                user_id = access_token['user_id']
            except Exception as e:
                return JsonResponse({'error': 'Invalid or expired token.'}, status=401)

            # Fetch the user from the database
            try:
                user = ufUserProfile.objects.get(id=user_id)
            except ufUserProfile.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

            # Get request data for profile completion
            data = json.loads(request.body)
            username = data.get('username')
            full_name = data.get('full_name', '')
            interests = data.get('interests', [])

            # Ensure all required fields are provided
            if not username:
                return JsonResponse({'error': 'Username is required.'}, status=400)

            # Update the user profile with the provided details
            user.username = username
            user.full_name = full_name
            user.interests = interests
            user.save()

            return JsonResponse({'message': 'Profile completed successfully.'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        except Exception as e:
            logger.error(f"Error during profile completion: {e}")
            return JsonResponse({'error': str(e)}, status=500)

from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .models import ufUserProfile
import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .models import ufUserProfile
import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
import json
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            # Parse incoming JSON data
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Ensure both email and password are provided
            if not email or not password:
                return JsonResponse({"error": "Email and password are required"}, status=400)

            # Authenticate user using the custom UserProfile model
            user = ufUserProfile.objects.filter(email=email).first()

            if user is None:
                return JsonResponse({"error": "Invalid email "}, status=400)
            
            # Debugging: print stored password hash and provided password
            print("Stored password hash:", user.password)
            print("Provided password:", password)

            # Check if the password matches the stored hash
            if not user.check_password(password):  # Using check_password explicitly
                return JsonResponse({"error": "Invalid email or password"}, status=400)

            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token  # Access token for API requests
            refresh_token = str(refresh)  # Refresh token to get a new access token

            # Respond with user information and JWT tokens
            return JsonResponse({
                "message": "Login successful",
                "email": user.email,
                "username": user.username,
                "full_name": user.full_name,
                "interests": user.interests,
                "access_token": str(access_token),
                "refresh_token": refresh_token,
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            print("Login error:", e)
            return JsonResponse({"error": "Internal server error"}, status=500)


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import ufUserProfile  # Adjust if needed
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from uuid import UUID
from uuid import UUID
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ufUserProfile  # Make sure you import your UserProfile model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_interests(request):
    print(f"Request received with data: {request.data}")  # Log to ensure the request is reaching the view
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."}, status=401)

    interests = request.data.get("interests")
    request.user.interests = interests  # Update the interests
    request.user.save()

    return Response({"detail": "Interests updated successfully."})



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


def authenticate_user(view_func):
    def _wrapped_view(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Token "):
            return JsonResponse({'error': 'Unauthorized'}, status=401)

        token = auth_header.split(" ")[1]
        try:
            user = ufUserProfile.objects.get(token=token)
            request.user_profile = user  # Attach user to request
        except ufUserProfile.DoesNotExist:
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
            
           #  Extract email from request
            email = request.POST.get('email')

            if not email:
                return JsonResponse({'error': 'Email is required.'}, status=400)

            # Get the user profile from email
            try:
               user_profile = ufUserProfile.objects.get(email=email)
            except ufUserProfile.DoesNotExist:
                return JsonResponse({'error': 'User profile not found.'}, status=400)

            # Create video instance using that profile
            # Get subject object based on guessed category
            subject_obj, created = Subject.objects.get_or_create(name=category)

            video_instance = UploadedVideoLecture.objects.create(
                uploadedBy=user_profile,
                videoTitle=video_title,
                video_file=os.path.join('uploaded_files', filename).replace('\\', '/'),
                subject=subject_obj,
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
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error during transcript processing: {str(e)}", exc_info=True)

            return JsonResponse({'error': f'Failed to process file: {str(e)}'}, status=500)
    return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import LearnerStories
from .serializers import LearnerStoriesSerializer
import json

@csrf_exempt
def postLearnerStory(request):
    if request.method == 'OPTIONS':
        return JsonResponse({'message': 'CORS preflight successful'}, status=200)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            story = data.get('story')
            email = data.get('email')  # optional
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)

        if not story:
            return JsonResponse({'error': 'Story text is required.'}, status=400)

        user = None
        if request.user.is_authenticated:
            user = request.user
        elif email:
            try:
                user = ufUserProfile.objects.get(email=email)
            except ufUserProfile.DoesNotExist:
                pass

        learner_story = LearnerStories.objects.create(
            user=user,
            story=story
        )

        serializer = LearnerStoriesSerializer(learner_story)
        return JsonResponse(serializer.data, status=201)

    return JsonResponse({'error': 'Only POST method is allowed.'}, status=405)


from rest_framework import generics
from .models import UserQuery
from .serializers import UserQuerySerializer
from rest_framework import generics, permissions


class UserQueryCreateView(generics.CreateAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQuerySerializer
    permission_classes = [permissions.AllowAny]  # Adjust if authentication is required

    def create(self, request, *args, **kwargs):
        # Log the incoming request data to check if it matches expected structure
        print("Received data:", request.data)

        # Call the parent create method
        return super().create(request, *args, **kwargs)
    
class FAQListView(ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]


# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ArticlesBlog, LearnerStories
from .serializers import ArticlesBlogSerializer, LearnerStoriesSearchSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import ArticlesBlog, LearnerStories, Subject
from .serializers import ArticlesBlogSerializer, LearnerStoriesSearchSerializer
import random

@api_view(['GET'])
@permission_classes([AllowAny])
def get_search_content(request):
    # Get any 2 blogs and 1 learner story
    blogs = list(ArticlesBlog.objects.all())
    learner_stories = list(LearnerStories.objects.all())

    selected_blogs = random.sample(blogs, min(2, len(blogs)))
    selected_learner_story = random.choice(learner_stories) if learner_stories else None

    return Response({
        'blogs': ArticlesBlogSerializer(selected_blogs, many=True).data,
        'learner_story': LearnerStoriesSearchSerializer(selected_learner_story).data if selected_learner_story else None,
        'counts': {
            'blogs': len(blogs),
            'learner_stories': len(learner_stories),
            'subjects': Subject.objects.count()
        }
    })
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UploadedVideoLecture

@csrf_exempt
def get_videos_by_subject(request, subject_name):
    try:
        # Fetch subject by name
        subject = Subject.objects.get(name=subject_name)

        # Get videos associated with that subject
        videos = UploadedVideoLecture.objects.filter(subject=subject)

        # Prepare response data
        response_data = []
        for video in videos:
            response_data.append({
                "title": video.videoTitle,
                "src": video.video_file.url,
                "category": video.subject.name,
                "transcriptFile": video.transcript,
            })

        return JsonResponse(response_data, safe=False)

    except Subject.DoesNotExist:
        return JsonResponse({"error": "Subject not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
