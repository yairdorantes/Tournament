# Generated by Django 4.1.9 on 2023-06-27 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_building_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500, verbose_name='nombre')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('company', models.CharField(max_length=100, verbose_name='compania')),
                ('date', models.DateField(verbose_name='Fecha')),
                ('type', models.CharField(max_length=50, verbose_name='Tipo')),
                ('space', models.IntegerField(verbose_name='Ocupantes')),
                ('hr_start', models.CharField(max_length=10, verbose_name='Hora inicio')),
                ('hr_end', models.CharField(max_length=10, verbose_name='Hora final')),
                ('price', models.FloatField(verbose_name='Precio')),
                ('pdf', models.TextField(verbose_name='pdf')),
            ],
        ),
        migrations.AlterField(
            model_name='building',
            name='price',
            field=models.FloatField(default=117, verbose_name='Precio'),
        ),
    ]