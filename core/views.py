from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegistrationForm
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username=form.cleaned_data.get('username')
            password=form.cleaned_data.get('password1')
            user=User.objects.get(username=username)
            login(request, user)
            return redirect('login_page')
    else:
        form = UserRegistrationForm()
    return render(request, 'register.html', {'form': form})


def login_page(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('Interactive_Map')
    else:
        form = AuthenticationForm()
    return render(request, 'login_page.html', {'form': form})

def logout_page(request):
    logout(request)
    return redirect('login_page')

@login_required
def Interactive_Map(request):
    return render(request, 'Interactive_Map.html')