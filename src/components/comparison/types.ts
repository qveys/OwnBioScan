export interface TrendData {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  previousValue: number;
  change: number;
}

export interface HistoricalStats {
  average: number;
  trend: TrendData | null;
  testCount: number;
  recentTests: TestResult[];
}

export interface TrendIndicatorProps {
  trend: TrendData;
  size?: 'sm' | 'md' | 'lg';
}

export interface ComparisonStatsProps {
  stats: HistoricalStats;
  currentValue: number;
}

export interface HistoricalChartProps {
  tests: TestResult[];
  currentValue: number;
}

import type { TestResult } from '../../utils/colorAnalysis';