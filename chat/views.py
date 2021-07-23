from django.shortcuts import render
from rest_framework import permissions, viewsets, generics
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer
from accounts.models import CustomUser
from django.db.models import Max

class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.all()
        room = self.request.query_params.get('room')
        hasread = self.request.query_params.get('hasread')
        if room is not None:
            return queryset.filter(room=room) 
        if hasread is not None:
            return queryset.filter(hasRead=hasread) 
        return queryset

class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer

    def get_queryset(self):
        queryset = Room.objects.all().annotate(lastest_message=Max('messages__timestamp')).order_by("-lastest_message")
        user1 = self.request.query_params.get('user1')
        user2 = self.request.query_params.get('user2')
        current = self.request.query_params.get('current')
        if user1 is not None and user2 is not None:
            if queryset.filter(user1=user1).filter(user2=user2).exists():
                return queryset.filter(user1=user1).filter(user2=user2)
            else:
                return queryset.filter(user1=user2).filter(user2=user1)
        if current is not None:
            return queryset.filter(user1=current) | queryset.filter(user2=current)
        return queryset
    
    # def perform_create(self, serializer):
    #     serializer.save(owner1 = CustomUser.objects.all().filter(id=self.request.data['user1']).first())
    #     serializer.save(owner2 = CustomUser.objects.all().filter(id=self.request.data['user2']).first())

    

def room(request, room_name):
    return render(request, 'index.html', {
        'room_name': room_name
    })


def chat_room(request, label):
    """
    Room view - show the room, with latest messages.
    The template for this view has the WebSocket business to send and stream
    messages, so see the template for where the magic happens.
    """
    # If the room with the given label doesn't exist, automatically create it
    # upon first visit (a la etherpad).
    room, created = Room.objects.get_or_create(label=label)

    # We want to show the last 50 messages, ordered most-recent-last
    messages = reversed(room.messages.order_by('-timestamp'))

    return render(request, "chat/room.html", {
        'room': room,
        'messages': messages,
    })