import React, { memo } from 'react';
import { AlertTriangle, Settings } from 'lucide-react';
import { CAMERA_CAPTURE_CONTENT } from '../../data/content';
import { Button, Card } from '../ui';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = memo(({ error, onRetry }) => (
  <Card variant="highlight" className="bg-red-50 border-red-200 text-center">
    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
    <h3 className="font-montserrat font-bold uppercase text-red-800 mb-2">
      {CAMERA_CAPTURE_CONTENT.errors.title}
    </h3>
    <p className="text-red-700 mb-4">{error}</p>
    <Button 
      variant="primary"
      onClick={onRetry}
      className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 mx-auto"
    >
      <Settings className="w-4 h-4" />
      {CAMERA_CAPTURE_CONTENT.actions.authorize}
    </Button>
  </Card>
));

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;