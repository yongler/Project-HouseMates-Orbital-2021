from rest_framework import serializers

from .models import Room, Message
from accounts.models import CustomUser
from accounts.serializers import userProfileSerializer
from datetime import datetime


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user_id', 'message', 'timestamp', 'hasRead']
        # fields = '__all__'


        
class RoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    owner1 = serializers.SerializerMethodField()
    owner2 = serializers.SerializerMethodField()

    def get_owner1(self, instance):
        temp = CustomUser.objects.all().filter(id=instance.user1).first()
        if temp:
            return {
        "id":temp.id, 
        "first_name":temp.first_name, 
        "last_name":temp.last_name, 
        "profile_pic":str(temp.profile_pic),
        "bio":temp.bio ,
        "favourites": temp.favourites,
        "last_login": temp.last_login.strftime('%b %d,%Y %I:%m%p')
        }
        else:
            return None

    def get_owner2(self, instance):
        temp = CustomUser.objects.all().filter(id=instance.user2).first()
        if temp:
            return {
        "id":temp.id, 
        "first_name":temp.first_name, 
        "last_name":temp.last_name, 
        "profile_pic":str(temp.profile_pic),
        "bio":temp.bio ,
        "favourites": temp.favourites,
        "last_login": temp.last_login.strftime('%b %d,%Y %I:%m%p')
        }
        else:
            return None

    class Meta:
        model = Room
        fields = '__all__'


