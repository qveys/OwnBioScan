import React, { memo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { TrendIndicatorProps } from './types';

const TrendIndicator: React.FC<TrendIndicatorProps> = memo(({ trend, size = 'md' }) => {
  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-red-600 bg-red-50 border-red-200';
      case 'down': return 'text-green-600 bg-green-50 border-green-200';
      case 'stable': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Minus;
      default: return Minus;
    }
  };

  const getTrendText = (direction: string, change: number) => {
    switch (direction) {
      case 'up': return `+${change} mg/dL`;
      case 'down': return `${change} mg/dL`;
      case 'stable': return 'Stable';
      default: return 'N/A';
    }
  };

  const Icon = getTrendIcon(trend.direction);
  const colorClasses = getTrendColor(trend.direction);
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colorClasses} whitespace-nowrap`}>
      <Icon className={sizeClass} />
      <span className="font-semibold text-sm">
        {getTrendText(trend.direction, trend.change)}
      </span>
    </div>
  );
});

TrendIndicator.displayName = 'TrendIndicator';

export default TrendIndicator;