"use client";

import { useState } from 'react';

type FormType = 'consumer' | 'business';

interface ContactFormProps {
    type: FormType;
}

export default function ContactForm({ type }: ContactFormProps) {
    const isConsumer = type === 'consumer';
    
    const [formData, setFormData] = useState({ 
        nome: '', 
        email: '', 
        telefono: '', 
        messaggio: '', 
        honeypot: '' 
    });
    
    const [status, setStatus] = useState<{ type: string; msg: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
    
        try {
            // Simulazione API
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            setStatus({ type: 'success', msg: 'RICHIESTA INVIATA CON SUCCESSO' });
            setFormData({ nome: '', email: '', telefono: '', messaggio: '', honeypot: '' });
        } catch (error) {
            setStatus({ type: 'error', msg: 'ERRORE DI CONNESSIONE' });
        } finally {
            setLoading(false);
        }
    };

    // Colori e stili in base al tipo
    const accentColor = isConsumer ? 'border-[#11414d]' : 'border-white';
    const focusColor = isConsumer ? 'focus:border-white/80' : 'focus:border-white';
    const btnClass = isConsumer 
        ? 'bg-[#11414d] text-white hover:bg-white hover:text-black' 
        : 'border border-white/20 text-white hover:bg-white hover:text-black';
    const labelColor = isConsumer ? 'text-[#11414d]' : 'text-white/40';

    return (
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
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
                    {isConsumer ? 'Esigenze' : 'Progetto'}
                </label>
                <textarea 
                    required 
                    rows={4} 
                    className={`w-full bg-transparent border-b border-white/20 py-4 outline-none ${focusColor} transition-colors text-white font-light text-xl placeholder-white/20 resize-none`} 
                    value={formData.messaggio} 
                    onChange={(e) => setFormData({...formData, messaggio: e.target.value})} 
                    placeholder={isConsumer ? "Vorrei informazioni per..." : "Vorrei aprire un punto vendita a..."} 
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