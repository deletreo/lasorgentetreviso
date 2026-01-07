"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiDownload, FiCheckCircle } from 'react-icons/fi';
import ImageGallery from '../../components/ImageGallery';
import prodottiData from '../../../data/prodotti.json'; 
// Assicurati che il percorso di importazione di Footer sia corretto o rimuovilo se non usato qui
// import Footer from '@/app/components/Footer'; 

// Mappatura colori (Hex Tailwind o CSS standard)
const colorMap: Record<string, string> = {
 'W': 'bg-white',
  'B': 'bg-black',
  'C': 'bg-[#D8DBDE]',
  'G': 'bg-gray-500',
  'S': 'bg-[#F5F5DC]',
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const product = prodottiData.prodotti.find((p) => p.id === id);

  const [showFooter, setShowFooter] = useState(false);

  // 1. BLOCCO ALTEZZA SCHERMO (Anti-Lag Mobile)
  useEffect(() => {
    const setFixedHeights = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setFixedHeights();
    window.addEventListener('resize', () => {
         if (window.innerWidth !== document.documentElement.clientWidth) {
             setFixedHeights();
         }
    });
  }, []);

  // 2. GESTIONE SCROLL FOOTER
  useEffect(() => {
    const handleScroll = () => {
        setShowFooter(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) return notFound();

  const p = product as any;
  const validSpecs = p.caratteristiche?.filter(
    (c: { nome: string; valore: string }) => c.valore && c.valore !== 'N/A' && c.valore.trim() !== ''
  ) || [];

  // Funzione per renderizzare la descrizione strutturata
  const renderDescription = (text: string) => {
    if (!text) return null;
    
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((block, index) => {
        if (block.includes('•')) {
            const [title, ...items] = block.split('\n');
            const hasTitle = !title.startsWith('•');
            
            return (
                <div key={index} className="mb-6">
                    {hasTitle && <h4 className="font-bold text-gray-800 mb-2 uppercase text-sm tracking-wider">{title.replace(':', '')}</h4>}
                    <ul className="list-none space-y-1">
                        {(hasTitle ? items : block.split('\n')).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600">
                                {item.trim().startsWith('•') && <span className="text-[#11414d] mt-1.5 text-[10px]">•</span>}
                                <span>{item.replace('•', '').trim()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        
        if (block === block.toUpperCase() && block.length < 50 && block.length > 3) {
             return <h3 key={index} className="text-xl font-bold text-[#11414d] mb-4 mt-8 first:mt-0">{block}</h3>
        }

        return <p key={index} className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6">{block}</p>;
    });
  };

  return (
    <div 
        className="bg-white text-gray-900 font-cal selection:bg-[#7faeb2] selection:text-white relative"
        style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      
      {/* Background Texture */}
      <div 
        className="fixed top-0 left-0 w-full pointer-events-none opacity-[0.4] z-0 mix-blend-overlay" 
        style={{ 
            height: 'calc(var(--vh, 1vh) * 100)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }}
      ></div>

      {/* Header */}
      <header 
        id="site-header"
        className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md z-50 flex justify-between items-center px-6 md:px-8 border-b border-gray-100 transition-transform duration-300"
      >
        <Link 
            href="/prodotti" 
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] font-medium text-gray-500 hover:text-[#11414d] border border-gray-200 hover:border-[#11414d] px-4 py-2 rounded-full transition-all duration-300"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Torna al catalogo
        </Link>
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-black uppercase hover:opacity-70 transition-opacity">
              La Sorgente
        </Link>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row pt-20">
        
        {/* COLONNA SINISTRA: GALLERIA IMMAGINI */}
        <div className="w-full bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 lg:fixed lg:top-20 lg:left-0 lg:bottom-0 lg:w-1/2 overflow-hidden">
             <div className="w-full h-full aspect-square lg:aspect-auto">
                 <ImageGallery 
                    images={product.immagini} 
                    productName={product.nome} 
                    category={product.categoria} 
                 />
            </div>
        </div>

        {/* COLONNA DESTRA: INFORMAZIONI */}
        <div 
            className="w-full lg:w-1/2 lg:ml-[50%] flex flex-col bg-white min-w-0"
            style={{ minHeight: 'calc(var(--vh, 1vh) * 100 - 80px)' }}
        >
          
          <div className="p-6 md:p-12 lg:p-16 xl:p-20 flex-grow pb-32">
            
            {/* Tag Categoria e Target */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#11414d] bg-[#11414d]/5 px-3 py-1.5 rounded-sm">
                    {product.categoria}
                </span>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                {product.target.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full tracking-widest bg-white">
                        {t}
                    </span>
                ))}
            </div>
            
            {/* Titolo Prodotto */}
            <h1 className="w-full text-4xl sm:text-5xl lg:text-5xl xl:text-6xl uppercase leading-[0.9] tracking-tight mb-8 text-transparent bg-clip-text bg-linear-to-br from-gray-900 via-gray-800 to-[#11414d] pb-2 -ml-0.5 font-bold">
              {product.nome}
            </h1>

            {/* Griglia Info Rapide */}
            <div className="grid grid-cols-2 gap-y-8 gap-x-8 mb-12 border-y border-gray-100 py-8">
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Tecnologia</span>
                    <span className="text-sm uppercase text-gray-900 font-bold wrap-break-word">{product.tecnologia}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Installazione</span>
                    <span className="text-base uppercase text-gray-900 font-bold">{product.installazione}</span>
                </div>
                {p.specifiche?.plus && (
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-[#11414d]">Plus</span>
                        <div className="flex items-start gap-2">
                            <FiCheckCircle className="text-[#11414d] mt-1 shrink-0" />
                            <span className="text-base text-gray-800 font-medium leading-tight">{p.specifiche.plus}</span>
                        </div>
                    </div>
                )}
                 {p.specifiche?.capacita && (
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400">Capacità</span>
                        
                        {/* Controllo se è un array o una stringa */}
                        {Array.isArray(p.specifiche.capacita) ? (
                            <ul className="flex flex-col gap-2 mt-1">
                                {p.specifiche.capacita.map((cap: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        {/* Pallino personalizzato */}
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#11414d] mt-2 shrink-0 opacity-60" />
                                        <span className="text-base text-gray-900 font-medium leading-tight">
                                            {cap}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            /* Fallback per stringa classica */
                            <span className="text-base text-gray-900 font-medium whitespace-pre-wrap">
                                {p.specifiche.capacita}
                            </span>
                        )}
                    </div>
                )}
                
                {/* Visualizzazione Codici Colori */}
                {p.specifiche?.codici_colori && (
                    
                     <div className="flex flex-col gap-3 col-span-2 mt-2 pt-4 border-t border-dashed border-gray-100">
                        <span className="text-sm uppercase tracking-[0.25em] text-gray-400">Finiture Disponibili</span>
                        <div className="flex gap-2">
                        <div className="flex gap-1.5 backdrop-blur-sm rounded-full bg-gray-400 px-5 py-3">
                            {p.specifiche.codici_colori.map((code: string) => (
                                <div 
                                    key={code} 
                                    className={`w-6 h-6 rounded border border-gray-200 shadow-sm ${colorMap[code] || 'bg-gray-200'}`}
                                    title={code} 
                                />
                            ))}
                        </div>
                    </div>
                    </div>
                )}
            </div>
            
            {/* Descrizione Estesa Formattata */}
            <div className="prose prose-gray max-w-none mb-16">
               {renderDescription(p.descrizione_estesa || product.descrizione_breve)}
            </div>

            {/* Tabella Specifiche Tecniche */}
            {validSpecs.length > 0 && (
                <div className="mb-16">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#11414d] mb-8 flex items-center gap-4">
                        Specifiche Tecniche
                        <span className="h-px bg-gray-200 grow"></span>
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-y-0">
                        {validSpecs.map((spec: { nome: string; valore: string }, index: number) => (
                            <div 
                                key={index} 
                                className="group flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-dashed border-gray-200 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-sm"
                            >
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-[#11414d] transition-colors mb-1 sm:mb-0">
                                    {spec.nome}
                                </span>
                                <span className="text-sm font-medium text-gray-900 text-left sm:text-right">
                                    {spec.valore}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* FOOTER ACTIONS - MODIFICATO PER PASSARE IL NOME PRODOTTO */}
          <div 
            className={`fixed bottom-0 left-0 right-0 z-50 bg-gray-50 border-t border-gray-200 p-6 md:p-8 
                       shadow-[0_-5px_20px_rgba(0,0,0,0.1)] lg:shadow-none
                       transform transition-transform duration-500 ease-in-out
                       lg:sticky lg:bottom-0 lg:translate-y-0
                       ${showFooter ? 'translate-y-0' : 'translate-y-[120%]'}`}
          >
            <div className="flex flex-col md:flex-row gap-4">
                <Link 
                    // Passiamo il nome del prodotto come parametro URL
                    href={`/?product=${encodeURIComponent(product.nome)}#configuratore`}
                    className="flex-1 bg-[#11414d] text-white text-center py-4 px-6 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#11414d]/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
                >
                    Richiedi Preventivo
                </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}