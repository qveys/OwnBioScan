import React, { forwardRef } from 'react';

export type CardVariant = 'default' | 'highlight' | 'shadow';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  tabIndex?: number;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  variant = 'default', 
  padding = 'md',
  className = '',
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  tabIndex,
  onClick,
  ...props 
}, ref) => {
  const baseClasses = 'bg-white rounded-lg transition-all duration-classic border border-transparent';
  
  const variantClasses = {
    default: 'shadow-subtle hover:shadow-medium',
    highlight: 'shadow-medium border-2 border-primary/20 ring-1 ring-primary/10',
    shadow: 'shadow-lg hover:shadow-xl'
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const interactiveClasses = onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${interactiveClasses} ${className}`;

  const accessibilityProps = {
    role: role || (onClick ? 'button' : undefined),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    tabIndex: onClick ? (tabIndex ?? 0) : tabIndex,
    onKeyDown: onClick ? (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    } : undefined
  };

  return (
    <div 
      className={classes} 
      ref={ref}
      onClick={onClick}
      {...accessibilityProps}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;