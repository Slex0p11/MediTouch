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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/allmedicine', AllMedicine.as_view(), name='medicinelist'),
    path('api/category', AllCategory.as_view(), name='categorylist'),
    path('createcategory/', createCategory.as_view(), name='createCategory'),
    path('updateDeletecategory/<int:pk>/', updatedeleteCategory.as_view(), name='updateDeletecategory'),
    path('addmedicine/', AddMedicine.as_view(), name='addmedicine'),
    path('updateDeletemedicine/<int:pk>', updateDeletemedicine.as_view(), name='updateDeletemedicine'),
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
