# Generated by Django 3.2.12 on 2022-02-14 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0005_comment_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='rating',
            field=models.SmallIntegerField(default=8),
            preserve_default=False,
        ),
    ]