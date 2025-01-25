from django.shortcuts import render
from rest_framework import generics,status
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser


User = get_user_model()

# Create your views here.


class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerilaizer

class LoginUser(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            refreshtoken = RefreshToken.for_user(user)
            return Response({
                "email":user.email,
                "role":user.is_user,
                "refreshtoken":str(refreshtoken),
                "accesstoken":str(refreshtoken.access_token)
            })
        return Response({"error":"Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

class AllMedicine(generics.ListAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer

class AddMedicine(generics.CreateAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class updateDeletemedicine(generics.RetrieveUpdateDestroyAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class AllCategory(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzier

class createCategory(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzier
    permission_classes = [IsAuthenticated, IsAdminUser]

class updatedeleteCategory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerialzier
    permission_classes = [IsAuthenticated, IsAdminUser]

class MedicineDetail(generics.RetrieveAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer
