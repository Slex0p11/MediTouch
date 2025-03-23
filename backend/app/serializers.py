from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

# User Registration Serializer
class RegisterSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)  # Add this field

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'dob', 'password', 'profile_picture')  # Add profile_picture
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract profile_picture from validated_data
        profile_picture = validated_data.pop('profile_picture', None)

        # Create the user
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            dob=validated_data['dob'],
            password=validated_data['password']
        )

        # Save the profile picture if provided
        if profile_picture:
            user.profile_picture = profile_picture
            user.save()

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
        fields = ['id','email', 'username', 'first_name', 'last_name', 'dob' ]  # Add any other fields you want to display

# User Update Serializer (For Editing User Information)
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'dob']  # Fields allowed for update
        read_only_fields = ['username']  # Username is non-editable
    
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
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'dob', 'profile_picture']

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return self.context['request'].build_absolute_uri(obj.profile_picture.url)
        return None
