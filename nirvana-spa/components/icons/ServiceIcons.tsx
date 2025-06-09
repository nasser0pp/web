
import React from 'react';

interface IconProps {
  className?: string;
}

export const MassageIcon: React.FC<IconProps> = ({ className = "w-12 h-12 text-brand-gold" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A18.732 18.732 0 0112 22.5c-2.786 0-5.433-.608-7.499-1.688zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM3.313 13.585A14.23 14.23 0 001.5 20.25m19.5-.25a14.23 14.23 0 00-1.813-6.665M5.25 15.75a10.493 10.493 0 013.929-7.901M18.75 15.75a10.493 10.493 0 00-3.929-7.901" />
  </svg>
);

export const FacialIcon: React.FC<IconProps> = ({ className = "w-12 h-12 text-brand-gold" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 6v2.25m5.063 4.759A4.5 4.5 0 0015.75 12c0-1.065-.353-2.041-.937-2.842M12 21a9.002 9.002 0 008.874-7.143H3.126A9.002 9.002 0 0012 21zM5.25 9.75A2.25 2.25 0 017.5 7.5h9a2.25 2.25 0 012.25 2.25v.75m-13.5 0v.75a2.25 2.25 0 002.25 2.25h.75" />
  </svg>
);

export const HammamIcon: React.FC<IconProps> = ({ className = "w-12 h-12 text-brand-gold" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25v1.5M16.5 7.5H7.5m9 0c.938 0 1.75.728 1.938 1.638M7.5 7.5c-.938 0-1.75.728-1.938 1.638m12.876 0c.277.56.438 1.181.438 1.831V18a2.25 2.25 0 01-2.25-2.25H6.75A2.25 2.25 0 014.5 18v-6.031c0-.65.161-1.271.438-1.83m15.124 0H3.438" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a.75.75 0 000-1.5.75.75 0 000 1.5z" />
  </svg>
);

export const AromatherapyIcon: React.FC<IconProps> = ({ className = "w-12 h-12 text-brand-gold" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

export const LoyaltyIcon: React.FC<IconProps> = ({ className = "w-10 h-10 text-brand-white" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.42 16.79L2 22L7.37 20.63C8.77 21.39 10.36 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2M12.04 4.14C16.46 4.14 19.82 7.5 19.82 11.91C19.82 16.32 16.46 19.68 12.04 19.68C10.56 19.68 9.15 19.31 7.96 18.63L7.5 18.37L4.76 19.12L5.53 16.45L5.26 15.96C4.52 14.69 4.13 13.25 4.13 11.91C4.13 7.5 7.49 4.14 12.04 4.14M9.01 7.99C8.81 7.99 8.62 8 8.42 8.39C8.22 8.78 7.53 9.53 7.53 10.74C7.53 11.95 8.44 13.11 8.61 13.31C8.78 13.5 9.87 15.11 11.45 15.82C13.29 16.63 13.62 16.53 14.15 16.48C14.68 16.42 15.53 15.88 15.71 15.29C15.88 14.71 15.88 14.22 15.8 14.12C15.71 14.02 15.53 13.92 15.26 13.78C14.98 13.63 13.78 13.03 13.54 12.93C13.31 12.83 13.14 12.78 12.97 13.18C12.8 13.57 12.28 14.12 12.11 14.32C11.94 14.52 11.77 14.57 11.53 14.42C11.3 14.27 10.63 14.03 9.84 13.3C9.22 12.72 8.79 11.97 8.67 11.72C8.54 11.48 8.68 11.35 8.83 11.21C8.97 11.07 9.13 10.88 9.28 10.71C9.42 10.54 9.47 10.42 9.55 10.27C9.64 10.12 9.59 9.97 9.53 9.87C9.47 9.78 9.01 8.91 9.01 7.99Z" />
  </svg>
);
