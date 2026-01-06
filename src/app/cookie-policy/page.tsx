"use client";

import Link from 'next/link';
import { FiArrowLeft, FiShield, FiCheckCircle } from 'react-icons/fi';

export default function CookiePolicyPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#11414d] selection:text-white">
      
      {/* Header Semplificato */}
      <header className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md z-50 flex items-center px-6 md:px-8 border-b border-gray-100">
        <Link 
            href="/" 
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] font-medium text-gray-500 hover:text-[#11414d] border border-gray-200 hover:border-[#11414d] px-4 py-2 rounded-full transition-all duration-300"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Torna alla Home
        </Link>
      </header>

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        
        {/* Titolo */}
        <div className="flex flex-col gap-4 mb-12">
            <div className="w-12 h-12 bg-[#11414d]/10 rounded-full flex items-center justify-center mb-4">
                <FiShield className="text-2xl text-[#11414d]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Cookie Policy</h1>
            <p className="text-xl text-gray-500 font-light">Trasparenza totale sui dati di navigazione.</p>
        </div>

        {/* Contenuto */}
        <div className="prose prose-lg text-gray-600 max-w-none">
            <div className="bg-green-50 border border-green-100 p-8 rounded-lg mb-10">
                <h3 className="text-green-800 font-bold text-xl flex items-center gap-3 mb-4 mt-0">
                    <FiCheckCircle className="text-2xl" />
                    Nessun Cookie Utilizzato
                </h3>
                <p className="text-green-700 mb-0 leading-relaxed">
                    Ti informiamo che questo sito web <strong>non utilizza alcun tipo di cookie</strong>: né tecnici, né di profilazione, né di terze parti.
                </p>
            </div>

            <h3 className="text-gray-900 font-bold uppercase tracking-wider text-sm mt-8 mb-4">Cosa significa?</h3>
            <p>
                Significa che durante la tua navigazione sulle pagine de <em>La Sorgente</em> non viene salvato alcun piccolo file di testo (cookie) sul tuo dispositivo (computer, smartphone o tablet).
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#11414d]">
                <li>Non tracciamo le tue abitudini di navigazione.</li>
                <li>Non salviamo preferenze o dati di login automatici.</li>
                <li>Non condividiamo dati con piattaforme pubblicitarie esterne.</li>
            </ul>

            <h3 className="text-gray-900 font-bold uppercase tracking-wider text-sm mt-12 mb-4">Perché questa scelta?</h3>
            <p>
                Abbiamo scelto di rispettare al massimo la tua privacy offrendoti un'esperienza di consultazione del catalogo pulita, veloce e sicura, senza la necessità di banner fastidiosi o consensi complessi.
            </p>

            <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-400">
                    Ultimo aggiornamento: Gennaio 2026
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}