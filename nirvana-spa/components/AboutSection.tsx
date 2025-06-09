
import React from 'react';
import SectionContainer from './SectionContainer';
import { SectionId } from '../types';
import { SPA_NAME } from '../constants';

interface AboutSectionProps {
  id: SectionId;
}

const AboutSection: React.FC<AboutSectionProps> = ({ id }) => {
  return (
    <SectionContainer id={id} title={`Welcome to ${SPA_NAME}`} className="bg-brand-beige">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <img 
            src="https://picsum.photos/seed/elegant-spa-interior/600/400" 
            alt={`Luxurious interior of ${SPA_NAME}`}
            className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3]"
          />
        </div>
        <div className="md:w-1/2 space-y-6 text-brand-charcoal-light animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <p className="text-lg leading-relaxed">
            ${SPA_NAME} is more than just a spa – it's an escape, a sanctuary dedicated to your complete well-being. Our mission is to provide an unparalleled experience of relaxation and rejuvenation, allowing you to disconnect from the stresses of daily life and reconnect with your inner peace.
          </p>
          <p className="leading-relaxed">
            We believe in a holistic approach to wellness, combining ancient traditions with modern techniques. Our serene ambiance, characterized by warm neutral tones, soft lighting, and the subtle aroma of essential oils, is meticulously designed to soothe your senses from the moment you step inside.
          </p>
          <p className="leading-relaxed">
            Our team of expert therapists is committed to delivering personalized treatments that cater to your unique needs. We use only the finest natural and organic products, ensuring a premium experience that nurtures both body and soul. At ${SPA_NAME}, your journey to tranquility and radiance begins here.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
