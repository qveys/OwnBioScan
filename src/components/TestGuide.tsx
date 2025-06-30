import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertTriangle,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { TEST_GUIDE_CONTENT } from '../data/content';
import { NAVIGATION_STEPS, getBreadcrumbs, getCurrentStep } from '../data/navigation';
import { Button, Card, ProgressBar, Breadcrumbs } from './ui';
import { useNavigation } from '../hooks/useNavigation';

const GuideStep: React.FC<{ 
  stepNumber: number; 
  icon: React.ComponentType<{ className?: string; size?: number }>; 
  title: string; 
  description: string;
}> = memo(({ stepNumber, icon: Icon, title, description }) => (
  <Card className="hover:-translate-y-1 group transition-all duration-300 hover:shadow-lg">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
            {stepNumber}
          </div>
          <h3 className="font-montserrat font-bold uppercase text-lg text-gray-800">
            {title}
          </h3>
        </div>
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </Card>
));

GuideStep.displayName = 'GuideStep';

const ImportantTip: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
  <div className="flex items-start gap-3 group">
    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
    <span className="text-gray-700">{children}</span>
  </div>
));

ImportantTip.displayName = 'ImportantTip';

const TestGuide: React.FC = memo(() => {
  const { title, subtitle, badge, steps, tips } = TEST_GUIDE_CONTENT;
  const { goBack } = useNavigation();
  
  const currentStep = getCurrentStep('/guide');
  const breadcrumbs = getBreadcrumbs('/guide');

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/20 to-white">
      <header className="bg-white shadow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-montserrat font-bold uppercase text-gray-800">
                Sample Collection Guide
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
        <div className="text-center mb-12 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold uppercase mb-6 text-gray-800">
              {title.main} <span className="text-primary">{title.highlight}</span>
            </h2>
            <p className="text-xl text-text-secondary mb-4">
              {subtitle}
            </p>
            <div className="inline-flex items-center gap-2 bg-mint bg-opacity-50 px-4 py-2 rounded-full animate-pulse">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{badge}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GuideStep
                stepNumber={step.stepNumber}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-12 rounded-r-lg animate-fade-in">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 animate-pulse" />
            <h3 className="font-montserrat font-bold uppercase text-orange-800">
              {tips.title}
            </h3>
          </div>
          <div className="space-y-3 ml-9">
            {tips.items.map((tip, index) => (
              <ImportantTip key={index}>
                {tip}
              </ImportantTip>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up">
          <Button 
            variant="outline"
            onClick={goBack}
            className="flex items-center gap-2 px-6 py-3 group hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-center sm:text-right">
              <p className="text-sm text-text-secondary mb-1">Ready to continue?</p>
              <p className="text-xs text-text-secondary">Make sure you have all necessary materials</p>
            </div>
            <Button 
              variant="primary"
              size="lg"
              href="/capture"
              className="flex items-center gap-2 px-8 py-3 group hover:scale-105 transition-all duration-300"
            >
              I Understand, Continue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 text-text-secondary">
            <span className="text-sm">Need help?</span>
            <button className="text-primary hover:text-primary/80 font-medium text-sm underline hover:scale-105 transition-all duration-300">
              Watch demo video
            </button>
          </div>
        </div>
      </main>
    </div>
  );
});

TestGuide.displayName = 'TestGuide';

export default TestGuide;