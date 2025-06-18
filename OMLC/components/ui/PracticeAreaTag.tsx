
import React from 'react';
import { PracticeArea } from '../../types';

interface PracticeAreaTagProps {
  area: PracticeArea;
  onClick?: (area: PracticeArea) => void;
  className?: string;
  size?: 'sm' | 'md';
}

const PracticeAreaTag: React.FC<PracticeAreaTagProps> = ({ area, onClick, className = '', size = 'sm' }) => {
  const baseStyle = "font-medium rounded-full inline-block cursor-pointer transition-colors duration-150";
  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };
  const colorStyle = "bg-secondary/10 text-secondary hover:bg-secondary/20";

  const handleClick = () => {
    if (onClick) {
      onClick(area);
    }
  };

  return (
    <span
      className={`${baseStyle} ${sizeStyles[size]} ${colorStyle} ${className}`}
      onClick={handleClick}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && handleClick() : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {area}
    </span>
  );
};

export default PracticeAreaTag;
