// Common TypeScript interfaces and types
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  role?: string;
  tabIndex?: number;
}

export interface CardProps extends BaseProps {
  variant?: 'default' | 'highlight' | 'shadow';
  padding?: 'sm' | 'md' | 'lg';
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  tabIndex?: number;
  onClick?: () => void;
}

export interface SectionProps extends BaseProps {
  id?: string;
  title?: string;
  description?: string;
  background?: 'white' | 'gray' | 'mint' | 'gradient';
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface IconProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}

export interface TestimonialData {
  name: string;
  title: string;
  content: string;
  image: string;
  rating: number;
}

export interface BenefitData {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  bgColor: string;
}

export interface StepData {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  stepNumber: number;
}

export interface ProgressProps {
  currentStep: number;
  totalSteps: number;
}

// Accessibility types
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  role?: string;
  tabIndex?: number;
}

// Touch and mobile types
export interface TouchProps {
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

// Performance types
export interface LazyLoadProps {
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: string;
}

// Responsive types
export interface ResponsiveProps {
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  hideOn?: 'mobile' | 'tablet' | 'desktop';
  showOn?: 'mobile' | 'tablet' | 'desktop';
}