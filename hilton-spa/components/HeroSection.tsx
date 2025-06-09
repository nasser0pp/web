
import React from 'react';
import { SPA_TAGLINE, SPA_NAME } from '../constants';
import { SectionId } from '../types';

interface HeroSectionProps {
  id: SectionId;
  onBookNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id, onBookNow }) => {
  return (
    <section id={id} className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://picsum.photos/seed/hilton-spa-hero/1920/1080')"}}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 p-4 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-white font-bold mb-4 drop-shadow-lg">
          {SPA_NAME}
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-white font-medium mb-6 drop-shadow-lg">
          {SPA_TAGLINE}
        </p>
        <p className="text-lg md:text-xl text-brand-beige mb-10 max-w-2xl mx-auto drop-shadow-md">
          Discover a sanctuary of peace and rejuvenation. Indulge in luxurious treatments designed to harmonize your body, mind, and spirit.
        </p>
        <button
          onClick={onBookNow}
          className="bg-brand-gold hover:bg-opacity-80 text-brand-white font-semibold py-3 px-8 rounded-lg shadow-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book Your Escape
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
