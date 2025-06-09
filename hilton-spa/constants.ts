
import { Service, Testimonial, GalleryImage, NavLinkItem, SectionId } from './types';
import { MassageIcon, FacialIcon, HammamIcon, AromatherapyIcon } from './components/icons/ServiceIcons'; 
import React from 'react';

export const SPA_NAME = "Hilton Spa";
export const SPA_HOTEL_NAME = "Hilton Garden Inn Muscat Al Khuwair";
export const SPA_ADDRESS = "Dauhat Al Adab St, Muscat 118, Oman";
export const SPA_PHONE = "+96871513941"; // Raw number for potential internal use
export const SPA_PHONE_FORMATTED = "+968 7151 3941";
export const SPA_WHATSAPP_NUMBER = "96871513941"; // International format without '+' or spaces for wa.me link
export const SPA_EMAIL = "reservations.muscatalkhuwair@hilton.com"; // Example Hilton email
export const SPA_AREAS_SERVED = "Seeb and nearby areas";
export const SPA_TAGLINE = "Your Sanctuary of Wellness at Hilton Garden Inn.";

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
    image: 'https://picsum.photos/seed/hilton-massage/600/400',
    duration: "60/90 min",
    price: "OMR 35/50" // Example price, confirm if needs update
  },
  {
    id: 'facials',
    name: 'Revitalizing Facials',
    description: 'Experience customized facials that cleanse, nourish, and revitalize your skin for a radiant glow.',
    icon: React.createElement(FacialIcon),
    image: 'https://picsum.photos/seed/hilton-facial/600/400',
    duration: "75 min",
    price: "OMR 40" // Example price
  },
  {
    id: 'hammam',
    name: 'Traditional Hammam',
    description: 'Discover the ancient ritual of Hammam for a deeply cleansing and invigorating experience.',
    icon: React.createElement(HammamIcon),
    image: 'https://picsum.photos/seed/hilton-hammam/600/400',
    duration: "90 min",
    price: "OMR 55" // Example price
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Sessions',
    description: 'Immerse yourself in the healing power of essential oils with our bespoke aromatherapy treatments.',
    icon: React.createElement(AromatherapyIcon),
    image: 'https://picsum.photos/seed/hilton-aroma/600/400',
    duration: "60 min",
    price: "OMR 30" // Example price
  },
];

export const GALLERY_IMAGES_DATA: GalleryImage[] = [
  { id: 'img1', src: 'https://picsum.photos/seed/hilton-gallery1/800/600', alt: 'Relaxing spa ambiance at Hilton Spa' },
  { id: 'img2', src: 'https://picsum.photos/seed/hilton-gallery2/800/600', alt: 'Massage therapy room at Hilton Spa' },
  { id: 'img3', src: 'https://picsum.photos/seed/hilton-gallery3/800/600', alt: 'Luxury spa products at Hilton Spa' },
  { id: 'img4', src: 'https://picsum.photos/seed/hilton-gallery4/800/600', alt: 'Hammam treatment setup at Hilton Spa' },
  { id: 'img5', src: 'https://picsum.photos/seed/hilton-gallery5/800/600', alt: 'Facial treatment at Hilton Spa' },
  { id: 'img6', src: 'https://picsum.photos/seed/hilton-gallery6/800/600', alt: 'Serene relaxation area at Hilton Spa' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: "An absolutely divine experience! The massage was incredible, and the new ambiance at Hilton Spa is so calming. I left feeling completely refreshed.",
    author: "Aisha A.", // Made slightly more generic
    location: "Muscat"
  },
  {
    id: 't2',
    quote: "Hilton Spa is my new go-to for relaxation. The staff are professional and attentive, and the Hammam treatment is a must-try!",
    author: "Jonathan S.", // Made slightly more generic
    location: "Resident"
  },
  {
    id: 't3',
    quote: "Beautiful spa with top-notch services. I had a facial that left my skin glowing. Highly recommend Hilton Spa for a pampering session.",
    author: "Fatima B.", // Made slightly more generic
    location: "Seeb"
  },
];

export const SEASONAL_OFFERS_DATA = {
  title: "Hilton Spa Seasonal Rejuvenation",
  description: "Indulge in our special seasonal package, perfectly crafted to refresh your senses. Contact us for current details and availability.",
  ctaText: "Discover Offer & Book",
};
