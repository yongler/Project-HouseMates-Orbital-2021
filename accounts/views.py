from rest_framework.generics import (ListCreateAPIView,RetrieveUpdateDestroyAPIView,)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import CustomUser
from .permissions import IsOwnerProfileOrReadOnly
from .serializers import userProfileSerializer

# heroku setup
from django.views import View
from django.http import HttpResponse, HttpResponseNotFound
import os
from djoser import signals, utils
from rest_framework import generics, status, views, viewsets
from rest_framework.decorators import action
from djoser.compat import get_user_email
from djoser.conf import settings
# Create your views here.   
from djoser.views import UserViewSet as DjoserUserViewSet

# view with no activation email on updating user
class UserProfileListViewSet(DjoserUserViewSet):
    queryset=CustomUser.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

    def perform_update(self, serializer):
        viewsets.ModelViewSet.perform_update(self, serializer)

# view with activation email on updating user
class UserProfileListCreateView(ListCreateAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user=self.request.user
        serializer.save(user=user)

    def partial_update(self, request, *args, **kwargs):
        user=self.request.user
        serializer = userProfileSerializer(user, request, partial=True)
        if serializer.is_valid:
            serializer.save(user=user)

        return Response(self.get_serializer(request.user).data)

# individual profiles view
class userProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset=CustomUser.objects.all()
    serializer_class=userProfileSerializer
    permission_classes=[IsOwnerProfileOrReadOnly,IsAuthenticated]

# for mimetype
class Assets(View):
    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'static', filename)

        if os.path.isfile(path):
            with open(path, 'rb') as file:
                # return HttpResponse(file.read(), content_type='application/javascript')
                return HttpResponse(file.read(), content_type='image/jpeg')
        else:
            return HttpResponseNotFound()