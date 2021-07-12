from django.shortcuts import render
from rest_framework import permissions, viewsets, generics
from .models import ScrapyPost
from .serializers import ScrapyPostSerializer

# Create your views here.
class ScrapyPostView(viewsets.ModelViewSet):
	queryset = ScrapyPost.objects.all()
	serializer_class = ScrapyPostSerializer