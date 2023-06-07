import requests
from .models import Movie
from .models import Keyword
from .models import Genre

# API-ключ TMDb
api_key = "fe8f0ac0a3d28301a5a540414d3052a2"

def fetch_movie_details():
    # URL запиту до TMDb API для отримання деталей фільмів
    url = f'https://api.themoviedb.org/3/movie/top_rated?api_key={api_key}&page=5'


    try:
        # Виконання запиту до TMDb API
        response = requests.get(url)
        data = response.json()

        # Отримання списку фільмів
        movies = data['results']

        for movie_data in movies:
            # Отримання необхідних даних про фільм
            movie_id = movie_data['id']

            # Перевірка, чи фільм вже існує в базі даних за tmdb_id
            if Movie.objects.filter(tmdb_id=movie_id).exists():
                continue  # Фільм вже існує, переходимо до наступного

            title = movie_data['title']
            overview = movie_data['overview']
            poster_path = f"https://image.tmdb.org/t/p/w500{movie_data['poster_path']}"
            year = int(movie_data['release_date'].split('-')[0])
            vote_average = movie_data['vote_average']
            trailer_link = get_trailer_link(movie_id)  # Отримання посилання на трейлер

            # Отримання жанрів для фільму
            genre_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}'
            genre_response = requests.get( genre_url )
            genre_data = genre_response.json()
            genres = genre_data['genres']

            # Отримання ключових слів для фільму
            keyword_url = f'https://api.themoviedb.org/3/movie/{movie_id}/keywords?api_key={api_key}'
            keyword_response = requests.get( keyword_url )
            keyword_data = keyword_response.json()
            keywords = keyword_data['keywords']

            # Створення об'єкта Movie та збереження його в базу даних
            movie = Movie.objects.create(
                tmdb_id=movie_id,
                title=title,
                overview=overview,
                poster_path=poster_path,
                year=year,
                vote_average=vote_average,
                trailer_link=trailer_link
            )

            # Додавання жанрів до фільму
            for genre_data in genres:
                genre_tmdb_id = genre_data['id']
                genre_name = genre_data['name']
                genre, _ = Genre.objects.get_or_create( tmdb_id=genre_tmdb_id, genre=genre_name )
                movie.genres.add( genre )

            # Додавання ключових слів до фільму
            for keyword_data in keywords:
                keyword_tmdb_id = keyword_data['id']
                keyword_name = keyword_data['name']
                keyword, _ = Keyword.objects.get_or_create(tmdb_id=keyword_tmdb_id, keyword=keyword_name )
                movie.keywords.add( keyword )

    except requests.exceptions.RequestException:
        return  # Помилка запиту до API


def get_trailer_link(movie_id):

    # URL запиту до TMDb API для отримання посилання на трейлер фільму
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key={api_key}'

    try:
        # Виконання запиту до TMDb API
        response = requests.get(url)
        data = response.json()

        # Перевірка наявності трейлера
        if data['results']:
            trailer_key = data['results'][0]['key']
            return f'https://www.youtube.com/watch?v={trailer_key}'

    except requests.exceptions.RequestException:
        pass

    return None