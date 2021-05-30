from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import QuestionSerializer, ChoiceSerializer

from .models import Question, Choice

# Serializers for Question model 
@api_view(['GET'])
def apiOverview(request):
	permission_classes = [
        permissions.IsAuthenticated,
    ]

	api_urls = {
		'List':'/question-list/',
		'Detail View':'/question-detail/<str:pk>/',
		'Update':'/question-update/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def questionList(request):
	questions = Question.objects.all().order_by('category')
	serializer = QuestionSerializer(questions, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def questionDetail(request, pk):
	questions = Question.objects.get(id=pk)
	serializer = QuestionSerializer(questions, many=False)
	return Response(serializer.data)


@api_view(['POST'])
def questionUpdate(request, pk):
	question = Question.objects.get(id=pk)
	serializer = QuestionSerializer(instance=question, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)




# Serializers for Choice model 
@api_view(['GET'])
def choiceList(request):
	choices = Choice.objects.all().order_by('category')
	serializer = ChoiceSerializer(choices, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def choiceUpdate(request, pk):
	choice = Choice.objects.get(id=pk)
	serializer = ChoiceSerializer(instance=choice, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)




# from django.template import loader
# from django.http import HttpResponse, HttpResponseRedirect
# from django.shortcuts import get_object_or_404, render
# from django.urls import reverse
# from django.http import Http404

# from .models import Question, Choice

# # Get questions and display them
# def index(request):
#     latest_question_list = Question.objects.order_by('category')[:5]
#     context = {'latest_question_list': latest_question_list}
#     return render(request, 'form/index.html', context)

# # Show specific question and choices
# def detail(request, question_id):
#   try:
#     question = Question.objects.get(pk=question_id)
#   except Question.DoesNotExist:
#     raise Http404("Question does not exist")
#   return render(request, 'form/detail.html', { 'question': question })

# # Get question and display results
# def results(request, question_id):
#   question = get_object_or_404(Question, pk=question_id)
# #   print(question.choice_set.all)
#   return render(request, 'form/results.html', { 'question': question })

# # Vote for a question choice
# def vote(request, question_id):
#     # print(request.POST['choice'])
#     question = get_object_or_404(Question, pk=question_id)
#     try:
#         selected_choice = question.choice_set.get(pk=request.POST['choice'])
#     except (KeyError, Choice.DoesNotExist):
#         # Redisplay the question voting form.
#         return render(request, 'form/detail.html', {
#             'question': question,
#             'error_message': "You didn't select a choice.",
#         })
#     else:
#         selected_choice.selected = not selected_choice.selected
#         selected_choice.save()
#         # Always return an HttpResponseRedirect after successfully dealing
#         # with POST data. This prevents data from being posted twice if a
#         # user hits the Back button.
#         return HttpResponseRedirect(reverse('form:results', args=(question.id,)))