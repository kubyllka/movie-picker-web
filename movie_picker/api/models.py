from django.db import models
from django.contrib.postgres.fields import ArrayField

# Creating general model that describe movie


class Genre(models.Model):
    tmdb_id = models.IntegerField()
    genre = models.CharField(max_length=100)

    def __str__(self):
        return self.genre


class Keyword(models.Model):
    tmdb_id = models.IntegerField()
    keyword = models.CharField(max_length=100)

    def __str__(self):
        return self.keyword


class Movie(models.Model):
    tmdb_id = models.IntegerField()
    title = models.CharField(max_length=100)
    overview = models.TextField()
    poster_path = models.URLField(max_length=255, null=True)
    year = models.IntegerField()
    vote_average = models.FloatField()
    genres = models.ManyToManyField(Genre)
    keywords = models.ManyToManyField(Keyword)
    trailer_link = models.URLField(max_length=255, null=True)

    def add_keywords(self, keywords):
        self.keywords.add(*keywords)
        self.save()

    def add_genres(self, genres):
        self.genres.add(*genres)
        self.save()

    class Meta:
        db_table = 'api_movie'

    def __str__(self):
        return self.title

class UserInfo(models.Model):
    nickname = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    passwd = models.CharField(max_length=50)


