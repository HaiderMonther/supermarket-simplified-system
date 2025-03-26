
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { KeyRound, User, Loader2 } from 'lucide-react';
import api from '@/lib/apiService';

// تعريف نموذج المصادقة
const authSchema = z.object({
  username: z.string().min(3, { message: 'اسم المستخدم مطلوب ويجب أن يكون أكثر من 3 أحرف' }),
  password: z.string().min(6, { message: 'كلمة المرور مطلوبة ويجب أن تكون أكثر من 6 أحرف' }),
});

type AuthValues = z.infer<typeof authSchema>;

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: AuthValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.auth.login(values.username, values.password);
      
      if (response.success && response.token) {
        // حفظ التوكن وتحديث حالة المصادقة
        api.auth.setToken(response.token);
        onLoginSuccess();
      } else {
        setError(response.message || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المستخدم</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-white">
                      <span className="px-3 text-gray-500">
                        <User className="h-5 w-5" />
                      </span>
                      <Input
                        {...field}
                        placeholder="أدخل اسم المستخدم"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-white">
                      <span className="px-3 text-gray-500">
                        <KeyRound className="h-5 w-5" />
                      </span>
                      <Input
                        {...field}
                        type="password"
                        placeholder="أدخل كلمة المرور"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
