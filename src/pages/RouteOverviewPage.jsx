// ── Route Overview Page ──────────────────────────────────
// Shared detail page for /routes/5-nights and /routes/7-nights
// Data-driven from yachtDaysGreece.json

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TripMapStops from '../components/TripMapStops'
import Testimonials from '../components/Testimonials'
import HotRouteCards from '../components/booking/HotRouteCards'
import DATA from '../data/yachtDaysGreece.json'
import { HERO_IMAGES, WHOLE_YACHT_PACKAGES, WHOLE_CABIN_PACKAGES, WHOLE_YACHT_ALCOHOL_PRICE, ALCOHOL_PRICE_PER_PERSON } from '../data/constants'
import { useBooking } from '../context/BookingProvider'
import SEO from '../components/SEO'

const ROUTE_CONFIG = {
    '5-nights': { packageId: '5n', routeId: 'route_greece_5n', accent: 'neon-aqua', otherSlug: '7-nights', otherLabel: '7 Nights', vibePct: 72 },
    '7-nights': { packageId: '7n', routeId: 'route_greece_7n', accent: 'neon-pink', otherSlug: '5-nights', otherLabel: '5 Nights', vibePct: 85 },
}

export default function RouteOverviewPage() {
    const { nights } = useParams()
    const navigate = useNavigate()
    const { openBooking } = useBooking()
    const config = ROUTE_CONFIG[nights]

    const route = config ? DATA.routes.find(r => r.id === config.routeId) : null
    const pkg = config ? DATA.packages.find(p => p.itinerary.routeId === config.routeId) : null

    const [activeStop, setActiveStop] = useState(0)
    const [faqOpen, setFaqOpen] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        setActiveStop(0)
        setFaqOpen(null)
    }, [nights, pkg])

    if (!config || !route || !pkg) {
        return (
            <div className="min-h-screen bg-background-light text-slate-900">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-center">
                        <h1 className="font-punchy text-3xl uppercase italic mb-4">Route Not Found</h1>
                        <Link to="/routes" className="text-primary underline">← View all routes</Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    const accent = config.accent
    const handleBook = () => {
        openBooking({ action: 'BOOK_TOUR', source: 'route-overview-per-person', packageId: config.packageId })
    }

    const STAT_PILLS = [
        { icon: 'person', label: '18+' },
        { icon: 'dark_mode', label: `${pkg.nights} Nights` },
        { icon: 'calendar_month', label: 'Mon / Wed / Fri' },
        { icon: 'sailing', label: '~50 Yachts' },
        { icon: 'groups', label: 'Max 8 Guests' },
        { icon: 'restaurant', label: 'Half-board' },
    ]

    const ACTIVITIES = [
        { title: 'Scooter Hire', copy: 'Explore the islands at your own pace on two wheels. Pick up and drop off at any port.', icon: 'two_wheeler', image: '/img/scooter.webp' },
        { title: 'Beach Clubs', copy: 'VIP access and flotilla discounts at the best spots across all islands.', icon: 'beach_access', image: '/img/bayparty.webp' },
        { title: 'Viewpoint Hikes', copy: 'Sunrise and sunset spots handpicked by your crew. Some of the most Instagrammed views in Greece.', icon: 'landscape', image: '/img/hiking.webp' },
        { title: 'Chill Bays', copy: 'Hidden swim spots, cliff jumping, and crystal-clear water. Pure reset mode.', icon: 'pool', image: '/img/bayarea.webp' },
        { title: 'Night life', copy: 'From rooftop cocktails to underground beats — every port has its after-dark scene. Your crew knows the doors that open.', icon: 'nightlife', image: '/img/party case.jpg' },
    ]

    /* ── Route-specific gallery images ── */
    const ROUTE_GALLERY = {
        '5-nights': [
            '/img/gal33.webp',
            '/img/gal45.webp',
            '/img/gal13.webp',
            '/img/gal28.webp',
            '/img/gal29.webp',
            '/img/gal47.webp',
        ],
        '7-nights': [
            '/img/gal33.webp',
            '/img/gal45.webp',
            '/img/gal31.webp',
            '/img/gal32.webp',
            '/img/gal29.webp',
            '/img/gal42.webp',
        ],
    }
    const galleryImages = ROUTE_GALLERY[nights] || ROUTE_GALLERY['5-nights']

    return (
        <div className="min-h-screen bg-background-light text-slate-900 selection:bg-neon-pink selection:text-white">
            <SEO
                title={`${pkg.nights} Night Greece Party Yacht Cruise | Epic Sail Week`}
                description={`Experience our unforgettable ${pkg.nights}-night Greece party yacht cruise. A curated, highly social island-hopping route packed with fun. Check availability and book online.`}
                keywords={`${pkg.nights} night Greece party yacht cruise, 1 week Greek island party cruise, ${pkg.nights} days social sailing Greece`}
            />
            <Navbar />

            {/* ═══════════════════════════════════════════
               A) HERO — Slideshow matching main page
            ═══════════════════════════════════════════ */}
            <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
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

                {/* Hero content */}
                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 animate-pulse font-space">
                        <span className="w-2 h-2 bg-neon-aqua rounded-full" />
                        {pkg.nights} Night Route · Greece · Cyclades
                    </div>

                    <h1 className="sr-only">{pkg.nights}-Night Premium Greece Yacht Cruise</h1>
                    <h2 className="text-6xl md:text-9xl font-punchy text-white mb-6 leading-[0.9] italic drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                        {pkg.nights} NIGHTS. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-aqua to-neon-pink">
                            {route.stopsByNights.length} ISLANDS.
                        </span>
                    </h2>

                    <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        {route.stopsByNights.map(s => s.name).join(' → ')}
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               B) ROUTE DETAILS CARD — right under hero
            ═══════════════════════════════════════════ */}
            <section className="relative z-20 -mt-16 px-4 mb-12">
                <div className="mx-auto max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="font-punchy text-2xl md:text-3xl uppercase italic tracking-tighter">Route Details</h2>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-space">
                                    Party-hostel on the water • Greece only
                                </p>
                            </div>
                            <button
                                onClick={handleBook}
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-neon-aqua hover:text-slate-900 transition-colors cursor-pointer font-space"
                            >
                                Book now from <span className={`ml-2 text-${accent} font-punchy text-xl italic`}>€{pkg.price}</span>
                            </button>
                        </div>

                        {/* Stat pills — line-by-line on mobile, grid on sm+ */}
                        <div className="hidden sm:grid mt-6 grid-cols-3 gap-3 lg:grid-cols-6">
                            {STAT_PILLS.map((pill) => (
                                <div key={pill.label} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-space">
                                        <span className="material-icons text-neon-aqua text-xs mr-1 align-middle">{pill.icon}</span>
                                    </div>
                                    <div className="mt-1 font-punchy font-bold text-sm uppercase">{pill.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="sm:hidden mt-5 space-y-0 divide-y divide-slate-100">
                            {STAT_PILLS.map((pill) => (
                                <div key={pill.label} className="flex items-center gap-3 py-3">
                                    <span className="material-icons text-neon-aqua text-lg">{pill.icon}</span>
                                    <span className="font-punchy font-bold text-sm uppercase">{pill.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Vibe Meter */}
                        <div className="mt-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 font-space">Vibe Meter</span>
                                <span className="text-[10px] font-bold text-slate-400 font-space">Party-first • Safety-first</span>
                            </div>
                            <div className="mt-2 h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                                <div className={`h-full bg-${accent} transition-all duration-700`} style={{ width: `${config.vibePct}%` }} />
                            </div>
                            <div className="mt-2 flex justify-between text-[11px] font-bold text-slate-500 font-space">
                                <span>{config.vibePct}% party</span>
                                <span>{100 - config.vibePct}% chill</span>
                            </div>
                            <p className="mt-4 text-[11px] text-slate-400 font-space italic">
                                *{DATA.operations.timeDisclaimer}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               B1.5) WHOLE CABIN CARD — between route details and whole yacht
            ═══════════════════════════════════════════ */}
            <section className="px-4 mb-6">
                <div className="mx-auto max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-neon-pink/20 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                                    <span className="material-icons text-neon-pink">king_bed</span>
                                </div>
                                <div>
                                    <h3 className="font-punchy text-xl md:text-2xl uppercase italic tracking-tighter">Book a Whole Cabin</h3>
                                    <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.2em]">Private cabin · no sharing · both beds yours</p>
                                </div>
                            </div>
                            <button
                                onClick={() => openBooking({ action: 'book-whole-cabin', source: 'route-overview-cabin', packageId: config.packageId })}
                                className="inline-flex items-center justify-center rounded-2xl bg-neon-pink px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-neon-pink/90 transition-colors cursor-pointer font-space"
                            >
                                Book Whole Cabin <span className={`ml-2 font-punchy text-xl italic`}>€{WHOLE_CABIN_PACKAGES[config.packageId].price}</span>
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-2xl bg-neon-pink/5 border border-neon-pink/10 p-4 text-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-pink font-space">Trip</div>
                                <div className="mt-1 font-punchy font-bold text-sm uppercase">{pkg.nights} Nights</div>
                            </div>
                            <div className="rounded-2xl bg-neon-pink/5 border border-neon-pink/10 p-4 text-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-pink font-space">Price</div>
                                <div className="mt-1 font-punchy font-bold text-sm uppercase">€{WHOLE_CABIN_PACKAGES[config.packageId].price} / cabin</div>
                            </div>
                            <div className="rounded-2xl bg-neon-pink/5 border border-neon-pink/10 p-4 text-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neon-pink font-space">
                                    <span className="material-icons text-xs mr-1 align-middle">local_bar</span> Alcohol
                                </div>
                                <div className="mt-1 font-punchy font-bold text-sm uppercase">
                                    €{WHOLE_YACHT_ALCOHOL_PRICE}/pp <span className="text-xs text-slate-400 line-through font-normal">€{ALCOHOL_PRICE_PER_PERSON}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               B2) WHOLE YACHT CARD — right after route details
            ═══════════════════════════════════════════ */}
            <section className="px-4 mb-12">
                <div className="mx-auto max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-amber-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <span className="material-icons text-amber-600">directions_boat</span>
                                </div>
                                <div>
                                    <h3 className="font-punchy text-xl md:text-2xl uppercase italic tracking-tighter">Book the Whole Yacht</h3>
                                    <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.2em]">Private charter · flat rate · your group only</p>
                                </div>
                            </div>
                            <button
                                onClick={() => openBooking({ action: 'book-whole-yacht', source: 'route-overview-whole', packageId: config.packageId })}
                                className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-amber-600 transition-colors cursor-pointer font-space"
                            >
                                Book Whole Yacht <span className={`ml-2 font-punchy text-xl italic`}>€{WHOLE_YACHT_PACKAGES[config.packageId].price}</span>
                            </button>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 font-space">Trip</div>
                                <div className="mt-1 font-punchy font-bold text-sm uppercase">{pkg.nights} Nights</div>
                            </div>
                            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 font-space">Price</div>
                                <div className="mt-1 font-punchy font-bold text-sm uppercase">€{WHOLE_YACHT_PACKAGES[config.packageId].price} / yacht</div>
                            </div>
                            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-center">
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 font-space">
                                    <span className="material-icons text-xs mr-1 align-middle">local_bar</span> Alcohol
                                </div>
                                <div className="mt-1 font-punchy font-bold text-sm uppercase">
                                    €{WHOLE_YACHT_ALCOHOL_PRICE}/pp <span className="text-xs text-slate-400 line-through font-normal">€{ALCOHOL_PRICE_PER_PERSON}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               C) HEADLINE + CTAs — right after table
            ═══════════════════════════════════════════ */}
            <section className="px-4 pb-8">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="text-5xl md:text-7xl lg:text-[90px] font-punchy italic uppercase tracking-tighter leading-[0.9]">
                        Your best week starts here —{' '}
                        <span className={`text-${accent}`}>{pkg.nights} Nights</span> of{' '}
                        <span className="text-neon-pink">wild nights</span>,{' '}
                        <span className="text-neon-aqua">turquoise water</span>,
                        and stories you'll repeat forever.
                    </h2>

                </div>
            </section>

            {/* ═══════════════════════════════════════════
               D) HIGHLIGHTS — 2×2 image grid
            ═══════════════════════════════════════════ */}
            <section className="py-20 md:py-28 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 font-space">Route Highlights</span>
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mt-3 text-slate-900">
                            Just a few highlights —{' '}
                            <span className={`text-${accent}`}>the rest?</span>{' '}
                            You'll have to live it.
                        </h2>
                    </div>
                    <div className="grid gap-10 md:grid-cols-2">
                        {route.highlightCards?.map((card, i) => (
                            <article key={i} className="group">
                                <div className="rounded-3xl overflow-hidden aspect-[16/9]">
                                    <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h3 className="mt-6 font-punchy text-3xl uppercase tracking-tighter italic">{card.title}</h3>
                                <p className="mt-3 text-slate-500 font-medium">{card.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               E) ITINERARY + MAP — Stepper left, Map right (no Trip Views panel)
            ═══════════════════════════════════════════ */}
            <section className={`py-20 md:py-28 px-4 bg-${accent}/10`}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 font-space">Your Itinerary</span>
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mt-3 text-slate-900">
                            Best spots <span className={`text-${accent}`}>hand-picked</span> for you
                        </h2>
                        <p className="mt-4 text-slate-600 font-medium">
                            {DATA.operations.timeDisclaimer}
                        </p>
                    </div>

                    {/* Mobile layout: Map on top → stop dots → active stop detail */}
                    <div className="lg:hidden">
                        {/* Map with overlay nav arrows */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 mb-6">
                            <TripMapStops
                                routeId={config.routeId}
                                activeStopIdx={activeStop}
                                onStopClick={setActiveStop}
                                hidePanel
                            />
                            {/* Left arrow */}
                            <button
                                onClick={() => setActiveStop(Math.max(0, activeStop - 1))}
                                disabled={activeStop === 0}
                                className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all cursor-pointer ${activeStop === 0 ? 'opacity-30' : 'opacity-80 hover:opacity-100 hover:bg-white/40'
                                    }`}
                            >
                                <span className="material-icons text-white text-lg">chevron_left</span>
                            </button>
                            {/* Right arrow */}
                            <button
                                onClick={() => setActiveStop(Math.min((route.map?.stops?.length || 1) - 1, activeStop + 1))}
                                disabled={activeStop === (route.map?.stops?.length || 1) - 1}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all cursor-pointer ${activeStop === (route.map?.stops?.length || 1) - 1 ? 'opacity-30' : 'opacity-80 hover:opacity-100 hover:bg-white/40'
                                    }`}
                            >
                                <span className="material-icons text-white text-lg">chevron_right</span>
                            </button>
                        </div>

                        {/* Stop navigation: < 01 02 03 > */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <button
                                onClick={() => setActiveStop(Math.max(0, activeStop - 1))}
                                disabled={activeStop === 0}
                                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${activeStop === 0 ? 'border-slate-200 text-slate-300' : 'border-slate-300 text-slate-600 hover:border-slate-900'
                                    }`}
                            >
                                <span className="material-icons text-lg">chevron_left</span>
                            </button>
                            {route.map?.stops?.map((stop, i) => (
                                <button
                                    key={stop.id}
                                    onClick={() => setActiveStop(i)}
                                    className={`w-10 h-10 rounded-xl font-punchy font-bold text-sm transition-all cursor-pointer ${activeStop === i
                                        ? `bg-${accent} text-slate-900 shadow-lg scale-110`
                                        : 'bg-white border-2 border-slate-200 text-slate-500 hover:border-slate-400'
                                        }`}
                                >
                                    {stop.label}
                                </button>
                            ))}
                            <button
                                onClick={() => setActiveStop(Math.min((route.map?.stops?.length || 1) - 1, activeStop + 1))}
                                disabled={activeStop === (route.map?.stops?.length || 1) - 1}
                                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${activeStop === (route.map?.stops?.length || 1) - 1 ? 'border-slate-200 text-slate-300' : 'border-slate-300 text-slate-600 hover:border-slate-900'
                                    }`}
                            >
                                <span className="material-icons text-lg">chevron_right</span>
                            </button>
                        </div>

                        {/* Active stop detail */}
                        {route.map?.stops?.[activeStop] && (
                            <div>
                                <h3 className="font-punchy text-2xl uppercase italic tracking-tighter mb-4">
                                    {route.map.stops[activeStop].name} ({route.map.stops[activeStop].nights}N)
                                </h3>
                                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-4">
                                    <img src={route.map.stops[activeStop].thumb || route.heroImage} alt={route.map.stops[activeStop].name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{route.map.stops[activeStop].viewCopy}</p>
                            </div>
                        )}
                    </div>

                    {/* Desktop layout: Stepper left + Map right */}
                    <div className="hidden lg:grid gap-10 lg:grid-cols-12 items-stretch">
                        {/* Stepper */}
                        <aside className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-3xl p-4 md:p-5 shadow-xl border border-white/50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 font-space">Stops</span>
                                <span className="text-[11px] font-bold text-slate-400 font-space">{pkg.nights} nights</span>
                            </div>

                            {/* Active stop detail card */}
                            {route.map?.stops?.[activeStop] && (
                                <div className="mb-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-punchy font-bold text-sm">
                                            {route.map.stops[activeStop].label}
                                        </div>
                                        <div>
                                            <div className="font-punchy font-bold uppercase text-sm">{route.map.stops[activeStop].name}</div>
                                            <div className="text-[11px] font-bold text-slate-400 font-space">{route.map.stops[activeStop].nights} {route.map.stops[activeStop].nights === 1 ? 'night' : 'nights'}</div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl overflow-hidden aspect-[2/1] mb-3">
                                        <img src={route.map.stops[activeStop].thumb || route.heroImage} alt={route.map.stops[activeStop].name} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{route.map.stops[activeStop].viewCopy}</p>
                                    <button
                                        onClick={handleBook}
                                        className={`bg-${accent} text-slate-900 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:scale-105 transition-all`}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            )}

                            {/* Stop list */}
                            <ol className="space-y-2">
                                {route.map?.stops?.map((stop, i) => (
                                    <li
                                        key={stop.id}
                                        onClick={() => setActiveStop(i)}
                                        className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 transition-all ${activeStop === i ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700 opacity-70'}`}
                                    >
                                        <span className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${activeStop === i ? `bg-${accent} text-slate-900` : 'bg-white border border-slate-200'}`}>
                                            {stop.label}
                                        </span>
                                        <span className="font-bold text-sm">{stop.name} ({stop.nights}N)</span>
                                    </li>
                                ))}
                            </ol>
                        </aside>

                        {/* Map */}
                        <div className="lg:col-span-8">
                            <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
                                <TripMapStops
                                    routeId={config.routeId}
                                    activeStopIdx={activeStop}
                                    onStopClick={setActiveStop}
                                    hidePanel
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               F) ACTIVITIES — Sticky left text, scrolling cards right with images
            ═══════════════════════════════════════════ */}
            <section className="py-20 md:py-28 px-4 bg-white overflow-visible">
                <div className="max-w-7xl mx-auto">
                    <div className="lg:flex lg:gap-16">
                        {/* Left — sticky column */}
                        <div className="lg:w-[40%] lg:sticky lg:top-28 lg:self-start lg:h-fit lg:shrink-0 mb-12 lg:mb-0">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 font-space mb-3 block">While on land</span>
                            <h2 className="text-4xl md:text-6xl font-punchy italic uppercase leading-none tracking-tighter text-slate-900 mb-6">
                                There's more than one activity{' '}
                                <span className={`text-${accent}`}>up our sleeve</span>
                            </h2>
                            <p className="text-slate-500 font-medium max-w-md">
                                We don't sell excursions — we recommend the best options and you choose your own adventure. Your wristband unlocks partner discounts across all islands.
                            </p>
                        </div>

                        {/* Right — scrolling activity cards with images */}
                        <div className="lg:w-[60%] space-y-8">
                            {ACTIVITIES.map((act, i) => (
                                <div key={i} className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`material-icons text-${accent} text-2xl`}>{act.icon}</span>
                                            <h4 className="font-punchy text-xl uppercase tracking-tight">{act.title}</h4>
                                        </div>
                                        <p className="text-slate-500">{act.copy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               G) INCLUDED / NOT INCLUDED
            ═══════════════════════════════════════════ */}
            <section className="py-20 md:py-28 px-4 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-14 text-slate-900">
                        What's <span className={`text-${accent}`}>Included</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neon-aqua font-space mb-6 flex items-center gap-2">
                                <span className="material-icons text-sm">check_circle</span> Included
                            </h4>
                            <div className="space-y-3">
                                {pkg.included.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                        <span className="material-icons text-neon-aqua text-xs mt-0.5 shrink-0">check_circle</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-neon-pink font-space mb-6 flex items-center gap-2">
                                <span className="material-icons text-sm">close</span> Not Included
                            </h4>
                            <div className="space-y-3">
                                {pkg.notIncluded.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                        <span className="material-icons text-slate-300 text-xs mt-0.5 shrink-0">close</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               H) REUSED SECTIONS — Testimonials, FAQ, Hot Deals
            ═══════════════════════════════════════════ */}

            {/* Testimonials */}
            <Testimonials />

            {/* ═══════════════════════════════════════════
               GALLERY — Styled masonry-like grid
            ═══════════════════════════════════════════ */}
            <section className="py-20 md:py-28 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 font-space">From the fleet</span>
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mt-3 text-slate-900">
                            The <span className={`text-${accent}`}>vibes</span> speak for themselves
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {galleryImages.map((src, i) => (
                            <div
                                key={i}
                                className={`rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                                    }`}
                            >
                                <div className={`relative w-full h-full ${i === 0 ? 'aspect-square' : 'aspect-[4/3]'}`}>
                                    <img
                                        src={src}
                                        alt={`Gallery ${i + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View Full Gallery CTA */}
                    <div className="text-center mt-14">
                        <Link
                            to="/gallery"
                            className={`inline-flex items-center gap-3 bg-${accent} text-slate-900 px-10 py-4 rounded-full font-punchy uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg font-bold`}
                        >
                            View Full Gallery
                            <span className="material-icons text-lg">photo_library</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Route-Specific FAQ */}
            {route.routeFaq && route.routeFaq.length > 0 && (
                <section className="py-20 px-4 bg-slate-50" id="faq">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-slate-900">
                            THE <span className="text-neon-pink">INTEL</span>
                        </h2>
                        <div className="space-y-4 font-space">
                            {route.routeFaq.map((item, i) => (
                                <div key={i} className="group">
                                    <button
                                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                                        className="w-full text-left p-5 glass-panel rounded-2xl flex justify-between items-center focus:outline-none cursor-pointer"
                                    >
                                        <span className="font-punchy text-base uppercase">{item.q}</span>
                                        <span className={`material-icons text-${item.color} transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>
                                    <div className={`accordion-content ${faqOpen === i ? 'open' : ''} bg-white/50 rounded-b-2xl px-5 overflow-hidden`}>
                                        <p className="py-5 text-slate-600 font-medium text-sm">{item.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Hot Deals */}
            <section className="py-20 px-4 bg-slate-900 relative overflow-hidden border-t-8 border-neon-aqua" id="hot-deals">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,229,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-white">
                        HEAVY GRIT. <span className="text-neon-pink">LIGHT PRICE.</span>
                    </h2>
                    <HotRouteCards />
                </div>
            </section>

            <Footer />
        </div>
    )
}
