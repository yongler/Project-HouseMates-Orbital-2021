# Generated by Django 3.1.3 on 2021-07-11 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrapypost', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scrapypost',
            name='avg_rating',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='scrapypost',
            name='price',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='scrapypost',
            name='reviews_count',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='scrapypost',
            name='url',
            field=models.CharField(blank=True, default='', max_length=1000, null=True),
        ),
    ]