
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحبًا بك في نظام إدارة المتجر",
      variant: "default",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rtl">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">سوبر ماركت</h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">تسجيل الدخول إلى حسابك</h2>
          <p className="mt-2 text-sm text-gray-600">
            أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم
          </p>
        </div>
        
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
