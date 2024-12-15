from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *

class CategorySerialzier(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class medicineSerializer(ModelSerializer):
    class Meta:
        model = medicine
        fields = "__all__"