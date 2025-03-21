from django.shortcuts import render
from rest_framework import generics, status
from .models import medicine, Category, User, Order
from .serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser



User = get_user_model()

# User Registration
class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerilaizer

# User Login
class LoginUser(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user:
            refreshtoken = RefreshToken.for_user(user)
            return Response({
                "email": user.email,
                "role": user.is_user,
                "refreshtoken": str(refreshtoken),
                "accesstoken": str(refreshtoken.access_token)
            })
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

# Medicine Views
class AllMedicine(generics.ListAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer

class AddMedicine(generics.CreateAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer
    # permission_classes = [IsAuthenticated, IsAdminUser]

class updateDeletemedicine(generics.RetrieveUpdateDestroyAPIView):
    queryset = medicine.objects.all()
    serializer_class = medicineSerializer
     

# Category Views
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



# Count total medicines
class MedicineCount(APIView):
    def get(self, request):
        count = medicine.objects.count()
        return Response({"total_medicines": count}, status=status.HTTP_200_OK)

# Count total categories
class CategoryCount(APIView):
    def get(self, request):
        count = Category.objects.count()
        return Response({"total_categories": count}, status=status.HTTP_200_OK)

# Count total users
class UserCount(APIView):
    def get(self, request):
        count = User.objects.count()
        return Response({"total_users": count}, status=status.HTTP_200_OK)

class DashboardStats(APIView):
    def get(self, request):
        total_medicines = medicine.objects.count()
        total_categories = Category.objects.count()
        total_users = User.objects.count()

        return Response({
            "totalMedicines": total_medicines,
            "totalCategories": total_categories,
            "totalUsers": total_users
        })
    
class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()   
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserDeleteView(APIView):
     

    def delete(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)  # Get the user by username (or another identifier)
            user.delete()  # Delete the user
            return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class UserUpdateView(APIView):
     

    def put(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Validate and update the user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderListView(APIView):
    def get(self, request):
        try:
            orders = Order.objects.all()
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = OrderSerializer(data=request.data)   
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class OrderDeleteView(APIView):
    def delete(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
            order.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Order.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        
class OrderCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get("prescription")
        if not file:
            return Response({"error": "Prescription is required"}, status=400)
        
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(prescription=file)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)