import { useState, useEffect, useCallback } from 'react';
import { 
  getTestResults, 
  getTestStats, 
  deleteTestResult, 
  clearAllResults 
} from '../utils/storage';
import { generatePDF, openPDFInNewTab } from '../utils/pdf';
import { getAnalysisStats } from '../utils/colorAnalysis';
import type { TestResult } from '../utils/colorAnalysis';

interface UseTestHistoryReturn {
  tests: TestResult[];
  stats: ReturnType<typeof getTestStats>;
  isLoading: boolean;
  error: string | null;
  deleteTest: (id: string) => void;
  clearHistory: () => void;
  downloadPDF: (test: TestResult) => void;
  openPDF: (test: TestResult) => void;
  refreshData: () => void;
}

export const useTestHistory = (): UseTestHistoryReturn => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [stats, setStats] = useState(getTestStats());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);
      
      const testResults = getTestResults();
      const testStats = getTestStats();
      
      setTests(testResults);
      setStats(testStats);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error('Erreur chargement historique:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTest = useCallback((id: string) => {
    try {
      deleteTestResult(id);
      loadData();
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error('Erreur suppression test:', err);
    }
  }, [loadData]);

  const clearHistory = useCallback(() => {
    try {
      clearAllResults();
      loadData();
    } catch (err) {
      setError('Erreur lors de la suppression complète');
      console.error('Erreur suppression historique:', err);
    }
  }, [loadData]);

  const downloadPDF = useCallback((test: TestResult) => {
    try {
      const analysisStats = getAnalysisStats(test);
      generatePDF(test, analysisStats);
    } catch (err) {
      setError('Erreur lors de la génération PDF');
      console.error('Erreur PDF:', err);
    }
  }, []);

  const openPDF = useCallback((test: TestResult) => {
    try {
      const analysisStats = getAnalysisStats(test);
      openPDFInNewTab(test, analysisStats);
    } catch (err) {
      setError('Erreur lors de l\'ouverture PDF');
      console.error('Erreur ouverture PDF:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    tests,
    stats,
    isLoading,
    error,
    deleteTest,
    clearHistory,
    downloadPDF,
    openPDF,
    refreshData: loadData
  };
};