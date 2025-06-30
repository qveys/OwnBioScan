import type { TestResult } from '../utils/colorAnalysis';

/**
 * Données d'échantillons historiques fictifs pour démonstration
 * Période : 2020-2023 avec progression réaliste du cholestérol
 */
export const SAMPLE_HISTORICAL_DATA: TestResult[] = [
  {
    id: 'test_2020_03_15_sample1',
    timestamp: new Date('2020-03-15T09:30:00').getTime(),
    cholesterolValue: 185,
    classification: 'high',
    imageDataUrl: 'data:image/jpeg;base64,sample_data_1',
    confidence: 0.92
  },
  {
    id: 'test_2020_09_22_sample2',
    timestamp: new Date('2020-09-22T14:15:00').getTime(),
    cholesterolValue: 195,
    classification: 'high',
    imageDataUrl: 'data:image/jpeg;base64,sample_data_2',
    confidence: 0.88
  },
  {
    id: 'test_2021_05_08_sample3',
    timestamp: new Date('2021-05-08T11:45:00').getTime(),
    cholesterolValue: 210,
    classification: 'high',
    imageDataUrl: 'data:image/jpeg;base64,sample_data_3',
    confidence: 0.91
  },
  {
    id: 'test_2022_01_12_sample4',
    timestamp: new Date('2022-01-12T16:20:00').getTime(),
    cholesterolValue: 165,
    classification: 'normal',
    imageDataUrl: 'data:image/jpeg;base64,sample_data_4',
    confidence: 0.95
  },
  {
    id: 'test_2023_07_30_sample5',
    timestamp: new Date('2023-07-30T10:10:00').getTime(),
    cholesterolValue: 175,
    classification: 'high',
    imageDataUrl: 'data:image/jpeg;base64,sample_data_5',
    confidence: 0.89
  }
];

/**
 * Fonction pour injecter des données d'échantillon dans le localStorage
 * Utile pour les démonstrations et tests
 */
export const injectSampleData = (): void => {
  try {
    const existingData = localStorage.getItem('ownbioscan_test_results');
    const currentData = existingData ? JSON.parse(existingData) : [];
    
    // Fusionner sans doublons (basé sur l'ID)
    const mergedData = [...currentData];
    let addedCount = 0;
    
    SAMPLE_HISTORICAL_DATA.forEach(sample => {
      if (!mergedData.some(test => test.id === sample.id)) {
        mergedData.push(sample);
        addedCount++;
      }
    });
    
    // Trier par timestamp décroissant
    mergedData.sort((a, b) => b.timestamp - a.timestamp);
    
    localStorage.setItem('ownbioscan_test_results', JSON.stringify(mergedData));
    
    console.log(`✅ ${addedCount} échantillons de données historiques ajoutés`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'injection des données d\'échantillon:', error);
  }
};

/**
 * Fonction pour nettoyer les données d'échantillon
 */
export const clearSampleData = (): void => {
  try {
    const existingData = localStorage.getItem('ownbioscan_test_results');
    if (!existingData) return;
    
    const currentData = JSON.parse(existingData);
    const sampleIds = SAMPLE_HISTORICAL_DATA.map(sample => sample.id);
    
    const filteredData = currentData.filter((test: TestResult) => 
      !sampleIds.includes(test.id)
    );
    
    localStorage.setItem('ownbioscan_test_results', JSON.stringify(filteredData));
    
    console.log('✅ Données d\'échantillon supprimées');
    
  } catch (error) {
    console.error('❌ Erreur lors de la suppression des données d\'échantillon:', error);
  }
};

/**
 * Vérifie si des données d'échantillon sont présentes
 */
export const hasSampleData = (): boolean => {
  try {
    const existingData = localStorage.getItem('ownbioscan_test_results');
    if (!existingData) return false;
    
    const currentData = JSON.parse(existingData);
    const sampleIds = SAMPLE_HISTORICAL_DATA.map(sample => sample.id);
    
    return currentData.some((test: TestResult) => sampleIds.includes(test.id));
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification des données d\'échantillon:', error);
    return false;
  }
};