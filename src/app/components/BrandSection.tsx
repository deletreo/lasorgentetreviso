"use client";

export default function BrandSection() {
    return (
        <section className="relative bg-[#050505] text-[#F2F2F2] py-10 md:py-0 px-6 md:px-[8%] my-32 lg:my-4">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Blocco FOTO INTERNO (Sinistra) */}
                <div 
                    className="relative w-full transition-all duration-1000 group bg-[#0a0a0a] overflow-hidden rounded-sm brand-image-lock"
                >
                    {/* FIX: Uso un tag style per gestire le altezze fisse calcolate con media query */}
                    <style jsx global>{`
                        .brand-image-lock {
                            height: calc(var(--vh, 1vh) * 50);
                        }
                        @media (min-width: 1024px) {
                            .brand-image-lock {
                                height: calc(var(--vh, 1vh) * 70);
                            }
                        }
                    `}</style>

                    <img src="../../interno.jpg" alt="Interno La Sorgente Treviso" className="absolute inset-0 w-full h-full object-cover z-0" />
                    <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#0a0a0a_0%,transparent_30%,transparent_70%,#0a0a0a_100%),linear-gradient(to_bottom,#0a0a0a_0%,transparent_20%,transparent_80%,#0a0a0a_100%)] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                    <div className="absolute bottom-8 left-8 border-l-2 border-[#11414d] pl-6 z-20">
                        <p className="text-2xl uppercase tracking-widest text-white font-bold font-['Cal_Sans']">
                            La Sorgente, Treviso
                        </p>
                    </div>
                </div>

                {/* Blocco TESTO e LOGO (Destra) */}
                <div className="flex flex-col gap-12 lg:pl-16">
                    <div>
                        <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-6">
                            Non siamo solo un sito web.<br />Siamo un punto di riferimento fisico, reale e tangibile per il trattamento dell'acqua.
                        </p>
                        <p className="text-sm md:text-base text-white/50 font-mono uppercase tracking-widest leading-loose max-w-md">
                            Offriamo consulenza tecnica specializzata, installazione certificata e assistenza post-vendita diretta.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8 text-md">
                        <div>
                            <h4 className="text-[#11414d] uppercase tracking-[0.2em] text-lg font-bold mb-2">Sede</h4>
                            <p className="text-white opacity-60 ">Via Daniele Manin 25<br/>31100 Treviso (TV)</p>
                        </div>
                        <div>
                            <h4 className="text-[#11414d] uppercase tracking-[0.2em] text-lg font-bold mb-2">Contatti</h4>
                            <p className="text-white opacity-60 break-all">+39 391 741 8137<br/>lasorgentetv@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}