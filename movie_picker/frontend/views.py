from django.shortcuts import render

# Create your api_views here.

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')