import React, { memo, useMemo } from 'react';
import { BENEFITS_CONTENT } from '../../data/content';
import { Section, Card, AnimatedSection } from '../ui';

const BenefitCard: React.FC<{ 
  icon: React.ComponentType<{ className?: string; size?: number }>;
  bgColor: string;
  title: string;
  description: string;
  index: number;
}> = memo(({ icon: Icon, bgColor, title, description, index }) => {
  const delay = useMemo(() => index * 0.1, [index]);
  
  return (
    <AnimatedSection animation="scale-in" delay={delay}>
      <Card>
        <div className={`mb-4 p-3 rounded-full bg-${bgColor}-700 bg-opacity-10 text-primary w-12 h-12 flex items-center justify-center mx-auto gpu-accelerated`}>
          <Icon size={24} className={`text-${bgColor}-900`} />
        </div>
        <h3 className="text-xl font-montserrat font-bold uppercase mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </Card>
    </AnimatedSection>
  );
});

BenefitCard.displayName = 'BenefitCard';

const Benefits: React.FC = memo(() => {
  const { title, description, benefits } = BENEFITS_CONTENT;

  const benefitCards = useMemo(() => 
    benefits.map((benefit, index) => (
      <BenefitCard 
        key={benefit.title}
        icon={benefit.icon}
        bgColor={benefit.bgColor}
        title={benefit.title}
        description={benefit.description}
        index={index}
      />
    )), [benefits]
  );

  return (
    <Section id="benefits" title={title} description={description} background="mint">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {benefitCards}
      </div>
    </Section>
  );
});

Benefits.displayName = 'Benefits';

export default Benefits;