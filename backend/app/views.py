from django.shortcuts import render,get_object_or_404
from rest_framework import generics, status, permissions
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.mail import send_mail
from .email import send_doctor_approval_email,send_doctor_rejection_email
from django.utils import timezone 



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
            # Check if user is approved (active)
            if not user.is_active:
                if user.is_doctor:
                    return Response({
                        "error": "Your account is pending approval. Please wait for admin approval."
                    }, status=status.HTTP_403_FORBIDDEN)
                return Response({
                    "error": "Your account is inactive."
                }, status=status.HTTP_403_FORBIDDEN)
                
            refreshtoken = RefreshToken.for_user(user)
            user_data = RegisterSerializer(user).data
            
            # Add role information to the response
            role = "doctor" if user.is_doctor else ("admin" if user.is_admin else "user")
            user_data['role'] = role
            
            return Response({
                "user": user_data,
                "refreshtoken": str(refreshtoken),
                "accesstoken": str(refreshtoken.access_token),
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
        count = User.objects.exclude(
            is_doctor=True,
            doctor_profile__is_verified=False
        ).count()
        return Response({"total_users": count}, status=status.HTTP_200_OK)

class DashboardStats(APIView):
    def get(self, request):
        total_medicines = medicine.objects.count()
        total_categories = Category.objects.count()
        total_users = User.objects.exclude(
            is_doctor=True,
            doctor_profile__is_verified=False
        ).count()

        return Response({
            "totalMedicines": total_medicines,
            "totalCategories": total_categories,
            "totalUsers": total_users
        })
    
class UserListView(APIView):
    def get(self, request):
        # Get all users except unapproved doctors
        users = User.objects.exclude(
            is_doctor=True,
            doctor_profile__is_verified=False
        )
        
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
    def put(self, request, id, *args, **kwargs):  
        try:
            user = User.objects.get(id=id)   
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
        try:
            if 'prescription' not in request.FILES:
                return Response({"error": "Prescription file is required"}, status=400)
            
            # Automatically associate the logged-in user
            data = request.data.copy()
            data['user'] = request.user.id
            
            serializer = OrderSerializer(data=data)
            if serializer.is_valid():
                # Save with the prescription file and user
                order = serializer.save(
                    prescription=request.FILES['prescription'],
                    user=request.user
                )
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )
    
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
    

class DoctorRegisterView(APIView):
    def post(self, request):
        serializer = DoctorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Doctor registration submitted for admin approval.You will be notified via provided Email."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PendingDoctorsView(APIView):
     

    def get(self, request):
        pending_doctors = Doctor.objects.filter(is_verified=False,is_rejected=False).select_related('user')
        serializer = DoctorListSerializer(
            pending_doctors, 
            many=True,
            context={'request': request}
        )
        return Response({
            'status': 'success',
            'count': pending_doctors.count(),
            'doctors': serializer.data
        })

class ApproveDoctorView(APIView):
    def patch(self, request, doctor_id):
        try:
            doctor = Doctor.objects.get(id=doctor_id, is_verified=False)
        except Doctor.DoesNotExist:
            return Response(
                {'error': 'Doctor not found or already approved'},
                status=status.HTTP_404_NOT_FOUND
            )

        doctor.is_verified = True
        doctor.save()
        
        # Send approval email
        try:
            send_doctor_approval_email(
                doctor_email=doctor.user.email,
                doctor_name=f"{doctor.user.first_name} {doctor.user.last_name}"
            )
        except Exception as e:
            # Log the error but don't fail the request
            print(f"Failed to send approval email: {str(e)}")
        
        return Response({
            'status': 'success',
            'message': 'Doctor approved successfully and notification email sent',
            'doctor': DoctorListSerializer(doctor, context={'request': request}).data
        })
    
class RejectDoctorView(APIView):
    def patch(self, request, doctor_id):
        try:
            doctor = Doctor.objects.get(id=doctor_id, is_verified=False, is_rejected=False)
        except Doctor.DoesNotExist:
            return Response(
                {'error': 'Doctor not found or already processed'},
                status=status.HTTP_404_NOT_FOUND
            )

        rejection_reason = request.data.get('rejection_reason', '')
        if not rejection_reason:
            return Response(
                {'error': 'Rejection reason is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        doctor.is_rejected = True
        doctor.rejection_reason = rejection_reason
        doctor.save()
        
        # Send rejection email
        try:
            send_doctor_rejection_email(
                doctor_email=doctor.user.email,
                doctor_name=f"{doctor.user.first_name} {doctor.user.last_name}",
                rejection_reason=rejection_reason
            )
            email_status = 'Rejection email sent'
        except Exception as e:
            print(f"Failed to send rejection email: {str(e)}")
            email_status = 'Failed to send rejection email'
        
        return Response({
            'status': 'success',
            'message': 'Doctor registration rejected',
            'email_status': email_status,
            'doctor': DoctorListSerializer(doctor, context={'request': request}).data
        })
    
class ApprovedDoctorsView(generics.ListAPIView):
    serializer_class = DoctorListSerializer
    queryset = Doctor.objects.filter(is_verified=True)
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        
        return Response({
            'status': 'success',
            'count': queryset.count(),
            'approved_doctors': serializer.data
        })
 
    
class DoctorDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            doctor = Doctor.objects.get(id=id)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=404)
        
class DoctorLoginView(APIView):
    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Authenticate the user
        user = authenticate(request, email=email, password=password)
        
        if not user:
            return Response(
                {"error": "Invalid credentials"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Check if user is actually a doctor
        if not user.is_doctor:
            return Response(
                {"error": "Only doctors can login here"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if doctor is approved
        try:
            if not user.doctor_profile.is_verified:
                return Response(
                    {
                        "error": "Your account is pending approval",
                        "detail": "Please wait for admin approval before logging in"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        refresh['role'] = 'doctor'  # Add role claim to token
        user_data = UserSerializer(user).data
        
        return Response({
            "user": user_data,
            "refresh": str(refresh),
            "access": str(refresh.access_token), 
            "role": "doctor"   
        })
    
class DoctorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_doctor:
            return Response(
                {"error": "Only doctors can access this endpoint"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            doctor_profile = request.user.doctor_profile
            serializer = DoctorUserSerializer(request.user)
            return Response(serializer.data)
        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        
class DoctorDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        if not request.user.is_doctor:
            return Response(
                {"error": "Only doctors can access this endpoint"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            doctor_profile = request.user.doctor_profile
            appointments = Appointment.objects.filter(user=request.user)
            
            # Get today's date for filtering
            today = timezone.now().date()
            
            data = {
                "doctor": DoctorSerializer(doctor_profile).data,
                "stats": {
                    "total_appointments": appointments.count(),
                    "pending_appointments": appointments.filter(status="Pending").count(),
                    "completed_appointments": appointments.filter(status="Completed").count(),
                },
                "upcoming_appointments": AppointmentSerializer(
                    appointments.filter(date__gte=today).order_by('date', 'time')[:5],
                    many=True
                ).data
            }
            
            return Response(data)
            
        except Doctor.DoesNotExist:
            return Response(
                {"error": "Doctor profile not found. Please complete your profile."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from .models import Appointment
from .serializers import AppointmentSerializer
from django.db import IntegrityError

class AppointmentCreateView(CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            return Response({"error": "Appointment could not be created. Possibly a duplicate or invalid data."},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated  # Optional
from .models import Appointment
from .serializers import AppointmentSerializer

class AppointmentListView(ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from .serializers import AppointmentSerializer
from .email import send_appointment_approval_email


class ApproveAppointmentView(APIView):
    def post(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
            appointment.status = "Approved"
            appointment.save()

            user = appointment.user
            send_appointment_approval_email(
                user_email=appointment.email,
                user_name=f"{user.first_name} {user.last_name}" if user else "User"
            )

            return Response({"message": "Appointment approved and email sent."}, status=200)

        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)

class DeleteAppointmentView(APIView):
    def delete(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
            appointment.delete()
            return Response({"message": "Appointment deleted."}, status=204)

        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)