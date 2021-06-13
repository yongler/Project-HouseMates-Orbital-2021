from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import QuestionSerializer, PostSerializer, SelectedChoiceSerializer

from .models import Question, Choice, Post, Selected_choice


@api_view(['GET'])
def apiOverview(request):
	permission_classes = [
        permissions.IsAuthenticated,
    ]

	api_urls = {
		'Question List':'/question-list/<str:form_type>/',
		'Post List':'/post-list/',
		'Post Detail View':'/post-detail/<str:pk>/',
		'Post Create':'/post-create/',
		'Post Update':'/post-update/<str:pk>/',
		# 'Selected_choice Create':'/selected-choice-create/',
		}

	return Response(api_urls)

# Admin blank forms model views
@api_view(['GET'])
def questionList(request, form_type):
	questions = Question.objects.all().filter(question_form_type__in = [form_type])
	serializer = QuestionSerializer(questions, many=True)
	return Response(serializer.data)


# User filled forms model views
@api_view(['GET'])
def postList(request):
	posts = Post.objects.all()
	serializer = PostSerializer(posts, many=True)
	return Response(serializer.data)


@api_view(['GET'])
def postDetail(request, pk):
	posts = Post.objects.get(id=pk)
	serializer = PostSerializer(posts, many=False)
	return Response(serializer.data)


@api_view(['PUT'])
def postCreate(request):
  serializer = PostSerializer(data=request.data)

  if serializer.is_valid():
	  serializer.save()

  return Response(serializer.data)


@api_view(['POST'])
def postUpdate(request, pk):
	post = Post.objects.get(id=pk)
	serializer = PostSerializer(instance=post, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)



# @api_view(['PUT'])
# def selectedChoiceCreate(request, pk):
# 	post = Post.objects.get(id=pk)
# 	post.selected_choice_set.create(request.data)
# 	serializer = SelectedChoiceSerializer(data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)




