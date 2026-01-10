import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi';
import Link from 'next/link';

interface HeroLink {
    label: string;
    href: string;
    action?: (() => void) | null;
}

export default function HeroSection({ links, onOpenMenu }: { links: HeroLink[], onOpenMenu: (val: boolean) => void }) {
    
    const scrollToConfigurator = () => {
        const section = document.getElementById('configuratore');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        // ALTEZZA FISSA: 100 unità calcolate all'avvio. Non cambia mai.
        <main 
            className="relative w-full overflow-hidden bg-[#050505]"
            style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
        >
            {/* VIDEO BACKGROUND */}
            <div className="absolute inset-0 z-0 will-change-transform">
                <video 
                    className="w-full h-full object-cover opacity-50 scale-105" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src="/videoLaSorgente.mp4" type="video/mp4" />
                </video>
            </div>

            {/* OVERLAY GRADIENTE */}
            <div className="absolute inset-0 z-1 bg-linear-to-t from-[#050505] via-transparent to-black/30 pointer-events-none"></div>
            
            {/* CONTENUTO */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[8%] pt-20">
                <div className="flex flex-col gap-6 md:gap-10 border-l-2 border-white/20 pl-6 md:pl-12">
                    {links.map((link, i) => (
                        <button key={i} onClick={link.action ? link.action : undefined} className="group w-fit text-left relative">
                            {link.action ? (
                                // Link che apre il Menu
                                <div className="flex items-start md:items-center gap-4 md:gap-8">
                                    <span className="text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[8vw] leading-[0.9] uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 group-hover:to-white transition-all duration-700">
                                        {link.label}
                                    </span>
                                    <span className="hidden md:flex h-px w-16 bg-white/20 group-hover:w-32 transition-all duration-700"></span>
                                    <FiArrowUpRight className="text-3xl md:text-5xl opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 text-white" />
                                </div>
                            ) : (
                                // Link di Navigazione Standard
                                <Link 
                                    href={link.href} 
                                    className="text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[8vw] leading-[0.9] uppercase tracking-tighter text-white/40 hover:text-white transition-colors duration-700 block max-w-4xl break-words"
                                >
                                    {link.label}
                                </Link>
                            )}
                            {/* Linea sottolineatura animata */}
                            <div className="h-2px w-0 bg-white group-hover:w-full transition-all duration-700 mt-2 opacity-50 ease-out"></div>
                        </button>
                    ))}
                </div>
            </div>

            {/* PULSANTE SCROLL DOWN */}
            <button 
                onClick={scrollToConfigurator}
                className="absolute top-[95%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-row items-center gap-2 group cursor-pointer animate-bounce py-4 px-8 border border-white/20 rounded-full backdrop-blur-xl"
            >
                <span className="text-white/50 text-xs uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                    Richiedi un preventivo
                </span>
                <FiArrowDown className="text-white text-xl" />
            </button>
        </main>
    );
}