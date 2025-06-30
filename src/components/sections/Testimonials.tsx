import React, { memo, useMemo } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS_CONTENT } from '../../data/content';
import { Section, Card, AnimatedSection } from '../ui';
import LazyImage from '../common/LazyImage';
import type { TestimonialData } from '../../types';

const StarRating: React.FC<{ rating: number }> = memo(({ rating }) => {
  const stars = useMemo(() => 
    [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
      />
    )), [rating]
  );

  return <div className="flex mb-4">{stars}</div>;
});

StarRating.displayName = 'StarRating';

const TestimonialCard: React.FC<TestimonialData & { index: number }> = memo(({ 
  name, 
  title, 
  content, 
  image, 
  rating,
  index
}) => {
  const delay = useMemo(() => index * 0.2, [index]);
  
  return (
    <AnimatedSection animation="slide-in-left" delay={delay}>
      <Card className="h-full flex flex-col">
        <div className="flex items-center mb-4">
          <LazyImage
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-inter font-semibold text-lg text-gray-800">
              {name}
            </h4>
          </div>
        </div>
        <StarRating rating={rating} />
        <blockquote className="text-gray-700 italic flex-grow">
          "{content}"
        </blockquote>
      </Card>
    </AnimatedSection>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials: React.FC = memo(() => {
  const { title, description, testimonials } = TESTIMONIALS_CONTENT;

  const testimonialCards = useMemo(() => 
    testimonials.map((testimonial, index) => (
      <TestimonialCard key={testimonial.name} {...testimonial} index={index} />
    )), [testimonials]
  );

  return (
    <Section id="testimonials" title={title} description={description}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialCards}
      </div>
    </Section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;