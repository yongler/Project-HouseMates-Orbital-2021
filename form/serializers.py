from django.db.models.base import Model
from django.db.models.enums import Choices
from rest_framework import serializers
from .models import Question, Choice, Post, Selected_choice, Form
from accounts.serializers import userProfileSerializer


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
        "bio":temp.bio ,
        "favourites": temp.favourites}

    class Meta:
        model = Post
        fields = '__all__'


class SelectedChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selected_choice
        fields = '__all__'

