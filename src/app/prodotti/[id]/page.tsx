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
    <div className="min-h-[100svh] bg-white text-gray-900 font-cal selection:bg-[#7faeb2] selection:text-white">
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.4] z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {/* --- AGGIUNTO id="site-header" QUI SOTTO --- */}
      <header 
        id="site-header"
        className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md z-10 flex justify-between items-center px-6 md:px-8 border-b border-gray-200 shadow-sm transition-transform duration-300"
      >
        <Link 
            href="/prodotti" 
            className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500 hover:text-[#11414d] border border-gray-200 hover:border-[#11414d] px-3 py-2 rounded-full transition-all duration-300"
        >
          <FiArrowLeft /> Torna al catalogo
        </Link>
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-black uppercase hover:opacity-70 transition-opacity">
              La Sorgente
        </Link>
      </header>

      <div className="relative z-5 flex flex-col lg:flex-row min-h-[100svh] pt-20">
        
        <div className="w-full aspect-square lg:aspect-auto lg:w-1/2 lg:h-[calc(100svh-80px)] lg:sticky lg:top-20 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
            <ImageGallery 
              images={product.immagini} 
              productName={product.nome} 
              category={product.categoria} 
            />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center p-5 md:p-16 lg:p-12 xl:p-20 bg-white min-w-0">
          
          <div className="mb-12 border-b border-gray-200 pb-8">
            <div className="flex gap-2 mb-6 flex-wrap">
                {product.target.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase border border-gray-300 text-gray-500 px-3 py-1 rounded-full tracking-widest">
                        {t}
                    </span>
                ))}
            </div>
            
            <h1 className="w-full text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl uppercase leading-tight tracking-tight mb-6 text-transparent bg-clip-text bg-linear-to-br from-gray-900 to-[#11414d] pb-2 px-1 -ml-1 break-words">
              {product.nome}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 mb-16">
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Tecnologia</span>
                <span className="text-lg uppercase border-l-2 border-[#11414d] pl-4 text-black font-medium break-words">{product.tecnologia}</span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Installazione</span>
                <span className="text-lg uppercase border-l-2 border-[#11414d] pl-4 text-black font-medium break-words">{product.installazione}</span>
            </div>
            {product.specifiche.plus && (
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#11414d]">Plus</span>
                    <span className="text-sm uppercase border-l-2 border-gray-300 pl-4 text-gray-700 break-words">{product.specifiche.plus}</span>
                </div>
            )}
             {product.specifiche.capacita && (
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Capacità</span>
                    <span className="text-sm uppercase border-l-2 border-[#11414d] pl-4 text-black font-medium break-words">{product.specifiche.capacita}</span>
                </div>
            )}
          </div>
            
            <p className="text-lg md:text-xl text-gray-600 font-thin leading-relaxed max-w-xl whitespace-pre-line">
               {(product as any).descrizione_estesa || product.descrizione_breve}
            </p>
          </div>


          <div className="flex flex-col md:flex-row gap-4 mt-auto">
            <Link 
                href="/#configuratore" 
                className="flex-1 bg-[#11414d] text-white text-center py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            >
                Richiedi Preventivo
            </Link>
            
            <a 
                href="/brochure.pdf" 
                download="brochure.pdf"
                className="flex-1 border border-[#11414d] text-[#11414d] flex items-center justify-center gap-2 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#11414d] hover:text-white transition-all cursor-pointer"
            >
                <FiDownload className="text-lg" /> Scarica Scheda
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}