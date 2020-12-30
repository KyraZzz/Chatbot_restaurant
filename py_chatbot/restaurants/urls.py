from django.urls import path
from rest_framework import routers
from . import views

# restaurants/
# restaurants/1/info

"""
router = routers.DefaultRouter()                      # add this
router.register(r'frontend', views.RestaurantView,
                'front')     # add this
"""

urlpatterns = [
    path('', views.index, name="restaurants_index"),
    path('<int:restaurant_id>', views.detail, name='restaurants_detail'),
    path('chatbot', views.chatbot, name='restaurants_chatbot'),
    path('predict', views.ModelPredict.as_view(), name='predict_result'),
    path('fetch', views.RestaurantView.as_view(), name='fetch_restaurants'),
    path('name', views.NameView.as_view(), name='name_restaurants')
]
"""
urlpatterns += router.urls
"""
