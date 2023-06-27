import email
from django.db import models


# Create your models here.
class Building(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre edificio")
    description = models.CharField(max_length=100, verbose_name="Descripción edificio")
    location = models.CharField(max_length=100, verbose_name="Ubicacion")
    available = models.BooleanField(default=True, verbose_name="Disponible")
    type = models.CharField(
        max_length=100, default="office", verbose_name="tipo edificio"
    )
    capacity = models.IntegerField(default=100, verbose_name="Alojamiento")
    space = models.FloatField(default=100, verbose_name="espacio")
    price = models.FloatField(default=117, verbose_name="Precio")
    g_maps = models.TextField(default="", verbose_name="Google maps ubicacion")
    image = models.TextField(default="", verbose_name="Imagen")

    def __str__(self) -> str:
        return self.name


class UserModel(models.Model):
    name = models.CharField(max_length=300, default="", verbose_name="Nombre")

    email = models.EmailField(verbose_name="email")
    city = models.CharField(max_length=100, default="", verbose_name="Ciudad")
    password = models.CharField(max_length=100, verbose_name="contrasena")
    is_admin = models.BooleanField(default=False, verbose_name="")

    def __str__(self) -> str:
        return self.name


class Reservation(models.Model):
    id_building = models.IntegerField(default=0, verbose_name="id edificio")
    name = models.CharField(max_length=500, verbose_name="nombre")
    email = models.EmailField(verbose_name="Email")
    company = models.CharField(max_length=100, verbose_name="compania")
    date = models.DateField(verbose_name="Fecha")
    type = models.CharField(max_length=50, verbose_name="Tipo")
    num_people = models.CharField(max_length=20, verbose_name="Ocupantes")
    hr_start = models.CharField(max_length=10, verbose_name="Hora inicio")
    hr_end = models.CharField(max_length=10, verbose_name="Hora final")
    price = models.FloatField(verbose_name="Precio")
    pdf = models.TextField(verbose_name="pdf")
    id_user = models.PositiveIntegerField(verbose_name="usuario", default=0)

    def __str__(self) -> str:
        return self.name
