from django.db.models.enums import Choices
from rest_framework import serializers
from .models import Question, Choice, Post, Selected_choice, Form

# Admin blank forms model serializers
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    choice_set = serializers.SerializerMethodField()
    # choice_set = serializers.RelatedField(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

    def get_choice_set(self, instance):
        names = []
        for choice in instance.choice_set.all():
            names.append(choice.choice_text)
        return names

class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
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
