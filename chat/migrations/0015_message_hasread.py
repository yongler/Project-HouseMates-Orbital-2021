# Generated by Django 3.1.3 on 2021-07-19 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0014_auto_20210718_0357'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='hasRead',
            field=models.BooleanField(default=False),
        ),
    ]
