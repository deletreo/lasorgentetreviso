"use client";

import Link from 'next/link';
import { FiArrowLeft, FiLock } from 'react-icons/fi';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans selection:bg-[#11414d] selection:text-white">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-md z-50 flex items-center px-6 md:px-8 border-b border-gray-100">
        <Link 
            href="/" 
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] font-medium text-gray-500 hover:text-[#11414d] border border-gray-200 hover:border-[#11414d] px-4 py-2 rounded-full transition-all duration-300"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Torna alla Home
        </Link>
      </header>

      <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        
        {/* Titolo Principale */}
        <div className="flex flex-col gap-4 mb-16">
            <div className="w-12 h-12 bg-[#11414d]/10 rounded-full flex items-center justify-center mb-4">
                <FiLock className="text-2xl text-[#11414d]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-gray-500 font-light">Informativa sul trattamento dei dati personali.</p>
        </div>

        <div className="space-y-16">
            
            {/* SEZIONE 1: FRANCHISING */}
            <section className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                <h2 className="text-2xl font-bold text-[#11414d] mb-8 uppercase tracking-wide border-b border-gray-200 pb-4">
                    Privacy Policy – Form Richiesta Informazioni Franchising
                </h2>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Titolare del trattamento</h3>
                        <p>Il Titolare del trattamento dei dati è <strong>La Sorgente di Jacopo Padovan</strong>, ditta individuale, con sede in Via Daniele Manin 25, 31100 Treviso (TV), email <a href="mailto:lasorgentetv@gmail.com" className="text-[#11414d] underline">lasorgentetv@gmail.com</a>, P. IVA 05580040268.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Tipologia di dati trattati</h3>
                        <p>Attraverso il presente form vengono raccolti i seguenti dati personali:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Nome e cognome</li>
                            <li>Indirizzo email</li>
                            <li>Numero di telefono</li>
                            <li>Eventuali informazioni inserite nel messaggio</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Finalità del trattamento</h3>
                        <p>I dati personali forniti dall’utente sono trattati esclusivamente per:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 mb-2">
                            <li>Rispondere alla richiesta di informazioni relativa all’apertura di un locale in franchising;</li>
                            <li>Ricontattare l’utente utilizzando i recapiti forniti.</li>
                        </ul>
                        <p className="italic text-gray-500">I dati non saranno utilizzati per finalità di marketing o promozionali.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Base giuridica del trattamento</h3>
                        <p>Il trattamento dei dati si basa sul consenso dell’interessato, espresso tramite la compilazione e l’invio del form.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Modalità del trattamento</h3>
                        <p>Il trattamento dei dati avviene con strumenti informatici e/o telematici, nel rispetto dei principi di correttezza, liceità e trasparenza e adottando misure di sicurezza adeguate a proteggerli da accessi non autorizzati.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Conservazione dei dati</h3>
                        <p>I dati personali saranno conservati per il tempo strettamente necessario a gestire la richiesta di informazioni e il ricontatto, e comunque non oltre 12 mesi dall’invio del form, salvo obblighi di legge.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Comunicazione dei dati</h3>
                        <p>I dati non saranno comunicati a terzi né diffusi.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Diritti dell’interessato</h3>
                        <p>L’utente può esercitare in qualsiasi momento i diritti previsti dagli articoli 15-22 del Regolamento UE 2016/679 (accesso, rettifica, cancellazione, limitazione, opposizione), inviando una richiesta all’indirizzo email <a href="mailto:lasorgentetv@gmail.com" className="text-[#11414d] underline">lasorgentetv@gmail.com</a>.</p>
                    </div>
                </div>
            </section>

            {/* SEZIONE 2: PREVENTIVI */}
            <section className="bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-[#11414d] uppercase tracking-wide">
                        Privacy Policy – Form Richiesta Preventivo Prodotti
                    </h2>
                </div>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Titolare del trattamento</h3>
                        <p>Il Titolare del trattamento dei dati è <strong>La Sorgente di Jacopo Padovan</strong>, ditta individuale, con sede in Via Daniele Manin 25, 31100 Treviso (TV), email <a href="mailto:lasorgentetv@gmail.com" className="text-[#11414d] underline">lasorgentetv@gmail.com</a>, P. IVA 05580040268.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Tipologia di dati trattati</h3>
                        <p>Attraverso il presente form vengono raccolti:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Nome e cognome</li>
                            <li>Indirizzo email</li>
                            <li>Numero di telefono</li>
                            <li>Prodotto di interesse</li>
                            <li>Eventuali note o messaggi inseriti dall’utente</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Finalità del trattamento</h3>
                        <p>I dati personali forniti saranno utilizzati esclusivamente per:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 mb-2">
                            <li>Elaborare il preventivo richiesto dall’utente;</li>
                            <li>Ricontattare l’utente in merito al prodotto selezionato.</li>
                        </ul>
                        <p className="italic text-gray-500">I dati non saranno utilizzati per finalità di marketing o comunicazioni commerciali non richieste.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Base giuridica del trattamento</h3>
                        <p>La base giuridica del trattamento è il consenso espresso dall’utente tramite l’invio volontario del form.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Modalità del trattamento</h3>
                        <p>Il trattamento dei dati avviene mediante strumenti elettronici, nel rispetto delle misure di sicurezza previste dalla normativa vigente.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Conservazione dei dati</h3>
                        <p>I dati personali saranno conservati solo per il tempo necessario alla gestione del preventivo e al ricontatto, e comunque non oltre 12 mesi dall’invio della richiesta, salvo obblighi di legge.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Comunicazione dei dati</h3>
                        <p>I dati non saranno ceduti a terzi né diffusi.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Diritti dell’interessato</h3>
                        <p>L’utente può in qualsiasi momento esercitare i diritti previsti dal Regolamento UE 2016/679 (GDPR) contattando il Titolare all’indirizzo <a href="mailto:lasorgentetv@gmail.com" className="text-[#11414d] underline">lasorgentetv@gmail.com</a>.</p>
                    </div>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
}