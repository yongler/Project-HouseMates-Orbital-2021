from django.contrib import admin

# Register your models here.

from .models import CustomUser, CustomUserManager

admin.site.site_header = "HouseMates Admin"
admin.site.site_title = "HouseMates Admin Area"
admin.site.index_title = "Welcome to the HouseMates admin area"


# class ChoiceInline(admin.TabularInline):
#     model = Choice
#     extra = 3


class CustomUserAdmin(admin.ModelAdmin):
    fieldsets = [(None, {'fields': ['first_name']}),
                 (None, {'fields': ['last_name']}),
                 (None, {'fields': ['email']}),
                 (None, {'fields': ['profile_pic']}),
                 ]
    # inlines = [ChoiceInline]


# admin.site.register(Question)
# admin.site.register(Choice)
admin.site.register(CustomUser, CustomUserAdmin)