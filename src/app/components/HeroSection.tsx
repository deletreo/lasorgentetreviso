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
        <main className="relative w-full h-screen overflow-hidden">
            <video className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105" autoPlay loop muted playsInline>
                <source src="/videoLaSorgente.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-black/30"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-[8%] pt-20">
                <div className="flex flex-col gap-6 md:gap-10 border-l-2 border-white/20 pl-6 md:pl-12">
                    {links.map((link, i) => (
                        <button key={i} onClick={link.action ? link.action : undefined} className="group w-fit text-left relative">
                            {link.action ? (
                                <div className="flex items-start md:items-center gap-4 md:gap-8">
                                    <span className="text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[8vw] leading-[0.9] uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/60 group-hover:to-white transition-all duration-700">
                                        {link.label}
                                    </span>
                                    <span className="hidden md:flex h-px w-16 bg-white/20 group-hover:w-32 transition-all duration-700"></span>
                                    <FiArrowUpRight className="text-3xl md:text-5xl opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 text-white" />
                                </div>
                            ) : (
                                <Link href={link.href} className="text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[6vw] 2xl:text-[8vw] leading-[0.9] uppercase tracking-tighter text-white/40 hover:text-white transition-colors duration-700 block max-w-4xl">
                                    {link.label}
                                </Link>
                            )}
                            <div className="h-2px w-0 bg-white group-hover:w-full transition-all duration-700 mt-2 opacity-50 ease-out"></div>
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={scrollToConfigurator}
                className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer animate-bounce"
            >
                <span className="text-[#7faeb2] text-xs uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
                    Crea il tuo depuratore
                </span>
                <FiArrowDown className="text-white text-xl" />
            </button>
        </main>
    );
}