/**
 * Colorimetric analysis system for cholesterol test strips
 * Standardized reference image database
 */

import type { RGB } from './cholesterol/types';

// Specific types for this module
export interface CholesterolLevel {
  level: number;
  color: string;
  rgb: RGB;
  description: string;
}

export interface AnalysisResult {
  cholesterolLevel: number;
  confidence: number;
  classification: string;
  imageData: string;
}

// Calibrated color-cholesterol correspondence table
const CHOLESTEROL_LEVELS: CholesterolLevel[] = [
  { level: 140, color: '#F5E6D3', rgb: { r: 245, g: 230, b: 211 }, description: 'Optimal' },
  { level: 160, color: '#E8D5B7', rgb: { r: 232, g: 213, b: 183 }, description: 'Normal' },
  { level: 180, color: '#D4B896', rgb: { r: 212, g: 184, b: 150 }, description: 'Normal high' },
  { level: 200, color: '#C49A6B', rgb: { r: 196, g: 154, b: 107 }, description: 'Borderline' },
  { level: 220, color: '#B8864F', rgb: { r: 184, g: 134, b: 79 }, description: 'High' },
  { level: 240, color: '#A67C52', rgb: { r: 166, g: 124, b: 82 }, description: 'High' },
  { level: 260, color: '#8B6F47', rgb: { r: 139, g: 111, b: 71 }, description: 'Very high' },
  { level: 280, color: '#7A5F3C', rgb: { r: 122, g: 95, b: 60 }, description: 'Very high' },
  { level: 300, color: '#6B4E31', rgb: { r: 107, g: 78, b: 49 }, description: 'Critical' }
];

/**
 * Creates a canvas with standardized dimensions
 */
function createStandardCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 50;
  return canvas;
}

/**
 * Draws the strip background
 */
function drawBackground(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 200, 50);
}

/**
 * Draws the central reactive zone
 */
function drawTestZone(ctx: CanvasRenderingContext2D, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(75, 15, 50, 20);
}

/**
 * Draws the test zone border
 */
function drawBorder(ctx: CanvasRenderingContext2D): void {
  ctx.strokeStyle = '#CCCCCC';
  ctx.lineWidth = 1;
  ctx.strokeRect(75, 15, 50, 20);
}

/**
 * Generates a reference Canvas image for a cholesterol level
 */
export function generateReferenceImage(level: number): string {
  const canvas = createStandardCanvas();
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Unable to create 2D context');
  }
  
  const cholesterolData = CHOLESTEROL_LEVELS.find(l => l.level === level);
  if (!cholesterolData) {
    throw new Error(`Unsupported cholesterol level: ${level}`);
  }
  
  drawBackground(ctx);
  drawTestZone(ctx, cholesterolData.color);
  drawBorder(ctx);
  
  return canvas.toDataURL();
}

/**
 * Loads an image from a data URL
 */
function loadImage(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageUrl;
  });
}

/**
 * Extracts the central region of an image (20% of surface)
 */
function extractCenterRegion(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext('2d')!;
  const { width, height } = canvas;
  
  const regionWidth = Math.floor(width * 0.2);
  const regionHeight = Math.floor(height * 0.2);
  const startX = Math.floor((width - regionWidth) / 2);
  const startY = Math.floor((height - regionHeight) / 2);
  
  return ctx.getImageData(startX, startY, regionWidth, regionHeight);
}

/**
 * Calculates the average color of an ImageData
 */
function calculateAverageColor(imageData: ImageData): RGB {
  const { data } = imageData;
  let totalR = 0, totalG = 0, totalB = 0, validPixels = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, alpha] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    
    if (alpha > 128) {
      totalR += r;
      totalG += g;
      totalB += b;
      validPixels++;
    }
  }
  
  if (validPixels === 0) {
    throw new Error('No valid pixels found in analysis region');
  }
  
  return {
    r: Math.round(totalR / validPixels),
    g: Math.round(totalG / validPixels),
    b: Math.round(totalB / validPixels)
  };
}

