import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import { checkPageBreak } from '../utils';
import type { PDFConfig } from '../types';

/**
 * Adds medical disclaimer with pagination management
 */
export const addMedicalDisclaimer = (
  doc: jsPDF,
  config: PDFConfig,
  yPos: number
): number => {
  const { colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  
  const boxHeight = 28;
  
  // Check if we need a new page
  let currentY = checkPageBreak(doc, config, yPos, boxHeight);
  
  const padding = 5;
  
  // Warning box with rounded border
  doc.setFillColor(255, 237, 213); // Light orange
  doc.setDrawColor(245, 158, 11); // Orange
  doc.setLineWidth(1);
  doc.roundedRect(margin, currentY, contentWidth, boxHeight, 3, 3, 'FD');
  
  // Warning icon and title
  doc.setFontSize(TEXT_STYLES.subtitle.size);
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  
  const warningTitle = '⚠️ MEDICAL DISCLAIMER';
  doc.text(warningTitle, margin + padding, currentY + 8);
  
  // Disclaimer text with justified alignment
  doc.setFontSize(TEXT_STYLES.small.size);
  doc.setTextColor(...colors.text);
  doc.setFont('helvetica', TEXT_STYLES.body.weight);
  
  const disclaimer = 'This test is indicative and does not replace professional medical diagnosis. Results should be confirmed by an accredited medical laboratory. Always consult your doctor for a complete evaluation of your cardiovascular health.';
  
  const textWidth = contentWidth - (2 * padding);
  const lines = doc.splitTextToSize(disclaimer, textWidth);
  
  // Vertically center text in the box
  const textHeight = lines.length * PDF_LAYOUT.lineHeight;
  const textStartY = currentY + 12 + (boxHeight - 12 - textHeight) / 2;
  
  doc.text(lines, margin + padding, textStartY);
  
  // Return final position
  return currentY + boxHeight + 5;
};