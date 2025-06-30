import React, { memo } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'primary' | 'white' | 'gray';

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(({ 
  size = 'md',
  color = 'primary',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-300 border-t-transparent'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-2
          ${sizeClasses[size]} ${colorClasses[color]}
        `}
        role="status"
        aria-label="Chargement en cours"
      />
      {text && (
        <p className={`mt-3 text-sm ${
          color === 'white' ? 'text-white' : 'text-text-secondary'
        }`}>
          {text}
        </p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;