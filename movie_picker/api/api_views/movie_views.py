from random import randint, sample
from django.db.models import Max
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.utils import json

from ..models import Movie
from ..movie_recommendation_model import MovieRecommendationModel
from ..serializers import MovieSerializer


class RandomMovieView(APIView):
    def get(self, request):
        max_id = Movie.objects.aggregate(max_id=Max("id"))["max_id"]
        max_attempts = 1000
        attempts = 0
        while attempts < max_attempts:
            random_id = randint(1, max_id)
            try:
                random_movie = Movie.objects.get(id=random_id)
                serializer = MovieSerializer(random_movie)
                return Response(serializer.data)
            except Movie.DoesNotExist:
                attempts += 1
        return Response({'message': 'No random movie found.'}, status=404)


class MovieTestDataView(APIView):
    def get(self, request):
        max_id = Movie.objects.aggregate(max_id=Max("id"))["max_id"]
        max_movies = 10
        random_ids = sample(range(1, max_id + 1), max_movies)
        random_movies = Movie.objects.filter(id__in=random_ids)
        serializer = MovieSerializer(random_movies, many=True)
        return Response(serializer.data)

    def post(self, request):
        movies = json.loads(request.body)
        rec = MovieRecommendationModel(movies)
        recommended_movies = rec.recommend_movies()
        response_data = {
            'message': 'Recommendation successful',
            'recommended_movies': recommended_movies
        }
        return Response(response_data)
