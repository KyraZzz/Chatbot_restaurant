from django.db import models
import string
import random

# Create your models here.
# domain of the app
# connect to the database and do migration to sychronise


class Category(models.Model):
    category_name = models.CharField(max_length=255, default=None)

    def __str__(self):
        return self.category_name


class Info(models.Model):
    # blank = False means required, null = true means database can be null
    name = models.CharField(max_length=255, null=True, blank=False)
    url = models.URLField(null=True, blank=True)
    review_count = models.IntegerField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    price = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=False)
    city = models.CharField(max_length=255, null=True, blank=False)
    zip_code = models.CharField(max_length=255, null=True, blank=False)
    country = models.CharField(max_length=255, null=True, blank=False)
    state = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    category = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return self.name


class Conversation(models.Model):
    user_text = models.CharField(max_length=255)
    # date_posted = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.user_text
