import React, { memo } from 'react';
import { TestTube, ArrowRight } from 'lucide-react';
import { Card, Button } from '../ui';

const EmptyState: React.FC = memo(() => (
  <Card className="text-center py-12 max-w-md mx-auto">
    <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
      <TestTube className="w-10 h-10 text-primary" />
    </div>
    <h3 className="text-xl font-montserrat font-bold uppercase mb-3 text-gray-800">
      No Tests Recorded
    </h3>
    <p className="text-text-secondary mb-6 leading-relaxed">
      You haven't performed any cholesterol tests yet. 
      Start now to monitor your cardiovascular health.
    </p>
    <Button 
      variant="primary"
      href="/demo"
      className="flex items-center gap-2 mx-auto"
    >
      Take Your First Test
      <ArrowRight className="w-5 h-5" />
    </Button>
  </Card>
));

EmptyState.displayName = 'EmptyState';

export default EmptyState;