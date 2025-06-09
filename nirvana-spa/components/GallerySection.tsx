
import React, { useState } from 'react';
import SectionContainer from './SectionContainer';
import { GALLERY_IMAGES_DATA, SPA_NAME } from '../constants';
import { SectionId, GalleryImage } from '../types';

interface GallerySectionProps {
  id: SectionId;
}

const GallerySection: React.FC<GallerySectionProps> = ({ id }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <SectionContainer id={id} title={`Visual Journey Through ${SPA_NAME}`} className="bg-brand-beige">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {GALLERY_IMAGES_DATA.map((image, index) => (
          <div 
            key={image.id} 
            className="group relative rounded-lg overflow-hidden shadow-md cursor-pointer animate-slideInUp"
            style={{animationDelay: `${index * 0.05}s`}}
            onClick={() => openModal(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
              <p className="text-brand-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.caption || "View Image"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div className="bg-brand-white p-4 rounded-lg shadow-2xl max-w-3xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-[80vh] object-contain rounded"/>
            {selectedImage.caption && <p className="text-center text-brand-charcoal mt-2">{selectedImage.caption}</p>}
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 bg-brand-gold text-white rounded-full p-2 hover:bg-opacity-80"
              aria-label="Close image viewer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default GallerySection;