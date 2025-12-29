"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard'; 
import prodottiData from '@/data/prodotti.json';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

type Product = {
  id: string;
  nome: string;
  categoria: string;
  target: string[];
  tecnologia: string;
  installazione: string;
  immagine: string;
  descrizione_breve: string;
  specifiche: {
    capacita?: string;
    erogazione?: string[];
    plus: string;
    resina?: string;
    capacita_giorno?: string;
  };
};

// 1. COMPONENTE CONTENUTO (Contiene la logica con useSearchParams)
function ProdottiContent() {
  const searchParams = useSearchParams();
  const urlFilter = searchParams.get('filter');

  const [activeFilter, setActiveFilter] = useState<string | null>(urlFilter);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(prodottiData.prodotti);
  const [isLoaded, setIsLoaded] = useState(false);

  const filters = [
    { id: 'aziende', label: 'Aziende' },
    { id: 'privati', label: 'Privati' },
    { id: 'ristorazione', label: 'Ristorazione' },
    { id: 'addolcitori', label: 'Addolcitori' }
  ];

  useEffect(() => {
    setIsLoaded(true);
    if (activeFilter) {
      const filtered = prodottiData.prodotti.filter(product => {
        const filterLower = activeFilter.toLowerCase();
        return product.target.includes(filterLower) || product.categoria.toLowerCase() === filterLower;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(prodottiData.prodotti);
    }
  }, [activeFilter]);

  const handleFilterChange = (filterId: string | null) => {
    setActiveFilter(filterId);
    // Nota: window.history.pushState aggiorna l'URL senza ricaricare la pagina
    const url = filterId ? `/prodotti?filter=${encodeURIComponent(filterId)}` : '/prodotti';
    window.history.pushState({}, '', url);
  };

  return (
    // MODIFICA: Aggiornato font-cal a font-['Cal_Sans']
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] font-['Cal_Sans'] pt-6 pb-20 relative overflow-hidden selection:bg-[#7faeb2] selection:text-black">
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      <div className={`max-w-1800px mx-auto px-6 md:px-12 relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* Header Section */}
        <div className="mb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-50 hover:opacity-100 mb-8 hover:text-[#7faeb2] border border-white/40 hover:border-[#7faeb2] px-3 py-2 rounded-full transition-all duration-300">
                <FiArrowLeft /> Torna alla Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-8">
                <div>
                    <h1 className="text-6xl md:text-8xl uppercase tracking-tight leading-none mb-2">
                        Gamma Prodotti
                    </h1>
                    <span className="text-xs font-mono uppercase tracking-[0.4em] opacity-40">
                        Catalogo Ufficiale 2025
                    </span>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm uppercase tracking-widest opacity-60 max-w-xs">
                        Soluzioni certificate per ogni esigenza di depurazione.
                    </p>
                </div>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-16">
          <button
            onClick={() => handleFilterChange(null)}
            className={`px-8 py-3 rounded-none border transition-all duration-300 uppercase text-[11px] tracking-[0.2em] ${
              !activeFilter
                ? 'bg-[#7faeb2] text-black border-[#7faeb2]' 
                : 'bg-transparent text-white/40 border-white/10 hover:border-[#7faeb2] hover:text-[#7faeb2]' 
            }`}
          >
            Tutti
          </button>
          
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFilterChange(f.id)}
              className={`px-8 py-3 rounded-none border transition-all duration-300 uppercase text-[11px] tracking-[0.2em] ${
                activeFilter === f.id
                  ? 'bg-[#7faeb2] text-black border-[#7faeb2]' 
                  : 'bg-transparent text-white/40 border-white/10 hover:border-[#7faeb2] hover:text-[#7faeb2]' 
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Info Risultati */}
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-4">
             <p className="text-xs uppercase tracking-widest opacity-40">
                Visualizzando: <span className="text-white ml-2">{filters.find(f => f.id === activeFilter)?.label || "Catalogo Completo"}</span>
            </p>
            <span className="text-[10px] font-mono opacity-30">{filteredProducts.length} PRODOTTI</span>
        </div>

        {/* Grid Prodotti */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id}>
                <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center border border-dashed border-white/10 mt-8">
            <h3 className="text-3xl uppercase opacity-30 mb-4 font-thin">Nessun risultato</h3>
            <button 
                onClick={() => handleFilterChange(null)}
                className="text-xs uppercase tracking-widest border-b border-white/30 pb-1 hover:border-[#7faeb2] hover:text-[#7faeb2] transition-colors"
            >
                Resetta filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. COMPONENTE PAGINA PRINCIPALE (Wrapper con Suspense)
export default function ProdottiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#F2F2F2] font-['Cal_Sans']">
        <p className="uppercase tracking-widest animate-pulse">Caricamento...</p>
      </div>
    }>
      <ProdottiContent />
    </Suspense>
  );
}