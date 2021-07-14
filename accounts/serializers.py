from rest_framework import serializers
from .models import CustomUser


class userProfileSerializer(serializers.ModelSerializer):
    # profile_pic = serializers.SerializerMethodField()

    class Meta:
        model=CustomUser
        fields = ('id', 'first_name', 'last_name', 'profile_pic', 'bio', 'favourites')

    # def get_profile_pic(self, CustomUser):
    #     request = self.context.get('request')
    
    #     if CustomUser.profile_pic and hasattr(CustomUser.profile_pic, 'url'):
    #            photo_url = CustomUser.profile_pic.url
    #            return request.build_absolute_uri(photo_url)
    #     else:
    #         return None