
import axios from 'axios';
import { Product } from '@/components/inventory/ProductCard';
import { API_CONFIG } from '@/config/api';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the JWT token in all requests
apiClient.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('jwt_token');
  
  // If token exists, add it to the authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Define response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// API error handling wrapper
export const handleApiError = (error: any): never => {
  let errorMessage = 'حدث خطأ غير متوقع';
  
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      
      // Check for authentication errors (401, 403)
      if (error.response.status === 401) {
        errorMessage = 'غير مصرح: الرجاء تسجيل الدخول مرة أخرى';
        // Optionally redirect to login or clear token
        localStorage.removeItem('jwt_token');
      } else if (error.response.status === 403) {
        errorMessage = 'ممنوع: ليس لديك صلاحية للوصول إلى هذا المورد';
      } else {
        errorMessage = error.response.data?.message || `خطأ: ${error.response.status}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'لم يتم استلام استجابة من الخادم، تأكد من تشغيل الخادم على المنفذ 2000';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = `خطأ في الطلب: ${error.message}`;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  throw new Error(errorMessage);
};

// Products API service
export const productsApiService = {
  // Get all products
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    try {
      console.log('Fetching products from:', API_CONFIG.BASE_URL);
      const response = await apiClient.get<ApiResponse<Product[]>>('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'فشل في جلب المنتجات'
      };
    }
  },

  // Get single product by id
  getById: async (id: string): Promise<ApiResponse<Product>> => {
    try {
      const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return {
        success: false,
        data: {} as Product,
        message: error instanceof Error ? error.message : 'فشل في جلب المنتج'
      };
    }
  },

  // Add new product
  create: async (product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> => {
    try {
      console.log('Creating product with data:', product);
      const response = await apiClient.post<ApiResponse<Product>>('/products', product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      return handleApiError(error);
    }
  },

  // Update product
  update: async (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> => {
    try {
      console.log(`Updating product ${id} with data:`, product);
      const response = await apiClient.put<ApiResponse<Product>>(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      return handleApiError(error);
    }
  },

  // Delete product
  delete: async (id: string): Promise<ApiResponse<boolean>> => {
    try {
      console.log(`Deleting product ${id}`);
      const response = await apiClient.delete<ApiResponse<boolean>>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      return handleApiError(error);
    }
  }
};

// Helper functions for auth
export const authService = {
  // Set JWT token in localStorage
  setToken: (token: string) => {
    localStorage.setItem('jwt_token', token);
  },
  
  // Get JWT token from localStorage
  getToken: () => {
    return localStorage.getItem('jwt_token');
  },
  
  // Clear JWT token from localStorage
  clearToken: () => {
    localStorage.removeItem('jwt_token');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('jwt_token');
  }
};

// Export a default API object that contains all API services
const api = {
  products: productsApiService,
  auth: authService
  // We can add other API services here in the future (categories, sales, users, etc.)
};

export default api;
