"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import prodottiData from '@/data/prodotti.json';
import Link from 'next/link';
import { FiArrowLeft, FiChevronDown, FiSearch, FiX } from 'react-icons/fi';

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
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la ricerca
  
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

  // Logica di filtraggio combinata (Categoria + Ricerca)
  useEffect(() => {
    setIsLoaded(true);
    let filtered = allProducts;

    // Filtro per categoria/target
    if (activeFilter) {
      const filterLower = activeFilter.toLowerCase();
      filtered = filtered.filter(product => 
        product.target.includes(filterLower) || product.categoria.toLowerCase() === filterLower
      );
    }

    // Filtro per ricerca testuale
    if (searchQuery.trim() !== "") {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.nome.toLowerCase().includes(queryLower) || 
        product.descrizione_breve.toLowerCase().includes(queryLower) ||
        product.tecnologia.toLowerCase().includes(queryLower)
      );
    }

    setFilteredProducts(filtered);
  }, [activeFilter, searchQuery, allProducts]);

  const handleFilterChange = (filterId: string | null) => {
    setActiveFilter(filterId);
    setIsSelectOpen(false); 
    const url = filterId ? `/prodotti?filter=${encodeURIComponent(filterId)}` : '/prodotti';
    window.history.pushState({}, '', url);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const getCurrentLabel = () => {
    if (!activeFilter) return "Tutti i prodotti";
    return filters.find(f => f.id === activeFilter)?.label || "Tutti i prodotti";
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Cal_Sans'] pt-6 pb-20 relative overflow-hidden selection:bg-[#11414d] selection:text-white">
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      <div className={`max-w-1800px mx-auto px-6 md:px-12 relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

        {/* Header Section */}
        <div className="mb-8 md:mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 hover:text-[#11414d] mb-8 border border-black/10 hover:border-[#11414d] px-3 py-2 rounded-full transition-all duration-300">
                <FiArrowLeft /> Torna alla Home
            </Link>
            
            <div className="flex flex-col xl:flex-row justify-between items-end border-b border-black/10 pb-8 gap-8">
                <div>
                    <h1 className="text-5xl md:text-8xl uppercase tracking-tight leading-none mb-2 text-black">
                        Gamma Prodotti
                    </h1>
                    <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-500">
                        Catalogo Ufficiale 2026
                    </span>
                </div>

                {/* --- BARRA DI RICERCA --- */}
                <div className="w-full xl:w-auto relative group">
                    <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-[#11414d] transition-colors" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Cerca per nome o tecnologia..." 
                        // Aggiunto font-sans per usare Lexend e aggiornato il colore del focus
                        className="w-full xl:w-[350px] bg-transparent border-b border-black/10 py-3 pl-8 pr-8 outline-none text-black font-light focus:border-[#11414d] transition-all placeholder-gray-400 font-sans"
                    />
                    {searchQuery && (
                        <button onClick={clearSearch} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#11414d] transition-colors">
                            <FiX />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* --- FILTRI --- */}
        
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
                    className={`w-full text-left px-6 py-4 uppercase text-[11px] tracking-[0.2em] border-b border-gray-100 hover:bg-gray-50 transition-colors ${!activeFilter ? 'text-[#11414d] font-bold' : 'text-gray-500'}`}
                >
                    Tutti
                </button>
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => handleFilterChange(f.id)}
                        className={`w-full text-left px-6 py-4 uppercase text-[11px] tracking-[0.2em] border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${activeFilter === f.id ? 'text-[#11414d] font-bold' : 'text-gray-500'}`}
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
                ? 'bg-[#11414d] text-white border-[#11414d] font-bold' 
                : 'bg-transparent text-gray-500 border-black/10 hover:border-[#11414d] hover:text-[#11414d]' 
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
                  ? 'bg-[#11414d] text-white border-[#11414d] font-bold' 
                  : 'bg-transparent text-gray-500 border-black/10 hover:border-[#11414d] hover:text-[#11414d]' 
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Info Risultati */}
        <div className="flex justify-between items-center mb-12 border-b border-black/5 pb-4">
             <p className="text-xs uppercase tracking-widest text-gray-500">
                Visualizzando: <span className="text-black ml-2 font-bold">{filters.find(f => f.id === activeFilter)?.label || "Catalogo Completo"}</span>
                {searchQuery && <span className="ml-2 text-gray-400 normal-case tracking-normal">- ricerca: "{searchQuery}"</span>}
            </p>
            <span className="text-[10px] font-mono text-gray-400">{filteredProducts.length} PRODOTTI</span>
        </div>

        {/* Grid Prodotti */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
          {filteredProducts.map((product) => (
            <div key={product.id}>
                <ProductCard product={{...product, immagine: product.immagini[0]}} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center border border-dashed border-black/10 mt-8">
            <h3 className="text-3xl uppercase text-gray-400 mb-4 font-thin">Nessun risultato</h3>
            <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Prova a cambiare i filtri o i termini di ricerca.</p>
            <button 
                onClick={() => { handleFilterChange(null); clearSearch(); }}
                className="text-xs uppercase tracking-widest border-b border-black/30 pb-1 text-gray-600 hover:border-[#11414d] hover:text-[#11414d] transition-colors"
            >
                Resetta tutto
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