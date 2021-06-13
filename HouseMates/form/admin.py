from django.db import models
from django.contrib import admin
from django.forms import CheckboxSelectMultiple

# Register your models here.
from .models import Question, Choice, Post, Selected_choice, Form

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
# class SelectedChoiceInline(admin.TabularInline):
#     model = Selected_choice


class PostAdmin(admin.ModelAdmin):
    fieldsets = [
                 (None, {'fields': ['post_form_type']}),
                 (None, {'fields': ['selected_choices']}),
                 (None, {'fields': ['owner']}),
                 ]

    # inlines = [SelectedChoiceInline]



admin.site.register(Question, QuestionAdmin)
admin.site.register(Form, FormAdmin)
admin.site.register(Post, PostAdmin)

