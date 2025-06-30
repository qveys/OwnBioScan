// Performance optimization utilities

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};

export const lazyLoad = (
  target: HTMLElement,
  callback: () => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });

  observer.observe(target);
  return observer;
};

// Memory management
export const cleanupEventListeners = (
  element: HTMLElement | Window,
  events: Array<{ type: string; listener: EventListener }>
): void => {
  events.forEach(({ type, listener }) => {
    element.removeEventListener(type, listener);
  });
};

// Bundle size optimization
export const dynamicImport = async <T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> => {
  const module = await importFn();
  return module.default;
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void): void => {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  } else {
    fn();
  }
};

// Image optimization
export const optimizeImageLoading = (img: HTMLImageElement): void => {
  // Native lazy loading
  img.loading = 'lazy';
  
  // Async decoding
  img.decoding = 'async';
  
  // Optimization for critical images
  if (img.dataset.priority === 'high') {
    img.loading = 'eager';
    
    // Preload for critical images
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
    if (img.srcset) link.setAttribute('imagesrcset', img.srcset);
    if (img.sizes) link.setAttribute('imagesizes', img.sizes);
    document.head.appendChild(link);
  }
};

// Animation optimization
export const optimizeAnimations = (): void => {
  // Reduce animations if user prefers
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Scroll optimization
export const optimizeScrolling = (): void => {
  // Passive event listeners for scroll
  let ticking = false;
  
  const updateScrollPosition = () => {
    // Scroll update logic
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
};

// Touch events optimization
export const optimizeTouchEvents = (): void => {
  // Passive touch events for better performance
  const passiveEvents = ['touchstart', 'touchmove', 'touchend'];
  
  passiveEvents.forEach(event => {
    document.addEventListener(event, () => {}, { passive: true });
  });
  
  // Disable double tap zoom for iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

// Memory optimization
export const optimizeMemory = (): void => {
  // Clean unused observers
  const cleanupObservers = () => {
    // Observer cleanup logic
  };
  
  // Clean on page change
  window.addEventListener('beforeunload', cleanupObservers);
  
  // Clean timers
  const activeTimers = new Set<number>();
  
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  window.setTimeout = (callback, delay) => {
    const id = originalSetTimeout(callback, delay);
    activeTimers.add(id);
    return id;
  };
  
  window.setInterval = (callback, delay) => {
    const id = originalSetInterval(callback, delay);
    activeTimers.add(id);
    return id;
  };
  
  window.addEventListener('beforeunload', () => {
    activeTimers.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
  });
};

// Device capabilities detection
export const getDeviceCapabilities = () => {
  return {
    // Network connection
    connection: (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection,
    
    // Available memory
    memory: (navigator as any).deviceMemory,
    
    // Number of processors
    hardwareConcurrency: navigator.hardwareConcurrency,
    
    // Touch support
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Vibration support
    vibrationSupport: 'vibrate' in navigator,
    
    // Orientation support
    orientationSupport: 'orientation' in window.screen,
    
    // Geolocation support
    geolocationSupport: 'geolocation' in navigator,
    
    // Notification support
    notificationSupport: 'Notification' in window,
    
    // Service worker support
    serviceWorkerSupport: 'serviceWorker' in navigator
  };
};

// Initialize optimizations
export const initializePerformanceOptimizations = (): void => {
  optimizeAnimations();
  optimizeScrolling();
  optimizeTouchEvents();
  optimizeMemory();
  
  // Optimize existing images
  document.querySelectorAll('img').forEach(optimizeImageLoading);
  
  // Observer for new images
  const imageObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const images = element.querySelectorAll('img');
          images.forEach(optimizeImageLoading);
        }
      });
    });
  });
  
  imageObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
};