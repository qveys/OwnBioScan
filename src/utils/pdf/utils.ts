/**
 * PDF generation utilities
 */
import jsPDF from 'jspdf';
import { PDF_LAYOUT } from './config';
import type { PDFConfig } from './types';

/**
 * Returns RGB color according to classification
 */
export const getResultColor = (classification: string): [number, number, number] => {
  switch (classification) {
    case 'normal': return [16, 185, 129]; // Green
    case 'high': return [245, 158, 11]; // Orange
    case 'critical': return [239, 68, 68]; // Red
    default: return [107, 114, 128]; // Gray
  }
};

/**
 * Generates a filename based on date
 */
export const generateFilename = (): string => {
  const date = new Date().toISOString().split('T')[0];
  return `cholesterol-test-${date}.pdf`;
};

/**
 * Creates a blob URL for PDF and opens it in new tab
 */
export const openPDFBlob = (pdfBlob: Blob): void => {
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
  
  // Clean up URL after delay
  setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
};

/**
 * Checks if new page is needed and adds it if necessary
 */
export const checkPageBreak = (
  doc: jsPDF, 
  config: PDFConfig, 
  currentY: number, 
  requiredHeight: number
): number => {
  const { pageHeight } = config;
  const { footerHeight, margin, pageBreakThreshold } = PDF_LAYOUT;
  
  const availableSpace = pageHeight - footerHeight - margin - currentY;
  
  if (availableSpace < requiredHeight + pageBreakThreshold) {
    // Add new page
    doc.addPage();
    
    // Add header on new page
    addPageHeader(doc, config);
    
    // Return starting Y position for content
    return 50; // Position after header
  }
  
  return currentY;
};

/**
 * Adds simplified header for subsequent pages
 */
export const addPageHeader = (doc: jsPDF, config: PDFConfig): void => {
  const { colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  
  // Simplified title
  doc.setFontSize(14);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', 'bold');
  doc.text('OwnBioScan - Test Report (continued)', margin, 25);
  
  // Separator line
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, 30, margin + contentWidth, 30);
};

/**
 * Adds footer on all pages
 */
export const addPageFooter = (doc: jsPDF, config: PDFConfig, pageNumber: number): void => {
  const { pageWidth, pageHeight, colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  const footerY = pageHeight - 15;
  
  // Separator line
  doc.setDrawColor(...colors.lightGray);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 8, margin + contentWidth, footerY - 8);
  
  // Footer information
  doc.setFontSize(8);
  doc.setTextColor(...colors.lightGray);
  doc.setFont('helvetica', 'normal');
  
  const timestamp = new Date().toLocaleString('en-US');
  const leftText = `Generated on ${timestamp} by OwnBioScan`;
  const rightText = 'www.ownbioscan.com';
  const centerText = `Page ${pageNumber}`;
  
  // Left-aligned text
  doc.text(leftText, margin, footerY);
  
  // Centered page number
  const centerTextWidth = doc.getTextWidth(centerText);
  doc.text(centerText, (pageWidth - centerTextWidth) / 2, footerY);
  
  // Right-aligned text
  const rightTextWidth = doc.getTextWidth(rightText);
  doc.text(rightText, margin + contentWidth - rightTextWidth, footerY);
};

/**
 * Calculates estimated height of text with line breaks
 */
export const calculateTextHeight = (
  doc: jsPDF, 
  text: string, 
  maxWidth: number, 
  lineHeight: number = PDF_LAYOUT.lineHeight
): number => {
  const lines = doc.splitTextToSize(text, maxWidth);
  return lines.length * lineHeight;
};