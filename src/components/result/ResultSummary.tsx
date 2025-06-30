import React, { memo } from 'react';
import { Clock, Target } from 'lucide-react';
import { Card, AnimatedSection } from '../ui';
import CircularIndicator from './CircularIndicator';
import ClassificationBadge from './ClassificationBadge';
import type { TestResult, AnalysisStats } from '../../utils/colorAnalysis';

interface ResultSummaryProps {
  result: TestResult;
  stats: AnalysisStats;
}

const ResultSummary: React.FC<ResultSummaryProps> = memo(({ result, stats }) => {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(timestamp));
  };

  return (
    <AnimatedSection animation="fade-in">
      <Card variant="shadow" className="text-center mb-6 md:mb-8 p-4 md:p-8">
        <div className="flex flex-col items-center">
          <CircularIndicator 
            value={result.cholesterolValue}
            classification={result.classification}
            confidence={result.confidence}
            size="md"
          />
          
          <div className="mt-6 space-y-4 w-full">
            <ClassificationBadge 
              classification={result.classification}
              description={stats.classification.description}
            />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDate(result.timestamp)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Confiance: {Math.round(result.confidence * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
});

ResultSummary.displayName = 'ResultSummary';

export default ResultSummary;