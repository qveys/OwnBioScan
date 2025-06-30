import { generateReferenceImage } from './cholesterolReference';

/**
 * Configuration des images de démonstration
 */
export interface DemoImageConfig {
  level: number;
  label: string;
  description: string;
  classification: 'normal' | 'high' | 'critical';
  color: string;
}

/**
 * Images de test prédéfinies pour le mode démo
 */
export const DEMO_IMAGES: DemoImageConfig[] = [
  {
    level: 160,
    label: 'Normal',
    description: 'Cholestérol normal - Excellent pour la santé cardiovasculaire',
    classification: 'normal',
    color: '#E8D5B7'
  },
  {
    level: 200,
    label: 'Limite',
    description: 'Cholestérol limite - Surveillance recommandée',
    classification: 'high',
    color: '#C49A6B'
  },
  {
    level: 260,
    label: 'Élevé',
    description: 'Cholestérol élevé - Consultation médicale conseillée',
    classification: 'high',
    color: '#8B6F47'
  },
  {
    level: 300,
    label: 'Critique',
    description: 'Cholestérol critique - Intervention médicale urgente',
    classification: 'critical',
    color: '#6B4E31'
  }
];

/**
 * Génère toutes les images de démonstration
 */
export const generateDemoImages = (): Record<number, string> => {
  const images: Record<number, string> = {};
  
  DEMO_IMAGES.forEach(config => {
    try {
      images[config.level] = generateReferenceImage(config.level);
    } catch (error) {
      console.warn(`Erreur génération image démo ${config.level}:`, error);
    }
  });
  
  return images;
};

/**
 * Obtient la configuration d'une image de démo
 */
export const getDemoImageConfig = (level: number): DemoImageConfig | null => {
  return DEMO_IMAGES.find(img => img.level === level) || null;
};

/**
 * Valide qu'un niveau est disponible en mode démo
 */
export const isDemoLevelAvailable = (level: number): boolean => {
  return DEMO_IMAGES.some(img => img.level === level);
};

/**
 * Obtient tous les niveaux disponibles en mode démo
 */
export const getAvailableDemoLevels = (): number[] => {
  return DEMO_IMAGES.map(img => img.level);
};