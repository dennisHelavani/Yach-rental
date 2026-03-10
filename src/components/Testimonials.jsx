import { useState } from 'react'
import { TESTIMONIALS } from '../data/constants'

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const t = TESTIMONIALS[current]

    const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto px-2">
                {/* Heading */}
                <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-slate-900">
                    OUR GUESTS <span className="text-neon-pink">LOVE IT,</span>
                    <br className="hidden md:block" />
                    <span className="md:hidden"> </span>
                    AND YOU WILL <span className="text-primary">LOVE IT TOO.</span>
                </h2>

                {/* Card */}
                <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="h-72 md:h-auto md:w-1/2 relative">
                        <img
                            key={current}
                            alt={t.name}
                            className="w-full h-full object-cover"
                            src={t.image}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />

                    </div>

                    {/* Quote */}
                    <div className="bg-gradient-to-br from-neon-pink via-[#9333ea] to-[#4f46e5] p-8 md:p-12 flex flex-col justify-between md:w-1/2 relative">
                        <div>
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-icons text-neon-aqua text-sm">star</span>
                                ))}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-punchy text-white italic mb-6 leading-tight uppercase">
                                {t.quote}
                            </h3>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-6 md:mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full border-2 border-neon-aqua p-0.5 bg-white/20">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-punchy text-slate-900 text-sm">
                                            {t.initials}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-white font-punchy text-base italic uppercase">{t.name}</h5>
                                        <p className="text-neon-aqua text-[10px] font-bold uppercase tracking-widest font-space">{t.location}</p>
                                    </div>
                                </div>

                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={prev}
                                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
                                </button>

                                {/* Dots */}
                                <div className="flex gap-2">
                                    {TESTIMONIALS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrent(i)}
                                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'bg-neon-aqua w-6' : 'bg-white/30'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={next}
                                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
