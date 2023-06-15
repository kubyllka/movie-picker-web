from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..models import Movie, WatchLaterMovie
from ..serializers import MovieSerializer


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
