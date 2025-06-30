/**
 * Types et interfaces pour l'analyse colorimétrique
 */

export interface TestResult {
  id: string;
  timestamp: number;
  cholesterolValue: number;
  classification: 'normal' | 'high' | 'critical';
  imageDataUrl: string;
  confidence: number;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorCalibrationPoint {
  hex: string;
  rgb: RGB;
  cholesterol: number;
  description: string;
}

export interface ResultClassification {
  level: 'normal' | 'high' | 'critical';
  color: string;
  advice: string;
  description: string;
}

export interface AnalysisStats {
  result: TestResult;
  classification: ResultClassification;
  confidenceLevel: string;
  recommendedAction: string;
  technicalDetails: {
    analysisMethod: string;
    calibrationPoints: number;
    processingTime: string;
  };
}