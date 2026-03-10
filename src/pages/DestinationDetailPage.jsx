import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingProvider'
import { getDestinationBySlug } from '../data/destinations'
import TripMapStops from '../components/TripMapStops'

export default function DestinationDetailPage() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const dest = getDestinationBySlug(slug)
    const { openBooking } = useBooking()

    const [showWidget, setShowWidget] = useState(false)
    const [countdown, setCountdown] = useState({ h: 4, m: 22, s: 10 })

    useEffect(() => { if (!dest) navigate('/destinations', { replace: true }) }, [dest, navigate])

    useEffect(() => {
        if (!dest) return
        document.title = `${dest.name} | SALTIE Greece – ${dest.tagline}`
        let meta = document.querySelector('meta[name="description"]')
        if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
        meta.content = `Experience ${dest.name}: ${dest.tagline}. Choose 5-Night (€739) or 7-Night (€929) voyages.`
    }, [dest])

    useEffect(() => {
        const id = setInterval(() => {
            setCountdown((p) => {
                let { h, m, s } = p; s--
                if (s < 0) { s = 59; m-- }
                if (m < 0) { m = 59; h-- }
                if (h < 0) return { h: 0, m: 0, s: 0 }
                return { h, m, s }
            })
        }, 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const handler = () => setShowWidget(window.scrollY > 800)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const pad = (n) => String(n).padStart(2, '0')

    if (!dest) return null

    return (
        <div className="bg-[#f8fafc] text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden font-body min-h-screen">

            {/* ═══ MOBILE: Top Urgency Bar ═══ */}
            <div className="md:hidden bg-background-dark text-white py-2 px-4 text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-2 sticky top-0 z-50">
                <span className="text-neon-pink">🔥 HOT DEALS LIVE</span>
                <span>— LAST CABINS DISCOUNTED</span>
                <a className="bg-neon-aqua text-background-dark px-2 py-0.5 rounded ml-1" href="#hot-deals">GRAB YOURS</a>
            </div>

            {/* ═══ DESKTOP: Announcement Bar ═══ */}
            <div className="hidden md:block bg-background-dark py-3 px-4 overflow-hidden">
                <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-display uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                        <span className="text-neon-pink">🔥 HOT DEALS LIVE</span> — LAST CABINS DISCOUNTED
                    </span>
                    <a href="#hot-deals" className="px-4 py-1 bg-primary text-background-dark font-display text-[10px] font-black uppercase rounded-full tracking-tighter cursor-pointer hover:scale-105 transition-transform hover:bg-neon-aqua">GRAB YOURS</a>
                </div>
            </div>

            <Navbar />

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* HERO                                                       */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[85vh] flex flex-col justify-end md:items-center md:justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt={`${dest.name} Flotilla`} className="w-full h-full object-cover" src={dest.heroImages[0]} />
                    <div className="absolute inset-0 bg-black/40" />
                    {/* Mobile gradient: bottom-heavy for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent md:bg-gradient-to-b md:from-background-dark/40 md:to-background-dark/80" />
                </div>

                {/* MOBILE hero content */}
                <div className="relative z-10 p-6 space-y-4 md:hidden">
                    <div className="inline-block px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm text-[10px] text-white font-bold uppercase tracking-widest">
                        🇬🇷 Greek Island Odyssey
                    </div>
                    <h1 className="font-punchy text-5xl font-bold leading-none text-white uppercase italic">
                        {dest.name} <span className="text-neon-aqua italic">&</span><br />
                        <span className="text-neon-pink">{dest.heroHeadlineSuffix}</span>
                    </h1>
                    <p className="text-white/80 text-sm max-w-[280px]">{dest.heroSubtitle}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {dest.vibeTags.map((t) => (
                            <span key={t.label} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-white/10">
                                {t.emoji} {t.label.toUpperCase()}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 pt-4">
                        <a href="#packages" className="w-full bg-neon-aqua text-background-dark font-bold py-4 rounded-xl shadow-xl shadow-neon-aqua/20 text-center uppercase text-sm">Explore Packages</a>
                        <Link to="/gallery" className="w-full bg-white/10 backdrop-blur-md text-white font-bold py-4 rounded-xl border border-white/20 text-center uppercase text-sm">Watch the Vibe</Link>
                    </div>
                    <p className="text-white/50 text-[10px] text-center uppercase tracking-tighter pt-2">Half-board & Skipper included on 5n + 7n</p>
                </div>

                {/* DESKTOP hero content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white hidden md:block">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-neon-aqua animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Greek Island Odyssey</span>
                    </div>
                    <h1 className="font-punchy text-8xl font-bold uppercase leading-[0.9] mb-4 tracking-tighter italic">
                        {dest.name} <span className="text-primary">&</span> <br />
                        <span className="text-neon-pink">{dest.heroHeadlineSuffix}</span>
                    </h1>
                    <p className="text-2xl font-medium mb-8 opacity-90 max-w-2xl mx-auto">{dest.heroSubtitle}</p>
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {dest.vibeTags.map((t) => (
                            <span key={t.label} className="px-4 py-2 rounded-xl bg-background-dark/50 backdrop-blur-sm border border-white/10 text-xs font-bold uppercase">
                                {t.emoji} {t.label}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <a href="#packages" className="bg-primary text-background-dark px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-neon-aqua transition-all shadow-xl shadow-primary/30">Explore Packages</a>
                        <Link to="/gallery" className="glass-panel text-white border-white/30 px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/20 transition-all text-center">Watch the Vibe</Link>
                    </div>
                    <p className="mt-8 text-sm font-bold opacity-60 uppercase tracking-widest">Half-Board & Skipper Included on 5N + 7N</p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* PACKAGE PICKER                                             */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="py-16 px-6 md:py-24 bg-[#f8fafc]" id="packages">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 space-y-2">
                        <h2 className="font-punchy text-3xl md:text-6xl font-bold uppercase tracking-tighter italic">Choose Your Voyage</h2>
                        <p className="text-gray-500 text-xs md:text-base max-w-xl mx-auto">Select the duration of your Greek odyssey. All routes include breakfast, lunch, and a professional skipper.</p>
                    </div>

                    <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                        {/* 5 Nights */}
                        <div className="relative group cursor-pointer" onClick={() => openBooking({ action: 'book-yacht', entityId: '5-night', source: 'destination-detail' })}>
                            <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-primary to-neon-aqua rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                            <div className="bg-white rounded-[32px] md:rounded-[2.5rem] p-6 md:p-12 shadow-xl border border-gray-100 flex flex-col gap-6 md:gap-0 md:h-full relative">
                                <div className="flex justify-between items-start md:mb-8">
                                    <div>
                                        <h3 className="font-punchy text-2xl md:text-3xl font-bold text-primary italic leading-none tracking-tighter">5 NIGHTS</h3>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">The Essential Loop</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] md:text-xs font-bold text-primary uppercase block mb-1">From</span>
                                        <span className="text-2xl md:text-4xl font-punchy font-bold tracking-tighter italic">€739</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 md:space-y-4 md:mb-12 md:flex-grow">
                                    {dest.package5NHighlights.map((h) => (
                                        <li key={h} className="flex items-center gap-3 text-sm text-gray-600">
                                            <span className="text-primary">✓</span>
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-background-dark text-white font-bold py-4 rounded-2xl uppercase tracking-wider text-sm cursor-pointer hover:bg-gray-800 transition-colors">Select 5-Night Route</button>
                            </div>
                        </div>

                        {/* 7 Nights */}
                        <div className="relative group cursor-pointer" onClick={() => openBooking({ action: 'book-yacht', entityId: '7-night', source: 'destination-detail' })}>
                            <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-neon-pink to-primary rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000" />
                            <div className="bg-white rounded-[32px] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl border-2 border-neon-pink flex flex-col gap-6 md:gap-0 md:h-full relative overflow-hidden">
                                <div className="absolute -top-3 -right-3 md:top-6 md:-right-12 bg-neon-pink text-white text-[10px] font-bold px-3 py-1 rounded-full md:rounded-none md:py-1 md:px-12 uppercase italic rotate-12 md:rotate-45">Best Value</div>
                                <div className="flex justify-between items-start md:mb-8">
                                    <div>
                                        <h3 className="font-punchy text-2xl md:text-3xl font-bold text-neon-pink italic leading-none tracking-tighter">7 NIGHTS</h3>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Full Cyclades Edge</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] md:text-xs font-bold text-neon-pink uppercase block mb-1">From</span>
                                        <span className="text-2xl md:text-4xl font-punchy font-bold tracking-tighter italic">€929</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 md:space-y-4 md:mb-12 md:flex-grow">
                                    {dest.package7NHighlights.map((h) => (
                                        <li key={h} className="flex items-center gap-3 text-sm text-gray-600">
                                            <div className="w-5 h-5 rounded-full bg-neon-pink/10 flex items-center justify-center text-neon-pink text-xs md:block hidden">✓</div>
                                            <span className="text-neon-pink md:hidden">✓</span>
                                            <span className={h.startsWith('Everything') ? 'font-bold text-gray-800' : ''}>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-neon-pink text-white font-bold py-4 rounded-2xl uppercase tracking-wider text-sm shadow-lg shadow-neon-pink/30 cursor-pointer hover:opacity-90 transition-opacity">Select 7-Night Route</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ROUTE MAP + STOPS                                          */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <TripMapStops routeId="route_greece_5n" />

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* INCLUDED MOMENTS                                           */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="bg-background-dark py-16 px-6 md:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-4 mb-8 md:flex md:flex-row md:items-end md:justify-between md:gap-6 md:mb-16">
                        <div className="max-w-xl">
                            <h2 className="font-punchy text-3xl md:text-6xl font-bold text-white uppercase italic leading-none tracking-tighter">
                                Included<br className="md:hidden" /> <span className="text-primary">Moments</span>
                            </h2>
                            <p className="text-gray-400 text-xs md:text-base mt-2">Not just a boat ride. A curated collection of the best moments {dest.name} has to offer.</p>
                        </div>
                    </div>

                    {/* MOBILE: horizontal scroll */}
                    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x md:hidden">
                        {dest.includedMoments.map((m, i) => (
                            <div key={i} className="flex-shrink-0 w-48 snap-start relative rounded-2xl overflow-hidden aspect-[4/5]">
                                <img alt={m.title} className="w-full h-full object-cover" src={m.img} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${m.tagColor === 'primary' ? 'text-primary' : 'text-neon-pink'}`}>{m.tag}</span>
                                    <h4 className="text-white text-xs font-bold">{m.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP: grid */}
                    <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4">
                        {dest.includedMoments.map((m, i) => (
                            <div key={i} className={`group relative aspect-[3/4] rounded-2xl overflow-hidden ${i % 2 === 1 ? 'mt-8' : ''}`}>
                                <img alt={m.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={m.img} />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${m.tagColor === 'primary' ? 'text-primary' : 'text-neon-pink'}`}>{m.tag}</span>
                                    <p className="text-sm font-bold leading-tight text-white">{m.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* TRUST SECTION                                              */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="py-12 md:py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* MOBILE: stacked cards */}
                    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 text-center shadow-sm">
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-lg md:text-2xl">🎉</div>
                            <h4 className="font-punchy font-bold text-sm md:text-xl uppercase">18–45 Flotilla</h4>
                            <p className="text-[10px] md:text-sm text-gray-500 mt-2">Curated for ages 18–45. A social, high-energy flotilla experience.</p>
                        </div>
                        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 text-center shadow-sm">
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-neon-pink/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-lg md:text-2xl">🚳</div>
                            <h4 className="font-punchy font-bold text-sm md:text-xl uppercase">No BYO Alcohol</h4>
                            <p className="text-[10px] md:text-sm text-gray-500 mt-2">For safety and licensing, no outside alcohol is permitted on board.</p>
                        </div>
                        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 text-center shadow-sm">
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-neon-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-lg md:text-2xl">🛡️</div>
                            <h4 className="font-punchy font-bold text-sm md:text-xl uppercase">Safety-First Crew</h4>
                            <p className="text-[10px] md:text-sm text-gray-500 mt-2">Professional skippers and hosts to keep the vibes high and everyone safe.</p>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-12 text-center">
                        <Link to="/faq#safety" className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-400 md:text-slate-900 underline md:border-b-2 md:border-primary md:no-underline md:pb-1 hover:text-primary transition-colors">Read Safety Rules</Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* OPTIONAL ADD-ONS                                           */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="py-12 md:py-24 px-6 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-8 md:mb-12">
                        <h2 className="font-punchy text-xl md:text-3xl font-bold uppercase shrink-0 tracking-tighter italic">Onboard Amenities</h2>
                        <div className="h-[1px] bg-gray-200 w-full rounded" />
                    </div>

                    {/* MOBILE: stacked horizontal cards */}
                    <div className="grid grid-cols-1 gap-6 md:hidden">
                        {dest.optionalAddOns.map((addon) => (
                            <div key={addon.title} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                                <img alt={addon.title} className="w-24 h-24 object-cover rounded-xl shrink-0" src={addon.img} />
                                <div className="flex-1">
                                    <h4 className="font-punchy font-bold text-xs uppercase leading-tight">{addon.title}</h4>
                                    <p className="text-[9px] text-gray-500 my-1">{addon.description}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="font-bold text-sm">€{addon.priceFrom}</span>
                                        <button className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase cursor-pointer">Info</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP: horizontal scroll cards */}
                    <div className="hidden md:flex overflow-x-auto gap-6 pb-8 scrollbar-hide">
                        {dest.optionalAddOns.map((addon) => (
                            <div key={addon.title} className="min-w-[280px] bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                                <img alt={addon.title} className="w-full h-40 object-cover rounded-2xl mb-4" src={addon.img} />
                                <h5 className="font-bold uppercase mb-1">{addon.title}</h5>
                                <p className="text-xs text-gray-500 mb-6">{addon.description}</p>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="font-bold text-lg">€{addon.priceFrom}</span>
                                    <button className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer hover:bg-primary/20 transition-colors">Info</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* HOT DEALS / FLASH SALES                                    */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 px-6 bg-white md:bg-white border-y border-gray-100 md:border-0 relative overflow-hidden" id="hot-deals">
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="flex flex-col gap-1 mb-8 md:flex-row md:justify-between md:items-center md:mb-16">
                        <div>
                            <h2 className="font-punchy text-4xl md:text-6xl font-bold uppercase italic tracking-tighter">Flash Sales</h2>
                            <div className="flex justify-between items-center md:block">
                                <span className="text-[9px] md:text-xs font-bold text-neon-pink uppercase tracking-tighter">
                                    Prices go up in {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                                </span>
                                <span className="text-[9px] font-medium text-gray-400 flex items-center gap-1 md:hidden">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> 3 people looking at these dates
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:block px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-bold uppercase text-xs animate-pulse border border-red-100">
                            🔥 3 People looking at these dates
                        </div>
                    </div>

                    {/* MOBILE: stacked deal cards */}
                    <div className="space-y-4 md:hidden">
                        {dest.hotDeals.map((deal) => (
                            <div key={deal.dealSlug} className="border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
                                <div className={`absolute top-0 right-0 ${deal.badgeColor} text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase`}>{deal.badge}</div>
                                <div>
                                    <h4 className="font-punchy font-bold text-lg uppercase leading-none tracking-tighter italic">{deal.title}</h4>
                                    <span className="text-[10px] text-gray-400">{deal.dates}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold">€{deal.price}</span>
                                    <span className="text-sm text-gray-300 line-through">€{deal.wasPrice}</span>
                                </div>
                                <button
                                    onClick={() => openBooking({ action: 'book-yacht', entityId: deal.dealSlug, source: 'destination-deal' })}
                                    className={`w-full font-bold py-3 rounded-xl shadow-lg text-sm uppercase cursor-pointer ${deal.borderClass.includes('border-primary')
                                        ? 'bg-neon-aqua text-background-dark shadow-neon-aqua/20'
                                        : 'bg-background-dark text-white'
                                        }`}
                                >CLAIM SPOT</button>
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP: grid deal cards */}
                    <div className="hidden md:grid md:grid-cols-3 gap-8">
                        {dest.hotDeals.map((deal) => (
                            <div key={deal.dealSlug} className={`bg-white p-8 rounded-3xl ${deal.borderClass} relative overflow-hidden`}>
                                <div className={`absolute top-0 right-0 ${deal.badgeColor} px-4 py-1 text-[10px] font-bold uppercase`}>{deal.badge}</div>
                                <h4 className="text-xl font-punchy font-bold uppercase mb-1 tracking-tighter italic">{deal.title}</h4>
                                <p className="text-xs text-gray-400 font-bold mb-6 italic">{deal.dates}</p>
                                <div className="flex items-end gap-2 mb-8">
                                    <span className="text-3xl font-punchy font-bold tracking-tighter italic">€{deal.price}</span>
                                    <span className="text-sm text-gray-300 line-through mb-1">€{deal.wasPrice}</span>
                                </div>
                                <button
                                    onClick={() => openBooking({ action: 'book-yacht', entityId: deal.dealSlug, source: 'destination-deal' })}
                                    className={`w-full py-4 rounded-xl font-bold uppercase text-sm tracking-widest transition-all cursor-pointer ${deal.borderClass.includes('border-primary')
                                        ? 'bg-primary text-background-dark hover:bg-neon-aqua'
                                        : 'bg-background-dark text-white hover:bg-gray-800'
                                        }`}
                                >Claim Spot</button>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-center text-slate-500 font-space text-sm italic mt-12 mb-4">Departure times can change due to weather.</p>
            </section>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* FINAL CTA                                                  */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* MOBILE CTA */}
            <section className="p-6 md:hidden">
                <div className="rounded-[32px] p-8 text-center space-y-6 border-2 border-transparent" style={{ backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(to right, #ff00e5, #13c8ec)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
                    <h2 className="font-punchy text-2xl font-bold uppercase italic leading-tight">Don't miss the wave of 2026</h2>
                    <p className="text-xs text-gray-500 max-w-[200px] mx-auto">Limited spots available for Summer 2026. Don't ghost your future self.</p>
                    <button onClick={() => openBooking({ action: 'book-yacht', source: 'destination-cta' })} className="w-full bg-neon-aqua text-background-dark font-bold py-4 rounded-2xl shadow-xl shadow-neon-aqua/30 text-sm uppercase cursor-pointer">Book Your Cabin</button>
                </div>
            </section>

            {/* DESKTOP CTA */}
            <section className="hidden md:block py-16 md:py-20 px-6">
                <div className="max-w-7xl mx-auto rounded-[3rem] p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 bg-background-dark text-white overflow-hidden relative border-2 border-transparent" style={{ backgroundImage: 'linear-gradient(#101f22, #101f22), linear-gradient(to right, #ff00e5, #13c8ec)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                    <div className="relative z-10 text-center w-full">
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-white">
                            Ready for the best <br className="hidden md:block" /> week of your life?
                        </h2>
                        <p className="text-gray-400 text-lg">Limited spots available for Summer 2026. Don't ghost your future self.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10 justify-center w-full mt-6">
                        <button onClick={() => openBooking({ action: 'book-yacht', source: 'destination-cta' })} className="bg-neon-aqua text-background-dark px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-neon-aqua/30 cursor-pointer">Book Your Cabin</button>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="glass-panel text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/20">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.655zm6.757-4.047c1.519.9 3.591 1.41 5.136 1.411 5.146 0 9.337-4.192 9.34-9.337.001-2.492-.967-4.834-2.731-6.598-1.762-1.761-4.102-2.731-6.595-2.732-5.146 0-9.336 4.192-9.338 9.338 0 1.83.535 3.511 1.545 4.938l-.946 3.454 3.589-.974z" /></svg>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            {/* ═══ FLOATING WIDGET ═══ */}
            {showWidget && (
                <>
                    {/* MOBILE widget */}
                    <div className="fixed bottom-6 right-6 z-[60] md:hidden">
                        <div className="bg-background-dark/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl w-48 relative" style={{ animation: 'pulse-cyan 2s infinite' }}>
                            <button className="absolute -top-2 -right-2 bg-background-dark text-white rounded-full w-5 h-5 flex items-center justify-center text-[8px] border border-white/10 cursor-pointer" onClick={() => setShowWidget(false)}>✕</button>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-neon-pink rounded-full" />
                                    <span className="text-[8px] font-bold text-neon-pink uppercase">{dest.floatingDeal.badge}</span>
                                </div>
                                <div>
                                    <h5 className="text-white text-[10px] font-bold uppercase leading-none">{dest.floatingDeal.title}</h5>
                                    <span className="text-neon-aqua text-xl font-punchy font-bold">{dest.floatingDeal.price}</span>
                                </div>
                                <button onClick={() => openBooking({ action: 'book-yacht', entityId: dest.floatingDeal.dealSlug, source: 'destination-widget' })} className="w-full bg-neon-aqua text-background-dark text-[9px] font-bold py-1.5 rounded-lg uppercase cursor-pointer">Claim</button>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP widget */}
                    <div className="fixed bottom-6 right-6 z-50 hidden lg:block transition-all duration-500">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink to-primary rounded-2xl blur opacity-75 animate-pulse" />
                            <div className="relative bg-background-dark text-white p-5 rounded-2xl w-64 shadow-2xl flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="bg-neon-pink text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">{dest.floatingDeal.badge}</span>
                                    <button onClick={() => setShowWidget(false)} className="text-gray-500 hover:text-white cursor-pointer">✕</button>
                                </div>
                                <div>
                                    <h6 className="font-punchy font-bold uppercase text-sm leading-none mb-1 tracking-tighter italic">{dest.floatingDeal.title}</h6>
                                    <p className="text-2xl font-punchy font-bold text-primary tracking-tighter italic">{dest.floatingDeal.price}</p>
                                </div>
                                <button onClick={() => openBooking({ action: 'book-yacht', entityId: dest.floatingDeal.dealSlug, source: 'destination-widget' })} className="w-full bg-neon-aqua text-background-dark py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg shadow-neon-aqua/30 cursor-pointer">Claim</button>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>
    )
}
