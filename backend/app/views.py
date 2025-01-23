from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerilaizer

class AllMedicine(generics.ListAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer

class AddMedicine(generics.CreateAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer

class updateDeletemedicine(generics.RetrieveUpdateDestroyAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer

class AllCategory(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzier

class createCategory(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzier

class updatedeleteCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzier

class MedicineDetail(generics.RetrieveAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer
