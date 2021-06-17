from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions, viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import QuestionSerializer, PostSerializer, SelectedChoiceSerializer, ChoiceSerializer, FormSerializer

from .models import Question, Choice, Post, Selected_choice, Form


# class APIRoot(generics.GenericAPIView):
# 	authentication_classes = (SessionAuthentication, BasicAuthentication, JWTAuthentication)
# 	permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly,
#     ]

# 	serializer_class = QuestionSerializer


# class QuestionView(generics.ListAPIView):
class QuestionView(viewsets.ModelViewSet):
	# authentication_classes = (SessionAuthentication, BasicAuthentication, JWTAuthentication)
	# permission_classes = [
    #     permissions.IsAuthenticatedOrReadOnly,
    # ]

	serializer_class = QuestionSerializer

	def get_queryset(self):
		queryset = Question.objects.all()
		form_type = self.request.query_params.get('form_type')
		if form_type is not None:
			queryset = queryset.filter(question_form_type=form_type)
		return queryset

class PostView(viewsets.ModelViewSet):
	# authentication_classes = (SessionAuthentication, BasicAuthentication, JWTAuthentication)
	# permission_classes = [
    #     permissions.IsAuthenticatedOrReadOnly,
    # ]

	serializer_class = PostSerializer

	def get_queryset(self):
		queryset = Post.objects.all()
		form_type = self.request.query_params.get('form_type')
		if form_type is not None:
			queryset = queryset.filter(post_form_type=form_type)
		owner = self.request.query_params.get('owner')
		if owner is not None:
			queryset = queryset.filter(owner=owner)
		return queryset

class ChoiceView(viewsets.ModelViewSet):
	queryset = Choice.objects.all()
	serializer_class = ChoiceSerializer

class FormView(viewsets.ModelViewSet):
	queryset = Form.objects.all()
	serializer_class = FormSerializer


