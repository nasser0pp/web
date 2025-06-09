
import React from 'react';
import SectionContainer from './SectionContainer';
import { SPA_ADDRESS, SPA_PHONE_FORMATTED, SPA_EMAIL, SPA_AREAS_SERVED, SPA_HOTEL_NAME, SPA_NAME } from '../constants';
import { SectionId } from '../types';

interface ContactSectionProps {
  id: SectionId;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.9323330610367!2d58.38819717593257!3d23.59017777876807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e8e00c1eb8e864b%3A0xb6921d7986027b68!2sHilton%20Garden%20Inn%20Muscat%20Al%20Khuwair!5e0!3m2!1sen!2som";

  return (
    <SectionContainer id={id} title={`Find Your Serenity at ${SPA_NAME}`} className="bg-brand-cream">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="lg:w-1/2 space-y-6 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <h3 className="text-2xl font-serif text-brand-gold mb-4">Visit Us</h3>
          <p className="text-lg text-brand-charcoal-light">
            Located in: {SPA_HOTEL_NAME}
          </p>
          <p className="text-lg text-brand-charcoal-light">{SPA_ADDRESS}</p>
          
          <h3 className="text-2xl font-serif text-brand-gold mb-2 mt-6">Get In Touch</h3>
          <p className="text-lg text-brand-charcoal-light">
            Phone: <a href={`tel:${SPA_PHONE_FORMATTED.replace(/\s/g, '')}`} className="hover:text-brand-gold transition-colors">{SPA_PHONE_FORMATTED}</a>
          </p>
          <p className="text-lg text-brand-charcoal-light">
            Email: <a href={`mailto:${SPA_EMAIL}`} className="hover:text-brand-gold transition-colors">{SPA_EMAIL}</a>
          </p>

          <h3 className="text-2xl font-serif text-brand-gold mb-2 mt-6">Hours of Operation</h3>
          <p className="text-lg text-brand-charcoal-light">Saturday - Thursday: 10:00 AM - 10:00 PM</p>
          <p className="text-lg text-brand-charcoal-light">Friday: 2:00 PM - 10:00 PM</p>
          
          <p className="text-brand-charcoal-light mt-4">Areas Served: {SPA_AREAS_SERVED}</p>
        </div>
        <div className="lg:w-1/2 h-80 md:h-96 lg:h-auto rounded-lg shadow-xl overflow-hidden animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${SPA_NAME} Location - ${SPA_HOTEL_NAME}`}
          ></iframe>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactSection;
