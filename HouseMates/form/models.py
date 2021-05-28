from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    question_form_type = models.CharField(max_length=200, default='')
    category = models.CharField(max_length=200, default='')
    question_type = models.CharField(max_length=200, default='')

    # pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    # votes = models.IntegerField(default=0)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text
