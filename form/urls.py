from django.urls import path, include 
from rest_framework import routers

from . import views

app_name = 'form'

router = routers.DefaultRouter()
router.register(r'question-list', views.QuestionView, basename='QuestionView')
router.register(r'post-list', views.PostView, basename='PostView')
router.register(r'score-list', views.ScoreView, basename='ScoreView')

urlpatterns = [
	path('', include(router.urls))
]