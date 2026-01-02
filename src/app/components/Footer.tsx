import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-[#F2F2F2] border-t border-white/5 font-cal overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0 mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-[8%] py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-2xl uppercase tracking-tighter font-bold text-white hover:text-[#11414d] transition-colors w-fit">
              La Sorgente
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Tecnologia per il trattamento dell'acqua. Soluzioni professionali per aziende, ristorazione e privati.
            </p>
            <div className="flex gap-4 mt-2">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#11414d] hover:text-white hover:border-[#11414d] transition-all">
                    <FiInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#11414d] hover:text-white hover:border-[#11414d] transition-all">
                    <FiFacebook />
                </a>
                <a href="https://wa.me/393917418137" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#11414d] hover:text-white hover:border-[#11414d] transition-all">
                    <FaWhatsapp />
                </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Dove Siamo</h4>
            
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 text-sm text-white/70">
                    <FiMapPin className="mt-1 text-[#11414d]" />
                    <span>Via Daniele Manin, 25<br/>31100 Treviso (TV), Italia</span>
                </div>
                
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Via+Daniele+Manin+25+Treviso" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs uppercase tracking-widest border border-white/20 px-4 py-3 w-fit hover:bg-white hover:text-black transition-colors group"
                >
                    Indicazioni stradali <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <a href="tel:+393917418137" className="flex items-center gap-3 text-sm text-white/70 hover:text-[#11414d] transition-colors">
                    <FiPhone className="text-[#11414d]" /> +39 391 741 8137
                </a>
                <a href="mailto:info@lasorgente.it" className="flex items-center gap-3 text-sm text-white/70 hover:text-[#11414d] transition-colors">
                    <FiMail className="text-[#11414d]" /> info@lasorgente.it
                </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Orari Negozio</h4>
            
            <ul className="space-y-4 text-sm text-white/70">
                <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Lunedì - Sabato</span>
                    <div className="text-right">
                        <span className="block">09:00 – 12:00</span>
                        <span className="block">15:00 – 19:30</span>
                    </div>
                </li>
                <li className="flex justify-between text-white/40">
                    <span>Domenica</span>
                    <span>Chiuso</span>
                </li>
            </ul>
            <p className="text-[10px] text-white/30 italic mt-2">
                *Gli orari possono variare durante le festività (Natale, S. Stefano).
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Esplora</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
                <Link href="/prodotti" className="hover:text-white hover:translate-x-2 transition-all">Gamma Prodotti</Link>
                <Link href="/prodotti?filter=aziende" className="hover:text-white hover:translate-x-2 transition-all">Soluzioni Aziende</Link>
                <Link href="/prodotti?filter=ristorazione" className="hover:text-white hover:translate-x-2 transition-all">Ho.Re.Ca.</Link>
                <Link href="/prodotti?filter=privati" className="hover:text-white hover:translate-x-2 transition-all">Casa & Privati</Link>
                <Link href="/#configuratore" className="hover:text-white hover:translate-x-2 transition-all">Configuratore</Link>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center">
                        <span className="mr-2 opacity-80">Sito creato da</span>
                        <a href="https://leonardoquaglini.it" target="_blank" className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 font-medium text-xs sm:text-sm shadow-sm hover:shadow-md border border-white/20 hover:border-white group">
                            Leonardo Quaglini
                            <FiArrowRight className="ml-2 text-[10px] group-hover:translate-x-1 transition-transform -rotate-45" />
                        </a>
          </p>
        </div>
        
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-[10px] uppercase tracking-widest">
            <p>© 2025 La Sorgente. Tutti i diritti riservati.</p>
            <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                <span className="hover:text-white transition-colors cursor-pointer">P.IVA 01234567890</span>
            </div>
        </div>
      </div>
    </footer>
  );
}