import React, { memo } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, AnimatedSection } from '../ui';
import type { AnalysisStats } from '../../utils/colorAnalysis';

interface ResultInterpretationProps {
  stats: AnalysisStats;
}

const ResultInterpretation: React.FC<ResultInterpretationProps> = memo(({ stats }) => (
  <AnimatedSection animation="slide-in-left" delay={0.2}>
    <Card className="mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-montserrat font-bold uppercase mb-3">
            Result Interpretation
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {stats.classification.advice}
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Reference values:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Normal: &lt; 170 mg/dL</li>
              <li>• High: 170-240 mg/dL</li>
              <li>• Critical: &gt; 240 mg/dL</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  </AnimatedSection>
));

ResultInterpretation.displayName = 'ResultInterpretation';

export default ResultInterpretation;