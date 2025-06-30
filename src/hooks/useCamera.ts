import { useState, useRef, useEffect, useCallback } from 'react';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  cameraStream: MediaStream | null;
  capturedImage: string | null;
  error: string | null;
  isLoading: boolean;
  isCapturing: boolean;
  isVideoReady: boolean;
  startCamera: (facingMode?: 'user' | 'environment') => void;
  captureImage: () => void;
  retakePhoto: () => void;
  stopCamera: () => void;
  switchCamera: () => void;
  hasMultipleCameras: boolean;
}

export const useCamera = (): UseCameraReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [currentFacingMode, setCurrentFacingMode] = useState<'user' | 'environment'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [shouldInitialize, setShouldInitialize] = useState<'user' | 'environment' | null>(null);

  // Detect available cameras
  const detectCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasMultipleCameras(videoDevices.length > 1);
      console.log(`📱 ${videoDevices.length} camera(s) detected`);
    } catch (error) {
      console.warn('Unable to detect cameras:', error);
    }
  }, []);

  // Stable function to stop camera
  const stopCamera = useCallback(() => {
    console.log('🧹 Stopping camera...');
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log(`🔴 Track ${track.kind} stopped`);
      });
      cameraStreamRef.current = null;
    }
    
    // Clean all states
    setCameraStream(null);
    setIsVideoReady(false);
    setShouldInitialize(null);
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Optimized constraints for mobile
  const getCameraConstraints = useCallback((facingMode: 'user' | 'environment') => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      video: {
        facingMode: { ideal: facingMode },
        width: { 
          ideal: isMobile ? 1280 : 1920, 
          min: 640,
          max: isMobile ? 1920 : 3840
        },
        height: { 
          ideal: isMobile ? 720 : 1080, 
          min: 480,
          max: isMobile ? 1080 : 2160
        },
        frameRate: { ideal: 30, max: 60 }
      }
    };
  }, []);

  // Internal camera initialization function
  const initializeCamera = useCallback(async (facingMode: 'user' | 'environment' = 'environment') => {
    console.log('🎥 Initializing camera with mode:', facingMode);
    
    // Check video element availability
    if (!videoRef.current) {
      console.error('❌ Video element not available');
      setError('Video element not available');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setIsVideoReady(false);
      
      // Stop existing stream
      if (cameraStreamRef.current) {
        stopCamera();
      }
      
      // Check getUserMedia availability
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('getUserMedia not supported in this browser');
      }

      // Detect available cameras
      await detectCameras();

      console.log('📱 Requesting camera access...');
      
      const constraints = getCameraConstraints(facingMode);
      let stream: MediaStream;

      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('✅ Stream obtained:', stream.getTracks().length, 'tracks');
      } catch (err) {
        // Fallback with simplified constraints
        console.warn('⚠️ Fallback to simplified constraints');
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { min: 640 },
            height: { min: 480 }
          }
        });
      }
      
      // Check video element still available after async operation
      if (!videoRef.current) {
        console.error('❌ Video element not available after getUserMedia');
        // Stop obtained stream to avoid leaks
        stream.getTracks().forEach(track => track.stop());
        setError('Video element not available');
        return;
      }
      
      // Update refs
      cameraStreamRef.current = stream;
      setCurrentFacingMode(facingMode);
      
      // Video configuration
      const video = videoRef.current;
      console.log('📺 Configuring video...');
      
      // Optimized configuration for mobile
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.muted = true;
      video.autoplay = true;
      
      // Promise to wait for video readiness
      const videoReadyPromise = new Promise<void>((resolve, reject) => {
        let resolved = false;
        
        const onLoadedMetadata = () => {
          if (resolved) return;
          resolved = true;
          console.log('📺 Video metadata loaded');
          cleanup();
          resolve();
        };
        
        const onCanPlay = () => {
          if (resolved) return;
          resolved = true;
          console.log('▶️ Video ready to play');
          cleanup();
          resolve();
        };
        
        const onError = (e: Event) => {
          if (resolved) return;
          resolved = true;
          console.error('❌ Video error:', e);
          cleanup();
          reject(new Error('Error loading video'));
        };
        
        const cleanup = () => {
          video.removeEventListener('loadedmetadata', onLoadedMetadata);
          video.removeEventListener('canplay', onCanPlay);
          video.removeEventListener('error', onError);
        };
        
        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);
        
        // Safety timeout
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            console.log('⏰ Timeout - continue without waiting');
            cleanup();
            resolve();
          }
        }, 5000);
      });
      
      // Assign stream
      video.srcObject = stream;
      
      try {
        // Wait for video readiness
        await videoReadyPromise;
        
        // Check video element still available
        if (!videoRef.current) {
          console.error('❌ Video element not available after videoReadyPromise');
          return;
        }
        
        // Start playback
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('▶️ Video playing');
        }
        
        // Update states AFTER everything is ready
        setCameraStream(stream);
        setIsVideoReady(true);
        
        console.log('✅ Camera initialized successfully');
        
      } catch (playError) {
        console.warn('⚠️ Video playback error:', playError);
        // Update states even on playback error
        setCameraStream(stream);
        setIsVideoReady(true);
      }
      
    } catch (err) {
      console.error('❌ Camera initialization failed:', err);
      
      const error = err as Error | DOMException;
      
      if (error.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow access in your browser settings.');
      } else if (error.name === 'NotFoundError') {
        setError('No camera detected on this device.');
      } else if (error.name === 'NotReadableError') {
        setError('Camera is already in use by another application.');
      } else if (error.name === 'OverconstrainedError') {
        setError('Camera constraints cannot be satisfied.');
      } else if (error.name === 'SecurityError') {
        setError('Camera access blocked for security reasons.');
      } else {
        setError(`Unable to access camera: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
      setShouldInitialize(null);
    }
  }, [stopCamera, detectCameras, getCameraConstraints]);

  // Public function to start camera
  const startCamera = useCallback((facingMode: 'user' | 'environment' = 'environment') => {
    console.log('🚀 Camera start request with mode:', facingMode);
    setShouldInitialize(facingMode);
  }, []);

  // Effect to handle initialization when video element is ready
  useEffect(() => {
    if (shouldInitialize && videoRef.current) {
      console.log('🎯 Video element ready, initializing camera...');
      initializeCamera(shouldInitialize);
    }
  }, [shouldInitialize, initializeCamera]);

  // Switch camera (front/back)
  const switchCamera = useCallback(() => {
    const newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    console.log('🔄 Switching camera to:', newFacingMode);
    startCamera(newFacingMode);
  }, [currentFacingMode, startCamera]);

  const captureImage = useCallback(() => {
    console.log('📸 Starting capture...');
    
    if (!videoRef.current || !canvasRef.current || !cameraStreamRef.current) {
      console.error('❌ Required elements missing for capture');
      setError('Required elements missing for capture.');
      return;
    }
    
    setIsCapturing(true);
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Unable to get canvas context');
      }
      
      // Check video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        throw new Error('Video not ready - no dimensions');
      }
      
      console.log('📐 Video dimensions:', video.videoWidth, 'x', video.videoHeight);
      
      // Set canvas size
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { videoWidth, videoHeight } = video;
      
      // Resize if necessary
      if (videoWidth > maxWidth || videoHeight > maxHeight) {
        const ratio = Math.min(maxWidth / videoWidth, maxHeight / videoHeight);
        videoWidth *= ratio;
        videoHeight *= ratio;
      }
      
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      // Improve rendering quality
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      // Capture frame
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.85);
      console.log('✅ Image captured, size:', imageData.length, 'characters');
      
      setCapturedImage(imageData);
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
      
      // Temporary save
      try {
        sessionStorage.setItem('ownbioscan_temp_image', imageData);
        sessionStorage.setItem('ownbioscan_capture_timestamp', new Date().toISOString());
        console.log('💾 Image temporarily saved');
      } catch (storageError) {
        console.warn('⚠️ Temporary save failed:', storageError);
      }
      
      // Stop camera to save battery
      stopCamera();
      
    } catch (captureError) {
      console.error('❌ Capture failed:', captureError);
      setError(`Capture error: ${(captureError as Error).message}`);
    } finally {
      setIsCapturing(false);
    }
  }, [stopCamera]);

  const retakePhoto = useCallback(() => {
    console.log('🔄 Retaking photo...');
    setCapturedImage(null);
    setError(null);
    
    // Clean temporary storage
    try {
      sessionStorage.removeItem('ownbioscan_temp_image');
      sessionStorage.removeItem('ownbioscan_capture_timestamp');
    } catch (storageError) {
      console.warn('⚠️ Temporary storage cleanup failed:', storageError);
    }
    
    // Restart camera
    startCamera(currentFacingMode);
  }, [startCamera, currentFacingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return stopCamera;
  }, [stopCamera]);

  return {
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
    stopCamera,
    switchCamera,
    hasMultipleCameras
  };
};