from django.db import models
from django.contrib.auth.models import AbstractUser
from project import settings



User = settings.AUTH_USER_MODEL

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    username = models.CharField(max_length=200, unique=True)
    is_admin = models.BooleanField(default=False)
    is_user = models.BooleanField(default=True)
    is_doctor=models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)  
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    dob = models.DateField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # For doctors, set is_active based on approval status
        if self.is_doctor:
            try:
                doctor_profile = self.doctor_profile
                self.is_active = doctor_profile.is_verified
            except Doctor.DoesNotExist:
                pass
        super().save(*args, **kwargs)


# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category_name
    

class medicine(models.Model):
    medicine_name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    image = models.FileField(upload_to='medicineimg/', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.medicine_name

    

class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,  # Temporarily allow null for existing orders
        blank=True
    )
    medicine_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    image = models.URLField()
    status = models.CharField(max_length=50, default="Completed")
    prescription = models.ImageField(upload_to="prescriptions/", null=False, blank=False)   

    def __str__(self):
        return self.medicine_name
    
 
class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_profile')
    specialization = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    degree = models.CharField(max_length=100)
    nmc_no=models.IntegerField()
    is_verified = models.BooleanField(default=False)
    is_rejected = models.BooleanField(default=False)
    rejection_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {'Verified' if self.is_verified else 'Pending'}"
    
from django.db import models
from django.conf import settings

class Appointment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    email = models.EmailField()  # removed unique=True
    weeks = models.IntegerField()  # renamed from Weeks
    price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    image = models.URLField(blank=True, null=True)  # optional image field
    status = models.CharField(max_length=50, default="Completed")

    def __str__(self):
        return self.email
    
 