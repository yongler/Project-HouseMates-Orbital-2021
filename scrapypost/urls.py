from django.urls import path, include 
from rest_framework import routers

from . import views

app_name = 'scrapypost'

router = routers.DefaultRouter()
router.register(r'scrapy-post', views.ScrapyPostView, basename='ScrapyPostView')

urlpatterns = [
	path('', include(router.urls))
]