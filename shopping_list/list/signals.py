from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import ListCount

@receiver(post_save, sender=User)
def create_list_count(sender, instance, created, **kwargs):
    if created:
        ListCount.objects.create(user=instance)
