from django.db import models

# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=200)
    

    def __str__(self):
        return self.category_name
    



class medicine(models.Model):
    medicine_name = models.CharField(max_length=200)
    price = models.FloatField()
    description = models.TextField()
    image = models.FileField(upload_to='medicineimg/',null=True, blank=True)
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.medicine_name
    



