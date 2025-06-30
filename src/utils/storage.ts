import type { TestResult } from './colorAnalysis';

/**
 * Storage key for test results
 */
const STORAGE_KEY = 'ownbioscan_test_results';
const MAX_RESULTS = 50;

/**
 * Interface for test statistics
 */
export interface TestStats {
  totalTests: number;
  lastTest: Date | null;
  averageValue: number;
}

/**
 * Fallback memory storage if localStorage unavailable
 */
let memoryStorage: TestResult[] = [];
let isLocalStorageAvailable = true;

/**
 * Check localStorage availability
 */
const checkLocalStorageAvailability = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    console.warn('⚠️ localStorage unavailable, using memory storage');
    return false;
  }
};

/**
 * Initialize storage module
 */
const initializeStorage = (): void => {
  isLocalStorageAvailable = checkLocalStorageAvailability();
};

/**
 * Validate test result before saving
 */
const validateTestResult = (testResult: TestResult): boolean => {
  if (!testResult || typeof testResult !== 'object') {
    console.error('❌ Invalid test result: missing object');
    return false;
  }

  const requiredFields = ['id', 'timestamp', 'cholesterolValue', 'classification'];
  for (const field of requiredFields) {
    if (!(field in testResult)) {
      console.error(`❌ Invalid test result: missing field '${field}'`);
      return false;
    }
  }

  if (typeof testResult.cholesterolValue !== 'number' || testResult.cholesterolValue <= 0) {
    console.error('❌ Invalid test result: incorrect cholesterol value');
    return false;
  }

  if (!['normal', 'high', 'critical'].includes(testResult.classification)) {
    console.error('❌ Invalid test result: incorrect classification');
    return false;
  }

  return true;
};

/**
 * Get results from storage
 */
const getStoredResults = (): TestResult[] => {
  if (!isLocalStorageAvailable) {
    return [...memoryStorage];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      console.warn('⚠️ Corrupted storage data, resetting');
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return parsed.filter(validateTestResult);
  } catch (error) {
    console.error('❌ Error reading storage:', error);
    return [];
  }
};

/**
 * Save results to storage
 */
const saveStoredResults = (results: TestResult[]): void => {
  if (!isLocalStorageAvailable) {
    memoryStorage = [...results];
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch (error) {
    console.error('❌ Error saving:', error);
    
    // Fallback to memory storage
    isLocalStorageAvailable = false;
    memoryStorage = [...results];
    
    throw new Error('Unable to save results');
  }
};

/**
 * Save new test result
 */
export const saveTestResult = (testResult: TestResult): void => {
  try {
    console.log('💾 Saving test result:', testResult.id);

    if (!validateTestResult(testResult)) {
      throw new Error('Invalid test result');
    }

    const existingResults = getStoredResults();
    
    // Check if result already exists
    const existingIndex = existingResults.findIndex(r => r.id === testResult.id);
    if (existingIndex !== -1) {
      console.log('🔄 Updating existing result');
      existingResults[existingIndex] = testResult;
    } else {
      // Add new result at beginning
      existingResults.unshift(testResult);
    }

    // Limit to MAX_RESULTS (remove oldest)
    if (existingResults.length > MAX_RESULTS) {
      const removed = existingResults.splice(MAX_RESULTS);
      console.log(`🗑️ Removed ${removed.length} old results`);
    }

    saveStoredResults(existingResults);
    console.log('✅ Result saved successfully');

  } catch (error) {
    console.error('❌ Error saving:', error);
    throw error;
  }
};

/**
 * Get all test results sorted by timestamp descending
 */
export const getTestResults = (): TestResult[] => {
  try {
    const results = getStoredResults();
    
    // Sort by timestamp descending (most recent first)
    return results.sort((a, b) => b.timestamp - a.timestamp);
    
  } catch (error) {
    console.error('❌ Error retrieving results:', error);
    return [];
  }
};

/**
 * Get specific result by ID
 */
export const getTestResult = (id: string): TestResult | null => {
  try {
    if (!id || typeof id !== 'string') {
      console.error('❌ Invalid test ID');
      return null;
    }

    const results = getStoredResults();
    const result = results.find(r => r.id === id);
    
    if (!result) {
      console.log(`ℹ️ No result found for ID: ${id}`);
      return null;
    }

    return result;
    
  } catch (error) {
    console.error('❌ Error retrieving result:', error);
    return null;
  }
};

/**
 * Delete specific result by ID
 */
export const deleteTestResult = (id: string): void => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid test ID');
    }

    console.log('🗑️ Deleting result:', id);

    const results = getStoredResults();
    const filteredResults = results.filter(r => r.id !== id);
    
    if (filteredResults.length === results.length) {
      console.log(`ℹ️ No result found for ID: ${id}`);
      return;
    }

    saveStoredResults(filteredResults);
    console.log('✅ Result deleted successfully');

  } catch (error) {
    console.error('❌ Error deleting:', error);
    throw error;
  }
};

/**
 * Delete all results
 */
export const clearAllResults = (): void => {
  try {
    console.log('🗑️ Deleting all results');

    if (!isLocalStorageAvailable) {
      memoryStorage = [];
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    console.log('✅ All results deleted');

  } catch (error) {
    console.error('❌ Error deleting all:', error);
    throw error;
  }
};

/**
 * Calculate test statistics
 */
export const getTestStats = (): TestStats => {
  try {
    const results = getStoredResults();
    
    if (results.length === 0) {
      return {
        totalTests: 0,
        lastTest: null,
        averageValue: 0
      };
    }

    // Sort by timestamp to get most recent
    const sortedResults = results.sort((a, b) => b.timestamp - a.timestamp);
    const lastTest = new Date(sortedResults[0].timestamp);
    
    // Calculate average cholesterol values
    const totalValue = results.reduce((sum, result) => sum + result.cholesterolValue, 0);
    const averageValue = Math.round(totalValue / results.length);

    return {
      totalTests: results.length,
      lastTest,
      averageValue
    };

  } catch (error) {
    console.error('❌ Error calculating statistics:', error);
    return {
      totalTests: 0,
      lastTest: null,
      averageValue: 0
    };
  }
};

/**
 * Export all results as JSON
 */
export const exportTestResults = (): string => {
  try {
    const results = getTestResults();
    return JSON.stringify(results, null, 2);
  } catch (error) {
    console.error('❌ Error exporting:', error);
    throw new Error('Unable to export results');
  }
};

/**
 * Import results from JSON
 */
export const importTestResults = (jsonData: string): number => {
  try {
    const importedResults = JSON.parse(jsonData);
    
    if (!Array.isArray(importedResults)) {
      throw new Error('Invalid data format');
    }

    const validResults = importedResults.filter(validateTestResult);
    const existingResults = getStoredResults();
    
    // Merge without duplicates (based on ID)
    const mergedResults = [...existingResults];
    let importedCount = 0;
    
    for (const result of validResults) {
      if (!mergedResults.some(r => r.id === result.id)) {
        mergedResults.push(result);
        importedCount++;
      }
    }

    // Sort and limit
    const sortedResults = mergedResults
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_RESULTS);

    saveStoredResults(sortedResults);
    console.log(`✅ ${importedCount} results imported successfully`);
    
    return importedCount;

  } catch (error) {
    console.error('❌ Error importing:', error);
    throw new Error('Unable to import results');
  }
};

// Initialize module on load
initializeStorage();