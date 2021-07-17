from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from accounts.models import CustomUser

class Room(models.Model):
    user1 = models.IntegerField(default=0, null=True)
    user2 = models.IntegerField(default=0, null=True)
    label = models.SlugField(unique=True)
 
    def __unicode__(self):
        return self.label

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    user_id = models.TextField(default='')
    owner = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='owner')
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return self.message

    def __unicode__(self):
        return '[{timestamp}] {owner}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %-d %-I:%M %p')
    
    def as_dict(self):
        return {'owner': self.owner, 'message': self.message, 'timestamp': self.formatted_timestamp}