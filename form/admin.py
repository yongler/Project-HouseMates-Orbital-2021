from django.db import models
from django.contrib import admin
from django.forms import CheckboxSelectMultiple

# Register your models here.
from .models import Favourite, Question, Choice, Post,  Form, Score

# wesbite setup
admin.site.site_header = "HouseMates Admin"
admin.site.site_title = "HouseMates Admin Area"
admin.site.index_title = "Welcome to the HouseMates admin area"


# Admin blank form admin config
class FormAdmin(admin.ModelAdmin):
    fieldsets = [
                (None, {'fields': ['form_type']}),
                ]


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }

    fieldsets = [
                 (None, {'fields': ['question_form_type']}),
                 (None, {'fields': ['category']}),
                 (None, {'fields': ['question_text']}),
                 (None, {'fields': ['question_type']})
                 ]
    inlines = [ChoiceInline]


# user filled form admin config
class PostAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Post._meta.fields]

class ScoreAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Score._meta.fields]

class FavouriteAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Favourite._meta.fields]




admin.site.register(Question, QuestionAdmin)
admin.site.register(Form, FormAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Score, ScoreAdmin)
admin.site.register(Favourite, FavouriteAdmin)

