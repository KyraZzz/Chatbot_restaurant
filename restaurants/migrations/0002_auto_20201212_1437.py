# Generated by Django 2.1 on 2020-12-12 14:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='categorymatch',
            old_name='category_id',
            new_name='category',
        ),
        migrations.RemoveField(
            model_name='info',
            name='image_url',
        ),
    ]
