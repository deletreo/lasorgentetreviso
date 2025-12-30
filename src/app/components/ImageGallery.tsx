"use client";

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  category: string;
}

export default function ImageGallery({ images, productName, category }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full h-full relative group">
      {/* Immagine Principale */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
      
      <img 
        src={images[currentIndex]} 
        alt={`${productName} - vista ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
      />

      {/* Badge Categoria */}
      <div className="absolute bottom-8 left-8 z-20">
        <span className="px-4 py-2 bg-white text-black border-l-4 border-[#7faeb2] text-xs uppercase tracking-widest font-bold">
          {category}
        </span>
      </div>

      {/* Controlli Slider (solo se c'è più di una foto) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#7faeb2] hover:text-black"
          >
            <FiChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#7faeb2] hover:text-black"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Indicatori (Pallini) */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#7faeb2]' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}