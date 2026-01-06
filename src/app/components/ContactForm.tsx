"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type FormType = 'consumer' | 'business';

interface ContactFormProps {
    type: FormType;
}

// Componente interno che gestisce la logica
function ContactFormContent({ type }: ContactFormProps) {
    const isConsumer = type === 'consumer';
    const searchParams = useSearchParams();
    
    // 1. ESTRAIAMO IL VALORE QUI, FUORI DAL USEEFFECT
    // Questo garantisce che 'productParam' sia una stringa o null (un valore primitivo stabile)
    const productParam = searchParams.get('product');
    
    const [formData, setFormData] = useState({ 
        nome: '', 
        email: '', 
        telefono: '', 
        messaggio: '', 
        prodotto: '', 
        honeypot: '' 
    });
    
    const [status, setStatus] = useState<{ type: string; msg: string } | null>(null);
    const [loading, setLoading] = useState(false);

    // 2. CORREZIONE USEEFFECT
    // Usiamo 'productParam' (la stringa) come dipendenza, non l'oggetto intero 'searchParams'
    useEffect(() => {
        if (productParam && isConsumer) {
            setFormData(prev => ({
                ...prev,
                prodotto: productParam
            }));
        }
    }, [productParam, isConsumer]); // Ora l'array ha sempre 2 elementi stabili (stringa, booleano)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
    
        try {
            console.log("Invio dati:", formData); 

            await new Promise(resolve => setTimeout(resolve, 1500)); 
            setStatus({ type: 'success', msg: 'RICHIESTA INVIATA CON SUCCESSO' });
            
            // Reset del form
            setFormData(prev => ({ 
                nome: '', 
                email: '', 
                telefono: '', 
                messaggio: '', 
                honeypot: '',
                // Mantieni il prodotto se presente per UX
                prodotto: isConsumer ? prev.prodotto : '' 
            }));
        } catch (error) {
            setStatus({ type: 'error', msg: 'ERRORE DI CONNESSIONE' });
        } finally {
            setLoading(false);
        }
    };

    // Stili dinamici
    const focusColor = isConsumer ? 'focus:border-white/80' : 'focus:border-white';
    const btnClass = isConsumer 
        ? 'bg-[#11414d] text-white hover:bg-white hover:text-black' 
        : 'border border-white/20 text-white hover:bg-white hover:text-black';
    const labelColor = 'text-white/80';

    return (
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
            
            {/* CAMPO PRODOTTO (Visibile solo se c'è un prodotto E siamo nel form CONSUMER) */}
            {isConsumer && formData.prodotto && (
                <div className="flex flex-col gap-3 p-4 bg-white/5 border border-white/10 rounded-sm mb-2 animate-fade-in">
                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 text-white/60 flex items-center gap-2`}>
                        <span className="w-2 h-2 rounded-full bg-[#11414d]"></span>
                        Prodotto Selezionato
                    </label>
                    <input 
                        readOnly 
                        className="w-full bg-transparent border-none outline-none text-white font-bold text-xl cursor-not-allowed select-none opacity-90" 
                        type="text" 
                        value={formData.prodotto} 
                    />
                    <p className="text-[10px] text-white/40 ml-1">
                        Stai richiedendo un preventivo specifico per questo modello.
                    </p>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 ${labelColor}`}>
                    {isConsumer ? 'Nome e Cognome' : 'Referente'}
                </label>
                <input 
                    required 
                    className={`w-full bg-transparent border-b border-white/20 py-4 outline-none ${focusColor} transition-colors text-white font-light text-xl placeholder-white/20`} 
                    type="text" 
                    value={formData.nome} 
                    onChange={(e) => setFormData({...formData, nome: e.target.value})} 
                    placeholder={isConsumer ? "Es: Mario Rossi" : "Nome e Cognome"} 
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 ${labelColor}`}>
                        {isConsumer ? 'Email' : 'Email Aziendale'}
                    </label>
                    <input 
                        required 
                        className={`w-full bg-transparent border-b border-white/20 py-4 outline-none ${focusColor} transition-colors text-white font-light text-xl placeholder-white/20`} 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        placeholder={isConsumer ? "mario@email.com" : "info@azienda.it"} 
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 ${labelColor}`}>
                        Telefono
                    </label>
                    <input 
                        className={`w-full bg-transparent border-b border-white/20 py-4 outline-none ${focusColor} transition-colors text-white font-light text-xl placeholder-white/20`} 
                        type="tel" 
                        value={formData.telefono} 
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})} 
                        placeholder="+39..." 
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 ${labelColor}`}>
                    {isConsumer ? 'Note Aggiuntive' : 'Progetto'}
                </label>
                <textarea 
                    rows={4} 
                    className={`w-full bg-transparent border-b border-white/20 py-4 outline-none ${focusColor} transition-colors text-white font-light text-xl placeholder-white/20 resize-none`} 
                    value={formData.messaggio} 
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})} 
                    placeholder={isConsumer ? (formData.prodotto ? "Scrivi qui eventuali domande specifiche..." : "Vorrei informazioni per...") : "Descrivi il tuo progetto..."} 
                />
            </div>

            <button 
                disabled={loading} 
                className={`w-full mt-8 text-sm font-bold uppercase tracking-[0.2em] py-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${btnClass}`}
            >
                {loading ? 'Invio in corso...' : (isConsumer ? 'Invia Richiesta' : 'Candidati Ora')}
            </button>

            {status && (
                <div className={`text-center text-xs tracking-widest font-bold uppercase mt-4 ${status.type === 'success' ? (isConsumer ? 'text-[#11414d]' : 'text-green-400') : 'text-red-500'}`}>
                    {status.msg}
                </div>
            )}
        </form>
    );
}

// Wrapper con Suspense
export default function ContactForm(props: ContactFormProps) {
    return (
        <Suspense fallback={<div className="text-white/50 text-center py-10 font-light tracking-widest text-xs uppercase">Caricamento modulo...</div>}>
            <ContactFormContent {...props} />
        </Suspense>
    );
}