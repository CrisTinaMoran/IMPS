from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.Interactive_Map, name='Interactive_Map'),
    path('register/', views.register, name='register'),
    path('login_page/', views.login_page, name='login_page'),
    path('logout/', views.logout_page, name='logout_page'),
    path('Interactive_Map/', views.Interactive_Map, name='Interactive_Map'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])