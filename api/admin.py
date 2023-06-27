from django.contrib import admin

from .models import Building, Reservation

admin.site.register([Building, Reservation])
