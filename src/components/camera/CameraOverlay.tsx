import React, { memo } from 'react';
import { CAMERA_CAPTURE_CONTENT } from '../../data/content';

const CameraOverlay: React.FC = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-80 h-48 border-4 border-white rounded-lg shadow-lg bg-transparent">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-accent rounded-tl-lg"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-accent rounded-tr-lg"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-accent rounded-bl-lg"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-accent rounded-br-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-0.5 bg-white"></div>
            <div className="absolute w-0.5 h-8 bg-white"></div>
          </div>
        </div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-medium text-gray-800">
              {CAMERA_CAPTURE_CONTENT.instructions.frame}
            </p>
            <p className="text-xs text-text-secondary">
              {CAMERA_CAPTURE_CONTENT.instructions.lighting}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
));

CameraOverlay.displayName = 'CameraOverlay';

export default CameraOverlay;