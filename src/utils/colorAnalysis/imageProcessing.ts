import type { RGB } from './types';

/**
 * Loads an image from a data URL and returns a canvas
 */
export function loadImageToCanvas(imageDataUrl: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    if (!imageDataUrl.startsWith('data:image/')) {
      reject(new Error('Invalid data URL format'));
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Unable to create 2D canvas context');
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        resolve(canvas);
      } catch (error) {
        reject(new Error(`Error loading image: ${error}`));
      }
    };
    
    img.onerror = () => {
      reject(new Error('Unable to load image from data URL'));
    };
    
    img.src = imageDataUrl;
  });
}

/**
 * Extracts the central region of a canvas (20% of each dimension)
 */
export function extractCenterRegion(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }
  
  const { width, height } = canvas;
  const regionWidth = Math.floor(width * 0.2);
  const regionHeight = Math.floor(height * 0.2);
  const startX = Math.floor((width - regionWidth) / 2);
  const startY = Math.floor((height - regionHeight) / 2);
  
  if (regionWidth < 10 || regionHeight < 10) {
    throw new Error('Image too small for analysis (minimum 50x50 pixels)');
  }
  
  return ctx.getImageData(startX, startY, regionWidth, regionHeight);
}

/**
 * Calculates the average color of a region filtering outlier pixels
 */
export function calculateAverageColor(imageData: ImageData): RGB {
  const { data, width, height } = imageData;
  const totalPixels = width * height;
  
  if (totalPixels === 0) {
    throw new Error('Empty image region');
  }
  
  let totalR = 0, totalG = 0, totalB = 0, validPixels = 0;
  const MIN_BRIGHTNESS = 30, MAX_BRIGHTNESS = 240;
  
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, alpha] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    
    if (alpha < 128) continue;
    
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    
    if (brightness >= MIN_BRIGHTNESS && brightness <= MAX_BRIGHTNESS) {
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
 * Validates that an image is appropriate for analysis
 */
export async function validateImageForAnalysis(imageDataUrl: string): Promise<boolean> {
  try {
    const canvas = await loadImageToCanvas(imageDataUrl);
    
    if (canvas.width < 100 || canvas.height < 100) {
      throw new Error('Image too small (minimum 100x100 pixels)');
    }
    
    if (canvas.width > 4000 || canvas.height > 4000) {
      throw new Error('Image too large (maximum 4000x4000 pixels)');
    }
    
    const centerRegion = extractCenterRegion(canvas);
    calculateAverageColor(centerRegion);
    
    return true;
  } catch (error) {
    console.error('❌ Image validation failed:', error);
    return false;
  }
}