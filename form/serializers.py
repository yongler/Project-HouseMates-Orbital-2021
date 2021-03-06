from django.db.models.base import Model
from django.db.models.enums import Choices
from rest_framework import serializers
from .models import Favourite, Question, Choice, Post, Score, Form

# Admin blank forms model serializers
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    choice_set = serializers.StringRelatedField(many=True, read_only=True)
    question_form_type = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['form_type']

# User filled forms model serializers
class PostSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()

    def get_owner(self, instance):
        temp = instance.owner
        return {
        "id":temp.id, 
        "first_name":temp.first_name, 
        "last_name":temp.last_name, 
        "profile_pic":str(temp.profile_pic),
        "bio":temp.bio 
        }

    class Meta:
        model = Post
        fields = '__all__'

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = '__all__'


# Favourite posts
class FavouriteSerializer(serializers.ModelSerializer):
    post = serializers.SerializerMethodField()

    def get_post(self, instance):
        temp = instance.temp_post_id
        post_obj = Post.objects.get(id=temp)
        serializer = PostSerializer(post_obj)
        return serializer.data

    class Meta:
        model = Favourite
        fields = '__all__'

