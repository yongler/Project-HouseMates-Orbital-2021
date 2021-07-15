from django.urls import path, include 
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'room-list', views.RoomView, basename='RoomView')

urlpatterns = [
    path('', include(router.urls)),
    path('<str:room_name>/', views.room, name='room'),
    # path(r'^new/$', views.new_room, name='new_room'),
    path(r'^(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
]