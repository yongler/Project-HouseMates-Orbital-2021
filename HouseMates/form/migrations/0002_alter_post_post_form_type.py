# Generated by Django 3.2.3 on 2021-06-21 14:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_form_type',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='form.form'),
        ),
    ]
