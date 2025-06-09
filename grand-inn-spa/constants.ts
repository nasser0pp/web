
import { Service, Testimonial, GalleryImage, NavLinkItem, SectionId } from './types';
import { MassageIcon, FacialIcon, HammamIcon, AromatherapyIcon } from './components/icons/ServiceIcons'; 
import React from 'react';

export const SPA_NAME = "Grand Inn Spa";
export const SPA_ADDRESS = "Bawshar St, Muscat 112, Oman";
export const SPA_PHONE = "+968 9962 4798";
export const SPA_PHONE_FORMATTED = "+968 9962 4798";
export const SPA_WHATSAPP_NUMBER = "96899624798"; // International format without '+' or spaces
export const SPA_EMAIL = "reservations@grandinnspa.om"; // Example email
export const SPA_AREAS_SERVED = "Seeb and nearby areas";
export const SPA_TAGLINE = "Your Oasis of Serenity in the Heart of Muscat.";

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
    image: 'https://picsum.photos/seed/massage/600/400',
    duration: "60/90 min",
    price: "OMR 35/50"
  },
  {
    id: 'facials',
    name: 'Revitalizing Facials',
    description: 'Experience customized facials that cleanse, nourish, and revitalize your skin for a radiant glow.',
    icon: React.createElement(FacialIcon),
    image: 'https://picsum.photos/seed/facial/600/400',
    duration: "75 min",
    price: "OMR 40"
  },
  {
    id: 'hammam',
    name: 'Traditional Hammam',
    description: 'Discover the ancient ritual of Hammam for a deeply cleansing and invigorating experience.',
    icon: React.createElement(HammamIcon),
    image: 'https://picsum.photos/seed/hammam/600/400',
    duration: "90 min",
    price: "OMR 55"
  },
  {
    id: 'aromatherapy',
    name: 'Aromatherapy Sessions',
    description: 'Immerse yourself in the healing power of essential oils with our bespoke aromatherapy treatments.',
    icon: React.createElement(AromatherapyIcon),
    image: 'https://picsum.photos/seed/aroma/600/400',
    duration: "60 min",
    price: "OMR 30"
  },
];

export const GALLERY_IMAGES_DATA: GalleryImage[] = [
  { id: 'img1', src: 'https://picsum.photos/seed/spa1/800/600', alt: 'Relaxing spa ambiance' },
  { id: 'img2', src: 'https://picsum.photos/seed/spa2/800/600', alt: 'Massage therapy room' },
  { id: 'img3', src: 'https://picsum.photos/seed/spa3/800/600', alt: 'Luxury spa products' },
  { id: 'img4', src: 'https://picsum.photos/seed/spa4/800/600', alt: 'Hammam treatment setup' },
  { id: 'img5', src: 'https://picsum.photos/seed/spa5/800/600', alt: 'Facial treatment in progress' },
  { id: 'img6', src: 'https://picsum.photos/seed/spa6/800/600', alt: 'Serene relaxation area' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote: "An absolutely divine experience! The massage was incredible, and the ambiance is so calming. I left feeling completely refreshed.",
    author: "Aisha Al-Farsi",
    location: "Muscat"
  },
  {
    id: 't2',
    quote: "Grand Inn Spa is my go-to for relaxation. The staff are professional and attentive, and the Hammam treatment is a must-try!",
    author: "Johnathan Smith",
    location: "Expat in Oman"
  },
  {
    id: 't3',
    quote: "Beautiful spa with top-notch services. I had a facial that left my skin glowing. Highly recommend this place for a pampering session.",
    author: "Fatima Al-Balushi",
    location: "Seeb"
  },
];

export const SEASONAL_OFFERS_DATA = {
  title: "Summer Radiance Package",
  description: "Enjoy a revitalizing facial, a soothing aromatherapy massage, and a complimentary herbal tea. Special Price: OMR 75 (Save OMR 20). Valid until August 31st.",
  ctaText: "Book Summer Offer",
};
