from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    fieldsets = (
        (None, {
            'fields': ('user_id', 'username','password', 'first_name', 'last_name', 'email', 'user_level', 'is_superuser', 'is_staff', 'is_active'),
        }),
    )
    list_display = ('username', 'email', 'first_name', 'last_name', 'user_level', 'is_superuser', 'is_staff', 'is_active')
    list_filter = ('user_level', 'is_superuser', 'is_staff', 'is_active')
    search_fields = ('username', 'email')

admin.site.register(Profile, ProfileAdmin)
