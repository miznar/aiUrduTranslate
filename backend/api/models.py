from django.db import models
import uuid

class UserProfile(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Make sure to hash it using set_password()
    username = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=100)
    interests = models.JSONField(default=list)
    token = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        from django.contrib.auth.hashers import make_password
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)
