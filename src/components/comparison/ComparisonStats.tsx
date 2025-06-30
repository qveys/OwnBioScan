import React, { memo } from 'react';
import { BarChart3, Target, Minus } from 'lucide-react';
import { Card } from '../ui';
import TrendIndicator from './TrendIndicator';
import type { ComparisonStatsProps } from './types';

const ComparisonStats: React.FC<ComparisonStatsProps> = memo(({ stats, currentValue }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:scale-105 transition-transform">
      <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
      <div className="text-2xl font-bold text-blue-800">{stats.testCount}</div>
      <div className="text-sm text-blue-600 font-medium">Tests performed</div>
    </div>
    
    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:scale-105 transition-transform">
      <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
      <div className="text-2xl font-bold text-purple-800">{stats.average}</div>
      <div className="text-sm text-purple-600 font-medium">Average mg/dL</div>
    </div>
    
    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 hover:scale-105 transition-transform col-span-2 lg:col-span-1">
      <div className="mb-2 flex justify-center min-h-[24px]">
        {stats.trend ? (
          <TrendIndicator trend={stats.trend} size="sm" />
        ) : (
          <div className="flex items-center gap-1 text-gray-500">
            <Minus className="w-5 h-5" />
            <span className="text-sm">N/A</span>
          </div>
        )}
      </div>
      <div className="text-sm text-orange-600 font-medium">Trend</div>
    </div>
  </div>
));

ComparisonStats.displayName = 'ComparisonStats';

export default ComparisonStats;