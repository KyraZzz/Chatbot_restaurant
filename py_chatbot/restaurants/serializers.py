from rest_framework import serializers
from .models import Category, Info


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_name')


class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = ("name", "url", "review_count", "rating", "price", "location",
                  "city", "zip_code", "country", "state", "phone", "category")
