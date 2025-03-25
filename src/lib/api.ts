
import { Product } from '@/components/inventory/ProductCard';

// يمكن استبدال هذا لاحقًا بعنوان API حقيقي عند ربطه ببيانات خلفية
const API_BASE_URL = 'https://api.example.com';

// بيانات تجريبية للاستخدام المؤقت
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

// واجهة للبيانات المرجعة من API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// دالة مساعدة للتحقق من الاستجابة
const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `خطأ في الطلب: ${response.status}`);
  }
  return response.json();
};

// خدمات API المنتجات
export const productsApi = {
  // الحصول على جميع المنتجات
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    try {
      // قم بإرجاع البيانات التجريبية مؤقتًا
      // في الإنتاج، استبدل هذا بطلب fetch حقيقي
      return {
        success: true,
        data: sampleProducts
      };
      
      // عند الاتصال بخادم حقيقي، استخدم الكود التالي:
      // const response = await fetch(`${API_BASE_URL}/products`);
      // return checkResponse(response);
    } catch (error) {
      console.error('خطأ في جلب المنتجات:', error);
      return {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء جلب المنتجات'
      };
    }
  },

  // الحصول على منتج واحد بالمعرف
  getById: async (id: string): Promise<ApiResponse<Product | null>> => {
    try {
      // قم بإرجاع منتج من البيانات التجريبية مؤقتًا
      const product = sampleProducts.find(p => p.id === id);
      
      return {
        success: true,
        data: product || null
      };
      
      // عند الاتصال بخادم حقيقي:
      // const response = await fetch(`${API_BASE_URL}/products/${id}`);
      // return checkResponse(response);
    } catch (error) {
      console.error(`خطأ في جلب المنتج (${id}):`, error);
      return {
        success: false,
        data: null,
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء جلب المنتج'
      };
    }
  },

  // إضافة منتج جديد
  add: async (product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> => {
    try {
      // توليد معرف جديد للمنتج المضاف مؤقتًا
      const newProduct: Product = {
        ...product,
        id: Date.now().toString()
      };
      
      return {
        success: true,
        data: newProduct
      };
      
      // عند الاتصال بخادم حقيقي:
      // const response = await fetch(`${API_BASE_URL}/products`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(product)
      // });
      // return checkResponse(response);
    } catch (error) {
      console.error('خطأ في إضافة المنتج:', error);
      return {
        success: false,
        data: {} as Product,
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة المنتج'
      };
    }
  },

  // تحديث منتج موجود
  update: async (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> => {
    try {
      // تحديث منتج في البيانات التجريبية مؤقتًا
      const existingProduct = sampleProducts.find(p => p.id === id);
      
      if (!existingProduct) {
        throw new Error('المنتج غير موجود');
      }
      
      const updatedProduct: Product = {
        ...existingProduct,
        ...product
      };
      
      return {
        success: true,
        data: updatedProduct
      };
      
      // عند الاتصال بخادم حقيقي:
      // const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(product)
      // });
      // return checkResponse(response);
    } catch (error) {
      console.error(`خطأ في تحديث المنتج (${id}):`, error);
      return {
        success: false,
        data: {} as Product,
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء تحديث المنتج'
      };
    }
  },

  // حذف منتج
  delete: async (id: string): Promise<ApiResponse<boolean>> => {
    try {
      // تمثيل لحذف المنتج من البيانات التجريبية مؤقتًا
      return {
        success: true,
        data: true
      };
      
      // عند الاتصال بخادم حقيقي:
      // const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      //   method: 'DELETE'
      // });
      // return checkResponse(response);
    } catch (error) {
      console.error(`خطأ في حذف المنتج (${id}):`, error);
      return {
        success: false,
        data: false,
        message: error instanceof Error ? error.message : 'حدث خطأ أثناء حذف المنتج'
      };
    }
  }
};
