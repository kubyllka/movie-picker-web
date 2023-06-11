from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.utils import json
from django.db.models import Max
from rest_framework.views import APIView
from django.http import JsonResponse
from random import randint
from .models import Movie, WatchLaterMovie
import json
from .serializers import MovieSerializer
from .movie_recommendation_model import MovieRecommendationModel
import logging
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


logger = logging.getLogger(__name__)

# Create your views here.
class MovieView(generics.ListAPIView):
    pass
   # queryset = MovieInfo.objects.all()
    #serializer_class = MovieSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


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


@api_view(['GET', 'POST'])
def check_correct_log_in(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        try:
            user = User.objects.get(username=username, password=password)
            return JsonResponse({"success": True})
        except User.DoesNotExist:
            return JsonResponse({"success": False})
    else:
        return JsonResponse({"success": False})


from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'success': True
            })
        else:
            return Response({'success': False}, status=401)


@csrf_exempt
@login_required
def add_to_watch_later(request):
    if request.method == 'POST':
        data = json.loads( request.body )
        movie_id = data.get( 'movieId' )
        movie = Movie.objects.get( id=movie_id )
        user = request.user

        if WatchLaterMovie.objects.filter(user=user, movie=movie).exists():
            return JsonResponse({'message': 'Movie is already in WatchLater'}, status=400)

        WatchLaterMovie.objects.create(user=user, movie=movie)

        return JsonResponse({'message': 'Movie added to WatchLater'}, status=201)

    return JsonResponse({'message': 'Invalid request'}, status=400)


@csrf_exempt
@login_required
def remove_from_watch_later(request):
    if request.method == 'POST':
        data = json.loads( request.body )
        movie_id = data.get( 'movieId' )
        movie = Movie.objects.get( id=movie_id )
        user = request.user

        watch_later_movie = WatchLaterMovie.objects.filter(user=user, movie=movie).first()
        if not watch_later_movie:
            return JsonResponse({'message': 'Movie is not in WatchLater'}, status=400)

        watch_later_movie.delete()

        return JsonResponse({'message': 'Movie removed from WatchLater'}, status=200)

    return JsonResponse({'message': 'Invalid request'}, status=400)


@csrf_exempt
@login_required
def watchlist(request):
    if request.method == 'GET':
        user = request.user
        watch_later_movies = WatchLaterMovie.objects.filter(user=user)
        if not watch_later_movies:
            return JsonResponse({'message': 'No movies in watchlist'}, status=400)
        movie_ids = [movie.movie_id for movie in watch_later_movies]
        movies = Movie.objects.filter(id__in=movie_ids)
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse({'message': 'Movie watchlist', 'watchlist': serializer.data}, safe=False)
    return JsonResponse({'message': 'Invalid request'}, status=400)
