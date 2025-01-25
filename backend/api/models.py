# api/models.py
from django.db import models

class UserProfile(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Use hashed passwords in production
    username = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=100)
    interests = models.TextField()

    def __str__(self):
        return self.username
