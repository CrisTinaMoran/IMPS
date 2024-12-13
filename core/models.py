from django.db import models


class Profile(models.Model):
    USER_LEVEL = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('student', 'Student')    
    ]

    user_id = models.CharField(max_length=100, primary_key=True, unique=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    user_level = models.CharField(max_length=10, choices=USER_LEVEL, default='student')

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return self.username

