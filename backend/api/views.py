from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
import json
from .models import UserProfile


@csrf_exempt
def signup_email(request):
    """
    Endpoint to sign up a user by email and password.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Validate input
            if not email or not password:
                return JsonResponse({'error': 'Email and password are required.'}, status=400)

            # Create user profile
            UserProfile.objects.create(email=email, password=password)

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

            # Extract fields from request
            email = data.get('email')
            password = data.get('password')
            username = data.get('username')
            full_name = data.get('full_name')
            interests = data.get('interests')

            # Validate required fields
            if not email or not password or not username or not full_name or not interests:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            # Fetch user and update profile
            user = UserProfile.objects.filter(email=email, password=password).first()
            if not user:
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

@csrf_exempt  # Disable CSRF for testing; remove in production
def upload_video(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')
        if uploaded_file:
            # Save the file to a temporary location
            upload_dir = 'uploaded_files'  # Ensure this folder exists
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, uploaded_file.name)

            with open(file_path, 'wb') as f:
                for chunk in uploaded_file.chunks():
                    f.write(chunk)

            try:
                # Skip Whisper processing for now
                # Return a placeholder response
                return JsonResponse({'message': 'File uploaded successfully. Whisper processing is skipped for now.'})
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
            finally:
                # Clean up the uploaded file after processing
                os.remove(file_path)

        return JsonResponse({'error': 'No file provided'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def home(request):
    return HttpResponse('HOME here')
