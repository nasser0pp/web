
import React from 'react';
import SectionContainer from './SectionContainer';
import ServiceCard from './ServiceCard';
import { SERVICES_DATA } from '../constants';
import { SectionId } from '../types';

interface ServicesSectionProps {
  id: SectionId;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ id }) => {
  return (
    <SectionContainer id={id} title="Our Signature Services" className="bg-brand-cream">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
        {SERVICES_DATA.map((service, index) => (
          <div key={service.id} className="animate-slideInUp" style={{animationDelay: `${index * 0.1}s`}}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
       <p className="text-center mt-12 text-brand-charcoal-light">
        Custom packages and couple's treatments available. Please inquire for more details.
      </p>
    </SectionContainer>
  );
};

export default ServicesSection;
