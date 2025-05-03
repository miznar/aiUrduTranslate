from django.urls import path
# from .views import home, postLearnerStory,GenerateTranscript, signup_email, complete_profile, signup_google,upload_and_transcribe,LoginView,update_interests,UpdatePasswordView,process_transcript_upload
from .views import signup_email, complete_profile,LoginView,update_interests,process_transcript_upload,postLearnerStory,UserQueryCreateView,FAQListView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', home, name='home'),
    path('generate-transcript/', process_transcript_upload, name='GenerateTranscript'),
    path('signup_email/', signup_email, name='signup_email'),
    path('complete_profile/', complete_profile, name='complete_profile'),
    # path('signup_google/', signup_google, name='signup_google'),
    path('login/', LoginView.as_view(), name='login'),
    path('update-interests/', update_interests, name='update-interests'),
    # path('update-password/', UpdatePasswordView.as_view(), name='update-password'),
    path('learner-story/', postLearnerStory, name='learner_story'),
    path('user-query/', UserQueryCreateView.as_view(), name='user-query-create'),
    path('faqs/', FAQListView.as_view(), name='faq-list'),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



