from django.contrib import admin
from .models import Todo 

class TodoAdmin(admin.ModelAdmin):  
    list_display = ('description', 'due_date','state') 

# Register your models here.
admin.site.register(Todo, TodoAdmin) 
