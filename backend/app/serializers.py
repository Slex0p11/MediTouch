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

 

class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'dob', 'profile_picture']

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return self.context['request'].build_absolute_uri(obj.profile_picture.url)
        return None

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'dob', 'profile_picture']

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.dob = validated_data.get('dob', instance.dob)

        # Handle profile picture update
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data['profile_picture']

        instance.save()
        return instance

class DoctorRegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    dob = serializers.DateField()
    license_file = serializers.FileField()
    degree_file = serializers.FileField()
    specialization = serializers.CharField(max_length=100)

    def create(self, validated_data):
        # Generate unique username from email
        base_username = validated_data['email'].split('@')[0]
        username = base_username
        counter = 1
        
        # Ensure username is unique
        while CustomUser.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        # Create user
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=username,  # Use auto-generated username
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            dob=validated_data['dob'],
            is_doctor=True,
            is_user=False,
            is_admin=False  # Explicitly set admin status
        )
        
        # Create doctor profile
        doctor = Doctor.objects.create(
            user=user,
            medical_license=validated_data['license_file'],
            degree_certificate=validated_data['degree_file'],
            specialization=validated_data['specialization']
        )
        return doctor
    
class DoctorListSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.CharField(source='user.email')
    dob = serializers.DateField(source='user.dob')
    license_url = serializers.SerializerMethodField()
    degree_url = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            'id', 'first_name', 'last_name', 'email', 'dob',
            'specialization', 'license_url', 'degree_url',
            'is_verified', 'created_at'
        ]
        read_only_fields = fields

    def get_license_url(self, obj):
        if obj.medical_license:
            return self.context['request'].build_absolute_uri(obj.medical_license.url)
        return None

    def get_degree_url(self, obj):
        if obj.degree_certificate:
            return self.context['request'].build_absolute_uri(obj.degree_certificate.url)
        return None
 