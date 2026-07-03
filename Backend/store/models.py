from django.contrib import admin
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from uuid import uuid4



# Create your models here.
class Promotion(models.Model):
    description = models.CharField(max_length=255)
    discount = models.FloatField()
    
    def __str__(self):
        return self.description    
    
class Collection(models.Model):
    title = models.CharField(max_length=255)
    featured_product = models.ForeignKey('Product', on_delete=models.SET_NULL, null=True, related_name='+')
    
    ## By default it show objects as "Product object (1)" but we change it to show the title
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['title']
    
    
class Product(models.Model):
    slug = models.SlugField(blank=True)   
    title = models.CharField(max_length=255)
    description = models.TextField(null=True,blank=True)
    price = models.DecimalField(max_digits=6, 
                                decimal_places=2,
                                validators=[MinValueValidator(1)])                                
    inventory = models.IntegerField(
        
        validators=[MinValueValidator(1,message="Inventory must be at least 1")]
    )
    last_update = models.DateTimeField(auto_now=True)
    collection = models.ForeignKey(Collection, on_delete=models.PROTECT,related_name='product')
    promotions = models.ManyToManyField(Promotion, blank=True)
    
    ## By default it show objects as "Product object (1)" but we change it to show the title
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['title']

class Customer(models.Model):
    phone = models.CharField(max_length=20)
    birth_date = models.DateField(null=True, blank=True)
    membership = models.CharField(max_length=1, choices=[('B', 'Bronze'), ('S', 'Silver'), ('G', 'Gold')], default='B')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
            return f"{self.user.first_name} {self.user.last_name}"
        
    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name
    
    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]
    

class Order(models.Model):
    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=1, choices=[('P', 'Pending'), ('C', 'Complete'), ('F', 'Failed')], default='P')
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.customer.first_name + " " + self.customer.last_name
    
    class Meta:
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='orderitems')
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    
class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.street}, {self.city}"
    
    
class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1)]
    )
    
    class Meta:
        unique_together = [['cart', 'product']]
    
    def __str__(self):
        return f"{self.quantity} of {self.product.title}"   

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)
