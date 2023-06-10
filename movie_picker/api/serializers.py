from rest_framework import serializers
from .models import Movie
from django.contrib.auth.models import User


class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    keywords = serializers.StringRelatedField(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'overview', 'poster_path', 'year', 'vote_average', 'trailer_link', 'genres', 'keywords']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user