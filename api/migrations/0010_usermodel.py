# Generated by Django 4.1.9 on 2023-06-27 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_building_image_alter_reservation_id_building'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, verbose_name='email')),
                ('password', models.CharField(max_length=100, verbose_name='contrasena')),
                ('is_admin', models.BooleanField(default=False, verbose_name='')),
            ],
        ),
    ]