
import React from 'react';
import { Edit, Trash2, AlertCircle, Package } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';

export interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  cost: number;
  quantity: number;
  category: string;
  image?: string;
  minStock: number;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const isLowStock = product.quantity <= product.minStock;
  
  const profit = product.price - product.cost;
  const profitMargin = (profit / product.price) * 100;
  
  return (
    <div className="glass-panel rounded-xl overflow-hidden hover-scale transition-all duration-300">
      <div className="relative">
        <div className="aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="h-16 w-16 text-muted/50" />
          )}
        </div>
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-destructive/90 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>المخزون منخفض</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-secondary/90 text-xs px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      
      <div className="p-4" style={{ direction: 'rtl' }}>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">الباركود: {product.barcode}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-secondary/50 p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">السعر</p>
            <p className="font-semibold">{product.price.toFixed(2)} ر.س</p>
          </div>
          <div className="bg-secondary/50 p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">الكمية</p>
            <p className="font-semibold">{product.quantity} قطعة</p>
          </div>
          <div className="bg-secondary/50 p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">التكلفة</p>
            <p className="font-semibold">{product.cost.toFixed(2)} ر.س</p>
          </div>
          <div className="bg-secondary/50 p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">الربح</p>
            <p className="font-semibold">{profitMargin.toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="flex justify-between gap-2">
          <AnimatedButton 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-4 w-4" />
            <span>تعديل</span>
          </AnimatedButton>
          <AnimatedButton 
            variant="ghost" 
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
