import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  href,
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ...props 
}, ref) => {
  const baseClasses = 'btn transition-all duration-classic ease-smooth font-medium rounded-md inline-flex items-center justify-center gap-2 touch-target';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/20',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600/20',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/20'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]',
    md: 'px-5 py-3 min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]'
  };

  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';
  const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${focusClasses} ${disabledClasses} ${className}`;

  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    'aria-disabled': disabled,
    role: href ? 'link' : 'button',
    tabIndex: disabled ? -1 : 0
  };

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link 
          to={href} 
          className={classes} 
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...accessibilityProps}
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a 
        href={href} 
        className={classes} 
        ref={ref as React.Ref<HTMLAnchorElement>}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...accessibilityProps}
        {...props}
      >
        {children}
        {href.startsWith('http') && (
          <span className="sr-only">(ouvre dans un nouvel onglet)</span>
        )}
      </a>
    );
  }

  return (
    <button 
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...accessibilityProps}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;