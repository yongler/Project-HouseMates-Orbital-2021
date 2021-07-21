from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from accounts.models import CustomUser

class Room(models.Model):
    user1 = models.IntegerField(default=0)
    user2 = models.IntegerField(default=0)
    owner1 = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='owner1')
    owner2 = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True,blank=True, related_name='owner2')
    label = models.SlugField(unique=True)
    # date_modified = models.DateTimeField(auto_now=True)
 
    def __unicode__(self):
        return self.label

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    user_id = models.TextField(default='')
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)
    hasRead = models.BooleanField(default=False)

    def __str__(self):
        return self.message

    def __unicode__(self):
        return '[{timestamp}] {owner}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %-d %-I:%M %p')
    
    def as_dict(self):
        return {'owner': self.owner, 'message': self.message, 'timestamp': self.formatted_timestamp}