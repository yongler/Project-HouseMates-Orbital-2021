from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions, viewsets, generics
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from .serializers import QuestionSerializer, PostSerializer, ChoiceSerializer, FormSerializer, ScoreSerializer
from rest_framework import filters
from .permissions import IsOwnerProfileOrReadOnly

# pagination 
from rest_framework.pagination import PageNumberPagination

# import models 
from .models import Question, Choice, Post, Form, Score

# heroku setup
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

class QuestionView(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer

	def get_queryset(self):
		queryset = Question.objects.all()
		form_type = self.request.query_params.get('form_type')
		if form_type is not None:
			queryset = queryset.filter(question_form_type=form_type)
		return queryset

class PostView(viewsets.ModelViewSet):
	serializer_class = PostSerializer
	filter_backends = [filters.SearchFilter]
	search_fields = ['owner__first_name', 'owner__last_name', 'owner__bio', 'selected_choices']
	pagination_class = PageNumberPagination
  
	#   for query parameters
	def get_queryset(self):
		queryset = Post.objects.all().order_by('-id')
		form_type = self.request.query_params.get('form_type')
		owner = self.request.query_params.get('owner')
		if form_type is not None:
			queryset = queryset.filter(post_form_type=form_type)
		if owner is not None:
			queryset = queryset.filter(owner=owner)
		return queryset
	
	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

class ScoreView(viewsets.ModelViewSet):
	serializer_class = ScoreSerializer

	def get_queryset(self):
		queryset = Score.objects.all().order_by('-score')
		post = self.request.query_params.get('post')
		owner = self.request.query_params.get('owner')
		if post is not None:
			queryset = queryset.filter(post1=post) | queryset.filter(post2=post)
		if owner is not None:
			queryset = queryset.filter(owner1=owner) | queryset.filter(owner2=owner)
		return queryset

# class ChoiceView(viewsets.ModelViewSet):
# 	queryset = Choice.objects.all()
# 	serializer_class = ChoiceSerializer

# class FormView(viewsets.ModelViewSet):
# 	queryset = Form.objects.all()
# 	serializer_class = FormSerializer

# to solve mimetypes issue
class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                # return HttpResponse(file.read(), content_type='application/javascript')
                return HttpResponse(file.read(), content_type='image/jpeg')
        else:
            return HttpResponseNotFound()