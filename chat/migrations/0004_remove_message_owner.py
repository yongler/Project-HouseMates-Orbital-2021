# Generated by Django 3.1.3 on 2021-07-15 10:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_message_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='owner',
        ),
    ]