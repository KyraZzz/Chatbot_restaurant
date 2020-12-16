# Generated by Django 2.1 on 2020-12-12 14:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(default=None, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='CategoryMatch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurants.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=255)),
                ('image_url', models.URLField(default=None)),
                ('is_closed', models.BooleanField(default=None)),
                ('url', models.URLField(default=None)),
                ('review_count', models.IntegerField(default=None)),
                ('rating', models.FloatField(default=None)),
                ('price', models.CharField(default=None, max_length=255)),
                ('location', models.CharField(default=None, max_length=255)),
                ('city', models.CharField(default=None, max_length=255)),
                ('zip_code', models.CharField(default=None, max_length=255)),
                ('country', models.CharField(default=None, max_length=255)),
                ('state', models.CharField(default=None, max_length=255)),
                ('phone', models.CharField(default=None, max_length=255)),
            ],
        ),
    ]
