from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from .models import Category, Info
from .get_predictions import getPredictions

# Create your views here.


def index(request):  # http request # index represent the main page of the app
    category_objects = Category.objects.all()
    info_objects = Info.objects.all()
    # Select * from category
    # Category.objects.filter(category_name="British")
    # Select * from catogory where category_name="British"
    # Category.objects.get(id=2)
    # output = ', '.join([c.category_name for c in category_objects])

    return render(request, 'restaurants/index.html', {'infos': info_objects, 'categories': category_objects, 'matches': matches_objects})


def detail(request, restaurant_id):
    rest = get_object_or_404(Info, pk=restaurant_id)
    return render(request, 'restaurants/detail.html', {'restaurant': rest})


def chatbot(request):
    output = ""
    input = request.GET.get('user_text')
    if (request.GET.get('print_btn')):
        output = getPredictions(input)
    return render(request, 'restaurants/chatbot.html', {'value': output})
