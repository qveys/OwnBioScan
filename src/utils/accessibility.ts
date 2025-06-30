// Accessibility utilities

export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

export const getContrastRatio = (color1: string, color2: string): number => {
  // Function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const isReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const respectMotionPreferences = (element: HTMLElement): void => {
  if (isReducedMotion()) {
    element.style.animation = 'none';
    element.style.transition = 'none';
  }
};

// Focus visible management
export const manageFocusVisible = (): void => {
  let hadKeyboardEvent = true;
  let keyboardThrottleTimeout: number;

  const handlePointerDown = () => {
    hadKeyboardEvent = false;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.metaKey || e.altKey || e.ctrlKey) return;
    hadKeyboardEvent = true;
  };

  const handleFocus = (e: FocusEvent) => {
    if (hadKeyboardEvent || (e.target as HTMLElement).matches(':focus-visible')) {
      (e.target as HTMLElement).classList.add('focus-visible');
    }
  };

  const handleBlur = (e: FocusEvent) => {
    (e.target as HTMLElement).classList.remove('focus-visible');
  };

  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('mousedown', handlePointerDown, true);
  document.addEventListener('pointerdown', handlePointerDown, true);
  document.addEventListener('touchstart', handlePointerDown, true);
  document.addEventListener('focus', handleFocus, true);
  document.addEventListener('blur', handleBlur, true);
};

// ARIA landmarks management
export const addLandmarks = (): void => {
  // Add landmarks automatically if they don't exist
  const main = document.querySelector('main');
  if (main && !main.getAttribute('role')) {
    main.setAttribute('role', 'main');
  }

  const nav = document.querySelector('nav');
  if (nav && !nav.getAttribute('role')) {
    nav.setAttribute('role', 'navigation');
  }

  const header = document.querySelector('header');
  if (header && !header.getAttribute('role')) {
    header.setAttribute('role', 'banner');
  }

  const footer = document.querySelector('footer');
  if (footer && !footer.getAttribute('role')) {
    footer.setAttribute('role', 'contentinfo');
  }
};

// Accessibility validation
export const validateAccessibility = (element: HTMLElement): string[] => {
  const issues: string[] = [];

  // Check images without alt
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.getAttribute('alt') && !img.getAttribute('aria-hidden')) {
      issues.push(`Image without alt text: ${img.src}`);
    }
  });

  // Check buttons without labels
  const buttons = element.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent?.trim() && !button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')) {
      issues.push('Button without accessible label');
    }
  });

  // Check links without text
  const links = element.querySelectorAll('a');
  links.forEach(link => {
    if (!link.textContent?.trim() && !link.getAttribute('aria-label') && !link.getAttribute('aria-labelledby')) {
      issues.push(`Link without accessible text: ${link.href}`);
    }
  });

  // Check contrasts (basic)
  const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
  textElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    if (color && backgroundColor && color !== backgroundColor) {
      // Here we could implement more sophisticated contrast checking
    }
  });

  return issues;
};

// User preferences management
export const getUserPreferences = () => {
  return {
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
    prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    prefersReducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches
  };
};

// Accessibility initialization
export const initializeAccessibility = (): void => {
  manageFocusVisible();
  addLandmarks();
  
  // Add skip link if it doesn't exist
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
};