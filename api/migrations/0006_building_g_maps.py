# Generated by Django 4.1.9 on 2023-06-27 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_reservation_alter_building_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='building',
            name='g_maps',
            field=models.TextField(default='', verbose_name='Google maps ubicacion'),
        ),
    ]
