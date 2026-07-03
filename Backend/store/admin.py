from django.contrib import admin 
from django.db.models import Count
from django.utils.html import format_html,urlencode
from django.urls import reverse
from .import models

# Register your models here.
class inventoryFilter(admin.SimpleListFilter):
    title = 'inventory'
    parameter_name = 'inventory'
    
    def lookups(self, request, model_admin):
        return [
            ('<40', 'Low'),
            ('>=40', 'OK'),
            
        ]
        
    def queryset(self, request, queryset):
        if self.value() == '<40': 
            return queryset.filter(inventory__lt=40)
        if self.value() == '>=40':
            return queryset.filter(inventory__gte=40)


@admin.register(models.Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'products_count']  
    search_fields = ['title']
    
    @admin.display(ordering='products_count')
    def products_count(self, collection):
        
        url = reverse('admin:store_product_changelist') +'?' + urlencode({'collection__id': str(collection.id)})
        return format_html('<a href = "{}">{}</a>', url, collection.products_count)

        
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            products_count=Count('product')
        )
        

@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['collection']
    prepopulated_fields = {'slug': ['title']}
    actions = ['clear_inventory']
    list_display = ['title', 'price', 'inventory_status', 'collection_title']
    list_editable = ['price', ]
    search_fields = ['title']
    list_filter = ['collection','last_update',inventoryFilter]    
    list_select_related = ['collection']
    
    @admin.display(ordering='collection__title')
    def collection_title(self, product):
        return product.collection.title
    
    @admin.display(ordering='inventory')
    def inventory_status(self, product):
        if product.inventory < 40:
            return "Low"
        return "OK"
    
    @admin.action(description='Clear inventory')
    def clear_inventory(self, request, queryset):
        updated_count = queryset.update(inventory=0)
        self.message_user(
            request,
            f'{updated_count} products were successfully updated.'
        )

admin.site.register(models.Promotion)

@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'membership', 'orders']
    list_editable = ['membership']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']
    list_per_page = 5

    @admin.display(ordering='orders_count')
    def orders(self, customer):
        url = reverse('admin:store_order_changelist') + '?' + urlencode({
            'customer__id': str(customer.id)
        })
        return format_html('<a href="{}">{}</a>', url, customer.orders_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )
    

class OrderItemInline(admin.TabularInline):
    model = models.OrderItem
    min_num = 1
    max_num = 10
    autocomplete_fields = ['product']
    extra = 0

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'placed_at', 'customer']
    autocomplete_fields = ['customer']
    inlines = [OrderItemInline]


admin.site.register(models.OrderItem)   
admin.site.register(models.Address)
admin.site.register(models.Cart)
admin.site.register(models.CartItem)
