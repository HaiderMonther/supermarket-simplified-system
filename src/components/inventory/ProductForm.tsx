
import React, { useState } from 'react';
import { Product } from './ProductCard';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';

// تعريف مخطط التحقق من صحة المنتج
const productSchema = z.object({
  name: z.string().min(2, { message: 'يجب أن يحتوي اسم المنتج على حرفين على الأقل' }),
  barcode: z.string().min(1, { message: 'الباركود مطلوب' }),
  price: z.coerce.number().positive({ message: 'يجب أن يكون السعر رقمًا موجبًا' }),
  cost: z.coerce.number().positive({ message: 'يجب أن تكون التكلفة رقمًا موجبًا' }),
  quantity: z.coerce.number().int({ message: 'يجب أن تكون الكمية رقمًا صحيحًا' }).nonnegative({ message: 'يجب أن تكون الكمية صفر أو أكثر' }),
  category: z.string().min(1, { message: 'الفئة مطلوبة' }),
  minStock: z.coerce.number().int({ message: 'يجب أن يكون الحد الأدنى للمخزون رقمًا صحيحًا' }).nonnegative({ message: 'يجب أن يكون الحد الأدنى للمخزون صفر أو أكثر' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const isEditing = !!initialData;
  
  // تهيئة نموذج React Hook Form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      barcode: '',
      price: 0,
      cost: 0,
      quantity: 0,
      category: '',
      minStock: 0,
    }
  });
  
  // معالج الإرسال
  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values);
  };
  
  return (
    <div className="p-4" style={{ direction: 'rtl' }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المنتج</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل اسم المنتج" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الباركود</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل الباركود" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الفئة</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل فئة المنتج" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سعر البيع</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تكلفة الشراء</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الكمية</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="minStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الحد الأدنى للمخزون</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              <X className="h-4 w-4 ml-2" />
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 ml-2" />
              {isEditing ? 'تحديث المنتج' : 'إضافة المنتج'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
