import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import type { PDFConfig } from '../types';
import type { TestResult } from '../../colorAnalysis';

/**
 * Adds test information
 */
export const addTestInfo = (
  doc: jsPDF, 
  config: PDFConfig, 
  testResult: TestResult, 
  yPos: number
): number => {
  const { colors } = config;
  const { margin, lineHeight, contentWidth } = PDF_LAYOUT;
  
  // Section title
  doc.setFontSize(TEXT_STYLES.sectionHeader.size);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', TEXT_STYLES.sectionHeader.weight);
  doc.text('Test Information', margin, yPos);
  
  // Separator line under title
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos + 2, margin + contentWidth, yPos + 2);
  
  // Content with precise alignment
  doc.setFontSize(TEXT_STYLES.body.size);
  doc.setTextColor(...colors.text);
  doc.setFont('helvetica', TEXT_STYLES.body.weight);
  
  const testDate = new Date(testResult.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const infoItems = [
    { label: 'Test date:', value: testDate },
    { label: 'Test ID:', value: testResult.id },
    { label: 'Analysis confidence:', value: `${Math.round(testResult.confidence * 100)}%` }
  ];
  
  let currentY = yPos + 8;
  infoItems.forEach((item) => {
    // Bold label
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, margin, currentY);
    
    // Normal value, aligned after label
    doc.setFont('helvetica', 'normal');
    const labelWidth = doc.getTextWidth(item.label);
    doc.text(item.value, margin + labelWidth + 3, currentY);
    
    currentY += lineHeight;
  });
  
  // Return final Y position
  return currentY + 5;
};