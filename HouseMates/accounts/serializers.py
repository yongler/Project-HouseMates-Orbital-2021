# from djoser.serializers import UserCreateSerializer
# from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CustomUser

# User = get_user_model()

# class UserCreateSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = ('id', 'email', 'first_name', 'last_name', 'password')

class userProfileSerializer(serializers.ModelSerializer):
    # user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=CustomUser
        fields = ('id', 'first_name', 'last_name', 'profile_pic')