
import React, { useEffect, useRef } from 'react';
import { 
  BarChart3, Package, ShoppingCart, UserCheck, Wallet, CalendarClock, 
  Search, CreditCard, Bell
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: "إدارة المنتجات",
    description: "تسجيل المنتجات، تعديل الأسعار، وتصنيف البضائع بشكل منظم"
  },
  {
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    title: "عمليات البيع",
    description: "شاشة مبيعات سهلة الاستخدام مع دعم الباركود والخصومات"
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "التقارير والإحصائيات",
    description: "تقارير مفصلة عن المبيعات، الأرباح، والمخزون مع رسوم بيانية"
  },
  {
    icon: <UserCheck className="h-6 w-6 text-primary" />,
    title: "إدارة العملاء",
    description: "قاعدة بيانات للعملاء وبرامج الولاء ومتابعة المشتريات السابقة"
  },
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: "الحسابات المالية",
    description: "متابعة الإيرادات، المصروفات، والتدفقات النقدية في المتجر"
  },
  {
    icon: <CalendarClock className="h-6 w-6 text-primary" />,
    title: "إدارة المخزون الزمني",
    description: "تتبع صلاحية المنتجات وتنبيهات المنتجات قريبة الانتهاء"
  },
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "بحث متقدم",
    description: "محرك بحث سريع للمنتجات والفواتير والعملاء بخيارات تصفية متعددة"
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: "طرق الدفع المتعددة",
    description: "قبول الدفع نقداً أو ببطاقات الائتمان أو عبر المحافظ الإلكترونية"
  },
  {
    icon: <Bell className="h-6 w-6 text-primary" />,
    title: "التنبيهات التلقائية",
    description: "إشعارات تلقائية عند انخفاض المخزون أو تحقيق أهداف المبيعات"
  }
];

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.feature-card');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-slide-up');
              el.classList.remove('opacity-0');
            }, index * 100);
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
      style={{ direction: 'rtl' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-primary uppercase tracking-wide">المميزات</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
            نظام متكامل لتلبية احتياجات متجرك
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            صمم هذا النظام ليوفر لك كل ما تحتاجه لإدارة متجرك بكفاءة عالية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
