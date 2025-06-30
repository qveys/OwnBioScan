import type { ColorCalibrationPoint } from './types';

/**
 * Color → cholesterol correspondence table
 * Based on commercial test strip specifications
 */
export const CHOLESTEROL_COLOR_MAP: ColorCalibrationPoint[] = [
  {
    hex: '#F5F0E8',
    rgb: { r: 245, g: 240, b: 232 },
    cholesterol: 140,
    description: 'Very light beige - Low cholesterol'
  },
  {
    hex: '#E8D5B7',
    rgb: { r: 232, g: 213, b: 183 },
    cholesterol: 160,
    description: 'Light beige - Normal low cholesterol'
  },
  {
    hex: '#D4B896',
    rgb: { r: 212, g: 184, b: 150 },
    cholesterol: 180,
    description: 'Beige - Normal cholesterol'
  },
  {
    hex: '#C19A6B',
    rgb: { r: 193, g: 154, b: 107 },
    cholesterol: 200,
    description: 'Dark beige - Borderline cholesterol'
  },
  {
    hex: '#A67C52',
    rgb: { r: 166, g: 124, b: 82 },
    cholesterol: 220,
    description: 'Light brown - High cholesterol'
  },
  {
    hex: '#8B5A3C',
    rgb: { r: 139, g: 90, b: 60 },
    cholesterol: 250,
    description: 'Medium brown - Very high cholesterol'
  },
  {
    hex: '#6D4C41',
    rgb: { r: 109, g: 76, b: 65 },
    cholesterol: 280,
    description: 'Dark brown - Critical cholesterol'
  },
  {
    hex: '#5D4037',
    rgb: { r: 93, g: 64, b: 55 },
    cholesterol: 300,
    description: 'Very dark brown - Dangerous cholesterol'
  }
];