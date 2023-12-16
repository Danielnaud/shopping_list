from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ListCount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    list_count = models.PositiveIntegerField(default=0)

class ShoppingList(models.Model):
    users = models.ManyToManyField(User)
    owned_by = models.CharField(max_length=200)
    name = models.CharField(max_length=200)

class ShoppingListItems(models.Model):
    list = models.ForeignKey('ShoppingList', on_delete=models.CASCADE, related_name='items')
    created_at = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    done = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField(default=1)