import React, { memo, useState, useCallback, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = memo(({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+',
  onLoad,
  onError,
  loading = 'lazy',
  sizes,
  srcSet,
  width,
  height,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    freezeOnceVisible: true
  });

  React.useEffect(() => {
    if (isIntersecting && !isInView) {
      setIsInView(true);
    }
  }, [isIntersecting, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  React.useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (srcSet) link.setAttribute('imagesrcset', srcSet);
      if (sizes) link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src, srcSet, sizes]);

  return (
    <div 
      ref={elementRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
          aria-hidden="true"
          loading="eager"
        />
      )}
      
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          role={alt ? 'img' : 'presentation'}
        />
      )}
      
      {hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500"
          role="img"
          aria-label="Image non disponible"
        >
          <div className="text-center p-4">
            <svg 
              className="w-12 h-12 mx-auto mb-2 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-sm">Image non disponible</span>
          </div>
        </div>
      )}
      
      {isInView && !isLoaded && !hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          aria-label="Chargement de l'image"
        >
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;