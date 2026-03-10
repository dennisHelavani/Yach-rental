// ── Routes Index Page ────────────────────────────────────
// Full conversion-first page: Hero → Route Cards → Social → FAQ → CTA → Hot Deals

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Testimonials from '../components/Testimonials'
import HotRouteCards from '../components/booking/HotRouteCards'
import HotDealsCard from '../components/booking/HotDealsCard'
import DATA from '../data/yachtDaysGreece.json'
import { HERO_IMAGES } from '../data/constants'

const routes = DATA.routes
const packages = DATA.packages

/* ── Route Card Data ── */
const ROUTE_CARDS = [
    {
        route: routes.find(r => r.id === 'route_greece_5n'),
        pkg: packages[0],
        slug: '5-nights',
        accent: 'neon-aqua',
        badge: 'Most Popular',
        badgeBg: 'bg-neon-aqua text-slate-900',
        heroImg: '/img/gal46.webp',
    },
    {
        route: routes.find(r => r.id === 'route_greece_7n'),
        pkg: packages[1],
        slug: '7-nights',
        accent: 'neon-pink',
        badge: 'Full Experience',
        badgeBg: 'bg-neon-pink text-white',
        heroImg: '/img/gal40.webp',
    },
]

/* ── FAQ Data for routes page ── */
const ROUTE_FAQS = [
    {
        q: 'Check-in / Start sailing / Return / Check-out — What times?',
        a: "Exact times depend on weather and port conditions. After booking, you'll receive a detailed trip kit with all timing info via WhatsApp. As a general rule — sailing starts in the morning, returns in the evening.",
    },
    {
        q: 'What\'s included? What\'s not included?',
        a: 'Half-board is included: Breakfast + Lunch on board, Skipper + Hostess, port fees, fuel, water, soft drinks, bed linen & towels. Not included: Flights, dinner on land (always at restaurants), optional excursions (we recommend GetYourGuide), travel insurance, alcohol (optional add-on €199/pp).',
    },
    {
        q: 'Cabin/Spot vs Full Yacht booking — which is best for my group?',
        a: 'Per-person bookings let you join others on a shared yacht (max 8 guests). Full yacht buyouts are available for groups who want the whole boat. Private cabin pricing varies — contact us for details.',
    },
    {
        q: 'Do you have an age limit?',
        a: '18+ only. Our target crowd is 18–45. Age is verified on board — bring valid ID.',
    },
    {
        q: 'Fleet allocations — how does it work?',
        a: 'Approx. 50 yachts depart together as a flotilla. Your exact yacht is allocated based on group size and availability. Max 8 per yacht due to regulations. Every yacht has a skipper and hostess.',
    },
    {
        q: 'What\'s the alcohol policy?',
        a: 'No BYO alcohol — this is for safety and licensing. An optional Unlimited Alcohol add-on (€199/pp) is available during booking. If anyone becomes intoxicated and behaves unsafely, alcohol provision will be restricted.',
    },
    {
        q: 'Can I get a discount?',
        a: 'Yes — book before June 15 and get 10% off your first payment with installments, or up to 19% off with full payment. Payment is split 33%/33%/34% in weekly installments.',
    },
]

