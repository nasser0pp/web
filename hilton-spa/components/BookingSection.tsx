
import React from 'react';
import SectionContainer from './SectionContainer';
import { SPA_PHONE_FORMATTED, SPA_WHATSAPP_NUMBER, SPA_EMAIL, SPA_NAME } from '../constants';
import { SectionId } from '../types';
import { WhatsAppIcon } from './icons/ServiceIcons';

interface BookingSectionProps {
  id: SectionId;
}

const BookingSection: React.FC<BookingSectionProps> = ({ id }) => {
  const whatsappLink = `https://wa.me/${SPA_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello ${SPA_NAME}, I'd like to make a booking or inquiry.`)}`;

  return (
    <SectionContainer id={id} title={`Book Your Moment of Bliss at ${SPA_NAME}`} className="bg-brand-lavender-light">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg text-brand-charcoal-light mb-8">
          Ready to experience unparalleled relaxation? Contact us to schedule your appointment or to learn more about our services. Our team is eager to assist you in crafting your perfect spa journey.
        </p>
        <div className="space-y-6">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-brand-aqua-dark hover:bg-brand-aqua-calm text-brand-white font-semibold py-4 px-10 rounded-lg shadow-md text-lg transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
          >
            <WhatsAppIcon className="w-6 h-6 mr-3"/>
            Book via WhatsApp
          </a>
          <div className="text-brand-charcoal-light">
            <p className="text-lg">Or call us at: <a href={`tel:${SPA_PHONE_FORMATTED.replace(/\s/g, '')}`} className="font-semibold text-brand-gold hover:underline">{SPA_PHONE_FORMATTED}</a></p>
            <p className="text-lg">Email: <a href={`mailto:${SPA_EMAIL}`} className="font-semibold text-brand-gold hover:underline">{SPA_EMAIL}</a></p>
          </div>
        </div>
         <p className="mt-10 text-sm text-brand-charcoal-light">
          We recommend booking in advance to secure your preferred time and therapist.
        </p>
      </div>
    </SectionContainer>
  );
};

export default BookingSection;
