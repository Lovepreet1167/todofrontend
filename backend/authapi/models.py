from django.db import models
from django.contrib.auth.models import User

class ToDo(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('done', 'Done')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
