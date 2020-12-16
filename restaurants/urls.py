from django.urls import path
from . import views

# restaurants/
# restaurants/1/info

urlpatterns = [
    path('', views.index, name="restaurants_index"),
    path('<int:restaurant_id>', views.detail, name='restaurants_detail'),
    path('chatbot', views.chatbot, name='restaurants_chatbot')
]
