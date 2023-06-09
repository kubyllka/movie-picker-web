
from django.urls import path
from .views import MovieView
from .views import TestSubmitView
from .views import get_random_movie
from .views import movie_test_data

urlpatterns = [
    path("movies", MovieView.as_view()),
    path('test/', movie_test_data, name='movie-test' ),
    path('result/', movie_test_data, name='movie-test' ),
    path('random_movie/', get_random_movie, name='random_movie' ),

]
