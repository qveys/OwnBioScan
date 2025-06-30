/**
 * Types pour la génération de PDF
 */
import type { TestResult, AnalysisStats } from '../colorAnalysis';

export interface PDFConfig {
  pageWidth: number;
  pageHeight: number;
  colors: {
    primary: [number, number, number];
    accent: [number, number, number];
    text: [number, number, number];
    lightGray: [number, number, number];
  };
}

export interface PDFSection {
  title: string;
  yPosition: number;
  height: number;
}

export interface PDFGenerationOptions {
  testResult: TestResult;
  stats: AnalysisStats;
  openInNewTab?: boolean;
}