from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    keywords = serializers.StringRelatedField(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'overview', 'poster_path', 'year', 'vote_average', 'trailer_link', 'genres', 'keywords']

