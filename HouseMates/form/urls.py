from django.urls import path

from . import views

app_name = 'form'
urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
	path('question-list/', views.questionList, name="question-list"),
	path('question-detail/<str:pk>/', views.questionDetail, name="question-detail"),
	# path('question-create/', views.questionCreate, name="question-create"),

	path('question-update/<str:pk>/', views.questionUpdate, name="question-update"),
	# path('question-delete/<str:pk>/', views.questionDelete, name="question-delete"),


	# path('', views.index, name='index'),
    # path('<int:question_id>/', views.detail, name='detail'),
    # path('<int:question_id>/results/', views.results, name='results'),
    # path('<int:question_id>/vote/', views.vote, name='vote')



]