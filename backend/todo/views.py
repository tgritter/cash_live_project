from django.shortcuts import render
from rest_framework import viewsets         
from .serializers import TodoSerializer    
from .models import Todo                     
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

class TodoView(viewsets.ModelViewSet):       
    serializer_class = TodoSerializer          
    queryset = Todo.objects.all()   

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)