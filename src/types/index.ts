// Type exports
export type { ButtonVariant, ButtonSize, ButtonProps } from '../components/ui/Button';
export type { CardVariant, CardPadding, CardProps } from '../components/ui/Card';
export type { SectionBackground, SectionProps } from '../components/ui/Section';
export type { SpinnerSize, SpinnerColor, LoadingSpinnerProps } from '../components/ui/LoadingSpinner';
export type { AnimationType, AnimatedSectionProps } from '../components/ui/AnimatedSection';
export type { ProgressStep, ProgressBarProps } from '../components/ui/ProgressBar';
export type { BreadcrumbItem, BreadcrumbsProps } from '../components/ui/Breadcrumbs';
export type { LazyImageProps } from '../components/common/LazyImage';
export type { SuccessAnimationProps } from '../components/common/SuccessAnimation';

// Common interfaces
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
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