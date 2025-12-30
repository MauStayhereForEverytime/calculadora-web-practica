from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import Registro
from rest_framework import status

@api_view(["GET"])
def health(request):
    return Response({"status": "ok"})


# Vista para login
@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, email=email, password=password)
    if user is not None:
        return Response({"message": "Login exitoso", "user_id": user.id})
    else:
        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)


# Vista para registro
@api_view(["POST"])
def registro_view(request):
    nombre = request.data.get("nombre")
    apellido = request.data.get("apellido")
    correo = request.data.get("correo")
    password = request.data.get("contrasena")
    User = get_user_model()
    if User.objects.filter(email=correo).exists():
        return Response({"error": "El correo ya está registrado"}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(email=correo, password=password, first_name=nombre, last_name=apellido, username=correo)
    Registro.objects.create(nombre=nombre, apellido=apellido, correo=correo, contrasena=password)
    return Response({"message": "Registro exitoso", "user_id": user.id}, status=status.HTTP_201_CREATED)