
import React from 'react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-brand-white p-6 md:p-8 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex-shrink-0 mb-4">
        {/* Placeholder for quote icon or stars. Using a simple one for now. */}
        <svg className="w-10 h-10 text-brand-gold opacity-75 transform rotate-180" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.5 10.5C6.5 12.43 8.07 14 10 14L10.5 14C10.22 14.86 9.72001 15.61 9.07001 16.15L8.21001 16.83C9.08001 17.86 10.43 18.5 12 18.5C13.57 18.5 14.92 17.86 15.79 16.83L14.93 16.15C14.28 15.61 13.78 14.86 13.5 14L14 14C15.93 14 17.5 12.43 17.5 10.5V6.5H6.5V10.5ZM4.5 6.5V10.5C4.5 13.54 6.96 16 10 16H10.5C10.79 17.37 11.56 18.57 12.67 19.35C12.45 19.76 12.17 20.12 11.84 20.42L11.33 20.83C9.93001 20.15 8.75001 19.06 8.00001 17.69L8.43001 17.35C7.23001 16.33 6.5 14.83 6.5 13.17L6 13.17C4.29 13.17 3 11.88 3 10.17V6.5C3 5.4 3.9 4.5 5 4.5H19C20.1 4.5 21 5.4 21 6.5V10.17C21 11.88 19.71 13.17 18 13.17L17.5 13.17C17.5 14.83 16.77 16.33 15.57 17.35L16 17.69C15.25 19.06 14.07 20.15 12.67 20.83L12.16 20.42C11.83 20.12 11.55 19.76 11.33 19.35C12.44 18.57 13.21 17.37 13.5 16H14C17.04 16 19.5 13.54 19.5 10.5V6.5H4.5Z"/>
        </svg>
      </div>
      <blockquote className="text-brand-charcoal-light italic leading-relaxed mb-6 flex-grow">
        "{testimonial.quote}"
      </blockquote>
      <footer className="mt-auto pt-4 border-t border-brand-beige">
        <p className="font-semibold text-brand-gold font-serif">{testimonial.author}</p>
        {testimonial.location && <p className="text-sm text-brand-charcoal-light">{testimonial.location}</p>}
      </footer>
    </div>
  );
};

export default TestimonialCard;
