from django.contrib import admin

# Register your models here.

from .models import CustomUser, CustomUserManager

admin.site.site_header = "HouseMates Admin"
admin.site.site_title = "HouseMates Admin Area"
admin.site.index_title = "Welcome to the HouseMates admin area"

# (None, {'fields': ['id']}),
class CustomUserAdmin(admin.ModelAdmin):
    fieldsets = [
                 (None, {'fields': ['first_name']}),
                 (None, {'fields': ['last_name']}),
                 (None, {'fields': ['email']}),
                 (None, {'fields': ['profile_pic']}),
                 (None, {'fields': ['bio']}),
                 (None, {'fields': ['just_registered']}),
                 ]

    # fieldsets = '__all__'


# admin.site.register(Question)
# admin.site.register(Choice)
admin.site.register(CustomUser, CustomUserAdmin)