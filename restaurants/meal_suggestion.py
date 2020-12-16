from .models import Category, Info
from django.db.models import Q


def request():
    inform_slots = {"category": [], "price": []}
    request_slots = {"category": [], "price": []}
    category_objects = Category.objects.all()
    category_dict = list(
        set([c.category_name for c in category_objects]))
    info_objects = Info.objects.all()
    price_dict = list(set([c.price for c in info_objects]))

    while len(request_slots) != 0:
        if "category" in request_slots.keys():
            while True:
                print(
                    "What kind of food categories do you prefer?(i.e., British, Chinese, Fast Food, Korean...)")
                user_input = input("You: ")
                if user_input in category_dict:
                    break

            inform_slots["category"].append(user_input)
            request_slots.pop("category", None)
        elif "price" in request_slots.keys():
            while True:
                print(
                    "What kind of price range are you considering?(i.e., £, ££ or £££)")
                user_input = input("You: ")
                if user_input in price_dict:
                    break
            inform_slots["price"].append(user_input)
            request_slots.pop("price", None)

    result = []
    filter_objects = list(Info.objects.filter(price=inform_slots["price"][0]))
    for i in range(0, len(filter_objects)):
        category_list = list(filter_objects[i].category.all())
        for j in range(0, len(category_list)):
            if inform_slots["category"][0] == str(category_list[j]):
                print(filter_objects[i].name)
                result.append(filter_objects[i].name)

    return "Here are some restaurants that you may want to consider: " + ', '.join([i for i in result])
