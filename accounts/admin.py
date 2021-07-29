from django.contrib import admin

# Register your models here.

from .models import CustomUser, CustomUserManager

admin.site.site_header = "HouseMates Admin"
admin.site.site_title = "HouseMates Admin Area"
admin.site.index_title = "Welcome to the HouseMates admin area"

class CustomUserAdmin(admin.ModelAdmin):
    fieldsets = [
                 (None, {'fields': ['first_name']}),
                 (None, {'fields': ['last_name']}),
                 (None, {'fields': ['email']}),
                 (None, {'fields': ['profile_pic']}),
                 (None, {'fields': ['bio']}),
                 (None, {'fields': ['just_registered']}),
                 (None, {'fields': ['light_theme']}),
                 ]

admin.site.register(CustomUser, CustomUserAdmin)