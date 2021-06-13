from rest_framework import serializers
from .models import Question, Choice, Post, Selected_choice

# Admin blank forms model serializers
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'


# User filled forms model serializers
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class SelectedChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selected_choice
        fields = '__all__'
