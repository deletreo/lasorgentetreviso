import Link from 'next/link';
import { FiX, FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

// Dati Menu Categorie (spostati qui o in un file data separato)
const categorie = [
    { id: "aziende", label: "Aziende", desc: "Efficienza Business", img: "/fotoProdotti/alaska.JPG", href: "/prodotti?filter=aziende" },
    { id: "privati", label: "Privati", desc: "Purezza Domestica", img: "/fotoProdotti/icon-iron under sink.png", href: "/prodotti?filter=privati" },
    { id: "ristorazione", label: "Ristorazione", desc: "Eccellenza Ho.Re.Ca.", img: "/fotoProdotti/atena.jpg", href: "/prodotti?filter=ristorazione" },
    { id: "addolcitori", label: "Addolcitori", desc: "Tecnici & Impianti", img: "/fotoProdotti/candy addolcitori.png", href: "/prodotti?filter=addolcitori" }
];

export default function MegaMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

    return (
        <div className={`fixed inset-0 z-90 flex transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none delay-500'}`}>
            <div className={`w-full lg:w-[60%] h-full bg-[#0a0a0a] flex flex-col justify-between p-8 md:p-16 transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Indice</span>
                    <button onClick={() => setIsOpen(false)} className="group flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white/50 transition-colors">
                        Close <FiX className="text-xl transition-transform group-hover:rotate-90" />
                    </button>
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                    {categorie.map((cat, i) => (
                        <Link 
                            key={i} 
                            href={cat.href}
                            onMouseEnter={() => setHoveredCategory(i)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            onClick={() => setIsOpen(false)}
                            className="group relative flex items-baseline gap-6 py-4 md:py-6 border-b border-white/5 hover:border-white/20 transition-all duration-500"
                        >
                            <span className="text-xs md:text-sm font-mono opacity-30 group-hover:text-white transition-colors">0{i + 1}</span>
                            <h2 className="text-4xl md:text-6xl lg:text-[5vw] xl:text-[5.5vw] uppercase leading-[0.9] tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out text-white/50 group-hover:text-white whitespace-nowrap">
                                {cat.label}
                            </h2>
                            <FiArrowRight className="ml-auto text-3xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                        </Link>
                    ))}
                </div>
                <div className="flex justify-between items-end opacity-40">
                    <p className="text-[10px] uppercase tracking-[0.2em] max-w-200px leading-relaxed">
                        Tecnologia per l'acqua<br/>Treviso, Italia
                    </p>
                </div>
            </div>
            <div className={`hidden lg:block w-[40%] h-full relative overflow-hidden transition-transform duration-1000 delay-100 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                {categorie.map((cat, i) => (
                    <div key={i} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${hoveredCategory === i ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <img src={cat.img} alt={cat.label} className={`w-full h-full object-cover transition-transform duration-2000 ease-out ${hoveredCategory === i ? 'scale-110' : 'scale-100'}`} />
                        <div className="absolute bottom-16 left-16 z-20 bg-black/40 backdrop-blur-md p-6 border-l-2 border-white">
                            <h3 className="text-4xl uppercase mb-2">{cat.label}</h3>
                            <p className="text-xs font-mono opacity-80 tracking-widest uppercase">{cat.desc}</p>
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