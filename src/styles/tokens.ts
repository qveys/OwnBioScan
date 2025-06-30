// Color tokens
export const colors = {
  primary: '#000080', // Navy blue
  accent: '#660000', // Blood red
  mint: '#DFF3E3', // Soft mint green
  text: {
    primary: '#333333', // Anthracite
    secondary: '#888888', // Light gray
  },
  white: '#FFFFFF',
  blue: {
    100: '#E6F0FF',
    200: '#BFDAFF',
    300: '#99C4FF',
    400: '#73AEFF',
    500: '#4D98FF',
    600: '#2682FF',
    700: '#006CFF',
    800: '#0056CC',
    900: '#004099'
  },
  red: {
    100: '#FFE6E6',
    200: '#FFBFBF',
    300: '#FF9999',
    400: '#FF7373',
    500: '#FF4D4D',
    600: '#FF2626',
    700: '#FF0000',
    800: '#CC0000',
    900: '#990000'
  },
  green: {
    100: '#E6FFE6',
    200: '#BFFFBF',
    300: '#99FF99',
    400: '#73FF73',
    500: '#4DFF4D',
    600: '#26FF26',
    700: '#00FF00',
    800: '#00CC00',
    900: '#009900'
  },
  purple: {
    100: '#F2E6FF',
    200: '#DFBFFF',
    300: '#CC99FF',
    400: '#B973FF',
    500: '#A64DFF',
    600: '#9326FF',
    700: '#8000FF',
    800: '#6600CC',
    900: '#4D0099'
  }
} as const;

// Typography tokens
export const typography = {
  fonts: {
    heading: 'Montserrat',
    body: 'Open Sans',
  },
  weights: {
    regular: '400',
    semibold: '600',
    bold: '700',
  },
  sizes: {
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
} as const;

// Spacing tokens
export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
} as const;

// Animation tokens
export const animation = {
  duration: {
    fast: '150ms',
    classic: '300ms',
    slow: '500ms',
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Border radius tokens
export const radius = {
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  full: '9999px',
} as const;

// Shadow tokens
export const shadows = {
  subtle: '0 2px 4px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
} as const;