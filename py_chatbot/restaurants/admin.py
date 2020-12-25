from django.contrib import admin
from .models import Category, Info


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name')


class InfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'url', 'review_count', 'rating',
                    'price', 'location', 'city', 'zip_code', 'country', 'state', 'phone')


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Info, InfoAdmin)
