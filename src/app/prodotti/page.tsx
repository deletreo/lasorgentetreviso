"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import prodottiData from '@/data/prodotti.json';
import Link from 'next/link';
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi';

type Product = {
  id: string;
  nome: string;
  categoria: string;
  target: string[];
  tecnologia: string;
  installazione: string;
  immagini: string[];
  descrizione_breve: string;
  specifiche: {
    capacita?: string;
    erogazione?: string[];
    plus: string;
    resina?: string;
    capacita_giorno?: string;
  };
};

function ProdottiContent() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get('filter');

  const [activeFilter, setActiveFilter] = useState<string | null>(urlFilter);
  
  const allProducts = prodottiData.prodotti as unknown as Product[];
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const filters = [
    { id: 'aziende', label: 'Attività e uffici commerciali' },
    { id: 'privati', label: 'Privati' },
    { id: 'ristorazione', label: 'Bar e ristoranti' },
    { id: 'addolcitori', label: 'Addolcitori' },
    { id: 'decalcificatori', label: 'Decalcificatori' },
    { id: 'ozonizzatori', label: 'Ozonizzatori' },
    { id: 'tritarifiuti', label: 'Tritarifiuti' },
    { id: 'rubinetti', label: 'Rubinetti' },
    { id: 'borracce', label: 'Borracce e bottiglie' }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    if (activeFilter) {
      const filtered = allProducts.filter(product => {
        const filterLower = activeFilter.toLowerCase();
        return product.target.includes(filterLower) || product.categoria.toLowerCase() === filterLower;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [activeFilter, allProducts]);

  const handleFilterChange = (filterId: string | null) => {
    setActiveFilter(filterId);
    setIsSelectOpen(false); 
    const url = filterId ? `/prodotti?filter=${encodeURIComponent(filterId)}` : '/prodotti';
    window.history.pushState({}, '', url);
  };

  const getCurrentLabel = () => {
    if (!activeFilter) return "Tutti i prodotti";
    return filters.find(f => f.id === activeFilter)?.label || "Tutti i prodotti";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Cal_Sans'] pt-6 pb-20 relative overflow-hidden selection:bg-[#7faeb2] selection:text-white">
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      <div className={`max-w-1800px mx-auto px-6 md:px-12 relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        <div className="mb-12 md:mb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 hover:text-[#7faeb2] mb-8 border border-black/10 hover:border-[#7faeb2] px-3 py-2 rounded-full transition-all duration-300">
                <FiArrowLeft /> Torna alla Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-8 gap-8">
                <div>
                    <h1 className="text-5xl md:text-8xl uppercase tracking-tight leading-none mb-2 text-black">
                        Gamma Prodotti
                    </h1>
                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-500">
                        Catalogo Ufficiale 2026
                    </span>
                </div>
            </div>
        </div>

        {/* MOBILE: Custom Select Dropdown */}
        <div className="md:hidden relative mb-12 z-30" ref={selectRef}>
            <button 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full flex justify-between items-center bg-white border border-black/10 px-6 py-4 uppercase text-xs tracking-[0.2em] font-bold text-gray-900"
            >
                <span className="truncate mr-4">{getCurrentLabel()}</span>
                <FiChevronDown className={`text-lg shrink-0 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute top-full left-0 w-full bg-white border-x border-b border-black/10 shadow-xl transition-all duration-300 overflow-y-auto custom-scrollbar ${isSelectOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <button
                    onClick={() => handleFilterChange(null)}
                    className={`w-full text-left px-6 py-4 uppercase text-[11px] tracking-[0.2em] border-b border-gray-100 hover:bg-gray-50 transition-colors ${!activeFilter ? 'text-[#7faeb2] font-bold' : 'text-gray-500'}`}
                >
                    Tutti
                </button>
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => handleFilterChange(f.id)}
                        className={`w-full text-left px-6 py-4 uppercase text-[11px] tracking-[0.2em] border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${activeFilter === f.id ? 'text-[#7faeb2] font-bold' : 'text-gray-500'}`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
        </div>

        {/* DESKTOP: Pulsanti affiancati */}
        <div className="hidden md:flex flex-wrap gap-4 mb-16">
          <button
            onClick={() => handleFilterChange(null)}
            className={`px-6 py-3 rounded-none border transition-all duration-300 uppercase text-[11px] tracking-[0.2em] ${
              !activeFilter
                ? 'bg-[#7faeb2] text-black border-[#7faeb2] font-bold' 
                : 'bg-transparent text-gray-500 border-black/10 hover:border-[#7faeb2] hover:text-[#7faeb2]' 
            }`}
          >
            Tutti
          </button>
          
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`px-6 py-3 rounded-none border transition-all duration-300 uppercase text-[11px] tracking-[0.2em] ${
                activeFilter === f.id
                  ? 'bg-[#7faeb2] text-black border-[#7faeb2] font-bold' 
                  : 'bg-transparent text-gray-500 border-black/10 hover:border-[#7faeb2] hover:text-[#7faeb2]' 
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-12 border-b border-black/5 pb-4">
             <p className="text-xs uppercase tracking-widest text-gray-500">
                Visualizzando: <span className="text-black ml-2 font-bold">{filters.find(f => f.id === activeFilter)?.label || "Catalogo Completo"}</span>
            </p>
            <span className="text-[10px] font-mono text-gray-400">{filteredProducts.length} PRODOTTI</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id}>
                <ProductCard product={{...product, immagine: product.immagini[0]}} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center border border-dashed border-black/10 mt-8">
            <h3 className="text-3xl uppercase text-gray-400 mb-4 font-thin">Nessun risultato</h3>
            <button 
                onClick={() => handleFilterChange(null)}
                className="text-xs uppercase tracking-widest border-b border-black/30 pb-1 text-gray-600 hover:border-[#7faeb2] hover:text-[#7faeb2] transition-colors"
            >
                Resetta filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProdottiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-300 flex items-center justify-center text-gray-900 font-['Cal_Sans']">
        <p className="uppercase tracking-widest animate-pulse">Caricamento...</p>
      </div>
    }>
      <ProdottiContent />
    </Suspense>
  );
}