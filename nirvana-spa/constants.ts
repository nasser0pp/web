
import { Service, Testimonial, GalleryImage, NavLinkItem, SectionId } from './types';
import { MassageIcon, FacialIcon, HammamIcon, AromatherapyIcon } from './components/icons/ServiceIcons'; 
import React from 'react';

export const SPA_NAME = "Nirvana Spa";
export const LOGO_URL = "/assets/logo.png"; // User needs to place logo.png in /assets
export const SPA_HOTEL_NAME = ""; // No longer affiliated with a specific hotel in this branding
export const SPA_ADDRESS = "123 Serenity Lane, Muscat, Oman";
export const SPA_PHONE = "+96812345678"; 
export const SPA_PHONE_FORMATTED = "+968 1234 5678";
export const SPA_WHATSAPP_NUMBER = "96812345678"; 
export const SPA_EMAIL = "info@nirvanaspa.com";
export const SPA_AREAS_SERVED = "Muscat and surrounding areas";
export const SPA_TAGLINE = "Experience True Bliss and Tranquility.";

export const NAV_LINKS: NavLinkItem[] = [
  { id: SectionId.Home, label: 'Home' },
  { id: SectionId.About, label: 'About Us' },
  { id: SectionId.Services, label: 'Services' },
  { id: SectionId.Gallery, label: 'Gallery' },
  { id: SectionId.Offers, label: 'Offers' },
  { id: SectionId.Testimonials, label: 'Testimonials' },
  { id: SectionId.Contact, label: 'Contact' },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'massage',
    name: 'Signature Massages',
    description: 'Indulge in our range of therapeutic massages designed to relieve stress and rejuvenate your body.',
    icon: React.createElement(MassageIcon),
    image: 'https://picsum.photos/seed/luxurious-massage-suite/600/400',
    duration: "60/90 min",
    price: "OMR 35/50"
  },
  {
    id: 'facials',
    name: 'Revitalizing Facials',
    description: 'Experience customized facials that cleanse, nourish, and revitalize your skin for a radiant glow.',
    icon: React.createElement(FacialIcon),
    image: 'https://picsum.photos/seed/advanced-facial-therapy/600/400',
    duration: "75 min",
    price: "OMR 40"
  },
  {
    id: 'hammam',
    name: 'Traditional Hammam',
    description: 'Discover the ancient ritual of Hammam for a deeply cleansing and invigorating experience.',
    icon: React.createElement(HammamIcon),
    image: 'https://picsum.photos/seed/opulent-hammam-experience/600/400',
    duration: "90 min",
    price: "OMR 55"
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Sessions',
    description: 'Immerse yourself in the healing power of essential oils with our bespoke aromatherapy treatments.',
    icon: React.createElement(AromatherapyIcon),
    image: 'https://picsum.photos/seed/serene-aromatherapy-haven/600/400',
    duration: "60 min",
    price: "OMR 30"
  },
];

export const GALLERY_IMAGES_DATA: GalleryImage[] = [
  { id: 'img1', src: 'https://picsum.photos/seed/premium-spa-lounge/800/600', alt: 'Relaxing spa ambiance at Nirvana Spa' },
  { id: 'img2', src: 'https://picsum.photos/seed/exclusive-spa-treatment-room/800/600', alt: 'Massage therapy room at Nirvana Spa' },
  { id: 'img3', src: 'https://picsum.photos/seed/luxury-spa-amenities/800/600', alt: 'Luxury spa products at Nirvana Spa' },
  { id: 'img4', src: 'https://picsum.photos/seed/refined-spa-details/800/600', alt: 'Hammam treatment setup at Nirvana Spa' },
  { id: 'img5', src: 'https://picsum.photos/seed/serene-spa-waterscape/800/600', alt: 'Facial treatment at Nirvana Spa' },
  { id: 'img6', src: 'https://picsum.photos/seed/panoramic-spa-view/800/600', alt: 'Serene relaxation area at Nirvana Spa' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: "A truly peaceful escape. Nirvana Spa is a gem! I left feeling completely refreshed and renewed.",
    author: "Sarah K.",
    location: "Muscat"
  },
  {
    id: 't2',
    quote: "The best massage I've had in Muscat. The therapists are skilled and the ambiance is perfect for relaxation. Highly recommend Nirvana Spa!",
    author: "Ahmed R.",
    location: "Resident"
  },
  {
    id: 't3',
    quote: "Felt rejuvenated after my facial at Nirvana Spa. The products they use are top quality and my skin is glowing. A wonderful experience.",
    author: "Layla M.",
    location: "Seeb"
  },
];

export const SEASONAL_OFFERS_DATA = {
  title: "Nirvana Spa Wellness Packages",
  description: "Discover our curated packages designed for ultimate relaxation and rejuvenation. Contact us for the latest offers and let us tailor your perfect spa day.",
  ctaText: "Explore Packages",
};
