"use client";

import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  category: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ImageGallery({ images, productName, category }: ImageGalleryProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
    setIsZoomed(false); 
  }, []);

  // --- LOGICA JAVASCRIPT PER NASCONDERE L'HEADER ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      }
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };

    // Seleziona l'header tramite l'ID che abbiamo aggiunto
    const headerElement = document.getElementById('site-header');

    if (isLightboxOpen) {
      // 1. Blocca lo scroll
      document.body.style.overflow = 'hidden';
      // 2. Nasconde l'header fisicamente
      if (headerElement) {
        headerElement.style.visibility = 'hidden'; 
        // Oppure headerElement.style.display = 'none'; (visibility è più fluido per evitare layout shift se non fosse fixed)
      }
      window.addEventListener('keydown', handleKeyDown);
    } else {
      // Ripristina tutto
      document.body.style.overflow = 'unset';
      if (headerElement) {
        headerElement.style.visibility = 'visible';
      }
    }

    // Cleanup quando il componente si smonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (headerElement) {
        headerElement.style.visibility = 'visible';
      }
    };
  }, [isLightboxOpen, paginate]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 uppercase tracking-widest">
        Nessuna immagine
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full relative group bg-white flex items-center justify-center p-8 overflow-hidden z-10">
        
        <div className="relative w-full h-full flex items-center justify-center cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={page}
              src={images[imageIndex]}
              alt={`${productName} - vista ${imageIndex + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full object-contain"
            />
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
          <span className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest font-bold shadow-lg">
            {category}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); paginate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-200 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white shadow-md"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); paginate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-200 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white shadow-md"
            >
              <FiChevronRight size={20} />
            </button>

            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
              {images.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => {
                     e.stopPropagation();
                     const newDir = idx > imageIndex ? 1 : -1;
                     setPage([page + (idx - imageIndex), newDir]);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === imageIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-[10000] pointer-events-none">
                
                <span className="text-xs uppercase tracking-widest font-mono text-white/60 pointer-events-auto">
                    {imageIndex + 1} / {images.length}
                </span>

                <div className="flex items-center gap-4 pointer-events-auto">
                    <button 
                        onClick={() => setIsZoomed(!isZoomed)} 
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
                        title={isZoomed ? "Riduci" : "Ingrandisci"}
                    >
                        {isZoomed ? <FiZoomOut size={20} /> : <FiZoomIn size={20} />}
                    </button>

                    <button 
                        onClick={() => { setIsLightboxOpen(false); setIsZoomed(false); }}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform cursor-pointer"
                    >
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Chiudi</span>
                        <FiX size={16} />
                    </button>
                </div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden touch-none z-[9999]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.img
                        key={page}
                        src={images[imageIndex]}
                        alt="Fullscreen view"
                        custom={direction}
                        
                        variants={variants}
                        initial="enter"
                        animate={{ 
                            ...variants.center, 
                            scale: isZoomed ? 2.5 : 1, 
                            x: 0 
                        }} 
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.3 }
                        }}

                        drag={isZoomed ? true : "x"} 
                        dragConstraints={isZoomed ? { left: -1000, right: 1000, top: -1000, bottom: 1000 } : { left: 0, right: 0 }}
                        dragElastic={isZoomed ? 0.1 : 1} 
                        
                        onDragEnd={(e, { offset, velocity }) => {
                            if (isZoomed) return;
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}

                        onDoubleClick={() => setIsZoomed(!isZoomed)}

                        className={`max-w-[95vw] max-h-[85vh] object-contain ${isZoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}`}
                        style={{ position: 'absolute' }}
                    />
                </AnimatePresence>
            </div>

            {!isZoomed && images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[10000]"
                    >
                        <FiChevronLeft size={40} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); paginate(1); }}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[10000]"
                    >
                        <FiChevronRight size={40} />
                    </button>
                </>
            )}
            
            <div className="absolute bottom-6 left-0 w-full text-center text-white/50 text-[10px] uppercase tracking-widest pointer-events-none z-[10000]">
                 {isZoomed ? "Trascina per muoverti • Doppio click per ridurre" : "Swipe per scorrere • Doppio click per zoom"}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}