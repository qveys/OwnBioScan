import React, { memo, useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export interface SuccessAnimationProps {
  message: string;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = memo(({ 
  message, 
  duration = 3000,
  onComplete,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      bg-green-50 border border-green-200 text-green-800 
      px-4 py-3 rounded-lg shadow-lg
      animate-slide-in-right
      ${className}
    `}>
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 animate-scale-in" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
});

SuccessAnimation.displayName = 'SuccessAnimation';

export default SuccessAnimation;