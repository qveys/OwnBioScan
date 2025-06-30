import type { PDFConfig } from './types';

/**
 * Configuration par défaut pour la génération PDF
 */
export const PDF_CONFIG: PDFConfig = {
  pageWidth: 210, // A4 width in mm
  pageHeight: 297, // A4 height in mm
  colors: {
    primary: [0, 0, 128], // Navy blue
    accent: [102, 0, 0], // Blood red
    text: [51, 51, 51], // Dark gray
    lightGray: [128, 128, 128]
  }
};

/**
 * Constantes pour les positions et dimensions
 */
export const PDF_LAYOUT = {
  margin: 20,
  lineHeight: 6,
  sectionSpacing: 12,
  headerHeight: 35,
  footerHeight: 25,
  contentWidth: 170, // pageWidth - 2 * margin
  columnGap: 10,
  maxContentHeight: 252, // pageHeight - headerHeight - footerHeight - margins
  pageBreakThreshold: 30 // Espace minimum avant saut de page
};

/**
 * Styles de texte prédéfinis
 */
export const TEXT_STYLES = {
  title: { size: 18, weight: 'bold' as const },
  subtitle: { size: 12, weight: 'normal' as const },
  sectionHeader: { size: 14, weight: 'bold' as const },
  body: { size: 10, weight: 'normal' as const },
  small: { size: 8, weight: 'normal' as const },
  large: { size: 24, weight: 'bold' as const },
  medium: { size: 16, weight: 'bold' as const }
};