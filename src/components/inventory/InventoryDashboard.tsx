import React, { useState } from 'react';
import { 
  Package, Filter, AlertTriangle, Loader2, 
  Search, Grid, List, PlusCircle
} from 'lucide-react';
import ProductCard, { Product } from './ProductCard';
import AnimatedButton from '../ui/AnimatedButton';
import { toast } from 'sonner';
import api from '@/lib/apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProductFormDialog from './ProductFormDialog';

const InventoryDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  
  const queryClient = useQueryClient();
  
  // استخدام React Query لجلب المنتجات
  const { 
    data: productsResponse,
    isLoading, 
    isError,
    error
  } = useQuery({
    queryKey: ['products'],
    queryFn: api.products.getAll
  });

  // تهيئة المنتجات من الاستجابة
  const products = productsResponse?.success 
    ? productsResponse.data || [] 
    : [];
  
  // إعداد mutations لحذف المنتجات
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => api.products.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('تم حذف المنتج بنجاح');
    },
    onError: (error) => {
      toast.error(`فشل حذف المنتج: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
    }
  });
  
  // Handle product edit
  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product);
    setSelectedProduct(product);
    setFormDialogOpen(true);
  };
  
  // Handle add new product
  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setFormDialogOpen(true);
  };
  
  // Handle product delete
  const handleDeleteProduct = (id: string) => {
    console.log('Delete product:', id);
    // This would show a confirmation dialog in a real app
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProductMutation.mutate(id);
    }
  };
  
  // Filter products based on search and low stock filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.barcode.includes(searchTerm) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (showLowStockOnly) {
      return matchesSearch && product.quantity <= product.minStock;
    }
    
    return matchesSearch;
  });
  
  // Get low stock count
  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;
  
  // إظهار رسالة خطأ عند فشل جلب البيانات
  if (isError) {
    return (
      <div className="w-full px-4 py-6 text-center" style={{ direction: 'rtl' }}>
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">حدث خطأ</h2>
        <p className="text-muted-foreground mb-6">
          {error instanceof Error ? error.message : 'فشل في تحميل بيانات المخزون'}
        </p>
        <AnimatedButton 
          variant="primary"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
        >
          إعادة المحاولة
        </AnimatedButton>
      </div>
    );
  }
  
  return (
    <div className="w-full px-4 py-6" style={{ direction: 'rtl' }}>
      {/* Inventory Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            إدارة المخزون
          </h1>
          <p className="text-muted-foreground mt-1">
            إدارة المنتجات والكميات وتتبع المخزون
          </p>
        </div>
        
        <AnimatedButton
          variant="primary"
          className="flex items-center gap-2 self-end md:self-center"
          onClick={handleAddProduct}
        >
          <PlusCircle className="h-4 w-4" />
          <span>إضافة منتج</span>
        </AnimatedButton>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'إجمالي المنتجات', value: products.length, icon: <Package className="h-5 w-5 text-primary" /> },
          { 
            title: 'منتجات منخفضة المخزون', 
            value: lowStockCount, 
            icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
            highlight: lowStockCount > 0
          },
          { title: 'القيمة الإجمالية', value: `${products.reduce((sum, p) => sum + (p.cost * p.quantity), 0).toFixed(2)} ر.س`, icon: <Package className="h-5 w-5 text-primary" /> },
          { title: 'متوسط الربح', value: `${products.length > 0 ? (products.reduce((sum, p) => sum + ((p.price - p.cost) / p.price * 100), 0) / products.length).toFixed(1) : 0}%`, icon: <Package className="h-5 w-5 text-primary" /> }
        ].map((stat, i) => (
          <div 
            key={i} 
            className={`glass-panel rounded-xl p-4 border ${stat.highlight ? 'border-amber-200 bg-amber-50' : 'border-border'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : stat.value}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-input pr-10 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="بحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <AnimatedButton
            variant={showLowStockOnly ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowLowStockOnly(!showLowStockOnly)}
            className="flex items-center gap-1"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>المخزون المنخفض فقط</span>
          </AnimatedButton>
          
          <div className="border rounded-lg flex">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-secondary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('grid')}
              title="عرض شبكي"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-secondary text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('list')}
              title="عرض قائمة"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="mr-2 text-lg">جاري التحميل...</span>
        </div>
      )}
      
      {/* Products Grid */}
      {!isLoading && filteredProducts.length > 0 ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'} gap-4`}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : !isLoading && (
        <div className="text-center py-16 bg-secondary/30 rounded-xl">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">لا توجد منتجات</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm 
              ? 'لا توجد منتجات تطابق بحثك' 
              : showLowStockOnly 
                ? 'لا توجد منتجات منخفضة المخزون' 
                : 'أضف منتجات لتظهر هنا'}
          </p>
          <AnimatedButton variant="outline" className="mt-4" onClick={handleAddProduct}>
            <PlusCircle className="h-4 w-4 mr-1" />
            <span>إضافة منتج جديد</span>
          </AnimatedButton>
        </div>
      )}
      
      {/* Product Form Dialog */}
      <ProductFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        initialData={selectedProduct}
      />
    </div>
  );
};

export default InventoryDashboard;
