const vibes = [
    {
        num: '01',
        title: 'DAY',
        desc: 'Crystal waters & island hopping',
        color: 'neon-aqua',
        shadowClass: 'shadow-neon-blue',
        image: '/img/gal15.webp',
    },
    {
        num: '02',
        title: 'SUNSET',
        desc: 'Golden hour on deck',
        color: 'neon-pink',
        shadowClass: 'shadow-neon-pink',
        image: '/img/santorini sunset.jpg',
    },
    {
        num: '03',
        title: 'NIGHT',
        desc: 'Meet your crew after dark',
        color: 'primary',
        shadowClass: 'shadow-neon-blue',
        image: '/img/gal50.webp',
    },
]

export default function VibeGrid() {
    return (
        <>
            {/* Desktop: light bg, 3-col grid with grayscale hover */}
            <section className="hidden md:block py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-slate-900">
                            EXPLORE BY <span className="text-primary">DAY.</span><br />
                            PARTY BY <span className="text-neon-pink">NIGHT.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {vibes.map((v, i) => (
                            <div key={v.num} className={`relative group h-[500px] rounded-3xl overflow-hidden shadow-xl ${i === 1 ? '-translate-y-8' : ''}`}>
                                <img alt={v.title} className="w-full h-full object-cover transition-all duration-700" src={v.image} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className={`text-${v.color} font-punchy text-4xl italic uppercase`}>{v.num}. {v.title}</span>
                                    <div className={`w-full h-1 bg-${v.color}/30 mt-4 rounded-full overflow-hidden`}>
                                        <div className={`h-full bg-${v.color} animate-pulse-neon w-full ${v.shadowClass}`} />
                                    </div>
                                    <p className="text-white/80 mt-4 font-bold uppercase text-xs tracking-widest font-space">{v.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile: dark bg, stacked cards, no grayscale */}
            <section className="md:hidden py-20 px-4 bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-punchy italic leading-[0.9] text-white uppercase">
                            THE <span className="text-primary">ENERGY.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-6">
                        {vibes.map((v) => (
                            <div key={v.num} className="relative h-[300px] rounded-3xl overflow-hidden shadow-xl">
                                <img alt={v.title} className="w-full h-full object-cover" src={v.image} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className={`text-${v.color} font-punchy text-3xl italic uppercase`}>{v.num}. {v.title}</span>
                                    <div className={`w-full h-1 bg-${v.color}/30 mt-3 rounded-full overflow-hidden`}>
                                        <div className={`h-full bg-${v.color} w-full ${v.shadowClass}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
