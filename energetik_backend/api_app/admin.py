from django.contrib import admin
from .models import Comment, Drink, PriceAtShop, User

# Register your models here.

@admin.register(PriceAtShop)
class PriceAtShopModel(admin.ModelAdmin):
    list_display = ('shop_name', 'price', 'drink')

@admin.register(Drink)
class DrinkModel(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(User)
class User(admin.ModelAdmin):
    list_display = ('id', 'username')

@admin.register(Comment)
class Comment(admin.ModelAdmin):
    list_display = ('drink', 'user', 'rating', 'text')
