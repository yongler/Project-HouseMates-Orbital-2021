from django.contrib import admin

from .models import ScrapyPost

# Register your models here.
class ScrapyPostAdmin(admin.ModelAdmin):
    fieldsets = [
                 (None, {'fields': ['name']}),
                 (None, {'fields': ['url']}),
                 (None, {'fields': ['price']}),
                 (None, {'fields': ['avg_rating']}),
                 (None, {'fields': ['reviews_count']}),
                 ]

admin.site.register(ScrapyPost, ScrapyPostAdmin)