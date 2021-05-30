from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Question, Choice

admin.site.site_header = "HouseMates Admin"
admin.site.site_title = "HouseMates Admin Area"
admin.site.index_title = "Welcome to the HouseMates admin area"


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
                 (None, {'fields': ['question_form_type']}),
                 (None, {'fields': ['category']}),
                 (None, {'fields': ['question_text']}),
                 (None, {'fields': ['question_type']})
                 ]
    inlines = [ChoiceInline]


# admin.site.register(Question)
# admin.site.register(Choice)
admin.site.register(Question, QuestionAdmin)