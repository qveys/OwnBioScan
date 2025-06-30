import React, { memo } from 'react';
import { BarChart3 } from 'lucide-react';
import type { HistoricalChartProps, TestResult } from './types';

const HistoricalChart: React.FC<HistoricalChartProps> = memo(({ tests, currentValue }) => {
  const maxValue = Math.max(...tests.map(t => t.cholesterolValue), currentValue, 350);
  const minValue = Math.min(...tests.map(t => t.cholesterolValue), currentValue, 0);
  
  // Create chart data with realistic timestamps
  const chartData = [...tests.slice(-6).reverse(), { 
    id: 'current',
    cholesterolValue: currentValue, 
    timestamp: Date.now(),
    classification: currentValue < 170 ? 'normal' : currentValue <= 240 ? 'high' : 'critical',
    confidence: 1,
    imageDataUrl: ''
  } as TestResult];

  // CORRECTED date formatting function
  const formatDate = (timestamp: number, isCurrentTest: boolean = false) => {
    // If it's the current test, always display "Now"
    if (isCurrentTest) {
      return 'Now';
    }
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    
    // Formatting logic based on actual age
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d`;
    if (diffDays < 30) return `${diffWeeks}w`;
    if (diffDays < 365) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return date.toLocaleDateString('en-US', { 
      year: '2-digit',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPointColor = (value: number, isCurrentTest: boolean = false) => {
    const baseColor = value < 170 ? '#10B981' : value <= 240 ? '#F59E0B' : '#EF4444';
    return isCurrentTest ? baseColor : baseColor + '80';
  };

  // Chart dimensions
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Scale functions
  const xScale = (index: number) => (index / (chartData.length - 1)) * innerWidth;
  const yScale = (value: number) => innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;

  // Generate path for the line
  const generatePath = () => {
    return chartData.map((test, index) => {
      const x = xScale(index);
      const y = yScale(test.cholesterolValue);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  // Generate Y-axis labels
  const generateYAxisLabels = () => {
    const step = 25;
    const labels = [];
    for (let i = Math.ceil(minValue / step) * step; i <= maxValue; i += step) {
      labels.push(i);
    }
    return labels;
  };

  const yAxisLabels = generateYAxisLabels();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Cholesterol Evolution
        </h4>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {chartData.length} test{chartData.length > 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        {/* Reference zones legend */}
        <div className="mb-6">
          <div className="flex justify-center gap-6 text-xs font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Normal (&lt;170)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-700">High (170-240)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-700">Critical (&gt;240)</span>
            </div>
          </div>
        </div>
        
        {/* SVG Chart */}
        <div className="flex justify-center">
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            {/* Background reference zones */}
            <defs>
              <pattern id="normalZone" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#10B981" opacity="0.05"/>
              </pattern>
              <pattern id="elevatedZone" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#F59E0B" opacity="0.05"/>
              </pattern>
              <pattern id="criticalZone" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#EF4444" opacity="0.05"/>
              </pattern>
            </defs>
            
            {/* Reference zones backgrounds */}
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              {/* Normal zone (0-170) */}
              <rect
                x="0"
                y={yScale(170)}
                width={innerWidth}
                height={innerHeight - yScale(170)}
                fill="url(#normalZone)"
              />
              
              {/* Elevated zone (170-240) */}
              <rect
                x="0"
                y={yScale(240)}
                width={innerWidth}
                height={yScale(170) - yScale(240)}
                fill="url(#elevatedZone)"
              />
              
              {/* Critical zone (240+) */}
              <rect
                x="0"
                y="0"
                width={innerWidth}
                height={yScale(240)}
                fill="url(#criticalZone)"
              />
            </g>
            
            {/* Grid lines */}
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              {yAxisLabels.map(value => (
                <line
                  key={value}
                  x1="0"
                  y1={yScale(value)}
                  x2={innerWidth}
                  y2={yScale(value)}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}
            </g>
            
            {/* Y-axis labels */}
            <g>
              {yAxisLabels.map(value => (
                <text
                  key={value}
                  x={padding.left - 10}
                  y={padding.top + yScale(value) + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6B7280"
                >
                  {value}
                </text>
              ))}
            </g>
            
            {/* Main line */}
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              <path
                d={generatePath()}
                fill="none"
                stroke="#000080"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            
            {/* Data points */}
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              {chartData.map((test, index) => {
                const isCurrentTest = index === chartData.length - 1;
                const x = xScale(index);
                const y = yScale(test.cholesterolValue);
                
                return (
                  <g key={test.id || index}>
                    {/* Point circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isCurrentTest ? 8 : 5}
                      fill={getPointColor(test.cholesterolValue, isCurrentTest)}
                      stroke="white"
                      strokeWidth={isCurrentTest ? 3 : 2}
                    />
                    
                    {/* Value label above point */}
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight={isCurrentTest ? "bold" : "normal"}
                      fill={isCurrentTest ? "#000080" : "#374151"}
                    >
                      {test.cholesterolValue}
                    </text>
                    
                    {/* Current test indicator */}
                    {isCurrentTest && (
                      <text
                        x={x}
                        y={y - 30}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#000080"
                      >
                        CURRENT
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
            
            {/* X-axis labels */}
            <g>
              {chartData.map((test, index) => {
                const x = padding.left + xScale(index);
                const isCurrentTest = index === chartData.length - 1;
                
                return (
                  <text
                    key={test.id || index}
                    x={x}
                    y={chartHeight - 10}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isCurrentTest ? "bold" : "normal"}
                    fill={isCurrentTest ? "#000080" : "#6B7280"}
                  >
                    {formatDate(test.timestamp, isCurrentTest)}
                  </text>
                );
              })}
            </g>
            
            {/* Reference lines for key thresholds */}
            <g transform={`translate(${padding.left}, ${padding.top})`}>
              <line
                x1="0"
                y1={yScale(170)}
                x2={innerWidth}
                y2={yScale(170)}
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <line
                x1="0"
                y1={yScale(240)}
                x2={innerWidth}
                y2={yScale(240)}
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </g>
            
            {/* Threshold labels */}
            <text
              x={chartWidth - 5}
              y={padding.top + yScale(170) - 5}
              textAnchor="end"
              fontSize="10"
              fill="#10B981"
              fontWeight="bold"
            >
              170 mg/dL
            </text>
            <text
              x={chartWidth - 5}
              y={padding.top + yScale(240) - 5}
              textAnchor="end"
              fontSize="10"
              fill="#EF4444"
              fontWeight="bold"
            >
              240 mg/dL
            </text>
          </svg>
        </div>
        
        {/* Chart insights */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            The line shows your cholesterol evolution over time. 
            Colored zones indicate normal, high, and critical value ranges.
          </p>
        </div>
      </div>
    </div>
  );
});

HistoricalChart.displayName = 'HistoricalChart';

export default HistoricalChart;