import { FiMapPin } from 'react-icons/fi';
import ContactForm from './ContactForm';

export default function BusinessSection() {
    return (
        <section id="apri-la-sorgente" className="relative bg-[#050505] text-[#F2F2F2] py-3 md:py-15 px-6 md:px-[8%] scroll-mt-20 my-32 lg:my-4">
            <div className="max-w-1600px mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div>
                        <span className="text-white/40 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                            Franchising & Partner
                        </span>
                        <h2 className="text-5xl md:text-6xl xl:text-7xl uppercase leading-snug tracking-tighter mb-6 py-4">
                            Apri il tuo <br/>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-[#11414d] italic pr-2">
                                La Sorgente.
                            </span>
                        </h2>
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                            Diventa un punto di riferimento nella tua città. Unisciti alla nostra rete di professionisti del trattamento acqua.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#11414d] transition-colors">
                                <FiMapPin className="text-white group-hover:text-[#11414d]" />
                            </div>
                            <div>
                                <h4 className="text-sm uppercase tracking-widest font-bold">Apri uno store</h4>
                                <p className="text-xs text-white/40">Compila il form</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 w-full bg-gray-950 border border-white/10 p-8 md:p-12 relative overflow-hidden group rounded-sm">
                    <ContactForm type="business" />
                </div>

            </div>
        </section>
    );
}