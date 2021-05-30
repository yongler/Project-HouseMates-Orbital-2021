from django.db import models


class Question(models.Model):
    question_form_type = models.CharField(max_length=200, default='')
    category = models.CharField(max_length=200, default='')
    question_text = models.CharField(max_length=200)
    question_type = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text

# ---------

# class Form(models.Model):
#     form_type = models.CharField(max_length=200, default='')
    
#     def __str__(self):
#         return self.form_type

# class Category(models.Model):
#     form_type = models.ForeignKey(Form, on_delete=models.CASCADE)
#     category = models.CharField(max_length=200, default='')

#     def __str__(self):
#         return self.category


# class Question(models.Model):
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     question_text = models.CharField(max_length=200)
#     question_type = models.CharField(max_length=200, default='')

#     def __str__(self):
#         return self.question_text


# class Choice(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     choice_text = models.CharField(max_length=200)
#     selected = models.BooleanField(default=False)

#     def __str__(self):
#         return self.choice_text