export default function RoutesIndexPage() {
    const [openFaq, setOpenFaq] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <SEO
                title="Epic Greece Sailing Itineraries & Party Yacht Routes"
                description="Browse our expertly crafted Greece party sailing itineraries. Find the perfect epic social yacht cruise for your Greek holiday."
                keywords="Greece party sailing itineraries, Greek party yacht routes, 7 day Greece social sail"
            />
            <Navbar />

            {/* ═══════════════════════════════════════════════
               1) HERO
            ═══════════════════════════════════════════════ */}
            <section className="relative h-screen min-h-[550px] md:min-h-[700px] flex items-center justify-center overflow-hidden pt-20">
                {/* Background slideshow from HomePage */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                    {HERO_IMAGES.slice(0, 3).map((src, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 animate-fade-in-out"
                            style={{ animationDelay: `${i * 4}s`, opacity: i === 0 ? 1 : 0 }}
                        >
                            <img alt={`Route Hero ${i + 1}`} className="w-full h-full object-cover animate-ken-burns" src={src} />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-50" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
                    <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] text-neon-aqua font-space mb-4 animate-pulse drop-shadow-md">
                        Party Hostel on the Water
                    </span>

                    <h1 className="sr-only">Epic Greece Sailing Itineraries</h1>
                    <h2 className="font-punchy text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-4 md:mb-6 text-white drop-shadow-lg">
                        OUR <span className="text-neon-aqua">ROUTES</span>
                    </h2>

                    <p className="text-white/90 text-sm md:text-xl max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed font-medium drop-shadow-md">
                        Two epic routes through the Greek Cyclades. {DATA.operations.flotilla.publicCopy}
                    </p>

                    {/* Badge Row */}
                    <div className="flex items-center justify-start md:justify-center gap-2 md:gap-5 overflow-x-auto hide-scrollbar pb-2 mb-6 md:mb-10 drop-shadow-md snap-x">
                        {[
                            { icon: 'event', text: 'Mon / Wed / Fri Departures' },
                            { icon: 'groups', text: '18–45 Age Vibe' },
                            { icon: 'restaurant', text: 'Half-board Included' },
                            { icon: 'people', text: `Max ${DATA.regulations.maxGuestsPerYacht} Guests / Yacht` },
                        ].map((b, i) => (
                            <span key={i} className="snap-center flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-white uppercase font-space">
                                <span className={`material-icons text-${i % 2 === 0 ? 'neon-aqua' : 'neon-pink'} text-sm`}>{b.icon}</span>
                                {b.text}
                            </span>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-10 w-full max-w-xs md:max-w-none mx-auto">
                        <a href="#route-cards" className="block w-full md:w-auto bg-neon-aqua text-slate-900 px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:shadow-lg transition-all hover:-translate-y-1">
                            Choose Your Route ↓
                        </a>
                        <a href="#hot-deals" className="block w-full md:w-auto bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                            See Hot Deals
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
               2) TWO GIANT ROUTE CARDS
            ═══════════════════════════════════════════════ */}
            <section id="route-cards" className="px-4 md:px-6 py-14 md:py-32 bg-slate-50">
                <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
                    {ROUTE_CARDS.map((card, idx) => {
                        const { route, pkg, slug, accent, badge, badgeBg, heroImg } = card
                        const isFlipped = idx % 2 === 1

                        return (
                            <div
                                key={slug}
                                className={`flex flex-col ${isFlipped ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
                            >
                                {/* Text side */}
                                <div className="md:w-1/2 space-y-5 md:space-y-8 order-2 md:order-none">
                                    <div>
                                        <h2 className="font-punchy text-4xl md:text-7xl font-bold uppercase italic tracking-tighter leading-none text-slate-900 mb-3 md:mb-4">
                                            {pkg.nights} Night <span className={`text-${accent}`}>{accent === 'neon-aqua' ? 'QUICK' : 'FULL'}</span>
                                        </h2>
                                        <span className={`inline-block text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase font-space shadow-md ${badgeBg}`}>{badge}</span>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-space mb-4 border-b border-slate-200 pb-2">Vibe Check</p>

                                        {/* Stats grid */}
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                            {[
                                                { icon: 'groups', text: '18–45 years old target' },
                                                { icon: 'sailing', text: '~50 yachts flotilla' },
                                                { icon: 'nightlight', text: `${pkg.nights} nights / ${pkg.nights + 1} days` },
                                                { icon: 'event', text: 'Departs Mon/Wed/Fri' },
                                                { icon: 'celebration', text: 'Organized parties included' },
                                                { icon: 'people', text: `Max ${DATA.regulations.maxGuestsPerYacht} guests/yacht` },
                                            ].map((stat, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className={`material-icons text-${accent} text-lg md:text-xl mt-0.5`}>{stat.icon}</span>
                                                    <span className="text-sm md:text-base font-medium text-slate-700 leading-tight">{stat.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-end gap-3 pt-6 border-t border-slate-200">
                                        <span className="font-punchy text-4xl md:text-6xl italic text-slate-900 leading-none">€{pkg.price}</span>
                                        <span className="text-sm font-bold text-slate-500 font-space uppercase mb-2">/ person</span>
                                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full bg-${accent}/10 text-${accent === 'neon-aqua' ? 'blue-600' : 'pink-600'} border border-${accent}/20 font-space float-right ml-auto mb-2 tracking-wider`}>Half-board</span>
                                    </div>

                                    {/* Route stops */}
                                    <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm">
                                        <h4 className="text-[10px] font-bold uppercase text-slate-400 font-space tracking-widest mb-4">The Route</h4>
                                        <div className="flex justify-between items-center relative gap-1 md:gap-2 overflow-x-auto hide-scrollbar">
                                            {/* Connecting line */}
                                            <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-200 -z-0 hidden md:block" />

                                            {route.stopsByNights.map((stop, i) => (
                                                <div key={i} className="relative z-10 flex flex-col items-center gap-3 bg-white px-2">
                                                    <span className={`w-10 h-10 rounded-full bg-slate-50 border-[3px] border-${accent} flex items-center justify-center font-bold text-slate-800 text-sm shadow-sm`}>
                                                        {i + 1}
                                                    </span>
                                                    <div className="text-center">
                                                        <span className="block text-[11px] md:text-xs font-bold text-slate-800 uppercase tracking-tighter leading-none">{stop.name}</span>
                                                        <span className="block text-[10px] text-slate-500 font-space mt-1.5">{stop.nights}N</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Included highlights */}
                                    <div className="pt-2">
                                        <h4 className="text-[10px] font-bold uppercase text-slate-400 font-space tracking-widest mb-4 border-b border-slate-200 pb-2">Included</h4>
                                        <div className="space-y-3">
                                            {[
                                                'Breakfast + Lunch on board automatically included',
                                                'Professional Skipper + Hostess dedicated to your yacht',
                                                'All port fees, fuel fees, and local taxes handled',
                                                'Access to the massive 50-yacht social flotilla',
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className={`material-icons text-${accent} text-base mt-0.5`}>check_circle</span>
                                                    <span className="text-sm md:text-base text-slate-700 font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="pt-6">
                                        <Link
                                            to={`/routes/${slug}`}
                                            className={`inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-slate-900 border-2 border-slate-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-punchy uppercase tracking-widest text-base md:text-lg hover:bg-${accent} hover:border-${accent} hover:text-slate-900 hover:-translate-y-1 transition-all shadow-xl hover:shadow-${accent}/30`}
                                        >
                                            Explore Route
                                            <span className="material-icons text-base">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Image side */}
                                <div className="md:w-1/2 w-full order-1 md:order-none">
                                    <div className={`relative rounded-2xl md:rounded-[2.5rem] overflow-hidden aspect-[16/10] md:aspect-[4/5] shadow-2xl shadow-${accent}/20 group`}>
                                        <img
                                            src={heroImg}
                                            alt={`${pkg.nights} Night Route`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                        {/* Country badge */}
                                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                                            <span className="text-xl leading-none">🇬🇷</span>
                                            <span className="text-xs font-bold text-slate-900 uppercase font-space tracking-wider leading-none">Greece</span>
                                        </div>
                                        {/* Bottom overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <span className="font-punchy text-3xl md:text-5xl italic text-white drop-shadow-md">{route.stopsByNights.length} Islands</span>
                                                <span className="bg-white/20 backdrop-blur-md border border-white/40 text-white text-[10px] md:text-xs font-bold font-space uppercase px-3 md:px-4 py-1 md:py-1.5 rounded-full">{pkg.nights} Nights</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
               3) SOCIAL PROOF (Testimonials from HomePage)
            ═══════════════════════════════════════════════ */}
            <Testimonials />

            {/* ═══════════════════════════════════════════════
               4) FAQ TEASER ACCORDION (match HomePage layout)
            ═══════════════════════════════════════════════ */}
            <section className="px-4 md:px-6 py-14 md:py-32 bg-slate-50" id="faq-teaser">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-8 md:mb-12 text-slate-900">
                        YOU ASKED, <span className="text-neon-pink">WE ANSWERED</span>
                    </h2>

                    <div className="space-y-4 font-space">
                        {ROUTE_FAQS.map((item, i) => (
                            <div key={i} className="group">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full text-left p-6 glass-panel bg-white/60 border border-slate-200 rounded-2xl flex justify-between items-center focus:outline-none cursor-pointer hover:bg-white shadow-sm transition-all"
                                >
                                    <span className="font-punchy text-base md:text-lg uppercase text-slate-800 pr-6 ">{item.q}</span>
                                    <span className={`material-icons text-primary transition-transform shrink-0 text-xl ${openFaq === i ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </button>
                                <div className={`accordion-content ${openFaq === i ? 'open' : ''} bg-white rounded-b-2xl border border-t-0 border-slate-200 px-6 overflow-hidden -mt-2`}>
                                    <p className="py-6 text-slate-600 font-medium text-sm md:text-base leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/faq"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-neon-aqua text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-punchy uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-md font-bold"
                        >
                            Read All FAQs
                            <span className="material-icons text-xl">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>


            {/* ═══════════════════════════════════════════════
               6) FINAL CTA BAND
            ═══════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 relative overflow-hidden text-center border-t-8 border-neon-aqua">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,255,0.15)_0%,transparent_70%)]" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-punchy italic text-white mb-4 md:mb-6 uppercase tracking-tighter drop-shadow-lg leading-none">
                        READY TO <span className="text-neon-aqua">SAIL?</span>
                    </h2>
                    <p className="text-sm md:text-2xl text-white/80 font-medium mb-8 md:mb-12 max-w-2xl mx-auto drop-shadow leading-relaxed">
                        Choose your route, pick your dates, and secure your spot with a 33% booking payment today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            to="/routes/5-nights#booking"
                            className="w-full sm:w-auto bg-neon-aqua text-slate-900 px-12 py-5 rounded-2xl font-punchy uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-xl shadow-neon-aqua/20 font-bold"
                        >
                            5 Nights — €739
                        </Link>
                        <Link
                            to="/routes/7-nights#booking"
                            className="w-full sm:w-auto bg-neon-pink text-white px-12 py-5 rounded-2xl font-punchy uppercase tracking-widest text-lg hover:scale-105 transition-all shadow-xl shadow-neon-pink/20 font-bold"
                        >
                            7 Nights — €929
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-400 font-space uppercase">
                        <span className="flex items-center gap-1.5"><span className="material-icons text-slate-500 text-sm">lock</span> Secure payment via Stripe</span>
                        <span className="hidden sm:inline text-slate-600">•</span>
                        <span>{DATA.promotions.discountWindow.publicCopy}</span>
                    </div>
                </div>
            </section>



            <Footer />
        </div>
    )
}
