# Generated by Django 3.2.3 on 2021-05-26 13:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_host',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='is_tenant',
        ),
    ]
