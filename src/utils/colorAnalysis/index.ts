// Exports principaux du module d'analyse colorimétrique
export { analyzeStripColor } from './analyzer';
export { validateImageForAnalysis } from './imageProcessing';
export { getAnalysisStats } from './stats';
export { classifyResult } from './classification';
export { rgbToHex } from './colorMatching';

// Exports des types
export type { 
  TestResult, 
  RGB, 
  ColorCalibrationPoint, 
  ResultClassification,
  AnalysisStats 
} from './types';

// Export de la table de calibration
export { CHOLESTEROL_COLOR_MAP } from './calibration';