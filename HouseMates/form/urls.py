from django.urls import path

from . import views

app_name = 'form'
urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
	path('question-list/<str:form_type>/', views.questionList, name="questionList"),
	path('post-list/', views.postList, name="postList"),
	path('post-detail/<str:pk>/', views.postDetail, name="postDetail"),
	path('post-create/', views.postCreate, name="postCreate"),
	path('post-update/<str:pk>/', views.postUpdate, name="postUpdate"),
	# path('selected-choice-create/', views.selectedChoiceCreate, name="selected-choice-create"),
]