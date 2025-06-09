
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-brand-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col h-full">
      {service.image && (
        <img src={service.image} alt={service.name} className="w-full h-56 object-cover"/>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          {service.icon && <div className="mr-3 flex-shrink-0">{service.icon}</div>}
          <h3 className="text-xl font-serif font-semibold text-brand-gold">{service.name}</h3>
        </div>
        <p className="text-brand-charcoal-light text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
        <div className="mt-auto pt-4 border-t border-brand-beige">
            {service.duration && <p className="text-xs text-brand-charcoal-light">Duration: {service.duration}</p>}
            {service.price && <p className="text-sm font-semibold text-brand-aqua-dark">{service.price}</p>}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
