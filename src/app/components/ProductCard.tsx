import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// Definiamo il tipo per TypeScript
interface Product {
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
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    // Link che punta alla pagina dinamica del prodotto
    <Link href={`/prodotti/${product.id}`} className="group block h-full">
      {/* MODIFICA: hover:border-[#11414d] 
          Il bordo diventa colorato quando passi sopra col mouse 
      */}
      <div className="flex flex-col h-full bg-gray-700 border border-gray-300 hover:border-[#11414d] transition-all duration-500 overflow-hidden relative">
        
        {/* Immagine */}
        <div className="relative aspect-4/5 overflow-hidden">
          <div className="absolute inset-0  group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img
            src={product.immagine}
            alt={product.nome}
            className="w-full h-full object-cover transition-transform duration-1500 bg-white ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
          />
          
          {/* MODIFICA: Badge Categoria con bordo e testo colorato (#11414d) 
          */}
          <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 border border-[#11414d]/30">
            <span className="text-[10px] text-white uppercase tracking-widest font-cal font-bold">
              {product.categoria}
            </span>
          </div>
        </div>

        {/* Testi */}
        <div className="p-6 flex flex-col grow justify-between gap-4">
          <div>
            {/* MODIFICA: Sottolineatura colorata in hover (decoration-[#11414d]) 
            */}
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
            
            {/* MODIFICA: Freccia che diventa colorata in hover (group-hover:text-[#11414d]) 
            */}
            <span className="text-white group-hover:text-[#11414d] group-hover:translate-x-2 transition-all duration-300">
                <FiArrowRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}