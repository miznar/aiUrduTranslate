from django.urls import path
from .views import home, upload_video  # Import the upload_video view

urlpatterns = [
    path('', home, name='home'),
    path('upload/', upload_video, name='upload_video'),  # Add this line
]
