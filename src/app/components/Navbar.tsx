'use client';

import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

interface NavbarProps {
    showExtraLinks?: boolean;
    links?: { label: string; href: string }[];
}

export default function Navbar({ showExtraLinks, links }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* NAVBAR CONTAINER */}
            <nav 
                className={`fixed top-0 left-0 w-full flex justify-between items-center pr-[5%] z-70 transition-all duration-700 
                bg-linear-to-b from-black/60 to-transparent 
                ${showExtraLinks ? 'backdrop-blur-md bg-black/10' : 'backdrop-blur-none'}`}
                // Sostituisce h-[15vh]. Calcola 15 unità fisse basate sull'altezza iniziale.
                style={{ height: 'calc(var(--vh, 1vh) * 15)' }}
            >
                <a href="/" className="md:hover:cursor-pointer">
                    {/* LOGO CONTAINER */}
                    <div 
                        className="relative w-auto"
                        // Sostituisce h-[20vh] e mt-[5%] con valori fissi calcolati all'avvio
                        style={{ 
                            height: 'calc(var(--vh, 1vh) * 20)',
                            marginTop: 'calc(var(--vh, 1vh) * 5)',
                            // Aggiungo anche media query via JS style se necessario, 
                            // ma per ora manteniamo la proporzione mobile base che si adatta allo schermo.
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="logo la sorgente treviso"
                            className="h-full w-auto object-contain drop-shadow-lg"
                        />
                    </div>
                </a>

                {/* LINKS DESKTOP */}
                <div className={`hidden md:flex items-center border-l border-white/20 pl-8 ml-auto mr-12 transition-all duration-500 transform ${
                    showExtraLinks ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                    <div className="flex gap-x-8">
                        {links?.map((link, index) => (
                            <a 
                                key={index} 
                                href={link.href} 
                                className="text-white text-sm font-cal uppercase tracking-widest hover:text-gray-300 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* SOCIAL ICONS */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="https://www.instagram.com/lasorgentetv/" target="_blank" className="text-white hover:scale-110 transition-transform">
                        <FaInstagram className="h-6 w-6" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61585233898936" target="_blank" className="text-white hover:scale-110 transition-transform">
                        <FaFacebookF className="h-6 w-6" />
                    </a>
                    <a href="https://wa.me/+393917418137" target="_blank" className="text-white hover:scale-110 transition-transform">
                        <FaWhatsapp className="h-6 w-6" />
                    </a>
                </div>

                {/* HAMBURGER MENU */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-80 relative"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                    <span className={`block w-8 h-0.5 bg-white my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`block w-8 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-1'}`}></span>
                </button>
            </nav>

            {/* MOBILE MENU FULLSCREEN */}
            <div className={`fixed inset-0 z-65 flex flex-col items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 backdrop-blur-xl bg-black/30 visible' : 'opacity-0 invisible'}`}>
                <div className={`flex flex-col items-center space-y-10 transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {links?.map((link, index) => (
                        <a key={index} href={link.href} onClick={() => setMenuOpen(false)} className="text-white text-xl font-cal uppercase tracking-widest">
                            {link.label}
                        </a>
                    ))}
                    
                    <div className="h-px w-35 bg-white/20 mt-0 mb-[12%]"></div>

                    <div className="flex gap-8">
                        <a href="https://www.instagram.com/lasorgentetv/" className="text-white flex flex-col items-center gap-2"><FaInstagram className="h-8 w-8" /></a>
                        <a href="https://www.facebook.com/profile.php?id=61585233898936" className="text-white flex flex-col items-center gap-2"><FaFacebookF className="h-8 w-8" /></a>
                        <a href="https://wa.me/+393917418137" className="text-white flex flex-col items-center gap-2"><FaWhatsapp className="h-8 w-8" /></a>
                    </div>
                </div>
            </div>
        </>
    );
}