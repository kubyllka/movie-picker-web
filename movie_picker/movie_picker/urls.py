"""movie_picker URL Configuration

The `urlpatterns` list routes URLs to api_views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function api_views
    1. Add an import:  from my_app import api_views
    2. Add a URL to urlpatterns:  path('', api_views.home, name='home')
Class-based api_views
    1. Add an import:  from other_app.api_views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include( 'api.urls')),
    path('', include('frontend.urls'))

]
