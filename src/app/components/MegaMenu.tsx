import Link from 'next/link';
import { FiX, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

// Dati Menu Categorie
const categorie = [
    { 
        id: "aziende", 
        label: "Attività e uffici commerciali", 
        desc: "Efficienza Business", 
        img: "/fotoProdotti/alaska.JPG", 
        href: "/prodotti?filter=aziende" 
    },
    { 
        id: "privati", 
        label: "Privati", 
        desc: "Purezza Domestica", 
        img: "/fotoProdotti/icon-iron under sink.png", 
        href: "/prodotti?filter=privati" 
    },
    { 
        id: "ristorazione", 
        label: "Bar e ristoranti", 
        desc: "Eccellenza Ho.Re.Ca.", 
        img: "/fotoProdotti/atena.jpg", 
        href: "/prodotti?filter=ristorazione" 
    },
    { 
        id: "addolcitori", 
        label: "Addolcitori", 
        desc: "Tecnici & Impianti", 
        img: "/fotoProdotti/candy addolcitori.png", 
        href: "/prodotti?filter=addolcitori" 
    },
    { 
        id: "decalcificatori", 
        label: "Decalcificatori", 
        desc: "Protezione Calcare", 
        img: "/fotoProdotti/candy addolcitori.png", 
        href: "/prodotti?filter=decalcificatori" 
    },
    { 
        id: "ozonizzatori", 
        label: "Ozonizzatori", 
        desc: "Sanificazione Avanzata", 
        img: "/fotoProdotti/icon-iron under sink.png", 
        href: "/prodotti?filter=ozonizzatori" 
    },
    { 
        id: "tritarifiuti", 
        label: "Tritarifiuti", 
        desc: "Gestione Rifiuti", 
        img: "/fotoProdotti/alaska.JPG", 
        href: "/prodotti?filter=tritarifiuti" 
    },
    { 
        id: "rubinetti", 
        label: "Rubinetti", 
        desc: "Erogazione Design", 
        img: "/fotoProdotti/icon-iron under sink.png", 
        href: "/prodotti?filter=rubinetti" 
    },
    { 
        id: "borracce", 
        label: "Borracce e bottiglie", 
        desc: "Sostenibilità on the go", 
        img: "/fotoProdotti/atena.jpg", 
        href: "/prodotti?filter=borracce" 
    }
];

export default function MegaMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <div className={`fixed inset-0 z-90 flex transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none delay-500'}`}>
            
            {/* COLONNA SINISTRA: LISTA LINK */}
            <div className={`w-full lg:w-[60%] h-full bg-[#0a0a0a] flex flex-col p-8 md:p-16 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                
                {/* Header Menu */}
                <div className="flex justify-between items-start mb-8 shrink-0">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Indice</span>
                    <button onClick={() => setIsOpen(false)} className="group flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white/50 transition-colors">
                        Close <FiX className="text-xl transition-transform group-hover:rotate-90" />
                    </button>
                </div>

                {/* Lista Scrollabile */}
                <div className="flex flex-col gap-1 relative z-10 overflow-y-auto h-full pr-4 custom-scrollbar">
                    {categorie.map((cat, i) => (
                        <Link 
                            key={i} 
                            href={cat.href}
                            onMouseEnter={() => setHoveredCategory(i)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            onClick={() => setIsOpen(false)}
                            // items-baseline allinea il numero alla prima riga di testo, anche se va a capo
                            className="group relative flex items-baseline gap-6 py-3 border-b border-white/5 hover:border-white/20 transition-all duration-500 shrink-0"
                        >
                            <span className="text-xs font-mono opacity-30 group-hover:text-white transition-colors w-6 shrink-0">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            
                            {/* MODIFICA QUI:
                                - Rimossa classe: whitespace-nowrap
                                - Aggiunta classe: whitespace-normal break-words
                            */}
                            <h2 className="text-3xl md:text-5xl uppercase leading-[0.9] tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out text-white/50 group-hover:text-white whitespace-normal break-words max-w-full">
                                {cat.label}
                            </h2>
                            
                            <FiArrowRight className="ml-auto text-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shrink-0" />
                        </Link>
                    ))}
                </div>

                {/* Footer Menu */}
                <div className="flex justify-between items-end opacity-40 mt-8 shrink-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                        Tecnologia per l'acqua<br/>Treviso, Italia
                    </p>
                </div>
            </div>

            {/* COLONNA DESTRA: IMMAGINI */}
            <div className={`hidden lg:block w-[40%] h-full relative overflow-hidden transition-transform duration-1000 delay-100 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                {categorie.map((cat, i) => (
                    <div key={i} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredCategory === i ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-black/30 z-10" />
                        <img src={cat.img} alt={cat.label} className={`w-full h-full object-cover transition-transform duration-2000 ease-out ${hoveredCategory === i ? 'scale-110' : 'scale-100'}`} />
                        <div className="absolute bottom-16 left-16 z-20 bg-black/40 backdrop-blur-md p-6 border-l-2 border-white">
                            <h3 className="text-3xl uppercase mb-2 text-white">{cat.label}</h3>
                            <p className="text-xs font-mono text-white/80 tracking-widest uppercase">{cat.desc}</p>
                        </div>
                    </div>
                ))}
                <div className={`absolute inset-0 bg-[#111] flex items-center justify-center transition-opacity duration-500 ${hoveredCategory === null ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-xs uppercase tracking-[0.5em] text-white/20">Seleziona una categoria</p>
                </div>
            </div>
        </div>
    );
}