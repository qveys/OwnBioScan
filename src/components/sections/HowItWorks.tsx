import React, { memo, useMemo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_CONTENT } from '../../data/content';
import { Section, Card } from '../ui';

const StepCard: React.FC<{
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  index: number;
}> = memo(({ icon: Icon, title, description, index }) => {
  const animationDelay = useMemo(() => `${index * 0.2}s`, [index]);
  
  return (
    <Card 
      className="hover:-translate-y-2 transform duration-300 animate-fade-in-up gpu-accelerated" 
      style={{ animationDelay }}
    >
      <div className="mb-6 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl text-center font-montserrat font-bold uppercase mb-3">{title}</h3>
      <p className="text-text-secondary text-center max-w-xs mx-auto">{description}</p>
    </Card>
  );
});

StepCard.displayName = 'StepCard';

const HowItWorks: React.FC = memo(() => {
  const { title, description, steps } = HOW_IT_WORKS_CONTENT;

  const stepCards = useMemo(() => 
    steps.map((step, index) => (
      <StepCard
        key={step.title}
        icon={step.icon}
        title={step.title}
        description={step.description}
        index={index}
      />
    )), [steps]
  );

  const handleWatchClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Watch video clicked');
  }, []);

  return (
    <Section id="how-it-works" title={title} description={description}>
      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {stepCards}
        </div>
      </div>
      <div className="mt-16 text-center">
        <button 
          onClick={handleWatchClick}
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium group transition-all duration-classic"
        >
          <span>Watch how it works</span>
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-classic" />
        </button>
      </div>
    </Section>
  );
});

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;