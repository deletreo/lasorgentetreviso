import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import ImageGallery from '../../components/ImageGallery';

import prodottiData from '../../../data/prodotti.json'; 

export async function generateStaticParams() {
  return prodottiData.prodotti.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  const product = prodottiData.prodotti.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F2F2F2] font-cal selection:bg-[#7faeb2] selection:text-black">
      
      {/* Texture Sfondo */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {/* --- BARRA BIANCA IN ALTO --- */}
      <header className="fixed top-0 left-0 w-full h-20 bg-white z-50 flex justify-between items-center px-6 md:px-8 border-b border-gray-100 shadow-sm">
        <Link 
            href="/prodotti" 
            className="flex items-center gap-3 text-xs uppercase tracking-widest text-black/60 hover:text-[#7faeb2] border border-black/10 hover:border-[#7faeb2] px-3 py-2 rounded-full transition-all duration-300"
        >
          <FiArrowLeft /> Torna al catalogo
        </Link>

        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-black uppercase hover:opacity-70 transition-opacity">
             La Sorgente
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-20">
        
        {/* COLONNA SINISTRA: GALLERIA FOTO */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 bg-[#111] border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Usiamo il nuovo componente Client Side */}
            <ImageGallery 
              images={product.immagini} 
              productName={product.nome} 
              category={product.categoria} 
            />
        </div>

        {/* COLONNA DESTRA: INFO */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-[#050505]">
          
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="flex gap-2 mb-6">
                {product.target.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase border border-white/20 text-white/50 px-3 py-1 rounded-full tracking-widest">
                        {t}
                    </span>
                ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight mb-6 text-transparent bg-clip-text bg-linear-to-br from-white to-[#7faeb2]">
              {product.nome}
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-xl whitespace-pre-line">
               {(product as any).descrizione_estesa || product.descrizione_breve}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 mb-16">
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Tecnologia</span>
                <span className="text-lg uppercase border-l-2 border-[#7faeb2] pl-4">{product.tecnologia}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Installazione</span>
                <span className="text-lg uppercase border-l-2 border-[#7faeb2] pl-4">{product.installazione}</span>
            </div>
            {product.specifiche.plus && (
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7faeb2]">Plus</span>
                    <span className="text-sm uppercase border-l-2 border-white/20 pl-4 text-white/80">{product.specifiche.plus}</span>
                </div>
            )}
             {product.specifiche.capacita && (
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Capacità</span>
                    <span className="text-sm uppercase border-l-2 border-[#7faeb2] pl-4">{product.specifiche.capacita}</span>
                </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-auto">
            <Link 
                href="/#configuratore" 
                className="flex-1 bg-[#7faeb2] text-black text-center py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white transition-colors flex items-center justify-center"
            >
                Richiedi Preventivo
            </Link>
            
            <a 
                href="/brochure.pdf" 
                download="brochure.pdf"
                className="flex-1 border border-[#7faeb2] text-[#7faeb2] flex items-center justify-center gap-2 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#7faeb2] hover:text-black transition-all cursor-pointer"
            >
                <FiDownload className="text-lg" /> Scarica Scheda
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}