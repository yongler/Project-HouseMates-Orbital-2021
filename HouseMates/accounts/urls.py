from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import UserProfileListCreateView, userProfileDetailView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #gets all user profiles and create a new profile
    path("profiles/",UserProfileListCreateView.as_view(),name="all-profiles"),
   # retrieves profile details of the currently logged in user
    path("profiles/<int:pk>/",userProfileDetailView.as_view(),name="profile"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)