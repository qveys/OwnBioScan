import React, { memo } from 'react';
import { AUDIENCE_CONTENT } from '../../data/content';
import { Section, AnimatedSection } from '../ui';
import LazyImage from '../common/LazyImage';

const Audience: React.FC = memo(() => {
  const { title, description, benefits, image } = AUDIENCE_CONTENT;

  return (
    <Section id="audience" background="gray">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <AnimatedSection animation="slide-in-left">
          <h3 className="font-inter font-semibold text-2xl md:text-3xl text-gray-800 mb-4">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-secondary-500 mr-2">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
        
        <AnimatedSection animation="slide-in-right" delay={0.2}>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <LazyImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
});

Audience.displayName = 'Audience';

export default Audience;