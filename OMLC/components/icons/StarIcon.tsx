
import React from 'react';

interface StarIconProps {
  className?: string;
  filled?: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ className = "w-5 h-5", filled = true }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke={filled ? "none" : "currentColor"} 
    strokeWidth={1.5} 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.321h5.387c.504 0 .709.656.326 1.008l-4.223 3.455a.563.563 0 00-.162.59l1.636 5.261c.15.485-.376.902-.81 1.125l-4.524 2.766a.563.563 0 01-.628 0l-4.523-2.766c-.435-.223-.96-.64-.81-1.125l1.636-5.261a.563.563 0 00-.162-.59l-4.223-3.455c-.383-.352-.178-1.008.326-1.008h5.387a.563.563 0 00.475.321l2.125-5.11z" />
  </svg>
);

export default StarIcon;
