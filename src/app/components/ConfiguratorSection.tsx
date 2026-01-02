import { FiCheckCircle } from 'react-icons/fi';
import ContactForm from './ContactForm';

export default function ConfiguratorSection() {
    return (
        <section id="configuratore" className="relative bg-[#080808] text-[#F2F2F2] py-16 px-6 md:px-[8%] scroll-mt-20 my-32 lg:my-24">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
                
                <div className="lg:col-span-5 flex flex-col gap-8 sticky top-32">
                    <div className='px-2'>
                        <span className="text-white/35 text-xs font-bold uppercase tracking-[0.4em] mb-4 block animate-pulse">
                            Configuratore
                        </span>
                        <h2 className="text-5xl md:text-6xl xl:text-7xl uppercase leading-normal tracking-tighter mb-6 py-4 px-2 -ml-2">
                            Crea il tuo <br/>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#11414d] to-white italic pr-4 pb-2">
                                Depuratore.
                            </span>
                        </h2>
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                            Raccontaci le tue esigenze domestiche o aziendali.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-4 border-l border-white/10 pl-8">
                        <div className="flex items-start gap-4">
                            <FiCheckCircle className="text-[#11414d] text-xl mt-1 shrink-0" />
                            <div>
                                <h4 className="text-sm uppercase tracking-widest font-bold mb-1">Analisi Gratuita</h4>
                                <p className="text-xs text-white/40">Valutiamo la qualità della tua acqua.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FiCheckCircle className="text-[#11414d] text-xl mt-1 shrink-0" />
                            <div>
                                <h4 className="text-sm uppercase tracking-widest font-bold mb-1">Progetto su misura</h4>
                                <p className="text-xs text-white/40">Dimensioniamo l'impianto perfetto.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 w-full bg-gray-950 border border-white/10 p-8 md:p-12 relative overflow-hidden group rounded-sm shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#11414d] opacity-[0.05] blur-[100px] pointer-events-none rounded-full"></div>
                    <ContactForm type="consumer" />
                </div>
            </div>
        </section>
    );
}