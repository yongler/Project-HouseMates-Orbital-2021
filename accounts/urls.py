from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import UserProfileListCreateView, userProfileDetailView

from rest_framework import routers
from . import views

router = routers.DefaultRouter()
#gets all user profiles and create a new profile
router.register(r'profiles', views.UserProfileListViewSet, basename='UserProfileListViewSet')


urlpatterns = [
    path('', include(router.urls)),
    # path("profiles/",UserProfileListCreateView.as_view(),name="all-profiles"),
   # retrieves profile details of the currently logged in user
    path("profiles/<int:pk>/",userProfileDetailView.as_view(),name="profile"),
]
