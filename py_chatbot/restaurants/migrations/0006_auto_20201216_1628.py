# Generated by Django 3.1.4 on 2020-12-16 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0005_auto_20201216_1623'),
    ]

    operations = [
        migrations.AlterField(
            model_name='info',
            name='phone',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='price',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='rating',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='review_count',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='state',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='info',
            name='url',
            field=models.URLField(blank=True, null=True),
        ),
    ]