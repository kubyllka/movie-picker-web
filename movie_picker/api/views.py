from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.utils import json
from django.db.models import Max
from rest_framework.views import APIView
from django.http import JsonResponse
from random import randint
from .models import Movie
import json
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from .serializers import MovieSerializer
from .movie_recommendation_model import MovieRecommendationModel
import logging

logger = logging.getLogger(__name__)

# Create your views here.
class MovieView(generics.ListAPIView):
    pass
   # queryset = MovieInfo.objects.all()
    #serializer_class = MovieSerializer


class TestSubmitView(APIView):
    def post(self, request):
        try:
            data = request.session.data
            answers =  data.get('answers')
            tags = data.get('tags')

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
    max_id = Movie.objects.aggregate(max_id=Max("id"))["max_id"]
    while True:
        random_id = randint(1, max_id)
        try:
            random_movie = Movie.objects.get(id=random_id)
            break
        except Movie.DoesNotExist:
            continue

    serializer = MovieSerializer(random_movie)
    return JsonResponse(serializer.data)


@api_view(['GET', 'POST'])
def movie_test_data(request):
    if request.method == 'POST':
        movies = json.loads(request.body)
        logger.info(movies)
        rec = MovieRecommendationModel(movies)
        recommended_movies = rec.recommend_movies()
        response_data = {
            'message': 'Recommendation successful',
            'recommended_movies': recommended_movies
        }
        return JsonResponse(response_data)
    else:
        max_id = Movie.objects.aggregate(max_id=Max("id"))["max_id"]
        random_movies = []
        while len(random_movies) < 10:
            random_id = randint(1, max_id)
            try:
                random_movie = Movie.objects.get(id=random_id)
                if random_movie not in random_movies:
                    random_movies.append(random_movie)
            except Movie.DoesNotExist:
                continue
        serializer = MovieSerializer(random_movies, many=True)
        return JsonResponse(serializer.data, safe=False)



