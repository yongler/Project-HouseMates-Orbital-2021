from rest_framework import serializers
from .models import CustomUser
from django.db import IntegrityError, transaction
from form.serializers import FavouriteSerializer

class userProfileSerializer(serializers.ModelSerializer):
    favourite_set = FavouriteSerializer(many=True, read_only=True)

    class Meta:
        model=CustomUser
        # fields = '__all__'
        fields = ('id', 'first_name', 'last_name', 'profile_pic', 'bio', "last_login", "just_registered", 'favourite_set', 'light_theme')
