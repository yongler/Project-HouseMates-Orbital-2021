from django.shortcuts import render
from rest_framework import permissions, viewsets, generics
from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer


class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer

    def get_queryset(self):
        queryset = Room.objects.all()
        user1 = self.request.query_params.get('user1')
        user2 = self.request.query_params.get('user2')
        if user1 is not None and user2 is not None:
            if queryset.filter(user1=user1).filter(user2=user2).exists():
                return queryset.filter(user1=user1).filter(user2=user2)
            else:
                return queryset.filter(user1=user2).filter(user2=user1)
        return queryset

# class MessageView(viewsets.ModelViewSet):
#     serializer_class = MessageSerializer

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)


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