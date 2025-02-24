from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
import json
from .models import UserProfile
from moviepy.editor import VideoFileClip
from .models import UserProfile
import os
import tempfile
import logging
import json
import requests
import time
from google.oauth2 import id_token
from google.auth.transport.requests import Request
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
import os
import torch
import subprocess
import re
logger = logging.getLogger(__name__)
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_whisper_pipeline():
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    model_id = "openai/whisper-tiny.en"
    torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True
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
        torch_dtype=torch_dtype,
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
    if isinstance(result, dict) and "text" in result:
        return clean_text(result["text"])
    return clean_text(str(result))


@csrf_exempt
def upload_and_transcribe(request):
    if request.method == 'POST' and request.FILES.get('file'):
        video_file = request.FILES['file']
        video_path = os.path.join(BASE_DIR, "uploaded_video.mp4")
        audio_path = os.path.join(BASE_DIR, "audio", "extracted_audio.wav")

        with open(video_path, 'wb') as f:
            for chunk in video_file.chunks():
                f.write(chunk)

        try:
            os.makedirs(os.path.join(BASE_DIR, "audio"), exist_ok=True)
            extract_audio(video_path, audio_path)
            transcript = transcribe_audio(audio_path)
            return JsonResponse({"transcript": transcript})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        finally:
            os.remove(video_path)
            if os.path.exists(audio_path):
                os.remove(audio_path)
    return JsonResponse({"error": "Invalid request"}, status=400)
@csrf_exempt
def signup_google(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            google_token = data.get('token')

            if not google_token:
                return JsonResponse({'error': 'Google token is required.'}, status=400)

            try:
                # Verify the token with Google's API
                id_info = id_token.verify_oauth2_token(google_token, Request())

                # Check token expiration
                expiration_time = id_info.get('exp')  # Expiration time in seconds
                if expiration_time < time.time():
                    return JsonResponse({'error': 'Google token has expired.'}, status=400)

                # Extract user information from the token
                email = id_info.get('email')
                name = id_info.get('name')

                # Check if the user already exists in the database
                user = UserProfile.objects.filter(email=email).first()

                if not user:
                    # Create a new user profile if the user doesn't exist
                    user = UserProfile.objects.create(email=email, username=email, full_name=name)

                return JsonResponse({'message': 'User signed up successfully via Google.'}, status=201)
            
            except ValueError:
                return JsonResponse({'error': 'Invalid Google token.'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)
from django.contrib.auth.hashers import make_password, check_password

from django.contrib.auth.hashers import make_password

@csrf_exempt
def signup_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)

            # Hash the password before saving
            hashed_password = make_password(password)

            # Create user profile
            UserProfile.objects.create(email=email, password=hashed_password)

            return JsonResponse({'message': 'User signed up successfully.'}, status=201)

        except IntegrityError:
            return JsonResponse({'error': 'A user with this email already exists.'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)

@csrf_exempt
def complete_profile(request):
    """
    Endpoint to complete the user's profile.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            email = data.get('email')
            password = data.get('password')
            username = data.get('username')
            full_name = data.get('full_name')
            interests = data.get('interests')

            if not email or not password or not username or not full_name or not interests:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            user = UserProfile.objects.filter(email=email).first()
            if not user or not check_password(password, user.password):  # Verify hashed password
                return JsonResponse({'error': 'Invalid email or password.'}, status=404)

            user.username = username
            user.full_name = full_name
            user.interests = interests
            user.save()

            return JsonResponse({'message': 'Profile completed successfully.'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        except IntegrityError:
            return JsonResponse({'error': 'A user with this username already exists.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)
from django.contrib.auth.hashers import check_password

@csrf_exempt
def loginView(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username_or_email = data.get("email") or data.get("username")
            password = data.get("password")

            if not username_or_email or not password:
                return JsonResponse({"error": "Username/Email and password are required"}, status=400)

            user = UserProfile.objects.filter(email=username_or_email).first()

            if user and check_password(password, user.password):
                return JsonResponse({"message": "Login successful", "username": user.username, "token": "your_generated_token_here"})

            return JsonResponse({"error": "Invalid credentials"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


def home(request):
    return JsonResponse('HOME here')

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from django.conf import settings

@csrf_exempt
def upload_video(request):
    if request.method == "OPTIONS":
        return JsonResponse({"message": "CORS preflight handled."}, status=200)

    if request.method == 'POST' and request.FILES.get('file'):
        video_file = request.FILES['file']
        upload_folder = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')

        # Ensure the folder exists
        os.makedirs(upload_folder, exist_ok=True)

        file_path = os.path.join(upload_folder, video_file.name)

        try:
            # Save the uploaded video file
            with open(file_path, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)

            return JsonResponse({'message': f'File saved successfully at {file_path}', 'file_url': request.build_absolute_uri(settings.MEDIA_URL + 'uploaded_files/' + video_file.name)}, status=201)

        except Exception as e:
            return JsonResponse({'error': f'Failed to save file: {str(e)}'}, status=500)

    return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)
