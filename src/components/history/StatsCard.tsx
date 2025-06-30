import React, { memo } from 'react';
import { Card } from '../ui';

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = memo(({ 
  icon: Icon, 
  title, 
  value, 
  subtitle,
  color = 'text-primary'
}) => (
  <Card className="text-center hover:scale-105 transition-transform duration-300">
    <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
    <h3 className="text-2xl font-montserrat font-bold text-gray-800 mb-1">
      {value}
    </h3>
    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
    {subtitle && (
      <p className="text-xs text-text-secondary">{subtitle}</p>
    )}
  </Card>
));

StatsCard.displayName = 'StatsCard';

export default StatsCard;