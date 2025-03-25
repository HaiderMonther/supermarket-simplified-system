
import React, { useState } from 'react';
import { 
  Package, Filter, SortAsc, SortDesc, Grid, List, PlusCircle, 
  Search, AlertTriangle 
} from 'lucide-react';
import ProductCard, { Product } from './ProductCard';
import AnimatedButton from '../ui/AnimatedButton';

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'حليب كامل الدسم',
    barcode: '6210000123451',
    price: 5.99,
    cost: 4.20,
    quantity: 45,
    category: 'ألبان',
    minStock: 10
  },
  {
    id: '2',
    name: 'أرز بسمتي',
    barcode: '6210000123452',
    price: 29.99,
    cost: 22.50,
    quantity: 30,
    category: 'أساسيات',
    minStock: 5
  },
  {
    id: '3',
    name: 'معجون أسنان',
    barcode: '6210000123453',
    price: 12.50,
    cost: 8.75,
    quantity: 3,
    category: 'العناية الشخصية',
    minStock: 5
  },
  {
    id: '4',
    name: 'زيت زيتون',
    barcode: '6210000123454',
    price: 35.75,
    cost: 28.60,
    quantity: 15,
    category: 'زيوت وسمن',
    minStock: 8
  },
  {
    id: '5',
    name: 'مناديل ورقية',
    barcode: '6210000123455',
    price: 8.99,
    cost: 6.50,
    quantity: 22,
    category: 'منزلية',
    minStock: 10
  },
  {
    id: '6',
    name: 'تفاح أحمر',
    barcode: '6210000123456',
    price: 10.99,
    cost: 7.80,
    quantity: 2,
    category: 'فواكه',
    minStock: 5
  }
];

const InventoryDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  
  // Handle product edit
  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product);
    // This would open a modal or navigate to edit page in a real app
  };
  
  // Handle product delete
  const handleDeleteProduct = (id: string) => {
    console.log('Delete product:', id);
    // This would show a confirmation dialog in a real app
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
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
          { title: 'متوسط الربح', value: `${(products.reduce((sum, p) => sum + ((p.price - p.cost) / p.price * 100), 0) / products.length).toFixed(1)}%`, icon: <Package className="h-5 w-5 text-primary" /> }
        ].map((stat, i) => (
          <div 
            key={i} 
            className={`glass-panel rounded-xl p-4 border ${stat.highlight ? 'border-amber-200 bg-amber-50' : 'border-border'}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
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
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
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
      ) : (
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
          <AnimatedButton variant="outline" className="mt-4">
            <PlusCircle className="h-4 w-4 mr-1" />
            <span>إضافة منتج جديد</span>
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};

export default InventoryDashboard;
