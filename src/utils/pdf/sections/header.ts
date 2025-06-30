import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import type { PDFConfig } from '../types';

/**
 * Adds PDF document header
 */
export const addHeader = (doc: jsPDF, config: PDFConfig): void => {
  const { pageWidth, colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  
  // Logo/Icon (simulated with styled text)
  doc.setFontSize(20);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', 'bold');
  doc.text('🔬', margin, 25);
  
  // Main title - aligned left after icon
  doc.setFontSize(TEXT_STYLES.title.size);
  doc.setTextColor(...colors.primary);
  doc.text('OwnBioScan - Test Report', margin + 15, 25);
  
  // Subtitle - aligned under title
  doc.setFontSize(TEXT_STYLES.subtitle.size);
  doc.setTextColor(...colors.lightGray);
  doc.setFont('helvetica', TEXT_STYLES.subtitle.weight);
  doc.text('Total Cholesterol Analysis', margin + 15, 32);
  
  // Separator line - full width
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.8);
  doc.line(margin, 36, margin + contentWidth, 36);
};