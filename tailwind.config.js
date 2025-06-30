/** @type {import('tailwindcss').Config} */
import { colors, typography, spacing, animation, radius, shadows } from './src/styles/tokens';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        montserrat: [typography.fonts.heading, 'sans-serif'],
        'open-sans': [typography.fonts.body, 'sans-serif'],
      },
      fontSize: typography.sizes,
      spacing,
      borderRadius: radius,
      boxShadow: shadows,
      transitionTimingFunction: {
        smooth: animation.easing.smooth,
      },
      transitionDuration: animation.duration,
    },
  },
  safelist: [
    'bg-blue-700',  
    'bg-green-700',  
    'bg-red-700',  
    'bg-purple-700',  
    'bg-opacity-10',  
  ],
  plugins: [],
};