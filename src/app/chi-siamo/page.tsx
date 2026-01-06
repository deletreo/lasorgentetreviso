"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FiArrowDown } from 'react-icons/fi';
import Image from 'next/image';
import prodottiAssieme from './prodottiAssieme.png';

export default function ChiSiamo() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { label: "home", href: "/", action: null, hasSubmenu: false },
        { label: "prodotti", href: "/prodotti", action: () => setIsMenuOpen(true), hasSubmenu: true },
        { label: "chi siamo", href: "/chi-siamo", action: null, hasSubmenu: false },
        { label: "perché un negozio fisico?", href: "/#perche", action: null, hasSubmenu: false },
        { label: "contatti", href: "/contatti", action: null, hasSubmenu: false }
    ];

    useEffect(() => {
        // --- BLOCCO ALTEZZA FISSA ---
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

    const scrollToContent = () => {
        const section = document.getElementById('content');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative w-full min-h-[100svh] bg-[#050505] text-[#F2F2F2] font-cal overflow-x-hidden selection:bg-[#4fd1c5] selection:text-black">
            
            {/* HERO VIDEO FULLSCREEN BLOCCATO */}
            <div 
                className="relative w-full overflow-hidden"
                // Altezza fissata al 100% dell'altezza iniziale dello schermo
                style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
            >
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                
                {/* will-change-transform per evitare scatti */}
                <div className="absolute inset-0 z-0 will-change-transform">
                    <video 
                        className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite]" 
                        autoPlay loop muted playsInline
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    >
                        <source src="/videoLaSorgente.mp4" type="video/mp4" />
                    </video>
                </div>
                
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] text-white/90 mb-6 animate-fade-in-up">
                        I nostri obiettivi
                    </span>
                    <h1 className="text-[11vw] md:text-[10vw] leading-[0.85] font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 animate-fade-in-up delay-100 w-full max-w-full break-words px-2 pb-2">
                        Chi Siamo
                    </h1>
                    <button 
                        onClick={scrollToContent}
                        className="mt-12 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 animate-bounce cursor-pointer group"
                    >
                        <FiArrowDown className="text-xl" />
                    </button>
                </div>
            </div>

            <Navbar showExtraLinks={true} links={links} />

            <main id="content" className="relative z-10 bg-[#050505]">
                
                {/* 1. PHILOSOPHY SECTION */}
                <section className="py-24 md:py-48 px-6 md:px-[10%] text-center">
                    <div className="max-w-5xl mx-auto">
                        <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-white/90">
                            "Crediamo che l'acqua sia vita e che la salute parta da ciò che beviamo ogni giorno. 
                            <br className="hidden md:block"/>
                            <span className="text-[#4fd1c5] font-normal mt-4 block">Per questo proponiamo soluzioni affidabili, trasparenti e sostenibili, pensate per migliorare il benessere delle persone e rispettare l'ambiente."</span>
                        </p>
                    </div>
                </section>

                {/* 2. SPLIT SECTION */}
                <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
                    {/* Left: Content */}
                    <div className="px-6 md:px-20 py-20 flex flex-col justify-center bg-[#0a0a0a] border-y border-white/5">
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#4fd1c5] mb-8">
                            La Missione
                        </span>
                        <h2 className="text-4xl md:text-7xl uppercase tracking-tighter leading-none mb-12 text-white">
                            Stop alla<br/>Plastica
                        </h2>
                        <div className="space-y-8 max-w-lg">
                            <p className="text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed">
                                Siamo un'azienda specializzata in <strong className="text-white font-medium">depuratori d'acqua e sistemi per il trattamento dell'acqua</strong> per privati e attività commerciali: aziende, uffici, palestre, beauty center, ristoranti, bar e molto altro.
                            </p>
                            <p className="text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed">
                                Il nostro obiettivo principale è <strong className="text-white font-medium">ridurre drasticamente l'uso della plastica</strong>, eliminando la necessità di acquistare continuamente bottiglie d'acqua. Sappiamo quanto sia scomodo e faticoso fare la spesa, trasportare casse pesanti, trovare spazio per lo stoccaggio e gestire rifiuti di plastica ogni giorno.
                            </p>
                            
                            <div className="flex flex-col gap-6 pt-4">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 md:w-16 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-[#4fd1c5] transition-all duration-500"></div>
                                    <span className="text-sm uppercase tracking-widest text-white">Niente pesi da trasportare</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 md:w-16 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-[#4fd1c5] transition-all duration-500"></div>
                                    <span className="text-sm uppercase tracking-widest text-white">Più spazio in casa</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 md:w-16 h-[1px] bg-white/20 group-hover:w-24 group-hover:bg-[#4fd1c5] transition-all duration-500"></div>
                                    <span className="text-sm uppercase tracking-widest text-white">Zero inquinamento</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Image Parallax */}
                    <div className="relative h-[50vh] lg:h-auto overflow-hidden group order-first lg:order-last">
                        <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
                        <Image 
                            src={prodottiAssieme} 
                            alt="La Sorgente prodotti" 
                            fill
                            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                        />
                        <div className="absolute bottom-8 left-8 z-20">
                             <p className="text-white text-xs font-mono uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md rounded-full">
                                 I nostri prodotti
                             </p>
                        </div>
                    </div>
                </section>

                {/* 3. PURE SOURCE SECTION */}
                <section className="relative py-24 md:py-48 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" 
                        style={{ backgroundImage: 'linear-gradient(#4fd1c5 1px, transparent 1px), linear-gradient(90deg, #4fd1c5 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
                    </div>
                    
                    <div className="relative z-10 px-6 md:px-[10%] max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                             <h2 className="text-5xl md:text-9xl uppercase tracking-tighter leading-[0.8] mb-8 md:mb-12 text-white">
                                 Sorgente <br/>Pura
                             </h2>
                        </div>
                        <div className="lg:col-span-5 border-l border-white/20 pl-8 md:pl-16 py-4">
                            <p className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed mb-8">
                                Con i nostri sistemi vogliamo offrire una soluzione semplice e definitiva: <br/>
                                <strong className="text-white font-medium block mt-4">avere a casa o nella propria attività una vera sorgente di acqua pura, buona e leggera, come se arrivasse direttamente dalla montagna, ma dal proprio rubinetto.</strong>
                            </p>
                            <Link href="/prodotti" className="inline-block border-b border-white pb-1 text-sm uppercase tracking-widest hover:text-[#4fd1c5] hover:border-[#4fd1c5] transition-colors">
                                Scopri le tecnologie
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 4. VALUES GRID */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-white/10">
                    {[
                        { num: "01", title: "Consulenza", desc: "Analisi gratuita dell'acqua" },
                        { num: "02", title: "Installazione", desc: "Tecnici specializzati" },
                        { num: "03", title: "Assistenza", desc: "Manutenzione programmata" },
                        { num: "04", title: "Garanzia", desc: "Qualità certificata" }
                    ].map((item, i) => (
                        <div key={i} className={`
                            group relative p-8 md:p-12 border-b border-white/10 hover:bg-[#0a0a0a] transition-colors duration-500
                            ${i !== 3 ? 'md:border-r-0 lg:border-r border-r-0' : ''}
                            ${(i % 2 === 0) ? 'sm:border-r' : ''}
                        `}>
                            <span className="block text-xs font-mono text-[#4fd1c5] mb-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:-translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                                {item.num}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-400 font-sans font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </section>

            </main>

            <Footer />
        </div>
    );
}