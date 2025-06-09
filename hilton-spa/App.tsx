
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import BookingSection from './components/BookingSection';
import GallerySection from './components/GallerySection';
import SeasonalOffersSection from './components/SeasonalOffersSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { SectionId } from './types';

const App: React.FC = () => {
  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream font-sans text-brand-charcoal overflow-x-hidden">
      <Navbar onNavigate={scrollToSection} />
      <main className="flex-grow">
        <HeroSection id={SectionId.Home} onBookNow={() => scrollToSection(SectionId.Booking)} />
        <AboutSection id={SectionId.About} />
        <ServicesSection id={SectionId.Services} />
        <GallerySection id={SectionId.Gallery} />
        <SeasonalOffersSection id={SectionId.Offers} onBookNow={() => scrollToSection(SectionId.Booking)} />
        <TestimonialsSection id={SectionId.Testimonials} />
        <ContactSection id={SectionId.Contact} />
        <BookingSection id={SectionId.Booking} /> {/* Often placed near contact or as a clear final CTA */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
