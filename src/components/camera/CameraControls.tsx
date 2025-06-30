import React, { memo } from 'react';
import { Camera, Upload, RotateCcw } from 'lucide-react';
import { CAMERA_CAPTURE_CONTENT } from '../../data/content';
import { Button } from '../ui';

interface CameraControlsProps {
  onCapture: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchCamera?: () => void;
  isCapturing: boolean;
  cameraStream: MediaStream | null;
  hasMultipleCameras?: boolean;
}

const CameraControls: React.FC<CameraControlsProps> = memo(({ 
  onCapture, 
  onFileUpload,
  onSwitchCamera,
  isCapturing, 
  cameraStream,
  hasMultipleCameras = false
}) => (
  <div className="flex flex-col items-center gap-6">
    <div className="relative">
      <button
        onClick={onCapture}
        disabled={isCapturing || !cameraStream}
        className="w-20 h-20 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-classic transform hover:scale-105 disabled:transform-none touch-target focus:outline-none focus:ring-4 focus:ring-primary/20"
        aria-label="Capture test strip image"
        type="button"
      >
        <Camera className="w-8 h-8" aria-hidden="true" />
      </button>
      
      {isCapturing && (
        <div className="absolute inset-0 rounded-full border-4 border-accent animate-pulse" />
      )}
    </div>

    <div className="flex flex-col sm:flex-row items-center gap-4">
      {hasMultipleCameras && onSwitchCamera && (
        <Button
          variant="outline"
          onClick={onSwitchCamera}
          className="flex items-center gap-2 touch-target"
          aria-label="Switch camera"
        >
          <RotateCcw className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Switch Camera</span>
        </Button>
      )}

      <div className="text-center">
        <p className="text-text-secondary mb-4 text-sm">
          {CAMERA_CAPTURE_CONTENT.states.fallback}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="hidden"
          id="file-upload"
          aria-label="Select image from gallery"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          className="flex items-center gap-2 touch-target"
          aria-label="Choose image from gallery"
        >
          <Upload className="w-5 h-5" aria-hidden="true" />
          {CAMERA_CAPTURE_CONTENT.actions.upload}
        </Button>
      </div>
    </div>

    <div className="sr-only" aria-live="polite">
      {isCapturing && "Capture in progress..."}
      {!cameraStream && "Camera not available"}
      {cameraStream && !isCapturing && "Camera ready for capture"}
    </div>
  </div>
));

CameraControls.displayName = 'CameraControls';

export default CameraControls;