from rest_framework import serializers

from .models import Room, Message
from accounts.models import CustomUser
from accounts.serializers import userProfileSerializer


class MessageSerializer(serializers.ModelSerializer):
    owner = userProfileSerializer()

    class Meta:
        model = Message
        fields = ['owner', 'message']


        
class RoomSerializer(serializers.ModelSerializer):
    # messages = serializers.StringRelatedField(many=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


