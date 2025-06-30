import React, { memo } from 'react';
import { Card } from '../ui';

const LoadingState: React.FC = memo(() => (
  <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white flex items-center justify-center">
    <Card className="text-center p-8 max-w-md mx-auto">
      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
      <h3 className="text-xl font-montserrat font-bold uppercase mb-2">
        Analysis in progress...
      </h3>
      <p className="text-text-secondary">
        Our AI is analyzing your test strip
      </p>
    </Card>
  </div>
));

LoadingState.displayName = 'LoadingState';

export default LoadingState;