
from django.urls import path
from .views import MovieView
from .views import get_random_movie
from .views import movie_test_data
from .views import check_correct_log_in
from .views import LoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path("movies", MovieView.as_view()),
    path('test/', movie_test_data, name='movie-test' ),
    path('random_movie/', get_random_movie, name='random_movie' ),
    path('correctLogInfo/', LoginView.as_view(), name='correct_log_info'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]
