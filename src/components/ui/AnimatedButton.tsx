
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  hoverEffect?: 'scale' | 'glow' | 'none';
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  hoverEffect = 'scale',
  className,
  children,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
    secondary: "bg-secondary text-foreground hover:bg-secondary/80 focus:ring-secondary/50",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary/5 focus:ring-primary/30",
    ghost: "bg-transparent text-foreground hover:bg-secondary focus:ring-secondary/30"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3"
  };
  
  const hoverEffectStyles = {
    scale: "hover:scale-[1.03] active:scale-[0.97]",
    glow: "hover:shadow-[0_0_15px_rgba(var(--primary)/30)]",
    none: ""
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        hoverEffectStyles[hoverEffect],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
