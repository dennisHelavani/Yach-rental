import { HERO_IMAGES } from '../data/constants'
import { useBooking } from '../context/BookingProvider'

export default function Hero() {
    const { openBooking } = useBooking()

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background slideshow */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                {HERO_IMAGES.slice(0, 3).map((src, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 animate-fade-in-out"
                        style={{ animationDelay: `${i * 4}s`, opacity: i === 0 ? 1 : 0 }}
                    >
                        <img alt={`Hero ${i + 1}`} className="w-full h-full object-cover animate-ken-burns" src={src} />
                    </div>
                ))}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-light" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 animate-pulse font-space">
                    <span className="w-2 h-2 bg-neon-aqua rounded-full" />
                    Season Starts 20 April · Mon / Wed / Fri Departures
                </div>

                <h1 className="sr-only">The Ultimate Premium Greece Yacht Vacation</h1>
                <h2 className="text-6xl md:text-9xl font-punchy text-white mb-6 leading-[0.9] italic drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                    LESS SLEEP. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-aqua to-neon-pink">MORE WAVES.</span>
                </h2>

                <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md">
                    GREEK ISLAND-HOPPING FOR PEOPLE WHO DIDN’T COME TO CHILL
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-10 w-full max-w-xs md:max-w-none mx-auto">
                    <a href="#fleet" className="bg-neon-aqua text-slate-900 px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer text-center md:w-auto">
                        Explore the Fleet
                    </a>
                    <button
                        onClick={() => openBooking({ action: 'book-yacht', source: 'hero', text: 'Book Now' })}
                        className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all cursor-pointer md:w-auto"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </section>
    )
}
