from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.http import Http404

from .models import Question, Choice
from django.db.models import Case, When


# Get questions and display them
def index(request):
    # category_sequence = ['personality','work','interests','habits','room preferences','others']
    # order = Case(*[When(category=category, then=pos) for pos, category in enumerate(category_sequence)])
    latest_question_list = Question.objects.order_by("category")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "form/index.html", context)


# Show specific question and choicess
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, "form/detail.html", {"question": question})


# Get question and display results
def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "form/results.html", {"question": question})


# Vote for a question choice
def vote(request, question_id):
    # print(request.POST['choice'])
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "form/detail.html",
            {
                "question": question,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        # selected_choice.votes += 1
        selected_choice.selected = True
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("form:results", args=(question.id,)))
    