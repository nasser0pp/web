
import React from 'react';
import SectionContainer from './SectionContainer';
import { SEASONAL_OFFERS_DATA } from '../constants';
import { SectionId } from '../types';
import { LoyaltyIcon } from './icons/ServiceIcons';

interface SeasonalOffersSectionProps {
  id: SectionId;
  onBookNow: () => void;
}

const SeasonalOffersSection: React.FC<SeasonalOffersSectionProps> = ({ id, onBookNow }) => {
  return (
    <SectionContainer id={id} title="Special Offers & Loyalty" className="bg-brand-aqua-calm text-brand-white">
      <div className="max-w-3xl mx-auto text-center bg-brand-aqua-dark p-8 md:p-12 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <LoyaltyIcon className="w-16 h-16 text-brand-white" />
        </div>
        <h3 className="text-3xl font-serif font-semibold mb-4">{SEASONAL_OFFERS_DATA.title}</h3>
        <p className="text-lg mb-8 leading-relaxed">
          {SEASONAL_OFFERS_DATA.description}
        </p>
        <button
          onClick={onBookNow}
          className="bg-brand-gold hover:bg-opacity-80 text-brand-white font-semibold py-3 px-8 rounded-lg shadow-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          {SEASONAL_OFFERS_DATA.ctaText}
        </button>
        <p className="mt-10 text-sm text-brand-beige">
          Ask about our Loyalty Program for exclusive benefits and discounts on future visits!
        </p>
      </div>
    </SectionContainer>
  );
};

export default SeasonalOffersSection;
