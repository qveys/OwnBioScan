import jsPDF from 'jspdf';
import { PDF_CONFIG } from './config';
import { generateFilename, openPDFBlob, addPageFooter } from './utils';
import {
  addHeader,
  addTestInfo,
  addMainResult,
  addInterpretation,
  addReferenceChart,
  addMedicalDisclaimer
} from './sections';
import type { PDFGenerationOptions } from './types';

/**
 * Generates a complete PDF document with automatic pagination
 */
const createPDFDocument = (options: PDFGenerationOptions): jsPDF => {
  const { testResult, stats } = options;
  const doc = new jsPDF('portrait', 'mm', 'a4');
  
  const config = {
    ...PDF_CONFIG,
    pageWidth: doc.internal.pageSize.getWidth(),
    pageHeight: doc.internal.pageSize.getHeight()
  };
  
  // Build document with dynamic positions
  addHeader(doc, config);
  
  let currentY = 45; // Position after header
  
  // Test information
  currentY = addTestInfo(doc, config, testResult, currentY);
  currentY += 10;
  
  // Main result
  currentY = addMainResult(doc, config, testResult, stats, currentY);
  currentY += 10;
  
  // Interpretation and recommendations
  currentY = addInterpretation(doc, config, stats, currentY);
  currentY += 10;
  
  // Reference chart
  currentY = addReferenceChart(doc, config, testResult.cholesterolValue, currentY);
  currentY += 10;
  
  // Medical disclaimer
  currentY = addMedicalDisclaimer(doc, config, currentY);
  
  // Add footers on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addPageFooter(doc, config, i);
  }
  
  return doc;
};

/**
 * Generates and downloads a PDF report
 */
export const generatePDF = (testResult: any, stats: any): void => {
  try {
    console.log('📄 Generating PDF report...');
    
    const doc = createPDFDocument({ testResult, stats });
    const filename = generateFilename();
    
    doc.save(filename);
    console.log('✅ PDF generated successfully:', filename);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw new Error('Unable to generate PDF report');
  }
};

/**
 * Generates and opens a PDF report in new tab
 */
export const openPDFInNewTab = (testResult: any, stats: any): void => {
  try {
    console.log('📄 Opening PDF report...');
    
    const doc = createPDFDocument({ testResult, stats });
    const pdfBlob = doc.output('blob');
    
    openPDFBlob(pdfBlob);
    console.log('✅ PDF opened in new tab');
    
  } catch (error) {
    console.error('❌ Error opening PDF:', error);
    throw new Error('Unable to open PDF report');
  }
};