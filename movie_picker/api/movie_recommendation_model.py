from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from .models import Movie


class MovieRecommendationModel:

    def __init__(self, user_movies):
        self.movies = Movie.objects.all()
        self.user_movies = user_movies
        self.movie_vectors = self.calculate_movie_vectors()
        self.vectorizer = self.create_vectorizer()

    def calculate_movie_vectors(self):
        movie_vectors = []
        for movie in self.movies:
            genres_string = ' '.join(movie.genres) if isinstance(movie.genres, (list, tuple)) else ''
            keywords_string = ' '.join(movie.keywords) if isinstance(movie.keywords, (list, tuple)) else ''
            text = movie.overview + ' ' + genres_string + ' ' + keywords_string
            movie_vectors.append(text)

        return movie_vectors

    def create_vectorizer(self):
        vectorizer = TfidfVectorizer()
        vectors = self.movie_vectors + [user_movie['overview'] for user_movie in self.user_movies]
        vectorizer.fit(vectors)

        return vectorizer

    def recommend_movies(self):
        user_vectors = [user_movie['overview'] for user_movie in self.user_movies]
        user_vectors_tfidf = self.vectorizer.transform( user_vectors )

        similarities = cosine_similarity( user_vectors_tfidf, self.vectorizer.transform( self.movie_vectors ) )

        recommended_movies_indices = similarities.argsort( axis=1 )[:, ::-1]
        recommended_movies_indices = recommended_movies_indices.tolist()
        recommended_movies = [[{
            'id': self.movies[i].id,
            'title': self.movies[i].title,
            'overview': self.movies[i].overview,
            'poster_path': self.movies[i].poster_path,
            'year': self.movies[i].year,
            'vote_average': self.movies[i].vote_average,
            'trailer_link': self.movies[i].trailer_link,
            'genres': [str( genre ) for genre in self.movies[i].genres.all()],
            'keywords': [str( keyword ) for keyword in self.movies[i].keywords.all()]
        } for i in indices] for indices in recommended_movies_indices]

        return recommended_movies

