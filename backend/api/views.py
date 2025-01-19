from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import os

@csrf_exempt  # Disable CSRF for testing; remove in production
def upload_video(request):
    if request.method == 'POST':
        uploaded_file = request.FILES.get('file')
        if uploaded_file:
            # Save the file to a temporary location (for testing)
            upload_dir = 'uploaded_files'  # Ensure this folder exists
            os.makedirs(upload_dir, exist_ok=True)
            file_path = os.path.join(upload_dir, uploaded_file.name)

            with open(file_path, 'wb') as f:
                for chunk in uploaded_file.chunks():
                    f.write(chunk)

            # Simulate generating a transcript
            transcript = f"Transcript for {uploaded_file.name}"
            return JsonResponse({'transcript': transcript})

        return JsonResponse({'error': 'No file provided'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

def home(request):
    return HttpResponse('HOME here')

