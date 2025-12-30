from django.urls import path

from .views import health, login_view, registro_view

urlpatterns = [
    path("health/", health),
    path("login/", login_view),
    path("registro/", registro_view),
]