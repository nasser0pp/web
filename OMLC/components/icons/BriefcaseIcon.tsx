
import React from 'react';

interface BriefcaseIconProps {
  className?: string;
}

const BriefcaseIcon: React.FC<BriefcaseIconProps> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V14.15M17.25 6.75V4.5A2.25 2.25 0 0015 2.25H9A2.25 2.25 0 006.75 4.5v2.25m10.5 0h-10.5" />
  </svg>
);

export default BriefcaseIcon;
