# Generated by Django 3.2.5 on 2021-07-27 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(max_length=30, verbose_name='last name')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('profile_pic', models.URLField(blank=True, default='', null=True)),
                ('bio', models.CharField(blank=True, default='', max_length=500, null=True)),
                ('just_registered', models.BooleanField(default=True)),
                ('light_theme', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
