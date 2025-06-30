import React, { memo } from 'react';
import { CAMERA_CAPTURE_CONTENT } from '../../data/content';

const LoadingSpinner: React.FC = memo(() => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
    <div className="text-center text-white">
      <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
      <p>{CAMERA_CAPTURE_CONTENT.states.loading}</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;