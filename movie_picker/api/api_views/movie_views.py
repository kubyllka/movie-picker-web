from random import randint
from rest_framework.utils import json
from django.db.models import Max
from django.http import JsonResponse
from rest_framework.views import APIView

from ..models import Movie
from ..movie_recommendation_model import MovieRecommendationModel
from ..serializers import MovieSerializer


class RandomMovieView(APIView):
    def get(self, request):
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


class MovieTestDataView(APIView):
    def get(self, request):
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

    def post(self, request):
        movies = json.loads(request.body)
        rec = MovieRecommendationModel(movies)
        recommended_movies = rec.recommend_movies()
        response_data = {
            'message': 'Recommendation successful',
            'recommended_movies': recommended_movies
        }
        return JsonResponse(response_data)