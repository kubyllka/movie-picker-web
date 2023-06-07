
from django.core.management.base import BaseCommand
from ...tmdb_api import fetch_movie_details


class Command(BaseCommand):
    help = 'Fetches movie details'

    def handle(self, *args, **options):
        fetch_movie_details()
