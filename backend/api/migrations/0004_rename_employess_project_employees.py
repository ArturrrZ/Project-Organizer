# Generated by Django 5.1.3 on 2024-11-21 02:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_employees_project_employess'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='employess',
            new_name='employees',
        ),
    ]
