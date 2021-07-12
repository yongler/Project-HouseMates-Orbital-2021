from django.db import models

# Create your models here.
class ScrapyPost(models.Model):
    name = models.CharField(max_length=200, default='')
    url = models.CharField(max_length=1000, default='', null=True, blank=True)
    price = models.CharField(max_length=200, null=True, blank=True)
    avg_rating = models.CharField(max_length=200, default='', null=True, blank=True)
    reviews_count = models.CharField(max_length=200, default='', null=True, blank=True)

    def __str__(self):
        return self.name