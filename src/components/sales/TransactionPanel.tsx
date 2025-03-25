
import React, { useState } from 'react';
import {
  ShoppingCart, Trash2, Package, Plus, Minus, CreditCard,
  Printer, Receipt, Search, ShoppingBag, FileText
} from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const TransactionPanel: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'حليب كامل الدسم', price: 5.99, quantity: 2, total: 11.98 },
    { id: '4', name: 'زيت زيتون', price: 35.75, quantity: 1, total: 35.75 },
  ]);
  const [barcode, setBarcode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.15; // 15% VAT
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  
  // Handle quantity change
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      )
    );
  };
  
  // Handle item removal
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Handle barcode submit
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Scanning barcode:', barcode);
    // This would look up the product and add it to cart in a real app
    setBarcode('');
  };
  
  // Handle checkout
  const handleCheckout = () => {
    console.log('Processing checkout with', paymentMethod);
    console.log('Cart items:', cartItems);
    console.log('Total:', total);
    // This would process the transaction in a real app
  };
  
  return (
    <div className="h-full flex flex-col" style={{ direction: 'rtl' }}>
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          نقطة البيع
        </h2>
      </div>
      
      {/* Barcode Scanner */}
      <form onSubmit={handleBarcodeSubmit} className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="أدخل الباركود أو اسم المنتج..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </form>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-auto p-4">
        {cartItems.length > 0 ? (
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="glass-panel rounded-lg p-3 flex items-center">
                <div className="h-10 w-10 bg-primary/10 rounded-md flex items-center justify-center mr-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} ر.س</p>
                </div>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse ml-3">
                  <button
                    className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  
                  <span className="w-6 text-center font-medium">{item.quantity}</span>
                  
                  <button
                    className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                
                <div className="text-right min-w-20 mr-2">
                  <p className="font-medium">{item.total.toFixed(2)} ر.س</p>
                </div>
                
                <button
                  className="ml-1 text-destructive hover:bg-destructive/10 p-1.5 rounded-md"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">السلة فارغة</h3>
            <p className="text-muted-foreground mt-1 max-w-xs">
              أضف منتجات باستخدام الباركود أو البحث عن المنتج
            </p>
          </div>
        )}
      </div>
      
      {/* Totals and Checkout */}
      <div className="border-t p-4 bg-secondary/30">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">المجموع الفرعي:</span>
            <span>{subtotal.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ضريبة القيمة المضافة (15%):</span>
            <span>{tax.toFixed(2)} ر.س</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>الإجمالي:</span>
            <span>{total.toFixed(2)} ر.س</span>
          </div>
        </div>
        
        {/* Payment Method Selection */}
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${
              paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-white'
            }`}
            onClick={() => setPaymentMethod('cash')}
          >
            <span>نقدي</span>
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${
              paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-white'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="h-4 w-4" />
            <span>بطاقة</span>
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatedButton
            variant="outline"
            className="flex items-center justify-center gap-1.5"
          >
            <FileText className="h-4 w-4" />
            <span>حفظ كمسودة</span>
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            className="flex items-center justify-center gap-1.5"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            <Receipt className="h-4 w-4" />
            <span>إتمام البيع</span>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionPanel;
