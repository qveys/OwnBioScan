import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import { getResultColor } from '../utils';
import type { PDFConfig } from '../types';
import type { TestResult, AnalysisStats } from '../../colorAnalysis';

/**
 * Adds main result with visual indicator
 */
export const addMainResult = (
  doc: jsPDF,
  config: PDFConfig,
  testResult: TestResult,
  stats: AnalysisStats,
  yPos: number
): number => {
  const { colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  
  // Section title
  doc.setFontSize(TEXT_STYLES.sectionHeader.size);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', TEXT_STYLES.sectionHeader.weight);
  doc.text('Main Result', margin, yPos);
  
  // Separator line
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos + 2, margin + contentWidth, yPos + 2);
  
  // Two-column layout
  const resultBoxY = yPos + 8;
  const resultBoxWidth = 75;
  const resultBoxHeight = 35;
  const descriptionX = margin + resultBoxWidth + 15;
  
  // Result box - fixed dimensions
  const resultColor = getResultColor(testResult.classification);
  doc.setFillColor(...resultColor);
  doc.roundedRect(margin, resultBoxY, resultBoxWidth, resultBoxHeight, 3, 3, 'F');
  
  // Cholesterol value - centered in box
  doc.setFontSize(TEXT_STYLES.large.size);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', TEXT_STYLES.large.weight);
  
  const valueText = `${testResult.cholesterolValue}`;
  const valueWidth = doc.getTextWidth(valueText);
  const valueX = margin + (resultBoxWidth - valueWidth) / 2;
  doc.text(valueText, valueX, resultBoxY + 18);
  
  // Unit mg/dL - centered under value
  doc.setFontSize(TEXT_STYLES.subtitle.size);
  const unitText = 'mg/dL';
  const unitWidth = doc.getTextWidth(unitText);
  const unitX = margin + (resultBoxWidth - unitWidth) / 2;
  doc.text(unitText, unitX, resultBoxY + 26);
  
  // Classification - centered at bottom of box
  doc.setFontSize(TEXT_STYLES.body.size);
  const classText = stats.classification.description;
  const classWidth = doc.getTextWidth(classText);
  const classX = margin + (resultBoxWidth - classWidth) / 2;
  doc.text(classText, classX, resultBoxY + 32);
  
  // Description on right - vertically aligned
  doc.setFontSize(TEXT_STYLES.body.size);
  doc.setTextColor(...colors.text);
  doc.setFont('helvetica', TEXT_STYLES.body.weight);
  
  const descriptionWidth = contentWidth - resultBoxWidth - 15;
  const lines = doc.splitTextToSize(stats.classification.advice, descriptionWidth);
  
  // Vertically center text relative to box
  const textHeight = lines.length * PDF_LAYOUT.lineHeight;
  const textStartY = resultBoxY + (resultBoxHeight - textHeight) / 2 + 5;
  
  doc.text(lines, descriptionX, textStartY);
  
  // Return final Y position
  return resultBoxY + resultBoxHeight + 10;
};