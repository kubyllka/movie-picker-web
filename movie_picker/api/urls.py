from django.urls import path
from django.contrib.auth import logout
from .views import (
    LoginView,
    RegistrationView,
    MovieTestDataView,
    RandomMovieView,
    RemoveFromWatchLaterView,
    AddToWatchLaterView,
    WatchlistView,
    CheckFavoriteStatusView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('test/', MovieTestDataView.as_view(), name='movie-test' ),
    path('random_movie/', RandomMovieView.as_view(), name='random_movie' ),
    path('correctLogInfo/', LoginView.as_view(), name='correct_log_info'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('remove_from_watch_later/', RemoveFromWatchLaterView.as_view(), name='remove_watchlater'),
    path('add_to_watch_later/', AddToWatchLaterView.as_view(), name='add_watchlater'),
    path('watchlist/', WatchlistView.as_view(), name='watchlist'),
    path('check_favorite_status/', CheckFavoriteStatusView.as_view(), name='check_favorite_status'),
    path('register/', RegistrationView.as_view(), name='registration'),
    path('logout/', logout, name='logout'),

]
