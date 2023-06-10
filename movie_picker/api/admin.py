from django.contrib import admin
from .models import UserInfo
from .models import Movie
from .models import Keyword
from .models import Genre
from .models import WatchLaterMovie

admin.site.register(UserInfo)
admin.site.register(Movie)
admin.site.register(Keyword)
admin.site.register(Genre)
admin.site.register(WatchLaterMovie)