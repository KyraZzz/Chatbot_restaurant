# Generated by Django 2.1 on 2020-12-12 14:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0002_auto_20201212_1437'),
    ]

    operations = [
        migrations.AddField(
            model_name='categorymatch',
            name='restaurant',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='restaurants.Info'),
        ),
        migrations.AlterField(
            model_name='categorymatch',
            name='category',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='restaurants.Category'),
        ),
    ]
