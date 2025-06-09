
import React from 'react';
import { SPA_NAME, SPA_ADDRESS, SPA_PHONE_FORMATTED, SPA_HOTEL_NAME } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-beige py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h5 className="font-serif text-xl text-brand-gold mb-3">{SPA_NAME}</h5>
            <p className="text-sm">at {SPA_HOTEL_NAME}</p>
            <p className="text-sm">{SPA_ADDRESS}</p>
            <p className="text-sm">Phone: {SPA_PHONE_FORMATTED}</p>
          </div>
          <div>
            <h5 className="font-serif text-xl text-brand-gold mb-3">Quick Links</h5>
            <ul className="space-y-1 text-sm">
              <li><a href="#about" className="hover:text-brand-gold transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Services</a></li>
              <li><a href="#booking" className="hover:text-brand-gold transition-colors">Book Now</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-serif text-xl text-brand-gold mb-3">Connect With Us</h5>
            {/* Placeholder for social media icons */}
            <p className="text-sm">Follow us on social media for updates and wellness tips.</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              {/* Example: <a href="#" className="hover:text-brand-gold"><FacebookIcon /></a> */}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-brand-charcoal-light text-center text-sm">
          <p>&copy; {currentYear} {SPA_NAME}. All Rights Reserved. Crafted with serenity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
