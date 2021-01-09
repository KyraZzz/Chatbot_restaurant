from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from .models import Category, Info, Conversation
from .get_predictions import getPredictions
from rest_framework import viewsets, generics, status
from rest_framework.viewsets import GenericViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from .serializers import RestaurantsSerializer, CategorySerializer, ConversationSerializer
from .googleSearch import searchResult

# Create your views here.


def index(request):  # http request # index represent the main page of the app
    category_objects = Category.objects.all()
    info_objects = Info.objects.all()
    # Select * from category
    # Category.objects.filter(category_name="British")
    # Select * from catogory where category_name="British"
    # Category.objects.get(id=2)
    # output = ', '.join([c.category_name for c in category_objects])

    return render(request, 'restaurants/index.html', {'infos': info_objects, 'categories': category_objects})


def detail(request, restaurant_id):
    rest = get_object_or_404(Info, pk=restaurant_id)
    return render(request, 'restaurants/detail.html', {'restaurant': rest})


def meal_request(category, price):
    category_objects = Category.objects.all()
    category_dict = list(
        set([c.category_name for c in category_objects]))
    info_objects = Info.objects.all()
    price_dict = list(set([c.price for c in info_objects]))

    result = []
    filter_objects = list(Info.objects.filter(price=price))
    for i in range(0, len(filter_objects)):
        category_list = list(filter_objects[i].category.all())
        for j in range(0, len(category_list)):
            if category == str(category_list[j]):
                result.append(filter_objects[i].name)

    output_list = []
    index = 0
    for i in result:
        target_rest = list(info_objects.filter(name=i))
        link = target_rest[0].url
        info = target_rest[0]
        index += 1
        output_list.append({"text": i, "id": index, "url": link})

    return output_list


def chatbot(request):
    output = ""
    site_user = request.session.get('site_user', 'Kyra')
    tag = request.session.get('tag', "")
    input = request.GET.get('user_text')
    info_objects = Info.objects.all()
    info_list = list(set([c.name for c in info_objects]))
    link = ""
    info = ""
    if input in info_list:
        target_rest = list(info_objects.filter(name=input))
        link = target_rest[0].url
        info = target_rest[0]
        output = f"For the restaurant {input}:"
    else:
        # meal suggestion
        category = ""
        price = ""
        if tag == "meal_suggestion":
            request.session['category'] = input
        if tag == "category":
            request.session['price'] = input

        if (request.GET.get('print_btn')):
            tag, output = getPredictions(input)
            request.session['tag'] = tag
        if request.session.__contains__('category') and request.session.__contains__('price'):
            category = request.session['category']
            price = request.session['price']

        if category != "" and price != "":
            output = meal_request(category, price)
            del request.session['category']
            del request.session['price']

    history = request.session.get('history', [])
    history.append("You: " + str(input))
    history.append("Chatbot: " + str(output))
    request.session['history'] = []
    context = {'value': output, 'tag': tag,
               'link': link, "info": info, 'history': history}
    # request.session.modified = True

    return render(request, 'restaurants/chatbot.html', context)


class RestaurantView(APIView):
    def post(self, request, format=None):
        category = request.data["category"]
        price = request.data["price"]
        output = meal_request(category, price)
        response_dict = {"output": output}
        return Response(response_dict, status=200)


class ModelPredict(APIView):
    def post(self, request, format=None):
        data = request.data["data"]
        tag, output = getPredictions(data)
        response_dict = {"tag": tag, "output": output}
        return Response(response_dict, status=200)


class NameView(generics.ListCreateAPIView):
    queryset = Info.objects.all()
    serializer_class = RestaurantsSerializer

    def get(self, request, format=None):
        info_objects = Info.objects.all()
        output_list = []
        for i in range(0, len(info_objects)):
            link = info_objects[i].url
            name = info_objects[i].name
            output_list.append({"text": name, "id": i, "url": link})
        return Response({"output": output_list}, status=200)


class SearchView(APIView):
    def post(self, request, format=None):
        data = request.data
        output = searchResult(data)
        response_dict = {"output": output}
        return Response(response_dict, status=200)
