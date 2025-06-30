import React, { memo, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Header, 
  Footer, 
  Hero,
  Benefits,
  HowItWorks,
  TargetUsers,
  Testimonials,
  Audience,
  CtaBanner,
  ErrorBoundary,
  LoadingSpinner
} from './components';
import { initializeAccessibility } from './utils/accessibility';
import { initializePerformanceOptimizations } from './utils/performance';

// Lazy load demo components for better performance
const DemoHome = lazy(() => import('./components/DemoHome'));
const TestGuide = lazy(() => import('./components/TestGuide'));
const CameraCapture = lazy(() => import('./components/CameraCapture'));
const TestResult = lazy(() => import('./components/TestResult'));
const TestHistory = lazy(() => import('./components/TestHistory'));

// Landing page component
const LandingPage = memo(() => (
  <>
    <Header />
    <main id="main-content" role="main">
      <Hero />
      <Benefits />
      <HowItWorks />
      <TargetUsers />
      <Testimonials />
      <Audience />
      <CtaBanner />
    </main>
    <Footer />
  </>
));

LandingPage.displayName = 'LandingPage';

// Enhanced loading component
const AppLoadingSpinner = memo(() => (
  <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white flex items-center justify-center">
    <div className="text-center" role="status" aria-live="polite">
      <LoadingSpinner size="lg" color="primary" />
      <p className="mt-4 text-text-secondary font-medium">Chargement de l'application...</p>
      <span className="sr-only">Chargement en cours, veuillez patienter</span>
    </div>
  </div>
));

AppLoadingSpinner.displayName = 'AppLoadingSpinner';

const App: React.FC = memo(() => {
  useEffect(() => {
    initializeAccessibility();
    initializePerformanceOptimizations();
    
    const handlePreferenceChange = () => {
      const preferences = {
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
        prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
      };
      
      document.documentElement.classList.toggle('reduce-motion', preferences.prefersReducedMotion);
      document.documentElement.classList.toggle('high-contrast', preferences.prefersHighContrast);
      document.documentElement.classList.toggle('dark-mode', preferences.prefersDarkMode);
    };
    
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-color-scheme: dark)')
    ];
    
    mediaQueries.forEach(mq => {
      mq.addEventListener('change', handlePreferenceChange);
    });
    
    handlePreferenceChange();
    
    return () => {
      mediaQueries.forEach(mq => {
        mq.removeEventListener('change', handlePreferenceChange);
      });
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="font-inter text-gray-800 overflow-hidden" lang="fr">
        <BrowserRouter>
          <Suspense fallback={<AppLoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/demo" element={<DemoHome />} />
              <Route path="/guide" element={<TestGuide />} />
              <Route path="/capture" element={<CameraCapture />} />
              <Route path="/result" element={<TestResult />} />
              <Route path="/history" element={<TestHistory />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
});

App.displayName = 'App';

export default App;