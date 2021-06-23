from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions, viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import QuestionSerializer, PostSerializer, SelectedChoiceSerializer, ChoiceSerializer, FormSerializer
from rest_framework import filters
from .permissions import IsOwnerProfileOrReadOnly

from .models import Question, Choice, Post, Selected_choice, Form

# class QuestionView(generics.ListAPIView):
class QuestionView(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer

	def get_queryset(self):
		queryset = Question.objects.all()
		form_type = self.request.query_params.get('form_type')
		if form_type is not None:
			queryset = queryset.filter(question_form_type=form_type)
		return queryset

class PostView(viewsets.ModelViewSet):
	permission_classes=[IsOwnerProfileOrReadOnly]
	serializer_class = PostSerializer
	filter_backends = [filters.SearchFilter]
	search_fields = ['owner__first_name', 'owner__last_name', 'owner__bio', 'selected_choices']

	def get_queryset(self):
		queryset = Post.objects.all()
		form_type = self.request.query_params.get('form_type')
		if form_type is not None:
			queryset = queryset.filter(post_form_type=form_type)
		owner = self.request.query_params.get('owner')
		if owner is not None:
			queryset = queryset.filter(owner=owner)
		return queryset
	
	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

class ChoiceView(viewsets.ModelViewSet):
	queryset = Choice.objects.all()
	serializer_class = ChoiceSerializer

class FormView(viewsets.ModelViewSet):
	queryset = Form.objects.all()
	serializer_class = FormSerializer


