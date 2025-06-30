import type { RGB, ColorCalibrationPoint } from './types';
import { CHOLESTEROL_COLOR_MAP } from './calibration';

/**
 * Calculates Euclidean distance between two RGB colors
 */
function calculateColorDistance(color1: RGB, color2: RGB): number {
  const deltaR = color1.r - color2.r;
  const deltaG = color1.g - color2.g;
  const deltaB = color1.b - color2.b;
  
  return Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB);
}

/**
 * Finds the closest color match
 */
export function findClosestColorMatch(
  color: RGB, 
  colorMap: ColorCalibrationPoint[] = CHOLESTEROL_COLOR_MAP
): { match: ColorCalibrationPoint; distance: number } {
  if (colorMap.length === 0) {
    throw new Error('Empty calibration table');
  }
  
  let closestMatch = colorMap[0];
  let minDistance = calculateColorDistance(color, closestMatch.rgb);
  
  for (let i = 1; i < colorMap.length; i++) {
    const distance = calculateColorDistance(color, colorMap[i].rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = colorMap[i];
    }
  }
  
  return { match: closestMatch, distance: minDistance };
}

/**
 * Calculates confidence score based on colorimetric distance
 */
export function calculateConfidenceScore(distance: number): number {
  const MAX_ACCEPTABLE_DISTANCE = 50;
  
  if (distance <= 0) return 1.0;
  if (distance >= MAX_ACCEPTABLE_DISTANCE) return 0.1;
  
  return Math.max(0.1, Math.exp(-distance / 20));
}

/**
 * Converts RGB color to hexadecimal format
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}