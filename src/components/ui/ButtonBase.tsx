// src/components/ui/ButtonBase.tsx
import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  external?: boolean;
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(({
  children,
  variant = 'default',
  size = 'md',
  className,
  href,
  external = false,
  ...props
}, ref) => {
  const { isUsingKeyboard } = useAccessibility();
  
  const baseClasses = 'relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none';
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-0.5',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:translate-y-0.5',
    ghost: 'hover:bg-accent hover:text-accent-foreground active:translate-y-0.5',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  const focusClasses = isUsingKeyboard ? 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tiger' : '';
  
  const allClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    focusClasses,
    className
  );
  
  if (href) {
    return (
      <a
        href={href}
        className={allClasses}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        role="button"
        tabIndex={0}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      className={allClasses}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

ButtonBase.displayName = "ButtonBase";

export default ButtonBase;