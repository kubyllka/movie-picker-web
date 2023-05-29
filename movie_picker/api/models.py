from django.db import models


# Creating general model that describe movie
class Movie(models.Model):
    title = models.CharField(max_length=255)
    overview = models.TextField()
    poster_path = models.CharField(max_length=255)
    release_date = models.DateField()
    vote_average = models.FloatField()
    genres = models.CharField(max_length=255)

