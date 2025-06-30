import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const { freezeOnceVisible = false, ...observerOptions } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }

        if (freezeOnceVisible && hasBeenVisible) {
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...observerOptions,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [freezeOnceVisible, hasBeenVisible, observerOptions]);

  return { elementRef, isIntersecting, hasBeenVisible };
};