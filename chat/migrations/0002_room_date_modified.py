# Generated by Django 3.1.3 on 2021-07-20 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='date_modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
