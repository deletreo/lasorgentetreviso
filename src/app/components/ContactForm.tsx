"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiX, FiPlus, FiCheck } from 'react-icons/fi';

type FormType = 'consumer' | 'business';

interface ContactFormProps {
    type: FormType;
}

// Componente interno che gestisce la logica
function ContactFormContent({ type }: ContactFormProps) {
    const isConsumer = type === 'consumer';
    const searchParams = useSearchParams();
    const router = useRouter();
    
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
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Stato per la modale

    useEffect(() => {
        if (productParam && isConsumer) {
            setFormData(prev => ({
                ...prev,
                prodotto: productParam
            }));
        }
    }, [productParam, isConsumer]);

    const handleRemoveProduct = () => {
        setFormData(prev => ({ ...prev, prodotto: '' }));
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', newUrl);
    };

    // Primo step: Apre la modale di conferma
    const handlePreSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmModal(true);
    };

    // Secondo step: Invio effettivo
    const handleFinalSubmit = async () => {
        setLoading(true);
        setStatus(null);
        setShowConfirmModal(false); // Chiude la modale
    
        try {
            console.log("Invio dati:", formData); 

            await new Promise(resolve => setTimeout(resolve, 1500)); 
            setStatus({ type: 'success', msg: 'RICHIESTA INVIATA CON SUCCESSO' });
            
            setFormData(prev => ({ 
                nome: '', 
                email: '', 
                telefono: '', 
                messaggio: '', 
                honeypot: '',
                prodotto: isConsumer ? prev.prodotto : '' 
            }));
        } catch (error) {
            setStatus({ type: 'error', msg: 'ERRORE DI CONNESSIONE' });
        } finally {
            setLoading(false);
        }
    };

    const focusColor = isConsumer ? 'focus:border-white/80' : 'focus:border-white';
    const btnClass = isConsumer 
        ? 'bg-[#11414d] text-white hover:bg-white hover:text-black' 
        : 'border border-white/20 text-white hover:bg-white hover:text-black';
    const labelColor = 'text-white/80'; 

    return (
        <>
            <form onSubmit={handlePreSubmit} className="relative z-10 flex flex-col gap-8">
                
                {/* BLOCCO GESTIONE PRODOTTO (Solo Consumer) */}
                {isConsumer && (
                    <div className={`flex flex-col gap-3 p-5 border rounded-sm mb-2 transition-all duration-300 ${formData.prodotto ? 'bg-[#11414d]/10 border-[#11414d]/30' : 'bg-white/5 border-white/10'}`}>
                        
                        <div className="flex justify-between items-center">
                            <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ml-1 flex items-center gap-2 text-white/60`}>
                                <span className={`w-2 h-2 rounded-full ${formData.prodotto ? 'bg-[#11414d]' : 'bg-white/20'}`}></span>
                                {formData.prodotto ? 'Prodotto Selezionato' : 'Prodotto non selezionato'}
                            </label>

                            {formData.prodotto && (
                                <button 
                                    type="button" 
                                    onClick={handleRemoveProduct}
                                    className="text-white/40 hover:text-red-400 transition-colors px-4 py-2 text-sm flex flex-row uppercase gap-1 items-center border border-white/20 rounded-3xl hover:border-gray-400/80 hover:bg-white"
                                    title="Rimuovi prodotto"
                                >
                                    <FiX className="text-xl" />
                                    Rimuovi
                                </button>
                            )}
                        </div>

                        {formData.prodotto ? (
                            <>
                                <input 
                                    readOnly 
                                    className="w-full bg-transparent border-none outline-none text-white font-bold text-xl cursor-not-allowed select-none opacity-90" 
                                    type="text" 
                                    value={formData.prodotto} 
                                />
                                <p className="text-[10px] text-white/40 ml-1">
                                    Riceverai dettagli specifici per questo modello in base alle tue richieste.
                                </p>
                            </>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className="text-white/30 text-sm font-light italic ml-1">
                                    Puoi inviare una richiesta generica o scegliere un modello.
                                </p>
                                <Link 
                                    href="/prodotti"
                                    className="mt-2 inline-flex items-center gap-2 self-start text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-white border border-gray-500/50 hover:border-white px-4 py-2 rounded-full transition-all"
                                >
                                    <FiPlus /> Seleziona un prodotto (Opzionale)
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* CAMPI STANDARD */}
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
                    {loading ? 'Invio in corso...' : (isConsumer ? 'Invia richiesta' : 'Candidati Ora')}
                </button>

                {status && (
                    <div className={`text-center text-xs tracking-widest font-bold uppercase mt-4 ${status.type === 'success' ? (isConsumer ? 'text-[#11414d]' : 'text-green-400') : 'text-red-500'}`}>
                        {status.msg}
                    </div>
                )}
            </form>

            {/* MODALE DI CONFERMA */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-lg p-8 rounded-lg shadow-2xl relative">
                        <button 
                            onClick={() => setShowConfirmModal(false)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <h3 className="text-xl text-white font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                            Riepilogo Dati
                        </h3>

                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-white/40 tracking-wider">Nominativo</span>
                                <span className="text-white text-lg">{formData.nome}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-white/40 tracking-wider">Contatti</span>
                                <span className="text-white">{formData.email}</span>
                                <span className="text-white">{formData.telefono || '-'}</span>
                            </div>
                            {formData.prodotto && (
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase text-[#11414d] tracking-wider font-bold">Prodotto</span>
                                    <span className="text-white font-bold">{formData.prodotto}</span>
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-white/40 tracking-wider">Messaggio</span>
                                <p className="text-white/80 text-sm italic border-l-2 border-white/20 pl-3 py-1">
                                    {formData.messaggio || 'Nessun messaggio aggiuntivo.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 py-3 border border-white/20 text-white uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all"
                            >
                                Modifica
                            </button>
                            <button 
                                onClick={handleFinalSubmit}
                                className="flex-1 py-3 bg-[#11414d] text-white uppercase text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                            >
                                <FiCheck size={16} /> Conferma e Invia
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function ContactForm(props: ContactFormProps) {
    return (
        <Suspense fallback={<div className="text-white/50 text-center py-10 font-light tracking-widest text-xs uppercase">Caricamento modulo...</div>}>
            <ContactFormContent {...props} />
        </Suspense>
    );
}