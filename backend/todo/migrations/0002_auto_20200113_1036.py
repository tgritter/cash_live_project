# Generated by Django 3.0.2 on 2020-01-13 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='description',
            field=models.CharField(max_length=500),
        ),
    ]
