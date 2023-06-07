from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.utils import json
#from .models import MovieInfo
#from .serializers import MovieSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
import json


# Create your views here.
class MovieView(generics.ListAPIView):
    pass
   # queryset = MovieInfo.objects.all()
    #serializer_class = MovieSerializer


class TestSubmitView(APIView):
    def post(self, request):
        # Отримання даних з POST-запиту у форматі JSON
        try:
            data = request.data  # Отримати дані замість request.body
            answers = data.get('answers')
            tags = data.get('tags')

            # Обробка даних
            # TODO: Ваш код обробки даних

            # Повернення відповіді
            response_data = {
                'message': tags
            }
            return JsonResponse(response_data)
        except json.JSONDecodeError:
            response_data = {
                'error': 'Invalid JSON payload',
            }
            return JsonResponse(response_data, status=400)







