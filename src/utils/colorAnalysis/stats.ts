import type { TestResult, AnalysisStats } from './types';
import { classifyResult } from './classification';
import { CHOLESTEROL_COLOR_MAP } from './calibration';

/**
 * Obtient des statistiques détaillées sur l'analyse
 */
export function getAnalysisStats(result: TestResult): AnalysisStats {
  const classification = classifyResult(result.cholesterolValue);
  
  return {
    result,
    classification,
    confidenceLevel: result.confidence > 0.8 ? 'Élevée' : 
                    result.confidence > 0.6 ? 'Moyenne' : 'Faible',
    recommendedAction: result.confidence < 0.5 ? 
      'Répéter le test avec une meilleure image' : 
      'Résultat fiable',
    technicalDetails: {
      analysisMethod: 'Correspondance colorimétrique RGB',
      calibrationPoints: CHOLESTEROL_COLOR_MAP.length,
      processingTime: 'Temps réel'
    }
  };
}