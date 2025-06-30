import React, { memo } from 'react';
import { Eye, Download, Trash2, Calendar, Target } from 'lucide-react';
import { Card, Button } from '../ui';
import type { TestResult } from '../../utils/colorAnalysis';

interface TestCardProps {
  test: TestResult;
  onViewDetails: (test: TestResult) => void;
  onDownloadPDF: (test: TestResult) => void;
  onDelete: (id: string) => void;
}

const TestCard: React.FC<TestCardProps> = memo(({ 
  test, 
  onViewDetails, 
  onDownloadPDF, 
  onDelete 
}) => {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'high': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getClassificationLabel = (classification: string) => {
    switch (classification) {
      case 'normal': return 'Normal';
      case 'high': return 'High';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(timestamp));
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{formatDate(test.timestamp)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getClassificationColor(test.classification)}`}>
          {getClassificationLabel(test.classification)}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <span className="text-2xl font-montserrat font-bold text-gray-800">
            {test.cholesterolValue}
          </span>
          <span className="text-text-secondary">mg/dL</span>
        </div>
        <div className="text-sm text-text-secondary">
          Confidence: {Math.round(test.confidence * 100)}%
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(test)}
          className="flex items-center gap-1 flex-1"
        >
          <Eye className="w-4 h-4" />
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDownloadPDF(test)}
          className="flex items-center gap-1 flex-1"
        >
          <Download className="w-4 h-4" />
          PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(test.id)}
          className="flex items-center gap-1 text-red-600 hover:bg-red-50 border-red-200"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
});

TestCard.displayName = 'TestCard';

export default TestCard;