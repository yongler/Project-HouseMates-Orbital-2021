from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import CustomUser
from .permissions import IsOwnerProfileOrReadOnly
from .serializers import userProfileSerializer

# heroku setup
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os

# Create your views here.   

class UserProfileListCreateView(ListCreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)


class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]