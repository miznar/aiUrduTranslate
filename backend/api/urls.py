from django.urls import path
from .views import home, upload_video, signup_email, complete_profile 

urlpatterns = [
    path('', home, name='home'),
    path('upload/', upload_video, name='upload_video'),  
    path('signup_email/', signup_email, name='signup_email'),
    path('complete_profile/', complete_profile, name='complete_profile'),
]



