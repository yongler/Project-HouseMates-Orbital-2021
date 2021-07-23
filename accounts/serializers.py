from rest_framework import serializers
from .models import CustomUser
from django.db import IntegrityError, transaction

class userProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        # fields = '__all__'
        fields = ('id', 'first_name', 'last_name', 'profile_pic', 'bio', 'favourites', "last_login", "just_registered")
