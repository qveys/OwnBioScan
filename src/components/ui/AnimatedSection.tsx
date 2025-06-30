import React, { memo, useMemo } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useBreakpoints } from '../../hooks/useMediaQuery';

export type AnimationType = 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-in';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = memo(({
  children,
  animation = 'fade-in',
  delay = 0,
  className = ''
}) => {
  const { elementRef, isIntersecting, hasBeenVisible } = useIntersectionObserver({
    freezeOnceVisible: true,
    threshold: 0.1,
    rootMargin: '50px'
  });

  const { prefersReducedMotion } = useBreakpoints();

  const animationClass = useMemo(() => {
    if (prefersReducedMotion) return '';
    if (!hasBeenVisible) return 'opacity-0';
    return `animate-${animation}`;
  }, [animation, hasBeenVisible, prefersReducedMotion]);

  const style = useMemo(() => ({
    animationDelay: prefersReducedMotion ? '0s' : `${delay}s`
  }), [delay, prefersReducedMotion]);

  return (
    <div 
      ref={elementRef}
      className={`${animationClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

export default AnimatedSection;