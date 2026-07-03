from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello! My project is running successfully.")
