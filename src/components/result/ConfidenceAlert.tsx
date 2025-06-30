import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, Button } from '../ui';

interface ConfidenceAlertProps {
  confidence: number;
  threshold?: number;
}

const ConfidenceAlert: React.FC<ConfidenceAlertProps> = memo(({ 
  confidence, 
  threshold = 0.7 
}) => {
  if (confidence >= threshold) return null;

  return (
    <Card className="mb-6 bg-yellow-50 border-yellow-200 animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800 mb-2">
            Low confidence detected
          </h3>
          <p className="text-yellow-700 text-sm mb-3">
            Image quality or capture conditions may affect result accuracy.
          </p>
          <Button 
            variant="outline"
            href="/capture"
            className="bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700"
          >
            Retake Photo
          </Button>
        </div>
      </div>
    </Card>
  );
});

ConfidenceAlert.displayName = 'ConfidenceAlert';

export default ConfidenceAlert;