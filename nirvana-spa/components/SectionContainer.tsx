
import React from 'react';

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ id, children, className = '', title, titleClassName = '', contentClassName = '' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${className} animate-fadeIn`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl ${contentClassName}`}>
        {title && (
          <h2 className={`text-3xl md:text-4xl font-serif text-brand-gold text-center mb-12 md:mb-16 ${titleClassName}`}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
