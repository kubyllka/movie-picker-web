
from django.urls import path
from .views import MovieView
from .views import TestSubmitView

urlpatterns = [
    path("movies", MovieView.as_view()),
    path('submit-test/', TestSubmitView.as_view(), name='submit-test'),

]
