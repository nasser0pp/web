
import React from 'react';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration?: string; // e.g., "60 min"
  price?: string; // e.g., "OMR 35"
  icon?: React.ReactNode;
  image?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location?: string; // e.g., "Muscat"
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export enum SectionId {
  Home = 'home',
  About = 'about',
  Services = 'services',
  Booking = 'booking',
  Gallery = 'gallery',
  Offers = 'offers',
  Testimonials = 'testimonials',
  Contact = 'contact',
}

export interface NavLinkItem {
  id: SectionId;
  label: string;
}
