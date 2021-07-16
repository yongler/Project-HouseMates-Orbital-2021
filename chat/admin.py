from django.contrib import admin

# Register your models here.
from .models import Room, Message

class RoomAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Room._meta.fields]

class MessageAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Message._meta.fields]

admin.site.register(Room, RoomAdmin)
admin.site.register(Message, MessageAdmin)