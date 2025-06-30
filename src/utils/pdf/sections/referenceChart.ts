import jsPDF from 'jspdf';
import { PDF_LAYOUT, TEXT_STYLES } from '../config';
import { checkPageBreak } from '../utils';
import type { PDFConfig } from '../types';

/**
 * Adds reference chart with pagination management
 */
export const addReferenceChart = (
  doc: jsPDF,
  config: PDFConfig,
  value: number,
  yPos: number
): number => {
  const { colors } = config;
  const { margin, contentWidth } = PDF_LAYOUT;
  
  const chartHeight = 35; // Total chart height with legends
  
  // Check if we need a new page
  let currentY = checkPageBreak(doc, config, yPos, chartHeight);
  
  // Section title
  doc.setFontSize(TEXT_STYLES.sectionHeader.size);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', TEXT_STYLES.sectionHeader.weight);
  doc.text('Reference Values', margin, currentY);
  
  // Separator line
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY + 2, margin + contentWidth, currentY + 2);
  
  const chartY = currentY + 12;
  const barWidth = contentWidth;
  const barHeight = 12;
  
  // Colored zones with exact proportions
  const normalWidth = (170/300) * barWidth;
  const elevatedWidth = ((240-170)/300) * barWidth;
  const criticalWidth = ((300-240)/300) * barWidth;
  
  // Normal zone (< 170) - Green
  doc.setFillColor(16, 185, 129);
  doc.rect(margin, chartY, normalWidth, barHeight, 'F');
  
  // High zone (170-240) - Orange
  doc.setFillColor(245, 158, 11);
  doc.rect(margin + normalWidth, chartY, elevatedWidth, barHeight, 'F');
  
  // Critical zone (> 240) - Red
  doc.setFillColor(239, 68, 68);
  doc.rect(margin + normalWidth + elevatedWidth, chartY, criticalWidth, barHeight, 'F');
  
  // Chart border
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(margin, chartY, barWidth, barHeight);
  
  // Current value indicator
  const valuePosition = Math.min(value/300, 1) * barWidth;
  doc.setFillColor(0, 0, 0);
  
  // Triangle pointing to bar
  const triangleX = margin + valuePosition;
  const triangleY = chartY - 3;
  doc.triangle(
    triangleX - 2, triangleY,
    triangleX + 2, triangleY,
    triangleX, chartY,
    'F'
  );
  
  // Legends aligned under chart
  addChartLegends(doc, config, margin, chartY + barHeight, barWidth, normalWidth, elevatedWidth);
  
  // Return final position
  return chartY + barHeight + 18;
};

/**
 * Adds chart legends with precise alignment
 */
const addChartLegends = (
  doc: jsPDF,
  config: PDFConfig,
  margin: number,
  yPos: number,
  barWidth: number,
  normalWidth: number,
  elevatedWidth: number
): void => {
  const { colors } = config;
  const legendY = yPos + 6;
  const valuesY = yPos + 12;
  
  doc.setFontSize(TEXT_STYLES.small.size);
  doc.setTextColor(...colors.text);
  doc.setFont('helvetica', 'bold');
  
  // Labels centered in each zone
  const normalCenter = margin + normalWidth / 2;
  const elevatedCenter = margin + normalWidth + elevatedWidth / 2;
  const criticalCenter = margin + normalWidth + elevatedWidth + (barWidth - normalWidth - elevatedWidth) / 2;
  
  // Center text
  const normalText = 'Normal';
  const elevatedText = 'High';
  const criticalText = 'Critical';
  
  doc.text(normalText, normalCenter - doc.getTextWidth(normalText)/2, legendY);
  doc.text(elevatedText, elevatedCenter - doc.getTextWidth(elevatedText)/2, legendY);
  doc.text(criticalText, criticalCenter - doc.getTextWidth(criticalText)/2, legendY);
  
  // Centered values
  doc.setFont('helvetica', 'normal');
  const normalValue = '< 170';
  const elevatedValue = '170-240';
  const criticalValue = '> 240 mg/dL';
  
  doc.text(normalValue, normalCenter - doc.getTextWidth(normalValue)/2, valuesY);
  doc.text(elevatedValue, elevatedCenter - doc.getTextWidth(elevatedValue)/2, valuesY);
  doc.text(criticalValue, criticalCenter - doc.getTextWidth(criticalValue)/2, valuesY);
};