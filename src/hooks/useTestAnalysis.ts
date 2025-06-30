import { useState, useEffect } from 'react';
import { analyzeStripColor, getAnalysisStats } from '../utils/colorAnalysis';
import { saveTestResult } from '../utils/storage';
import type { TestResult, AnalysisStats } from '../utils/colorAnalysis';

interface UseTestAnalysisReturn {
  isAnalyzing: boolean;
  result: TestResult | null;
  stats: AnalysisStats | null;
  error: string | null;
}

export const useTestAnalysis = (): UseTestAnalysisReturn => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [result, setResult] = useState<TestResult | null>(null);
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeImage = async () => {
      try {
        setIsAnalyzing(true);
        setError(null);

        const imageData = localStorage.getItem('capturedTestImage') || 
                         sessionStorage.getItem('ownbioscan_temp_image');
        
        if (!imageData) {
          throw new Error('Aucune image trouvée. Veuillez reprendre le test.');
        }

        console.log('🔬 Début de l\'analyse de l\'image...');
        
        const analysisResult = await analyzeStripColor(imageData);
        const analysisStats = getAnalysisStats(analysisResult);
        
        setResult(analysisResult);
        setStats(analysisStats);
        
        console.log('✅ Analyse terminée:', analysisResult);
        
        // Sauvegarde automatique du résultat
        try {
          saveTestResult(analysisResult);
          console.log('💾 Résultat sauvegardé automatiquement');
        } catch (saveError) {
          console.warn('⚠️ Sauvegarde automatique échouée:', saveError);
          // Ne pas faire échouer l'analyse pour un problème de sauvegarde
        }
        
      } catch (err) {
        console.error('❌ Erreur d\'analyse:', err);
        setError(err instanceof Error ? err.message : 'Erreur d\'analyse inconnue');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeImage();
  }, []);

  return { isAnalyzing, result, stats, error };
};