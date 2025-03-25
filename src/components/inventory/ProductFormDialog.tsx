
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ProductForm from './ProductForm';
import { Product } from './ProductCard';
import { productsApi } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Product;
  title?: string;
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  open,
  onOpenChange,
  initialData,
  title
}) => {
  const queryClient = useQueryClient();
  const isEditing = !!initialData;
  
  const addProductMutation = useMutation({
    mutationFn: (product: Omit<Product, 'id'>) => productsApi.add(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('تمت إضافة المنتج بنجاح');
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`فشلت إضافة المنتج: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
    }
  });
  
  const updateProductMutation = useMutation({
    mutationFn: ({ id, product }: { id: string; product: Partial<Product> }) =>
      productsApi.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('تم تحديث المنتج بنجاح');
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`فشل تحديث المنتج: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
    }
  });
  
  const handleSubmit = (data: Omit<Product, 'id'>) => {
    if (isEditing && initialData) {
      updateProductMutation.mutate({
        id: initialData.id,
        product: data
      });
    } else {
      addProductMutation.mutate(data);
    }
  };
  
  const isSubmitting = addProductMutation.isPending || updateProductMutation.isPending;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle style={{ textAlign: 'right' }}>
            {title || (isEditing ? 'تعديل المنتج' : 'إضافة منتج جديد')}
          </DialogTitle>
        </DialogHeader>
        
        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
