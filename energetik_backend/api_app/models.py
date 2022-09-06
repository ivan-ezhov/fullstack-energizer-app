from django.db import models

# Create your models here.

class Drink(models.Model): 
    name = models.CharField(max_length=50)
    description = models.TextField()
    photo_url = models.CharField(max_length=400)

    def __str__(self):
        return self.name

SHOP_CHOICES = (
        ('PYATEROCHKA', 'pyaterochka'),
        ('LENTA', 'lenta'),
        ('MAGNIT','magnit')
)

class PriceAtShop(models.Model):
    shop_name = models.CharField(max_length=15, choices=SHOP_CHOICES)
    price = models.SmallIntegerField()
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)

class User(models.Model):
    username = models.CharField(max_length=15)
    photo_url = models.CharField(max_length=400)
    bio = models.TextField(max_length=140)

    def __str__(self):
        return self.username

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=140)
    rating = models.SmallIntegerField()
    date = models.DateTimeField(auto_now = True)
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)

