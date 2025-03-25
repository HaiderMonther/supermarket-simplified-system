
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';
import { ArrowRight, Package, ShoppingCart, BarChart2 } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 opacity-0"
      style={{ direction: 'rtl' }}
    >
      <div className="w-full max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
          <span className="text-primary">نظام متكامل</span> لإدارة <br className="hidden sm:block" />
          السوبر ماركت الخاص بك
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          منصة احترافية تجمع بين البساطة والفعالية لإدارة المخزون، المبيعات،
          الفواتير، والموظفين في مكان واحد
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnimatedButton
            variant="primary"
            size="lg"
            as={Link}
            to="/inventory"
            className="group min-w-[180px]"
          >
            ابدأ الآن
            <ArrowRight className="h-4 w-4 mr-1 transition-transform group-hover:translate-x-1" />
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            size="lg"
            as={Link}
            to="#features"
            className="min-w-[180px]"
          >
            استكشف المميزات
          </AnimatedButton>
        </div>
      </div>
      
      <div className="w-full max-w-5xl mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Package className="h-8 w-8 text-primary" />,
            title: "إدارة المخزون",
            description: "تتبع المنتجات والكميات وتنبيهات انخفاض المخزون بشكل آلي"
          },
          {
            icon: <ShoppingCart className="h-8 w-8 text-primary" />,
            title: "نقطة البيع",
            description: "واجهة سهلة الاستخدام للمبيعات وإصدار الفواتير بشكل فوري"
          },
          {
            icon: <BarChart2 className="h-8 w-8 text-primary" />,
            title: "التقارير والإحصائيات",
            description: "رؤية شاملة لأداء المتجر مع تقارير مفصلة ورسوم بيانية"
          }
        ].map((feature, i) => (
          <div 
            key={i} 
            className="glass-panel rounded-2xl p-6 hover-scale"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