/**
 * Finds the closest reference to a given color
 */
function findClosestMatch(targetColor: RGB): CholesterolLevel {
  let bestMatch = CHOLESTEROL_LEVELS[0];
  let minDistance = Infinity;
  
  for (const level of CHOLESTEROL_LEVELS) {
    const distance = Math.sqrt(
      Math.pow(targetColor.r - level.rgb.r, 2) +
      Math.pow(targetColor.g - level.rgb.g, 2) +
      Math.pow(targetColor.b - level.rgb.b, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = level;
    }
  }
  
  return bestMatch;
}

/**
 * Calculates confidence score based on colorimetric distance
 */
export function calculateConfidence(detected: RGB, reference: RGB): number {
  const distance = Math.sqrt(
    Math.pow(detected.r - reference.r, 2) +
    Math.pow(detected.g - reference.g, 2) +
    Math.pow(detected.b - reference.b, 2)
  );
  
  // Normalization on maximum RGB distance (441 = sqrt(255² + 255² + 255²))
  const normalizedDistance = distance / 441;
  const confidence = Math.max(0, 1 - normalizedDistance);
  
  return Math.round(confidence * 100) / 100;
}

/**
 * Classifies a cholesterol level according to medical standards
 */
function classifyLevel(level: number): string {
  if (level < 200) return 'normal';
  if (level < 240) return 'high';
  return 'critical';
}

/**
 * Analyzes a test image with reference comparison
 */
export async function analyzeWithReference(imageUrl: string): Promise<AnalysisResult> {
  try {
    console.log('🔬 Starting colorimetric analysis...');
    
    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('Invalid or missing image URL');
    }
    
    // Image URL validation
    if (!imageUrl.startsWith('data:image/')) {
      throw new Error('Invalid data URL format');
    }
    
    // Load image
    const img = await loadImage(imageUrl);
    
    // Dimension validation
    if (img.width < 100 || img.height < 50) {
      throw new Error('Image too small for analysis');
    }
    
    // Create canvas for analysis
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Unable to create 2D context for analysis');
    }
    
    ctx.drawImage(img, 0, 0);
    
    // Extract central region
    const centerRegion = extractCenterRegion(canvas);
    const averageColor = calculateAverageColor(centerRegion);
    
    // Find closest match
    const closestMatch = findClosestMatch(averageColor);
    const confidence = calculateConfidence(averageColor, closestMatch.rgb);
    const classification = classifyLevel(closestMatch.level);
    
    console.log(`✅ Analysis complete: ${closestMatch.level} mg/dL (${classification}) - Confidence: ${Math.round(confidence * 100)}%`);
    
    return {
      cholesterolLevel: closestMatch.level,
      confidence,
      classification,
      imageData: imageUrl
    };
    
  } catch (error) {
    console.error('❌ Error during reference analysis:', error);
    throw new Error(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generates all reference images
 */
export function generateAllReferences(): Record<number, string> {
  const references: Record<number, string> = {};
  
  for (const level of CHOLESTEROL_LEVELS) {
    try {
      references[level.level] = generateReferenceImage(level.level);
    } catch (error) {
      console.warn(`⚠️ Error generating reference ${level.level}:`, error);
    }
  }
  
  return references;
}

/**
 * Gets supported cholesterol levels
 */
export function getSupportedLevels(): number[] {
  return CHOLESTEROL_LEVELS.map(l => l.level);
}

/**
 * Gets description for a cholesterol level
 */
export function getLevelDescription(level: number): string {
  const data = CHOLESTEROL_LEVELS.find(l => l.level === level);
  return data?.description || 'Unknown level';
}

/**
 * Validates that a cholesterol level is supported
 */
export function isLevelSupported(level: number): boolean {
  return CHOLESTEROL_LEVELS.some(l => l.level === level);
}

/**
 * Gets RGB color for a given level
 */
export function getRGBForLevel(level: number): RGB | null {
  const data = CHOLESTEROL_LEVELS.find(l => l.level === level);
  return data?.rgb || null;
}