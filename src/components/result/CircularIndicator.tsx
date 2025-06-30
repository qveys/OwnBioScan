import React, { memo, useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Target } from 'lucide-react';

interface CircularIndicatorProps {
  value: number;
  classification: 'normal' | 'high' | 'critical';
  confidence: number;
  size?: 'sm' | 'md' | 'lg';
}

const CircularIndicator: React.FC<CircularIndicatorProps> = memo(({ 
  value, 
  classification, 
  confidence,
  size = 'md'
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const getColorByClassification = (level: string) => {
    switch (level) {
      case 'normal': return { stroke: '#10B981', bg: '#ECFDF5' };
      case 'high': return { stroke: '#F59E0B', bg: '#FFFBEB' };
      case 'critical': return { stroke: '#EF4444', bg: '#FEF2F2' };
      default: return { stroke: '#6B7280', bg: '#F9FAFB' };
    }
  };

  const getIconByClassification = (level: string) => {
    switch (level) {
      case 'normal': return CheckCircle;
      case 'high': return AlertTriangle;
      case 'critical': return XCircle;
      default: return Target;
    }
  };

  const colors = getColorByClassification(classification);
  const Icon = getIconByClassification(classification);
  
  // Significantly larger sizes - increased by ~60-80%
  const sizeConfig = {
    sm: { 
      radius: 40,        // was 25
      strokeWidth: 6,    // was 4
      fontSize: 'text-base',     // was text-sm
      iconSize: 'w-4 h-4',       // was w-3 h-3
      padding: 'p-4',            // was p-2
      svgSize: 120,              // was 70
      containerSize: 120         // new - outer container
    },
    md: { 
      radius: 70,        // was 40
      strokeWidth: 10,   // was 6
      fontSize: 'text-3xl',      // was text-xl
      iconSize: 'w-6 h-6',       // was w-4 h-4
      padding: 'p-8',            // was p-4
      svgSize: 200,              // was 120
      containerSize: 200         // new - outer container
    },
    lg: { 
      radius: 55,        // was 55
      strokeWidth: 14,   // was 8
      fontSize: 'text-4xl',      // was text-2xl
      iconSize: 'w-8 h-8',       // was w-5 h-5
      padding: 'p-12',           // was p-6
      svgSize: 260,              // was 160
      containerSize: 260         // new - outer container
    }
  };
  
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDasharray = `${(animatedValue / 300) * circumference} ${circumference}`;
  const confidenceStroke = `${confidence * circumference} ${circumference}`;

  return (
    <div className="relative flex items-center justify-center">
      <div 
        className={`rounded-full ${config.padding} relative flex items-center justify-center`}
        style={{ 
          backgroundColor: colors.bg,
          width: config.containerSize,
          height: config.containerSize
        }}
      >
        {/* SVG Circle - Positioned absolutely behind content */}
        <svg 
          className="absolute inset-0 transform -rotate-90" 
          width={config.svgSize} 
          height={config.svgSize}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)'
          }}
        >
          {/* Background circle */}
          <circle
            cx={config.svgSize / 2}
            cy={config.svgSize / 2}
            r={config.radius}
            stroke="#E5E7EB"
            strokeWidth={config.strokeWidth}
            fill="none"
          />
          
          {/* Confidence circle (lighter) */}
          <circle
            cx={config.svgSize / 2}
            cy={config.svgSize / 2}
            r={config.radius}
            stroke={colors.stroke}
            strokeWidth={config.strokeWidth / 2}
            fill="none"
            strokeDasharray={confidenceStroke}
            strokeLinecap="round"
            opacity="0.3"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Value circle */}
          <circle
            cx={config.svgSize / 2}
            cy={config.svgSize / 2}
            r={config.radius}
            stroke={colors.stroke}
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-2000 ease-out"
          />
        </svg>
        
        {/* Center content - Properly structured with flex layout */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-1">
          {/* Icon at the top */}
          <Icon 
            className={`${config.iconSize} flex-shrink-0`}
            style={{ color: colors.stroke }}
            aria-hidden="true"
          />
          
          {/* Value in the middle */}
          <div className={`${config.fontSize} font-bold text-gray-800 leading-none`}>
            {animatedValue}
          </div>
          
          {/* Unit below value */}
          <div className="text-sm text-gray-600 leading-none">
            mg/dL
          </div>
          
          {/* Confidence at the bottom */}
          <div className="text-sm text-gray-500 leading-none">
            {Math.round(confidence * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
});

CircularIndicator.displayName = 'CircularIndicator';

export default CircularIndicator;