from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from ..models import Movie, WatchLaterMovie
from ..serializers import MovieSerializer


class AddToWatchLaterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        movie_id = data.get('movieId')
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'message': 'Movie does not exist'}, status=400)

        user = request.user
        if WatchLaterMovie.objects.filter(user=user, movie=movie).exists():
            return Response({'message': 'Movie is already in WatchLater'}, status=400)

        WatchLaterMovie.objects.create(user=user, movie=movie)
        return Response({'message': 'Movie added to WatchLater'}, status=201)


class RemoveFromWatchLaterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        movie_id = data.get('movieId')
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'message': 'Movie does not exist'}, status=400)

        user = request.user
        WatchLaterMovie.objects.filter(user=user, movie=movie).delete()

        return Response({'message': 'Movie removed from WatchLater'}, status=200)


class WatchlistView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        watch_later_movies = WatchLaterMovie.objects.filter(user=user)
        if not watch_later_movies:
            return Response({'message': 'No movies in watchlist', 'watchlist': []})

        movie_ids = [movie.movie_id for movie in watch_later_movies]
        movies = Movie.objects.filter(id__in=movie_ids)
        serializer = MovieSerializer(movies, many=True)
        return Response({'message': 'Movie watchlist', 'watchlist': serializer.data})


class CheckFavoriteStatusView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        movie_id = data.get('movieId')
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({'message': 'Movie does not exist'}, status=400)

        user = request.user
        is_favorite = WatchLaterMovie.objects.filter(user=user, movie=movie).exists()
        return Response({'isFavorite': is_favorite})
