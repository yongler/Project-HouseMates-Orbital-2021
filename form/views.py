from django.shortcuts import render
from rest_framework import permissions, viewsets, generics
from rest_framework.decorators import api_view
from .serializers import QuestionSerializer, PostSerializer,  ScoreSerializer, FavouriteSerializer
from rest_framework import filters

# pagination 
from rest_framework.pagination import PageNumberPagination

# import models 
from .models import Favourite, Question, Choice, Post, Form, Score

# heroku setup
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

class QuestionView(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer

	def get_queryset(self):
		queryset = Question.objects.all().order_by('id')
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

class FavouriteView(viewsets.ModelViewSet):
	serializer_class = FavouriteSerializer

	def get_queryset(self):
		queryset = Favourite.objects.all()
		post = self.request.query_params.get('post')
		owner = self.request.query_params.get('owner')
		if post is not None:
			queryset = queryset.filter(temp_post_id=post) 
		if owner is not None:
			queryset = queryset.filter(owner=owner) 
		return queryset

# to solve mimetypes issue
class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                return HttpResponse(file.read(), content_type='image/jpeg')
        else:
            return HttpResponseNotFound()