import type { ResultClassification } from './types';

/**
 * Classifies a cholesterol result according to medical standards
 * Based on American Heart Association recommendations
 */
export function classifyResult(value: number): ResultClassification {
  if (value < 170) {
    return {
      level: 'normal',
      color: '#10B981',
      description: 'Normal cholesterol',
      advice: 'Excellent! Maintain a balanced diet and regular physical activity to keep this good level.'
    };
  } else if (value <= 240) {
    return {
      level: 'high',
      color: '#F59E0B',
      description: 'High cholesterol',
      advice: 'Attention: your cholesterol is high. Consult your doctor and adopt a diet low in saturated fats.'
    };
  } else {
    return {
      level: 'critical',
      color: '#EF4444',
      description: 'Critical cholesterol',
      advice: 'URGENT: Consult your doctor immediately. This level requires rapid medical attention.'
    };
  }
}