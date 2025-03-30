"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import*
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', UserListView.as_view(), name='user-list'),
    path('users/delete/<int:id>/', UserDeleteView.as_view(), name='user-delete'),
    path('users/update/<int:id>/', UserUpdateView.as_view(), name='user-update'),
    path('api/user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/user/profile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
     
    # User Authentication
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    

    # Medicine APIs
    path('api/allmedicine/', AllMedicine.as_view(), name='medicinelist'),
    path('addmedicine/', AddMedicine.as_view(), name='addmedicine'),
    path('updateDeletemedicine/<int:pk>/', updateDeletemedicine.as_view(), name='updateDeletemedicine'),
    path('medicine/<int:pk>/', MedicineDetail.as_view(), name='medicinedetail'),  
    path('api/orders/', OrderListView.as_view(), name='order-list'),
    path('api/orders/<int:order_id>/delete/', OrderDeleteView.as_view(), name='delete_order'),
    path("order/", OrderCreateView.as_view(), name="create_order"),

    # Category APIs
    path('api/category/', AllCategory.as_view(), name='categorylist'),
    path('createcategory/', createCategory.as_view(), name='createCategory'),
    path('updateDeletecategory/<int:pk>/', updatedeleteCategory.as_view(), name='updateDeletecategory'),

    # Count APIs
    path('api/medicines/count/', MedicineCount.as_view(), name='medicine-count'),
    path('api/categories/count/', CategoryCount.as_view(), name='category-count'),
    path('api/users/count/', UserCount.as_view(), name='user-count'),
    path('api/dashboard-stats/', DashboardStats.as_view(), name='dashboard-stats'),


    # Token Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    #Appointment
    path('api/doctors/register/', DoctorRegisterView.as_view(), name='doctor-register'),
    path('api/admin/doctors/pending/', PendingDoctorsView.as_view(), name='pending-doctors'),
    path('api/admin/doctors/approve/<int:doctor_id>/', ApproveDoctorView.as_view(), name='approve-doctor'),
]

# Serve media files in development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)