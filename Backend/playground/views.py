from itertools import product
from django.forms import DecimalField
from django.shortcuts import render
from store import models
from store.models import Collection, Customer, Order, Product,OrderItem
from django.db.models import Q,F,Value,Func,ExpressionWrapper
from django.db.models.aggregates import Count, Min, Max, Avg, Sum
from django.db.models.functions import Concat
from django.db import transaction,connection






def say_hello(request):
    with connection.cursor() as cursor:
        cursor.execute('SELECT * FROM store_product')
        rows = cursor.fetchall()
        print(rows)

    return render(request, 'hello.html', {'name': 'Huraira', 'products': rows})


# #  Raw SQL Query
# def say_hello(request):
#     query_set = Product.objects.raw('SELECT * FROM store_product')
#     return render(request, 'hello.html', {'name': 'Mosh', 'query_set': list(query_set)})


# def say_hello(request):
#     with transaction.atomic():
#         order = Order()
#         order.customer_id = 1
#         order.save()
        
#         item = OrderItem()
#         item.order = order
#         item.product_id = 1 
#         item.quantity = 1
#         item.unit_price = 10
#         item.save()


# def say_hello(request):
#     collection = Collection(pk = 11)
#     #To delete a single object
#     collection.delete()

#     #To delete multiple objects
#     Collection.objects.filter(id__gt=5).delete()
#     return render(request, 'hello.html', {'name': 'Mosh'})


# def say_hello(request):
#     collection = Collection.objects.get(pk = 11)
#     collection.featured_product = None
#     collection.save()

#     Collection.objects.filter(pk=11).update(featured_product=None)
#     return render(request, 'hello.html', {'name': 'Mosh'})



# def say_hello(request):
#     discounted_price = ExpressionWrapper(F('price') * 0.8, output_field=DecimalField())
#     query_set = Product.objects.annotate(
#         discounted_price=discounted_price
#     )
#     return render (request, 'hello.html', {'name': 'Huraira', 'query_set': query_set})


# def say_hello(request):
#     query_set = Customer.objects.annotate(orders_count=Count('order'))
#     return render (request, 'hello.html', {'name': 'Huraira', 'query_set': query_set})


# def say_hello(request):
    
    # #Longer version using Func    
    # query_set = Customer.objects.annotate(full_name=Func(F('first_name'),Value(' '),F('last_name'),function='CONCAT'))
    
    # #Shorter version using Concat
    # query_set = Customer.objects.annotate(full_name=Concat('first_name', Value(' '), 'last_name'))
    # return render(request, 'hello.html', {'name': 'Huraira', 'query_set': query_set})

# def say_hello(request):
#     query_set = Customer.objects.annotate(new_id = F('id')+1)
#     return render(request, 'hello.html', {'name': 'Huraira', 'query_set': query_set})

# def say_hello(request):
#     result = Product.objects.filter(collection_id=1).aggregate(Count('id'),min_price=Min('price'),max_price=Max('price'),avg_price=Avg('price'),total_price=Sum('price'))
#     return render(request, 'hello.html', {'name': 'Huraira', 'result': result})

# def say_hello(request):
#     query_set = Order.objects.prefetch_related('orderitem_set__product').order_by('-placed_at')[:5]
#     return render(request, 'hello.html', {'name': 'Huraira', 'orders': list(query_set)})


# def say_hello(request):
#     query_set = Order.objects.select_related('customer').order_by('-placed_at')[:5]
#     return render(request, 'hello.html', {'name': 'Huraira', 'orders': list(query_set)})


# def say_hello(request):
#     query_set = Product.objects.prefetch_related('promotions').select_related('collection').all()
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})

# def say_hello(request):
#     query_set = Product.objects.select_related('collection').all()
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})


# def say_hello(request):
#     query_set = Product.objects.only('id','title','price')
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})


# def say_hello(request):
#     query_set = Product.objects.filter(id__in=OrderItem.objects.values('product_id').distinct()).order_by('title')
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})


# def say_hello(request):
#     query_set = Product.objects.all()[:5]
#     query_set = Product.objects.values_list('id','title','collection__title')
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})



# def say_hello(request):
#     product = Product.objects.order_by('price')
#     product = Product.objects.latest('price')
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': [product]})


# def say_hello(request):
#     query_set = Product.objects.filter(Q(inventory__lt=100) & Q(price__lt=4500))
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})


# def say_hello(request):
#     query_set = Product.objects.filter(inventory__lt=100, price__lt=4500)
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})


# def say_hello(request):
#     query_set = Product.objects.all()
#     return render(request, 'hello.html', {'name': 'Huraira', 'products': list(query_set)})
