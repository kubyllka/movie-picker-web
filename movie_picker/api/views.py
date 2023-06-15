from rest_framework.utils import json
from django.db.models import Max
from rest_framework.views import APIView
from django.http import JsonResponse
from random import randint
from .models import Movie, WatchLaterMovie
from .serializers import MovieSerializer, UserSerializer
from .movie_recommendation_model import MovieRecommendationModel
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class RegistrationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'success': True
                })
            return Response({'message': 'User registered successfully.', 'success': True})
        return Response({'message': serializer.errors, 'success': False})


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


class CheckCorrectLogInView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        try:
            user = User.objects.get(username=username, password=password)
            return JsonResponse({"success": True})
        except User.DoesNotExist:
            return JsonResponse({"success": False})

class AddToWatchLaterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = json.loads(request.body)
        movie_id = data.get('movieId')
        movie = Movie.objects.get(id=movie_id)
        user = request.user
        if WatchLaterMovie.objects.filter(user=user, movie=movie).exists():
            return JsonResponse({'message': 'Movie is already in WatchLater'}, status=400)
        WatchLaterMovie.objects.create(user=user, movie=movie)
        return JsonResponse({'message': 'Movie added to WatchLater'}, status=201)


class RemoveFromWatchLaterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = json.loads(request.body)
        movie_id = data.get('movieId')
        movie = Movie.objects.get(id=movie_id)
        user = request.user
        watch_later_movie = WatchLaterMovie.objects.filter(user=user, movie=movie).first()
        if not watch_later_movie:
            return JsonResponse({'message': 'Movie is not in WatchLater'}, status=400)

        watch_later_movie.delete()

        return JsonResponse({'message': 'Movie removed from WatchLater'}, status=200)



class WatchlistView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        watch_later_movies = WatchLaterMovie.objects.filter(user=user)
        if not watch_later_movies:
            return JsonResponse({'message': 'No movies in watchlist'}, status=400)
        movie_ids = [movie.movie_id for movie in watch_later_movies]
        movies = Movie.objects.filter(id__in=movie_ids)
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse({'message': 'Movie watchlist', 'watchlist': serializer.data}, safe=False)


class CheckFavoriteStatusView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = json.loads(request.body)
        movie_id = data.get('movieId')
        movie = Movie.objects.get(id=movie_id)
        user = request.user
        if WatchLaterMovie.objects.filter(user=user, movie=movie).exists():
            return JsonResponse({'isFavorite': True})
        else:
            return JsonResponse({'isFavorite': False})


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