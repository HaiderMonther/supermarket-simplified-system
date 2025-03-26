
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Package, BarChart2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/apiService';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'المخزون', path: '/inventory', icon: <Package className="w-4 h-4" /> },
    { name: 'المبيعات', path: '/sales', icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await api.auth.logout();
    toast({
      title: 'تم تسجيل الخروج',
      description: 'تم تسجيل خروجك بنجاح',
    });
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-display font-semibold tracking-tight text-primary">SuperMarket</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center">
            <div className="ml-10 flex items-baseline space-x-4 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="mr-4 flex items-center gap-1 text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                isActive(link.path)
                  ? 'text-primary bg-gray-50'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="w-full justify-start px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-gray-700 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
