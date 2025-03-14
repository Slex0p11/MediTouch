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
    dob = models.DateField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username', 'dob' ]

    def __str__(self):
        return self.email

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
    image = models.FileField(upload_to='medicineimg/',null=True, blank=True)
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.medicine_name
    

class Order(models.Model):
    medicine_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    image = models.URLField()
    status = models.CharField(max_length=50, default="Completed")
    prescription = models.FileField(upload_to="prescriptions/", null=True, blank=False)
     
    def __str__(self):
        return self.medicine_name