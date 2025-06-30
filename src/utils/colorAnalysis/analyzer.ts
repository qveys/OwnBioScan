import type { TestResult } from './types';
import { analyzeWithReference } from '../../data/cholesterolReference';
import { loadImageToCanvas, extractCenterRegion, calculateAverageColor } from './imageProcessing';
import { findClosestColorMatch, calculateConfidenceScore } from './colorMatching';
import { classifyResult } from './classification';

/**
 * Generates a unique ID for a test
 */
function generateTestId(): string {
  return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Analyzes a test strip image and returns cholesterol result
 */
export async function analyzeStripColor(imageDataUrl: string): Promise<TestResult> {
  try {
    console.log('🔬 Starting colorimetric analysis...');
    
    if (!imageDataUrl || typeof imageDataUrl !== 'string') {
      throw new Error('Invalid or missing image URL');
    }
    
    // Use new reference analysis system
    const analysisResult = await analyzeWithReference(imageDataUrl);
    
    console.log(`✅ Result: ${analysisResult.cholesterolLevel} mg/dL (${analysisResult.classification})`);
    
    return {
      id: generateTestId(),
      timestamp: Date.now(),
      cholesterolValue: analysisResult.cholesterolLevel,
      classification: analysisResult.classification as 'normal' | 'high' | 'critical',
      imageDataUrl,
      confidence: analysisResult.confidence
    };
    
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    
    // Fallback to old system on error
    try {
      console.log('🔄 Using fallback system...');
      
      const canvas = await loadImageToCanvas(imageDataUrl);
      const centerRegion = extractCenterRegion(canvas);
      const averageColor = calculateAverageColor(centerRegion);
      
      const { match, distance } = findClosestColorMatch(averageColor);
      const confidence = calculateConfidenceScore(distance);
      const classification = classifyResult(match.cholesterol);
      
      return {
        id: generateTestId(),
        timestamp: Date.now(),
        cholesterolValue: match.cholesterol,
        classification: classification.level,
        imageDataUrl,
        confidence
      };
      
    } catch (fallbackError) {
      console.error('❌ Fallback system error:', fallbackError);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Analysis failed: ${errorMessage}`);
    }
  }
}