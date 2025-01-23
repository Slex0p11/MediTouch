from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email' , 'username', 'first_name', 'lastname', 'dob', 'password']


class CategorySerialzier(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class medicineSerializer(ModelSerializer):
    class Meta:
        model = medicine
        fields = "__all__"