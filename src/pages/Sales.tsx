
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import TransactionPanel from '@/components/sales/TransactionPanel';
import { ChevronLeft, ChevronRight, Calendar, Clock, Receipt, Package, User } from 'lucide-react';

interface SaleTransaction {
  id: string;
  time: string;
  customer: string;
  items: number;
  total: number;
  paymentMethod: 'cash' | 'card';
}

const Sales: React.FC = () => {
  // Sample transactions data
  const transactions: SaleTransaction[] = [
    { id: 'INV-001', time: '09:15', customer: 'عميل نقدي', items: 5, total: 256.75, paymentMethod: 'cash' },
    { id: 'INV-002', time: '10:32', customer: 'أحمد محمد', items: 2, total: 78.50, paymentMethod: 'card' },
    { id: 'INV-003', time: '11:47', customer: 'عميل نقدي', items: 8, total: 345.90, paymentMethod: 'cash' },
    { id: 'INV-004', time: '13:20', customer: 'سارة علي', items: 3, total: 125.35, paymentMethod: 'card' },
    { id: 'INV-005', time: '14:55', customer: 'عميل نقدي', items: 1, total: 35.75, paymentMethod: 'cash' },
  ];
  
  return (
    <div className="min-h-screen bg-white" style={{ direction: 'rtl' }}>
      <Navbar />
      
      <main className="pt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 h-[calc(100vh-4rem)]">
        {/* Transactions History Panel */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4 overflow-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">المبيعات</h1>
              <p className="text-muted-foreground">إدارة المبيعات والفواتير</p>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="bg-white border rounded-lg p-2 flex items-center">
                <button className="p-1.5 rounded-md hover:bg-secondary">
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="px-2 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>اليوم</span>
                </div>
                <button className="p-1.5 rounded-md hover:bg-secondary">
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
              
              <div className="bg-white border rounded-lg p-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          
          {/* Sales Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { title: 'إجمالي المبيعات', value: transactions.reduce((sum, t) => sum + t.total, 0).toFixed(2) + ' ر.س', icon: <Receipt className="h-5 w-5 text-primary" /> },
              { title: 'عدد المعاملات', value: transactions.length, icon: <Package className="h-5 w-5 text-primary" /> },
              { title: 'متوسط المبيعات', value: (transactions.reduce((sum, t) => sum + t.total, 0) / transactions.length).toFixed(2) + ' ر.س', icon: <User className="h-5 w-5 text-primary" /> },
            ].map((stat, i) => (
              <div key={i} className="glass-panel rounded-xl p-4">
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
          
          {/* Transactions Table */}
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 text-sm">
                  <tr>
                    <th className="py-3 px-4 text-right">رقم الفاتورة</th>
                    <th className="py-3 px-4 text-right">الوقت</th>
                    <th className="py-3 px-4 text-right">العميل</th>
                    <th className="py-3 px-4 text-right">المنتجات</th>
                    <th className="py-3 px-4 text-right">الإجمالي</th>
                    <th className="py-3 px-4 text-right">طريقة الدفع</th>
                    <th className="py-3 px-4 text-right">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-secondary/20">
                      <td className="py-3 px-4">{transaction.id}</td>
                      <td className="py-3 px-4">{transaction.time}</td>
                      <td className="py-3 px-4">{transaction.customer}</td>
                      <td className="py-3 px-4">{transaction.items}</td>
                      <td className="py-3 px-4 font-medium">{transaction.total.toFixed(2)} ر.س</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          transaction.paymentMethod === 'cash' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.paymentMethod === 'cash' ? 'نقدي' : 'بطاقة'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:text-primary/80 text-sm font-medium">
                          عرض التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* POS Panel */}
        <div className="hidden md:block md:col-span-1 border-r border-border overflow-hidden h-full">
          <TransactionPanel />
        </div>
      </main>
    </div>
  );
};

export default Sales;
