"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FiEye, FiDroplet, FiDollarSign, FiMessageCircle, FiMapPin } from 'react-icons/fi';

export default function PercheNegozioFisico() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Links coerenti con le altre pagine
    const links = [
        { label: "prodotti", href: "/prodotti", action: () => setIsMenuOpen(true), hasSubmenu: true },
        { label: "chi siamo", href: "/chi-siamo", action: null, hasSubmenu: false },
        { label: "perché un negozio fisico?", href: "/perche", action: null, hasSubmenu: false },
        { label: "contatti", href: "/contatti", action: null, hasSubmenu: false }
    ];

    // --- BLOCCO ALTEZZA FISSA (Anti-Lag) ---
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

    return (
        <div className="relative w-full min-h-[100svh] bg-[#050505] text-[#F2F2F2] font-cal overflow-x-hidden selection:bg-[#11414d] selection:text-white">
            
            {/* Texture Sfondo */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[0] mix-blend-overlay" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
            </div>

            <Navbar showExtraLinks={true} links={links} />

            {/* HEADER / HERO */}
            <header className="relative pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
                <div className="flex flex-col gap-6 border-l-2 border-[#11414d] pl-6 md:pl-12 mt-10 md:mt-20">
                    <span className="text-[#11414d] text-xs font-bold uppercase tracking-[0.4em] animate-fade-in-up">
                        La nostra filosofia
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-tight text-white mb-4">
                        Perché un <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#11414d]">
                            Negozio Fisico?
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl leading-relaxed">
                        Abbiamo deciso di aprire un negozio fisico di depuratori d'acqua per portare finalmente <strong className="text-white font-medium">chiarezza e trasparenza</strong> in un settore che da anni si basa quasi esclusivamente sulla vendita porta a porta.
                    </p>
                </div>
            </header>

            <main className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto pb-32">
                
                {/* SEZIONE 1: IL PROBLEMA */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 border-t border-white/10 pt-20">
                    <div className="lg:col-span-5">
                        <h2 className="text-5xl md:text-8xl uppercase tracking-tight text-white mb-0 ">
                            Basta acquisti <br/> al buio.
                        </h2>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-8 text-lg text-white/70 font-light leading-relaxed">
                        <p>
                            Molto spesso, prima di acquistare un depuratore, il cliente <strong className="text-white">non ha mai visto il prodotto</strong>, non ha potuto <strong className="text-white">assaggiare l'acqua</strong> né confrontare le diverse tipologie di filtrazione per capire gusto, leggerezza e qualità reale.
                        </p>
                        <p>
                            Le decisioni vengono prese senza informazioni complete e senza la possibilità di verificare concretamente ciò che si sta acquistando.
                        </p>
                        
                        {/* Box Focus sulla trasparenza costi */}
                        <div className="p-8 bg-white/5 border border-white/10 rounded-sm mt-4">
                            <h3 className="text-xl text-white font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                                <span className="text-[#11414d] text-2xl">?</span> La questione prezzo
                            </h3>
                            <p className="text-base text-white/60">
                                C'è un aspetto che raramente viene spiegato con onestà: se il depuratore viene "regalato", <strong className="text-white">come vengono coperti i costi di produzione</strong>, del personale in fabbrica, dei venditori, dei tecnici e di tutte le figure coinvolte?
                                <br/><br/>
                                Noi crediamo che il cliente abbia il diritto di sapere <strong className="text-white">come funziona davvero il prezzo</strong> di ciò che compra.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SEZIONE 2: LA SOLUZIONE (GRID CARDS) */}
                <section className="mb-32">
                    <h2 className="text-center text-xs font-bold uppercase tracking-[0.4em] text-[#11414d] mb-16">
                        Nel nostro negozio tutto è visibile
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                        {/* Card 1 */}
                        <div className="bg-[#050505] p-10 flex flex-col gap-6 group hover:bg-[#0a0a0a] transition-colors">
                            <FiEye className="text-4xl text-[#11414d] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl uppercase font-bold tracking-wide">Vedi e Tocca</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Puoi <strong className="text-white">vedere e toccare i prodotti</strong> con mano, capirne le dimensioni e la qualità costruttiva prima di scegliere.
                            </p>
                        </div>
                        
                        {/* Card 2 */}
                        <div className="bg-[#050505] p-10 flex flex-col gap-6 group hover:bg-[#0a0a0a] transition-colors">
                            <FiDroplet className="text-4xl text-[#11414d] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl uppercase font-bold tracking-wide">Assaggia l'acqua</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Non fidarti delle parole. Puoi <strong className="text-white">assaggiare l'acqua</strong> erogata dai nostri sistemi e sentirne la leggerezza.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#050505] p-10 flex flex-col gap-6 group hover:bg-[#0a0a0a] transition-colors">
                            <FiMessageCircle className="text-4xl text-[#11414d] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl uppercase font-bold tracking-wide">Zero Pressioni</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Puoi fare domande liberamente, senza le pressioni commerciali tipiche della vendita a domicilio.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-[#050505] p-10 flex flex-col gap-6 group hover:bg-[#0a0a0a] transition-colors">
                            <FiDollarSign className="text-4xl text-[#11414d] mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl uppercase font-bold tracking-wide">Prezzo Chiaro</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Puoi capire esattamente cosa stai acquistando e perché costa quel prezzo. Nessun costo nascosto.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SEZIONE 3: FILIERA CORTA & ASSISTENZA */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32">
                    
                    {/* Filiera Corta */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#11414d]/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative border-l-2 border-[#11414d] pl-8 py-4">
                            <h3 className="text-3xl uppercase font-bold text-white mb-6">Dal Produttore <br/> al Consumatore</h3>
                            <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                                Grazie all'assenza di intermediari, i nostri depuratori <strong className="text-white">passano direttamente dalla fabbrica italiana al negozio</strong>.
                            </p>
                            <p className="text-lg text-white/70 font-light leading-relaxed">
                                Questo ci permette di offrire <strong className="text-white">prezzi molto più competitivi</strong>, eliminando i rincari dovuti ai passaggi di mano tipici della vendita porta a porta.
                            </p>
                        </div>
                    </div>

                    {/* Assistenza */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-l from-[#11414d]/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative border-l-2 border-white/20 pl-8 py-4 group-hover:border-[#11414d] transition-colors">
                            <h3 className="text-3xl uppercase font-bold text-white mb-6 flex items-center gap-3">
                                <FiMapPin className="text-[#11414d]" /> Mai più soli
                            </h3>
                            <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                                E dopo l'acquisto non sei mai solo: hai sempre un <strong className="text-white">punto fisico di riferimento</strong>.
                            </p>
                            <p className="text-lg text-white/70 font-light leading-relaxed">
                                Qui trovi assistenza, chiarimenti e supporto reale, senza dover aspettare giorni un tecnico o fare decine di telefonate a call center irraggiungibili.
                            </p>
                        </div>
                    </div>

                </section>

                {/* CTA FINALE */}
                <section className="text-center py-20 border-y border-white/10 bg-white/[0.02]">
                    <h2 className="text-3xl md:text-5xl uppercase  text-white mb-8 max-w-4xl mx-auto">
                        Il nostro obiettivo è semplice ma rivoluzionario:
                    </h2>
                    <p className="text-xl md:text-2xl text-[#11414d] font-bold uppercase tracking-widest mb-12 max-w-3xl mx-auto leading-relaxed">
                        Trasparenza totale, affidabilità, visione reale del prodotto e prezzi onesti.
                    </p>
                    <p className="text-white/50 font-mono text-sm uppercase tracking-widest mb-12">
                        Perché il mondo dei depuratori d'acqua può – e deve – essere finalmente chiaro.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link 
                            href="/contatti" 
                            className="inline-block bg-[#11414d] text-white px-10 py-4 uppercase tracking-[0.2em] font-bold text-xs hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Vieni a trovarci
                        </Link>
                        <Link 
                            href="/prodotti" 
                            className="inline-block border border-white/20 text-white px-10 py-4 uppercase tracking-[0.2em] font-bold text-xs hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Esplora Catalogo
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}