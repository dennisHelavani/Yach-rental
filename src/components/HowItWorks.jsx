const steps = [
    { num: 1, icon: 'sailing', title: 'CHOOSE YOUR TRIP', mobileTitle: 'Pick Your Trip', desc: 'Pick 5 or 7 nights and your preferred yacht model.', mobileDesc: 'Choose between 5 or 7 nights aboard an Azimut 58, 66, or 70.', iconColor: 'text-neon-aqua', shadow: 'shadow-neon-blue', numBg: 'bg-neon-pink text-white', mobileBg: 'bg-slate-900 text-white' },
    { num: 2, icon: 'calendar_month', title: 'PICK YOUR DATES', mobileTitle: 'Pick Your Dates', desc: 'Departures every Mon, Wed & Fri from 20 April.', mobileDesc: 'Departures every Monday, Wednesday, and Friday from 20 April.', iconColor: 'text-neon-pink', shadow: 'shadow-neon-pink', numBg: 'bg-neon-aqua text-slate-900', mobileBg: 'bg-neon-pink text-white' },
    { num: 3, icon: 'tune', title: 'PERSONALISE', mobileTitle: 'Personalise', desc: 'Add optional extras at checkout.', mobileDesc: 'Add optional extras like the unlimited drinks package at checkout.', iconColor: 'text-primary', shadow: 'shadow-neon-blue', numBg: 'bg-neon-pink text-white', mobileBg: 'bg-neon-aqua text-slate-900' },
    { num: 4, icon: 'anchor', title: 'SET SAIL', mobileTitle: 'Set Sail', desc: 'Join 50 yachts and island-hop the Cyclades.', mobileDesc: 'Join 50 yachts and island-hop across the Greek Cyclades together.', iconColor: 'text-white', shadow: 'shadow-xl', numBg: 'bg-slate-900 text-white', mobileBg: 'bg-primary text-white', gradient: true },
]

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-24 px-4 md:px-6 relative bg-background-light" id="how-it-works">
            <div className="max-w-7xl mx-auto">
                {/* Main header block unified for desktop and mobile */}
                <div className="text-center mb-12">
                    <span className="md:hidden text-neon-pink font-black uppercase tracking-widest text-xs font-space mb-4 block">The Process</span>
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-slate-900">
                        HOW IT <span className="text-neon-pink">WORKS</span>
                    </h2>
                    <p className="hidden md:block text-slate-500 font-space font-bold uppercase tracking-[0.2em] mt-4">Four steps to the Aegean</p>
                </div>

                {/* Desktop: glass panel grid */}
                <div className="hidden md:block glass-panel p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-aqua via-neon-pink to-primary" />
                    <div className="grid grid-cols-4 gap-12 relative z-10">
                        {steps.map((s) => (
                            <div key={s.num} className="flex flex-col items-center text-center group">
                                <div className={`w-20 h-20 rounded-2xl ${s.gradient ? 'bg-gradient-to-br from-neon-pink to-neon-aqua' : 'bg-slate-900'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${s.shadow} relative`}>
                                    <span className={`material-symbols-outlined ${s.iconColor} text-4xl`}>{s.icon}</span>
                                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${s.numBg} font-punchy flex items-center justify-center text-sm italic`}>
                                        {s.num}
                                    </div>
                                </div>
                                <h3 className={`font-punchy text-2xl mb-3 uppercase italic tracking-tight ${s.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-primary' : ''}`}>
                                    {s.title}
                                </h3>
                                <p className="text-slate-600 font-space text-sm font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-slate-400 text-xs font-space italic mt-8">Departure times can change due to weather.</p>
                </div>

                {/* Mobile: vertical numbered steps */}
                <div className="md:hidden space-y-12">
                    {steps.map((s) => (
                        <div key={s.num} className="flex flex-col items-center gap-6 text-center">
                            <div className={`w-16 h-16 rounded-2xl ${s.mobileBg} flex items-center justify-center font-punchy text-3xl italic shrink-0 ${s.shadow}`}>
                                {s.num}
                            </div>
                            <div>
                                <h4 className="font-punchy text-xl uppercase italic mb-2">{s.mobileTitle}</h4>
                                <p className="text-slate-500 font-medium">{s.mobileDesc}</p>
                            </div>
                        </div>
                    ))}
                    <p className="text-center text-slate-400 text-xs font-space italic mt-4">Departure times can change due to weather.</p>
                </div>
            </div>
        </section>
    )
}
