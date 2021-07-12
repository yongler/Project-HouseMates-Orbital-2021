from rest_framework import serializers
from .models import ScrapyPost

# Admin blank forms model serializers
class ScrapyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapyPost
        fields = '__all__'
