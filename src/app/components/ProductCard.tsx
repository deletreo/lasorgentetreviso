import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// Mappa dei colori per i pallini
const colorMap: Record<string, string> = {
  'R': 'bg-red-500',
  'G': 'bg-green-500',
  'B': 'bg-blue-600',
  'Y': 'bg-yellow-400',
  'P': 'bg-purple-500',
};

// Definiamo il tipo per TypeScript
interface Product {
  id: string;
  nome: string;
  categoria: string;
  target: string[];
  tecnologia: string;
  installazione: string;
  immagini: string[]; // CORRETTO: Corrisponde all'array del JSON
  descrizione_breve: string;
  specifiche: {
    capacita?: string;
    erogazione?: string[];
    plus: string;
    personalizzazione?: string; 
    codici_colori?: string[];
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Verifica se ci sono colori da mostrare
  const hasColors = product.specifiche.codici_colori && product.specifiche.codici_colori.length > 0;

  return (
    <Link href={`/prodotti/${product.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-gray-700 border border-gray-300 hover:border-gray-400 transition-all duration-500 overflow-hidden relative">
        
        {/* Immagine */}
        <div className="relative aspect-square md:aspect-4/5 overflow-hidden">
          <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img
            src={product.immagini[0]} // CORRETTO: Prende la prima immagine dell'array
            alt={product.nome}
            className="w-full h-full object-cover transition-transform duration-1500 bg-white ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
          />
          
          {/* --- LOGICA COLORI CORRETTA --- */}
          {/* Mostra la barra se c'è "Colorato" OPPURE se ci sono codici colori */}
          {(product.specifiche.personalizzazione === 'Colorato' || hasColors) && (
            <div className="absolute bottom-0 w-full z-20 bg-gray-100/50 px-3 py-1 border border-white/20 shadow-lg flex items-center justify-between h-8">
              
              <span className="text-[10px] text-black uppercase tracking-widest font-cal font-bold">
                Colorato
              </span>

              {hasColors && (
                <div className="flex gap-1.5 backdrop-blur-sm rounded-full bg-white/30 px-2 py-1">
                  {product.specifiche.codici_colori!.map((codice, index) => (
                    <div 
                      key={index}
                      className={`w-3 h-3 rounded-full border border-white/50 shadow-sm ${colorMap[codice] || 'bg-gray-400'}`}
                      title={`Colore ${codice}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Badge Categoria in alto a destra */}
          <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 border border-[#11414d]/30">
            <span className="text-[10px] text-white uppercase tracking-widest font-cal font-bold">
              {product.categoria}
            </span>
          </div>
          
        </div>

        {/* Testi */}
        <div className="p-6 flex flex-col grow justify-between gap-4">
          <div>
            <h3 className="text-2xl text-white uppercase font-cal mb-2 group-hover:underline decoration-1 underline-offset-4 decoration-[#11414d]">
              {product.nome}
            </h3>
            <p className="text-xs text-white/50 font-cal uppercase tracking-widest line-clamp-2">
              {product.descrizione_breve}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
            <div className="flex flex-wrap gap-2 max-w-[85%]">
               {product.target.slice(0, 3).map((t, i) => (
                   <span key={i} className="text-[9px] uppercase border border-white/20 px-2 py-1 text-white/70 rounded-full">
                       {t}
                   </span>
               ))}
            </div>
            
            <span className="text-white group-hover:text-[#11414d] group-hover:translate-x-2 transition-all duration-300">
                <FiArrowRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}