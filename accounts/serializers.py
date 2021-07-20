from rest_framework import serializers
from .models import CustomUser
from django.db import IntegrityError, transaction

class userProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        # fields = '__all__'
        fields = ('id', 'first_name', 'last_name', 'profile_pic', 'bio', 'favourites', "last_login")

    # def get_profile_pic(self, CustomUser):
    #     request = self.context.get('request')
    
    #     if CustomUser.profile_pic and hasattr(CustomUser.profile_pic, 'url'):
    #            photo_url = CustomUser.profile_pic.url
    #            return request.build_absolute_uri(photo_url)
    #     else:
    #         return None