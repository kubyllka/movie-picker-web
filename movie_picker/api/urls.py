
from django.urls import path
from .views import MovieView
from .views import TestSubmitView
from .views import get_random_movie

urlpatterns = [
    path("movies", MovieView.as_view()),
    path('submit-test/', TestSubmitView.as_view(), name='submit-test'),
    path('random_movie/', get_random_movie, name='random_movie' ),

]
