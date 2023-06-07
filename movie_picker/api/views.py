from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.utils import json
from django.db.models import Max
from rest_framework.views import APIView
from django.http import JsonResponse
from random import randint
from .models import Movie
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

def get_random_movie(request):
    # максимальний id фільму
    max_id = Movie.objects.aggregate(max_id=Max("id"))["max_id"]

    while True:
        # випадковий id фільму
        random_id = randint( 1, max_id )
        try:
            # рандомний фільм з бази даних
            random_movie = Movie.objects.get( id=random_id )
            break
        except Movie.DoesNotExist:
            # якщо фільму з таким айді не існує, продовжити генерацію нового айді
            continue

    # список жанрів фільму
    genres = [genre.genre for genre in random_movie.genres.all()]

    # список тегів фільму
    keywords = [keyword.keyword for keyword in random_movie.keywords.all()]

    # Створити JSON-відповідь з даними фільму, тегами і жанрами
    movie_data = {
        "title": random_movie.title,
        "overview": random_movie.overview,
        "poster_path": random_movie.poster_path,
        "year": random_movie.year,
        "vote_average": random_movie.vote_average,
        "trailer_link": random_movie.trailer_link,
        "genres": genres,
        "keywords": keywords
    }
    return JsonResponse(movie_data)





