from django.urls import path
from .views import home, upload_video, signup_email, complete_profile, signup_google,upload_and_transcribe,LoginView,update_interests,update_password

urlpatterns = [
    path('', home, name='home'),
    path('upload/', upload_and_transcribe, name='upload_video'),
    path('signup_email/', signup_email, name='signup_email'),
    path('complete_profile/', complete_profile, name='complete_profile'),
    path('signup_google/', signup_google, name='signup_google'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-interests/', update_interests, name='update-interests'),
    path('update-password/', update_password, name='update-password'),

]



