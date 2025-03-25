
import React, { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Navbar from '@/components/layout/Navbar';

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.scroll-reveal > *');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        
        <section className="py-20 px-4" style={{ direction: 'rtl' }}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">ابدأ استخدام النظام اليوم</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              تمتع بتجربة سلسة وبسيطة لإدارة السوبر ماركت الخاص بك بكفاءة عالية
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "ابدأ التشغيل",
                  description: "قم بإعداد النظام وإضافة المنتجات الأولية بسهولة"
                },
                {
                  title: "أدر المخزون",
                  description: "تابع مخزونك بسهولة وتلقى تنبيهات عند انخفاض الكميات"
                },
                {
                  title: "ابدأ البيع",
                  description: "استخدم واجهة نقطة البيع البسيطة لإتمام عمليات البيع بسرعة"
                }
              ].map((step, i) => (
                <div 
                  key={i} 
                  className="glass-panel rounded-xl p-6 border border-primary/10 flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <footer className="bg-secondary/30 py-8 px-4" style={{ direction: 'rtl' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-primary">SuperMarket</h3>
                <p className="text-muted-foreground">نظام متكامل لإدارة السوبر ماركت</p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                جميع الحقوق محفوظة &copy; {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
