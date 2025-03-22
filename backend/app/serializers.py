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
        fields = ['id', 'category_name'] 

# Medicine Serializer
class medicineSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name', read_only=True)  # Fetch category_name from related Category model

    class Meta:
        model = medicine
        fields = ['id','category','medicine_name','category_name', 'price','description','image','created_at','updated_at']


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

class CartItemSerializer(serializers.ModelSerializer):
    medicine_name = serializers.ReadOnlyField(source="medicine.medicine_name")
    price = serializers.ReadOnlyField(source="medicine.price")
    image = serializers.ReadOnlyField(source="medicine.image.url")

    class Meta:
        model = CartItem
        fields = ["id", "medicine", "medicine_name", "quantity", "price", "image"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'username', 'dob', 'profile_picture']

