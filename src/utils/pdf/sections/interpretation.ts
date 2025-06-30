import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import { checkPageBreak, calculateTextHeight } from '../utils';
import type { PDFConfig } from '../types';
import type { AnalysisStats } from '../../colorAnalysis';

/**
 * Adds detailed interpretation with pagination management
 */
export const addInterpretation = (
  doc: jsPDF,
  config: PDFConfig,
  stats: AnalysisStats,
  yPos: number
): number => {
  const { colors } = config;
  const { margin, lineHeight, contentWidth } = PDF_LAYOUT;
  
  // Calculate total height needed
  const advice = stats.classification.advice;
  const adviceHeight = calculateTextHeight(doc, advice, contentWidth);
  const recommendationsHeight = 50; // Estimation for recommendations
  const totalHeight = adviceHeight + recommendationsHeight + 20;
  
  // Check if we need a new page
  let currentY = checkPageBreak(doc, config, yPos, totalHeight);
  
  // Section title
  doc.setFontSize(TEXT_STYLES.sectionHeader.size);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', TEXT_STYLES.sectionHeader.weight);
  doc.text('Interpretation and Recommendations', margin, currentY);
  
  // Separator line
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY + 2, margin + contentWidth, currentY + 2);
  
  currentY += 10;
  
  // Personalized advice
  doc.setFontSize(TEXT_STYLES.body.size);
  doc.setTextColor(...colors.text);
  doc.setFont('helvetica', TEXT_STYLES.body.weight);
  
  const adviceLines = doc.splitTextToSize(advice, contentWidth);
  doc.text(adviceLines, margin, currentY);
  
  currentY += (adviceLines.length * lineHeight) + 8;
  
  // Check if we need a new page for recommendations
  currentY = checkPageBreak(doc, config, currentY, recommendationsHeight);
  
  // General recommendations
  doc.setFont('helvetica', 'bold');
  doc.text('General recommendations:', margin, currentY);
  currentY += 6;
  
  const recommendations = [
    'Maintain a balanced diet low in saturated fats',
    'Practice regular physical activity (30 min/day)',
    'Avoid tobacco and limit alcohol consumption',
    'Consult your doctor for personalized follow-up'
  ];
  
  doc.setFont('helvetica', TEXT_STYLES.body.weight);
  
  recommendations.forEach((rec) => {
    // Check space for each recommendation
    const recHeight = calculateTextHeight(doc, rec, contentWidth - 8) + 2;
    currentY = checkPageBreak(doc, config, currentY, recHeight);
    
    // Aligned bullet
    doc.text('•', margin, currentY);
    
    // Text with indent for alignment
    const textLines = doc.splitTextToSize(rec, contentWidth - 8);
    doc.text(textLines, margin + 6, currentY);
    
    currentY += (textLines.length * lineHeight) + 2;
  });
  
  // Return final Y position for next section
  return currentY + 8;
};