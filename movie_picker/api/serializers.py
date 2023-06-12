from rest_framework import serializers
from .models import Movie
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    keywords = serializers.StringRelatedField(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'overview', 'poster_path', 'year', 'vote_average', 'trailer_link', 'genres', 'keywords']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            validate_email(data['email'])
        except ValidationError:
            raise serializers.ValidationError({'email': 'Invalid email'})

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': "Passwords don't match"})

        if User.objects.filter( username=data['username']).exists():
            raise serializers.ValidationError({'username': 'Username already exists. Try to log in!'})

        if User.objects.filter( email=data['email']).exists():
            raise serializers.ValidationError({'email': 'Email already exists. Try to log in!'})

        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'username', 'password', 'confirm_password']
