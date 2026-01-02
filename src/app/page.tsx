"use client";

import { useState, useEffect } from 'react';
// import Snowfall from 'react-snowfall'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import MegaMenu from './components/MegaMenu';
import HeroSection from './components/HeroSection';
import BrandSection from './components/BrandSection';
import ConfiguratorSection from './components/ConfiguratorSection';
import BusinessSection from './components/BusinessSection';

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showLinksInNav, setShowLinksInNav] = useState(false);

    const links = [
        { label: "prodotti", href: "/prodotti", action: () => setIsMenuOpen(true), hasSubmenu: true },
        { label: "chi siamo", href: "/chi-siamo", action: null, hasSubmenu: false },
        { label: "perché un negozio fisico?", href: "/perche", action: null, hasSubmenu: false },
        { label: "contatti", href: "/contatti", action: null, hasSubmenu: false }
    ];

    useEffect(() => {
        // --- CALCOLO ALTEZZA FISSA ---
        // Misuriamo l'altezza interna ESATTA appena il sito carica.
        const setFixedHeights = () => {
            const vh = window.innerHeight * 0.01;
            // Impostiamo una variabile CSS '--vh' che useremo ovunque al posto di 'vh'
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setFixedHeights();
        
        // Ricalcoliamo solo se si gira il telefono (cambio orientamento), non se si scrolla
        window.addEventListener('resize', () => {
             // Un check basico per evitare refresh inutili su mobile scroll
             if (window.innerWidth !== document.documentElement.clientWidth) {
                 setFixedHeights();
             }
        });

        const timer = setTimeout(() => setIsLoading(false), 300);

        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                const threshold = window.innerHeight * 0.7;
                setShowLinksInNav(window.scrollY > threshold);
            });
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { 
            window.removeEventListener('scroll', handleScroll); 
            clearTimeout(timer); 
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-[#050505] text-[#F2F2F2] font-cal overflow-x-hidden selection:bg-[#11414d] selection:text-white">
            
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100] mix-blend-overlay" 
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
            </div>

            <Loader isLoading={isLoading} />
            
            <Navbar showExtraLinks={showLinksInNav} links={links} />
            
            <MegaMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            
            <HeroSection links={links} onOpenMenu={setIsMenuOpen} />
            
            <BrandSection />
            <ConfiguratorSection />
            <BusinessSection />
            <Footer/>
        </div>
    );
}