import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle } from 'lucide-react';
import { useTestAnalysis } from '../hooks/useTestAnalysis';
import { NAVIGATION_STEPS, getBreadcrumbs, getCurrentStep } from '../data/navigation';
import { ProgressBar, Breadcrumbs, Button, Card } from './ui';
import { SuccessAnimation } from './common';
import TestComparison from './TestComparison';
import {
  ResultSummary,
  ConfidenceAlert,
  ResultInterpretation,
  ResultActions,
  MedicalDisclaimer,
  LoadingState
} from './result';

const TestResult: React.FC = memo(() => {
  const { isAnalyzing, result, stats, error } = useTestAnalysis();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const currentStep = getCurrentStep('/result');
  const breadcrumbs = getBreadcrumbs('/result');

  useEffect(() => {
    if (result && !isAnalyzing) {
      setShowSuccess(true);
    }
  }, [result, isAnalyzing]);

  if (isAnalyzing) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
        <header className="bg-white shadow-subtle">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/capture" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-montserrat font-bold uppercase text-gray-800">
                Analysis Error
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <Card variant="highlight" className="bg-red-50 border-red-200 text-center max-w-2xl mx-auto">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-montserrat font-bold uppercase text-red-800 mb-4">
              Analysis Failed
            </h2>
            <p className="text-red-700 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" href="/capture">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retake Photo
              </Button>
              <Button variant="outline" href="/demo">
                Back to Menu
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (!result || !stats) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
      {showSuccess && (
        <SuccessAnimation 
          message="Analysis completed successfully!"
          duration={3000}
          onComplete={() => setShowSuccess(false)}
        />
      )}
      
      <header className="bg-white shadow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link 
                to="/capture" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-montserrat font-bold uppercase text-gray-800">
                Test Results
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
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <ResultSummary result={result} stats={stats} />
        
        <ConfidenceAlert confidence={result.confidence} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ResultInterpretation stats={stats} />
            <TestComparison currentResult={result} />
          </div>

          <div className="space-y-6">
            <ResultActions result={result} stats={stats} />
            <MedicalDisclaimer />
          </div>
        </div>
      </main>
    </div>
  );
});

TestResult.displayName = 'TestResult';

export default TestResult;