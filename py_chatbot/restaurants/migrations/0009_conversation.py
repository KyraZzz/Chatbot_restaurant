# Generated by Django 3.1.4 on 2020-12-24 12:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0008_delete_categorymatch'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_text', models.CharField(max_length=255)),
                ('date_posted', models.DateTimeField()),
            ],
        ),
    ]