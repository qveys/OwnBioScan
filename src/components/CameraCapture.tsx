import React, { useEffect, memo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Camera, RotateCcw } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CAMERA_CAPTURE_CONTENT } from '../data/content';
import { NAVIGATION_STEPS, getBreadcrumbs, getCurrentStep } from '../data/navigation';
import { ProgressBar, Breadcrumbs, LoadingSpinner } from './ui';
import { SuccessAnimation } from './common';
import TestModeSelector from './TestModeSelector';
import {
  CameraOverlay,
  ErrorMessage,
  ImagePreview,
  CameraControls
} from './camera';

const CameraCapture: React.FC = memo(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');
  
  const [mode, setMode] = useState<'selector' | 'camera' | 'demo'>('selector');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    videoRef,
    canvasRef,
    cameraStream,
    capturedImage,
    error,
    isLoading,
    isCapturing,
    isVideoReady,
    startCamera,
    captureImage,
    retakePhoto,
    switchCamera,
    hasMultipleCameras
  } = useCamera();

  const { title, subtitle, tips } = CAMERA_CAPTURE_CONTENT;
  const currentStep = getCurrentStep('/capture');
  const breadcrumbs = getBreadcrumbs('/capture');

  // Check if coming directly in camera mode
  useEffect(() => {
    const directMode = searchParams.get('mode');
    if (directMode === 'camera') {
      console.log('🎥 Direct camera mode activated');
      setMode('camera');
      startCamera();
    } else {
      console.log('🎯 Default selector mode');
    }
  }, [searchParams, startCamera]);

  const handleModeSelect = (selectedMode: 'camera' | 'demo', imageData?: string) => {
    console.log('🔄 Mode selected:', selectedMode);
    
    if (selectedMode === 'camera') {
      setMode('camera');
      console.log('📷 Initializing camera...');
      startCamera();
    } else if (selectedMode === 'demo' && imageData) {
      console.log('🧪 Demo mode with image:', imageData.substring(0, 50) + '...');
      localStorage.setItem('capturedTestImage', imageData);
      localStorage.setItem('captureTimestamp', new Date().toISOString());
      setShowSuccess(true);
      setTimeout(() => navigate('/result'), 1500);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Please choose an image under 10MB.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      localStorage.setItem('capturedTestImage', imageData);
      localStorage.setItem('captureTimestamp', new Date().toISOString());
      setShowSuccess(true);
      
      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }
      
      setTimeout(() => navigate('/result'), 1500);
    };
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = () => {
    if (capturedImage) {
      localStorage.setItem('capturedTestImage', capturedImage);
      localStorage.setItem('captureTimestamp', new Date().toISOString());
      setShowSuccess(true);
      
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      
      setTimeout(() => navigate('/result'), 1500);
    }
  };

  // Show mode selector by default
  if (mode === 'selector') {
    return <TestModeSelector onModeSelect={handleModeSelect} />;
  }

  // Camera interface (normal mode)
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
      {showSuccess && (
        <SuccessAnimation 
          message="Image captured successfully! Analysis in progress..."
          duration={1500}
        />
      )}
      
      <header className="bg-white shadow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/demo" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group touch-target focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
                aria-label="Back to menu"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" aria-hidden="true"></div>
              <h1 className="text-xl md:text-2xl font-montserrat font-bold uppercase text-gray-800">
                Scan Test Strip
              </h1>
            </div>
          </div>
          
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
          
          <ProgressBar 
            currentStep={currentStep}
            totalSteps={NAVIGATION_STEPS.length - 1}
            steps={NAVIGATION_STEPS}
            className="max-w-2xl mx-auto"
          />
        </div>
      </header>

      <main 
        id="main-content"
        className="container mx-auto px-4 md:px-6 py-8 md:py-12"
        role="main"
      >
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-montserrat font-bold uppercase mb-4 text-gray-800 responsive-title">
            {title.main} <span className="text-primary">{title.highlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto responsive-text">
            {subtitle}
          </p>
          
          {isMobile && !isLandscape && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Rotate your device to landscape mode for better capture
              </p>
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          {capturedImage ? (
            <div className="animate-fade-in">
              <ImagePreview 
                imageData={capturedImage}
                onRetake={retakePhoto}
                onAnalyze={analyzeImage}
              />
            </div>
          ) : error ? (
            <div className="animate-fade-in">
              <ErrorMessage error={error} onRetry={startCamera} />
            </div>
          ) : (
            <div 
              className="relative bg-black rounded-lg overflow-hidden aspect-video animate-fade-in"
              role="img"
              aria-label="Camera preview for capturing test strip"
            >
              {/* Video element - always present in DOM */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoReady ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />
              
              {/* Loading overlay - displayed over video */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
                  <LoadingSpinner 
                    size="lg" 
                    color="white" 
                    text="Initializing camera..."
                  />
                </div>
              )}
              
              {/* Video waiting state - displayed if no stream but no error */}
              {!isVideoReady && !isLoading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-sm">
                      {cameraStream ? 'Preparing video...' : 'Waiting for camera...'}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Framing overlay - only if video ready */}
              {isVideoReady && <CameraOverlay />}
              
              {/* Active camera indicator */}
              {isVideoReady && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full" aria-hidden="true"></div>
                  <span>Camera active</span>
                </div>
              )}

              {/* Camera switch button */}
              {hasMultipleCameras && isVideoReady && (
                <button
                  onClick={switchCamera}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all touch-target focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Switch camera"
                  type="button"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Capture controls - only if video ready */}
        {!capturedImage && !error && isVideoReady && (
          <div className="animate-fade-in-up">
            <CameraControls
              onCapture={captureImage}
              onFileUpload={handleFileUpload}
              onSwitchCamera={hasMultipleCameras ? switchCamera : undefined}
              isCapturing={isCapturing}
              cameraStream={cameraStream}
              hasMultipleCameras={hasMultipleCameras}
            />
          </div>
        )}

        <div className="mt-12 max-w-2xl mx-auto animate-fade-in-up">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <h3 className="font-montserrat font-bold uppercase text-blue-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              {tips.title}
            </h3>
            <ul className="space-y-2 text-blue-700" role="list">
              {tips.items.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 group">
                  <span className="text-blue-500 mt-1 group-hover:scale-110 transition-transform" aria-hidden="true">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      </main>
    </div>
  );
});

CameraCapture.displayName = 'CameraCapture';

export default CameraCapture;