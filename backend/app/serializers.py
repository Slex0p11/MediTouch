from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

# User Registration Serializer
class RegisterSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'dob', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            dob=validated_data['dob'],
            password=validated_data['password']
        )
        return user

# Category Serializer
class CategorySerialzier(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

# Medicine Serializer
class medicineSerializer(ModelSerializer):
    class Meta:
        model = medicine
        fields = "__all__"

# User Serializer for Listing Users (Display)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'dob', ]  # Add any other fields you want to display

# User Update Serializer (For Editing User Information)
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'dob', ]  # Fields allowed for update
        read_only_fields = ['username']  # Username is non-editable

    def update(self, instance, validated_data):
        # Custom update logic can go here if necessary
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.save()
        return instance
    
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"      