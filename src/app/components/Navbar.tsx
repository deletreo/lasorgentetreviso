'use client';

import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi'; 
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
    showExtraLinks?: boolean;
    links?: { label: string; href: string }[];
}

export default function Navbar({ showExtraLinks, links }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {/* --- NAVBAR SUPERIORE (Desktop & Mobile Header) --- */}
            <nav 
                className={`fixed top-0 left-0 w-full flex justify-between items-center pr-[5%] z-70 transition-all duration-700 
                bg-linear-to-b from-black/60 to-transparent 
                ${showExtraLinks ? 'backdrop-blur-md bg-black/10' : 'backdrop-blur-none'}`}
                style={{ height: 'calc(var(--vh, 1vh) * 15)' }}
            >
                {/* LOGO CONTAINER */}
                <a href="/" className="md:hover:cursor-pointer">
                    <div 
                        className="relative w-auto"
                        style={{ 
                            height: 'calc(var(--vh, 1vh) * 20)',
                            marginTop: 'calc(var(--vh, 1vh) * 5)',
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="logo la sorgente treviso"
                            className="h-full w-auto object-contain drop-shadow-lg"
                        />
                    </div>
                </a>

                {/* --- SEZIONE CENTRALE (SOLO LINK TESTUALI) --- */}
                <div className={`hidden md:flex items-center ml-auto transition-all duration-500 transform ${
                    showExtraLinks ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                    <div className="flex gap-x-8 border-l border-white/20 pl-8 mr-8">
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

                {/* --- BOTTONE CTA DESKTOP (SEMPRE VISIBILE) --- */}
                <div className="hidden md:flex items-center mr-8">
                    <a 
                        href="/#apri-la-sorgente"
                        className="flex items-center gap-2 group cursor-pointer py-2 px-5 border border-white/30 rounded-full backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all shadow-lg"
                    >
                        <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                            Apri il tuo La Sorgente
                        </span>
                        <FiArrowDown className="text-white text-sm group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* SOCIAL ICONS (Desktop) */}
                <div className="hidden md:flex items-center gap-6 border-l border-white/20 pl-8">
                    <a href="https://www.instagram.com/lasorgentetv/" target="_blank" className="text-white hover:scale-110 transition-transform">
                        <FaInstagram className="h-5 w-5" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61585233898936" target="_blank" className="text-white hover:scale-110 transition-transform">
                        <FaFacebookF className="h-5 w-5" />
                    </a>
                    <a href="https://wa.me/+393917418137" target="_blank" className="text-white hover:scale-110 transition-transform">
                        <FaWhatsapp className="h-5 w-5" />
                    </a>
                </div>

                {/* HAMBURGER MENU BUTTON (Mobile) */}
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

            

            {/* --- MOBILE MENU FULLSCREEN (Overlay) --- */}
            <div className={`fixed inset-0 z-65 flex flex-col items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 backdrop-blur-xl bg-black/40 visible' : 'opacity-0 invisible'}`}>
                <div className={`flex flex-col items-center space-y-8 transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    
                    {/* Link di Navigazione */}
                    {links?.map((link, index) => (
                        <a key={index} href={link.href} onClick={() => setMenuOpen(false)} className="text-white text-xl font-cal uppercase tracking-widest">
                            {link.label}
                        </a>
                    ))}
                    
                    {/* NUOVO: Bottone CTA all'interno del menu */}
                    <a 
    href="/#apri-la-sorgente"
    onClick={() => setMenuOpen(false)}
    className="mt-6 flex items-center gap-3 py-3 px-8 border border-white/40 rounded-full bg-white/5 active:bg-white/20 transition-all"
>
    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold">
        Apri il tuo La Sorgente
    </span>
    <FiArrowDown className="text-white text-sm" />
</a>

                    <div className="h-px w-20 bg-white/20 mt-6 mb-4"></div>

                    {/* Social Mobile */}
                    <div className="flex gap-8 mt-2">
                        <a href="https://www.instagram.com/lasorgentetv/" className="text-white flex flex-col items-center gap-2"><FaInstagram className="h-6 w-6" /></a>
                        <a href="https://www.facebook.com/profile.php?id=61585233898936" className="text-white flex flex-col items-center gap-2"><FaFacebookF className="h-6 w-6" /></a>
                        <a href="https://wa.me/+393917418137" className="text-white flex flex-col items-center gap-2"><FaWhatsapp className="h-6 w-6" /></a>
                    </div>
                </div>
            </div>
        </>
    );
}