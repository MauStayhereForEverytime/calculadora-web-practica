
from django.db import models
from django.contrib.auth.models import AbstractUser


# Modelo personalizado de usuario para login y registro

# Modelo personalizado de usuario para login y registro
class User(AbstractUser):
	email = models.EmailField(unique=True)
	first_name = models.CharField(max_length=30)
	last_name = models.CharField(max_length=30)
	# La contraseña ya está incluida en AbstractUser

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

	def __str__(self):
		return self.email


# Modelo para almacenar datos de registro (opcional, si quieres guardar el registro explícitamente)
class Registro(models.Model):
	nombre = models.CharField(max_length=30)
	apellido = models.CharField(max_length=30)
	correo = models.EmailField(unique=True)
	contrasena = models.CharField(max_length=128)  # Debe ser encriptada si se usa
	fecha_registro = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.nombre} {self.apellido} - {self.correo}"
