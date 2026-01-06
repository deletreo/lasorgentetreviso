"use client";

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiPhone, FiClock, FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ContactsPage() {
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

    return (
        <div className="relative w-full min-h-[100svh] bg-[#050505] text-[#F2F2F2] font-cal overflow-x-hidden selection:bg-[#11414d] selection:text-white">
            
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-overlay" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
            </div>

            <Navbar showExtraLinks={true} links={links} />

            <main className="pt-20 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto">
                
                <div className="mb-10 md:mb-16 pt-10 md:pt-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white mb-8 border border-white/10 hover:border-white px-3 py-2 rounded-full transition-all duration-300">
                        <FiArrowLeft /> Torna alla Home
                    </Link>
                    
                    <div className="flex flex-col border-b border-white/10 pb-8 gap-4">
                        <h1 className="text-5xl md:text-8xl uppercase tracking-tight leading-none text-white">
                            Contatti
                        </h1>
                        <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#11414d]">
                            Parla con Noi
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    
                    <div className="space-y-8">
                        <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed max-w-lg mb-12">
                            Siamo qui per rispondere a tutte le tue domande. Vieni a trovarci nel nostro showroom o scrivici per una consulenza.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-white/10 p-8 bg-[#0a0a0a] hover:border-[#11414d]/50 transition-colors group">
                                <FiMapPin className="text-[#11414d] w-6 h-6 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Dove Siamo</h3>
                                <address className="not-italic text-sm text-gray-400 font-sans font-light leading-relaxed">
                                    Via Daniele Manin, 25<br/>
                                    31100 Treviso (TV)<br/>
                                    Italia
                                </address>
                                <a 
                                    href="https://www.google.com/maps/dir/?api=1&destination=Via+Daniele+Manin,+25,+31100+Treviso+TV" 
                                    target="_blank"
                                    className="inline-block mt-6 border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    Indicazioni Stradali
                                </a>
                            </div>

                            <div className="border border-white/10 p-8 bg-[#0a0a0a] hover:border-[#11414d]/50 transition-colors group">
                                <FiPhone className="text-[#11414d] w-6 h-6 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Recapiti</h3>
                                <div className="flex flex-col gap-2 text-sm text-gray-400 font-sans font-light">
                                    <a href="tel:+393917418137" className="hover:text-white transition-colors block">+39 391 741 8137</a>
                                    <a href="mailto:info@lasorgente.it" className="hover:text-white transition-colors block">info@lasorgente.it</a>
                                </div>
                            </div>

                            <div className="border border-white/10 p-8 bg-[#0a0a0a] hover:border-[#11414d]/50 transition-colors group">
                                <FiInstagram className="text-[#11414d] w-6 h-6 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Seguici</h3>
                                <div className="flex gap-4">
                                     <a href="https://www.instagram.com/lasorgentetv/" target="_blank" className="hover:text-white text-gray-400 transition-colors"><FiInstagram className="w-5 h-5" /></a>
                                     <a href="https://www.facebook.com/profile.php?id=61585233898936" target="_blank" className="hover:text-white text-gray-400 transition-colors"><FiFacebook className="w-5 h-5" /></a>
                                     <a href="https://wa.me/+393917418137" target="_blank" className="hover:text-white text-gray-400 transition-colors"><FaWhatsapp className="w-5 h-5" /></a>
                                </div>
                            </div>

                            <div className="border border-white/10 p-8 bg-[#0a0a0a] hover:border-[#11414d]/50 transition-colors group">
                                <FiClock className="text-[#11414d] w-6 h-6 mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Orari</h3>
                                <div className="text-sm text-gray-400 font-sans font-light space-y-2">
                                    <div className="flex justify-between border-b border-white/5 pb-1">
                                        <span>Lun - Sab</span>
                                        <span>09-12 / 15-19:30</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Dom</span>
                                        <span>Chiuso</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full h-[500px] lg:h-full min-h-[500px] grayscale invert Contrast-125 border border-white/10">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.458927877134!2d12.228578976668707!3d45.66536597107775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4779495dd67d9309%3A0x6b8f3657376c6d04!2sVia%20Daniele%20Manin%2C%2025%2C%2031100%20Treviso%20TV!5e0!3m2!1sit!2sit!4v1709391000000!5m2!1sit!2sit" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 opacity-80"
                        ></iframe>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}