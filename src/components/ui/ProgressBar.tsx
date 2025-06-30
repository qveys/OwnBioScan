import React, { memo } from 'react';
import { Check } from 'lucide-react';

export interface ProgressStep {
  id: number;
  label: string;
  path: string;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: ProgressStep[];
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = memo(({ 
  currentStep, 
  totalSteps, 
  steps,
  className = '' 
}) => {
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary text-white border-primary';
      case 'current':
        return 'bg-accent text-white border-accent animate-pulse';
      case 'upcoming':
        return 'bg-gray-100 text-gray-400 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-400 border-gray-300';
    }
  };

  const getConnectorStyles = (stepIndex: number) => {
    return stepIndex < currentStep 
      ? 'bg-primary' 
      : 'bg-gray-300';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="flex items-center flex-1 min-w-0">
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div 
                    className={`
                      w-10 h-10 rounded-full border-2 flex items-center justify-center
                      transition-all duration-500 ease-smooth flex-shrink-0
                      ${getStepStyles(status)}
                    `}
                  >
                    {status === 'completed' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-center">
                    <span className={`text-xs font-medium whitespace-nowrap ${
                      status === 'current' ? 'text-accent' : 
                      status === 'completed' ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex-1 mx-3 min-w-0 -mt-6">
                    <div 
                      className={`
                        h-1 rounded-full transition-all duration-700 ease-smooth w-full
                        ${getConnectorStyles(index)}
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;