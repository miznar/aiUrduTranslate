from django.contrib import admin
from django.urls import path, include
from django.conf import settings  # Import settings to access MEDIA_URL and MEDIA_ROOT
from django.conf.urls.static import static  # Import for serving media files during development

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin route
    path('', include('api.urls')),  # Include your app's URLs
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)