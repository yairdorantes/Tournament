# Generated by Django 4.1.9 on 2023-06-27 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_reservation_num_people'),
    ]

    operations = [
        migrations.AddField(
            model_name='building',
            name='image',
            field=models.TextField(default='', verbose_name='Imagen'),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='id_building',
            field=models.IntegerField(default=0, verbose_name='id edificio'),
        ),
    ]
