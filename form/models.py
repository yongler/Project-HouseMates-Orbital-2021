from django.db import models
from accounts.models import CustomUser


# Admin blank forms model 
class Form(models.Model):
    form_type = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.form_type

class Question(models.Model):
    question_form_type = models.ManyToManyField(Form)
    category = models.CharField(max_length=200, default='')
    question_text = models.CharField(max_length=200)
    question_type = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)

    def __str__(self):
        return self.choice_text


# User filled forms model 
class Post(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    post_form_type = models.ForeignKey(Form, on_delete=models.CASCADE)
    selected_choices = models.JSONField(default=list)
    score_list = models.JSONField(default=dict, null=True, blank=True)
    total_score = models.IntegerField(default=0, null=True, blank=True)
    images = models.JSONField(default=list, null=True, blank=True)

    def __str__(self):
        return str(self.id)

class Score(models.Model):
    owner1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='scoreowner1')
    owner2 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='scoreowner2')
    post1 = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name='post1')
    post2 = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name='post2')
    score = models.FloatField()


# Favourite posts
class Favourite(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    temp_post_id = models.IntegerField(default=0)
    post = models.ForeignKey(Post, on_delete=models.CASCADE ,null=True, related_name='post')

# class Selected_choice(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     question_category = models.CharField(max_length=200, default='')
#     question_id = models.IntegerField()
#     choice_text = models.CharField(max_length=200, default='')

#     def __str__(self):
#         return str(self.question_id) + ',' + str(self.choice_id)

