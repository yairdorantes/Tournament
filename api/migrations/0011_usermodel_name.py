# Generated by Django 4.1.9 on 2023-06-27 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_usermodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='name',
            field=models.CharField(default='', max_length=300, verbose_name='Nombre'),
        ),
    ]
