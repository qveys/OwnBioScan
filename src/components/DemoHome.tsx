import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Play, 
  History, 
  TestTube,
  Beaker,
  Database,
  Trash2
} from 'lucide-react';
import { DEMO_HOME_CONTENT } from '../data/content';
import { NAVIGATION_STEPS, getBreadcrumbs, getCurrentStep } from '../data/navigation';
import { Button, Card, ProgressBar, Breadcrumbs, LoadingSpinner } from './ui';
import { useTestHistory } from '../hooks/useTestHistory';
import { injectSampleData, clearSampleData, hasSampleData } from '../data/sampleTestData';

const KeyPoint: React.FC<{ 
  icon: React.ComponentType<{ className?: string; size?: number }>; 
  title: string 
}> = memo(({ icon: Icon, title }) => (
  <Card className="flex items-center gap-3 p-4 hover:scale-105 transition-transform duration-300">
    <div className="text-primary">
      <Icon className="w-6 h-6" />
    </div>
    <span className="font-medium text-gray-800">{title}</span>
  </Card>
));

KeyPoint.displayName = 'KeyPoint';

const Step: React.FC<{
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  stepNumber: number;
}> = memo(({ icon: Icon, title, description, stepNumber }) => (
  <div className="text-center group">
    <div className="relative mb-4">
      <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary group-hover:bg-opacity-20 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
        {stepNumber}
      </div>
    </div>
    <h4 className="font-montserrat font-bold uppercase text-lg mb-2">{title}</h4>
    <p className="text-text-secondary text-sm">{description}</p>
  </div>
));

Step.displayName = 'Step';

const HistorySkeleton: React.FC = memo(() => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} className="p-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-3/5 mx-auto animate-pulse" />
      </Card>
    ))}
  </div>
));

HistorySkeleton.displayName = 'HistorySkeleton';

const DemoHome: React.FC = memo(() => {
  const { title, subtitle, keyPoints, warning, cta, howItWorks } = DEMO_HOME_CONTENT;
  const { stats, isLoading, refreshData } = useTestHistory();
  const [showStats, setShowStats] = useState(false);
  const [sampleDataExists, setSampleDataExists] = useState(false);
  
  const currentStep = getCurrentStep('/demo');
  const breadcrumbs = getBreadcrumbs('/demo');

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 1000);
    setSampleDataExists(hasSampleData());
    return () => clearTimeout(timer);
  }, []);

  const handleInjectSampleData = () => {
    injectSampleData();
    setSampleDataExists(true);
    refreshData();
  };

  const handleClearSampleData = () => {
    clearSampleData();
    setSampleDataExists(false);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
      <header className="bg-white shadow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to home</span>
            </Link>
            <div className="flex items-center gap-2 text-primary">
              <TestTube className="w-6 h-6" />
              <span className="font-montserrat font-bold uppercase">OwnBioScan</span>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold uppercase mb-4 text-gray-800 animate-fade-in">
            {title.main} <span className="text-primary">{title.highlight}</span> {title.suffix}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto animate-fade-in">
            {subtitle}
          </p>
        </div>

        {/* Sample data management section */}
        <div className="mb-8 animate-fade-in">
          <Card className="bg-blue-50 border-blue-200 p-6">
            <div className="flex items-start gap-4">
              <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-montserrat font-bold uppercase text-blue-800 mb-2">
                  Demo Data
                </h3>
                <p className="text-blue-700 text-sm mb-4">
                  {sampleDataExists 
                    ? "Fictional historical data (2020-2023) is currently loaded for demonstration."
                    : "Load fictional historical data to test the evolution chart."
                  }
                </p>
                <div className="flex gap-3">
                  {!sampleDataExists ? (
                    <Button
                      variant="primary"
                      onClick={handleInjectSampleData}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                      <Database className="w-4 h-4" />
                      Load Sample Data
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleClearSampleData}
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Sample Data
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {(isLoading || !showStats) ? (
          <HistorySkeleton />
        ) : stats.totalTests > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
            <Card className="text-center p-4 hover:scale-105 transition-transform duration-300">
              <TestTube className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.totalTests}</div>
              <div className="text-sm text-text-secondary">Tests performed</div>
            </Card>
            <Card className="text-center p-4 hover:scale-105 transition-transform duration-300">
              <History className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{stats.averageValue}</div>
              <div className="text-sm text-text-secondary">mg/dL average</div>
            </Card>
            <Card className="text-center p-4 hover:scale-105 transition-transform duration-300">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <div className="text-sm font-bold text-gray-800">Last test</div>
              <div className="text-xs text-text-secondary">
                {stats.lastTest ? new Date(stats.lastTest).toLocaleDateString('en-US') : 'None'}
              </div>
            </Card>
            <Card className="text-center p-4 hover:scale-105 transition-transform duration-300">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 text-xs">📊</span>
              </div>
              <div className="text-sm font-bold text-gray-800">Tracking</div>
              <div className="text-xs text-text-secondary">Active</div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {keyPoints.map((point, index) => (
            <KeyPoint 
              key={index}
              icon={point.icon}
              title={point.title}
            />
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-12 rounded-r-lg animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">{warning.title}</h3>
              <p className="text-yellow-700">{warning.content}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button 
            variant="primary"
            size="lg"
            href="/capture?mode=camera"
            className="flex items-center justify-center gap-2 px-8 py-4 group hover:scale-105 transition-all duration-300"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cta.primary.text}
          </Button>
          
          <Button 
            variant="accent"
            size="lg"
            href="/capture"
            className="flex items-center justify-center gap-2 px-8 py-4 group hover:scale-105 transition-all duration-300"
          >
            <Beaker className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Test/Demo Mode
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            href={cta.secondary.href}
            className="flex items-center justify-center gap-2 px-8 py-4 group hover:scale-105 transition-all duration-300"
          >
            <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cta.secondary.text}
          </Button>
        </div>

        <Card variant="shadow" padding="lg" className="md:p-12 animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="section-title">{howItWorks.title}</h2>
            <p className="section-description">{howItWorks.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.steps.map((step, index) => (
              <Step
                key={index}
                stepNumber={step.stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>

          <div className="hidden lg:block relative mt-8">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 -translate-y-20"></div>
          </div>
        </Card>
      </main>
    </div>
  );
});

DemoHome.displayName = 'DemoHome';

export default DemoHome;