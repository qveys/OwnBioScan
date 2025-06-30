import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import type { PDFConfig } from '../types';

/**
 * Adds document footer with precise alignment
 */
export const addFooter = (doc: jsPDF, config: PDFConfig): void => {
  const { pageWidth, pageHeight, colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  const footerY = pageHeight - 15;
  
  // Separator line
  doc.setDrawColor(...colors.lightGray);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 8, margin + contentWidth, footerY - 8);
  
  // Footer information
  doc.setFontSize(TEXT_STYLES.small.size);
  doc.setTextColor(...colors.lightGray);
  doc.setFont('helvetica', TEXT_STYLES.small.weight);
  
  const timestamp = new Date().toLocaleString('en-US');
  const leftText = `Generated on ${timestamp} by OwnBioScan`;
  const rightText = 'www.ownbioscan.com';
  
  // Left-aligned text
  doc.text(leftText, margin, footerY);
  
  // Right-aligned text
  const rightTextWidth = doc.getTextWidth(rightText);
  doc.text(rightText, margin + contentWidth - rightTextWidth, footerY);
};