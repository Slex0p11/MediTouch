from django.contrib import admin
from . models import *

# Register your models here.
admin.site.register(medicine)
admin.site.register(Category)
admin.site.register(CustomUser)
admin.site.register(Doctor)
admin.site.register(Appointment)