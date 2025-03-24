from django.shortcuts import render,get_object_or_404
from rest_framework import generics, status
from .models import medicine, Category, User, Order,CartItem
from .serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser



User = get_user_model()

# User Registration
class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = []  # No authentication required
    parser_classes = [MultiPartParser, FormParser]  # Add this line

# User Login
class LoginUser(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)

        if user:
            refreshtoken = RefreshToken.for_user(user)
            user_data = RegisterSerializer(user).data  # Serialize user data
            return Response({
                "user": user_data,  # Send all user details
                "refreshtoken": str(refreshtoken),
                "accesstoken": str(refreshtoken.access_token),
            })
        return Response({"error": "Invalid Credentials"}, status=400)

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
    def delete(self, request, id, *args, **kwargs):  # Change 'username' to 'id'
        try:
            user = User.objects.get(id=id)  # Get the user by ID
            user.delete()  # Delete the user
            return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class UserUpdateView(APIView):
    def put(self, request, id, *args, **kwargs):  # Change 'username' to 'id'
        try:
            user = User.objects.get(id=id)  # Get the user by ID
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
    
def get_cart_items(request):
    cart_items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

def add_to_cart(request):
    user = request.user
    medicine_id = request.data.get("medicine_id")
    quantity = request.data.get("quantity", 1)

    cart_item, created = CartItem.objects.get_or_create(
        user=user, medicine_id=medicine_id, defaults={"quantity": quantity}
    )
    if not created:
        cart_item.quantity += quantity
        cart_item.save()

    return Response({"message": "Added to cart successfully!"})

def remove_from_cart(request, cart_item_id):
    try:
        cart_item = CartItem.objects.get(id=cart_item_id, user=request.user)
        cart_item.delete()
        return Response({"message": "Item removed from cart"})
    except CartItem.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def put(self, request):  # Allow user profile updates
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

class UserProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully", "data": serializer.data}, status=200)
        return Response(serializer.errors, status=400)