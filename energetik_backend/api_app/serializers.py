from rest_framework import serializers
from .models import Drink, Comment, User
from django.forms.models import model_to_dict
from django.contrib.auth import get_user_model

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ['id', 'name', 'photo_url']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['text', 'date', 'drink', 'rating']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'photo_url', 'id' ]

# умняцкий юзер
class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'first_name', 'last_name')
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active',)

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

def DrinkWithPriceSerializer(drink):

    # собираю в один объект инфу про напиток и цены на него
    prices = []
    for item in drink.priceatshop_set.all():
        d = model_to_dict(item, fields=['shop_name', 'price'])
        prices.append(d)

    serializedData = model_to_dict(drink, fields=['id', 'name', 'photo_url'])
    serializedData["prices"] = prices

    return serializedData

