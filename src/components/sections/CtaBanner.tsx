import React, { memo } from 'react';
import { CTA_CONTENT } from '../../data/content';
import { Button } from '../ui';

const CtaBanner: React.FC = memo(() => {
  const { title, description, cta, disclaimer } = CTA_CONTENT;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h2 className="section-title text-white mb-6">{title}</h2>
          <p className="text-xl mb-8 text-white/90">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="primary"
              href={cta.primary.href}
              className="bg-white text-primary hover:bg-opacity-90"
            >
              {cta.primary.text}
            </Button>
            <Button 
              variant="outline"
              href={cta.secondary.href}
              className="border-2 border-white text-white hover:bg-white/10"
            >
              {cta.secondary.text}
            </Button>
          </div>
          <p className="mt-8 text-sm text-white/80">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
});

CtaBanner.displayName = 'CtaBanner';

export default CtaBanner;