from django.db import models
from django.conf import settings

class User(models.Model):
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=20)

class Todo(models.Model):
    StateType = (
        ('todo', 'Todo'),
        ('in-progress', 'In Progress'),
        ('done', 'Done')
    )
    description = models.CharField(max_length=500)
    due_date = models.DateField()
    state = models.CharField(blank=True, max_length=12, choices=StateType)

    def _str_(self):

        return self.description

