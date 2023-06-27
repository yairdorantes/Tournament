from django.contrib import admin

from .models import Building, Reservation, UserModel

admin.site.register([Building, Reservation, UserModel])
