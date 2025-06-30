import React, { memo } from 'react';
import { RotateCcw, CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { CAMERA_CAPTURE_CONTENT } from '../../data/content';
import { Button } from '../ui';

interface ImagePreviewProps {
  imageData: string;
  onRetake: () => void;
  onAnalyze: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = memo(({ imageData, onRetake, onAnalyze }) => (
  <div className="space-y-6">
    <div className="relative bg-black rounded-lg overflow-hidden">
      <img 
        src={imageData} 
        alt="Captured test strip" 
        className="w-full h-auto max-h-96 object-contain mx-auto"
      />
      <div className="absolute top-4 right-4">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {CAMERA_CAPTURE_CONTENT.states.captured}
        </div>
      </div>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        variant="outline"
        onClick={onRetake}
        className="flex items-center gap-2 px-6 py-3"
      >
        <RotateCcw className="w-5 h-5" />
        {CAMERA_CAPTURE_CONTENT.actions.retake}
      </Button>
      <Button 
        variant="primary"
        size="lg"
        onClick={onAnalyze}
        className="flex items-center gap-2 px-8 py-3"
      >
        <Zap className="w-5 h-5" />
        {CAMERA_CAPTURE_CONTENT.actions.analyze}
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  </div>
));

ImagePreview.displayName = 'ImagePreview';

export default ImagePreview;