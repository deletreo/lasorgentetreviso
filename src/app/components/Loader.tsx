export default function Loader({ isLoading }: { isLoading: boolean }) {
    return (
        <div className={`fixed inset-0 z-110 bg-[#050505] flex items-center justify-center transition-transform duration-1500 ease-[cubic-bezier(0.76,0,0.24,1)] ${!isLoading ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className="overflow-hidden">
                <h1 className={`text-6xl md:text-9xl uppercase tracking-tighter transition-transform duration-1000 delay-300 ${!isLoading ? '-translate-y-full' : 'translate-y-0'}`}>
                    La Sorgente
                </h1>
            </div>
        </div>
    );
}