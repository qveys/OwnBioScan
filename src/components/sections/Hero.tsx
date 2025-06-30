import React, { memo } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { HERO_CONTENT } from '../../data/content';
import { Button, AnimatedSection } from '../ui';
import LazyImage from '../common/LazyImage';

const Hero: React.FC = memo(() => {
  const { brand, title, subtitle, cta, heroImage } = HERO_CONTENT;

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-mint/30 to-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <AnimatedSection animation="fade-in">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Activity className="h-8 w-8" />
                <h3 className="text-xl font-montserrat font-bold uppercase">{brand.name}</h3>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold uppercase leading-tight mb-4">
                {title.main} <span className="text-primary">{title.highlight}</span> <span className="text-accent">{title.accent}</span>
              </h1>
              <p className="text-xl text-text-secondary mb-8 max-w-xl">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="accent"
                  href={cta.primary.href}
                  className="flex items-center justify-center group"
                >
                  {cta.primary.text}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-classic group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline"
                  href={cta.secondary.href}
                  className="flex items-center justify-center"
                >
                  {cta.secondary.text}
                </Button>
              </div>
            </AnimatedSection>
          </div>
          <div className="md:w-1/2 relative">
            <AnimatedSection animation="slide-in-right" delay={0.2}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="bg-white rounded-md shadow-medium overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-classic gpu-accelerated">
                  <LazyImage
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full inline-flex items-center mb-2">
                        RESULTS READY
                      </div>
                      <h3 className="text-xl font-montserrat font-bold uppercase">Blood Glucose: Normal</h3>
                    </div>
                  </div>
                </div>
                <AnimatedSection 
                  animation="scale-in" 
                  delay={0.5}
                  className="absolute -bottom-4 -right-4 bg-mint p-4 rounded-md shadow-medium transform rotate-6 hover:rotate-0 transition-all duration-normal"
                >
                  <div className="text-primary text-sm font-montserrat font-bold uppercase">AI-Powered Results</div>
                  <div className="text-text-secondary text-xs">98% accuracy</div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;