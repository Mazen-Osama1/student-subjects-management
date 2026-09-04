from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Subject(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User,on_delete=models.CASCADE)

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    subject = models.ForeignKey(Subject,on_delete=models.CASCADE)