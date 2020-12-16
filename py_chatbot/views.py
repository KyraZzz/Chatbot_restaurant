from django.shortcuts import render
from django.http import HttpResponse


def home(request, *args, **kwargs):
    context = {
        "text": "This is an output.",
        "question": "This is a question for you."
    }
    # render something django template
    return render(request, 'home.html', context)
