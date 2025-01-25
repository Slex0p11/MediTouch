from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email' , 'username', 'first_name', 'last_name', 'dob', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
            user = User.objects.create_user(
                email =validated_data['email'],
                username =validated_data['username'],
                first_name = validated_data['first_name'],
                last_name =validated_data['last_name'],
                dob=validated_data['dob'],
                password=validated_data['password']
            )

            return user


class CategorySerialzier(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class medicineSerializer(ModelSerializer):
    class Meta:
        model = medicine
        fields = "__all__"