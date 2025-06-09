
import React from 'react';
import SectionContainer from './SectionContainer';
import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS_DATA } from '../constants';
import { SectionId } from '../types';

interface TestimonialsSectionProps {
  id: SectionId;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ id }) => {
  return (
    <SectionContainer id={id} title="Words of Wellness" className="bg-brand-beige">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TESTIMONIALS_DATA.map((testimonial, index) => (
          <div key={testimonial.id} className="animate-slideInUp" style={{animationDelay: `${index * 0.1}s`}}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default TestimonialsSection;
