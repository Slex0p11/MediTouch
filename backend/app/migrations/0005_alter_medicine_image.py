# Generated by Django 5.0.7 on 2024-12-15 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_remove_medicine_img_url_medicine_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicine',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='medicineimg/'),
        ),
    ]