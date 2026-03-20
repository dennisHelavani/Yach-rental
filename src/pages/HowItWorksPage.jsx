import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingProvider'
import { HERO_IMAGES } from '../data/constants'
import HotRouteCards from '../components/booking/HotRouteCards'
import Testimonials from '../components/Testimonials'
import PaymentPolicyCard from '../components/PaymentPolicyCard'
import SEO from '../components/SEO'

const faqItems = [
    { q: 'What if I need to cancel?', a: 'Cancellation and refund terms to be confirmed. Please check back soon or contact us for the latest policy.', color: 'neon-pink' },
    { q: 'What are the itineraries?', a: '5 Nights: Mykonos (2 nights) → Milos (1 night) → Santorini (2 nights). 7 Nights: Mykonos (2) → Ios (2) → Santorini (2) → Milos (1). Itineraries are fixed — no custom routing.', color: 'neon-aqua' },
    { q: 'Should I book a cabin (spot) or a full yacht?', a: 'For groups of 6+, a full yacht is usually better value — lower per-person cost and guaranteed togetherness. Cabin bookings are ideal if you want to meet new people. You\'ll be grouped with like-minded travelers and don\'t need to coordinate a full crew. If friends book separately, just reference each other\'s reservation numbers and we\'ll place you together.', color: 'primary' },
    { q: 'When are payments due?', a: 'Your booking payment is 33% of the total, followed by 33% and 34% in weekly installments. Final payment must be at least 7 days before departure. Bookings within 14 days require full payment. Book before June 15 for a 10% discount on your first payment, or up to 19% off with full payment!', color: 'neon-pink' },
    { q: 'Is there an age limit?', a: 'Yes. All guests must be between 18 and 45 years old. Our trips are designed as high-energy, social experiences for this demographic. If we discover guests outside this range, we reserve the right to cancel without refund.', color: 'neon-aqua' },
    { q: 'What does the wristband cover?', a: 'Your wristband is included in the booking price. It identifies you as a SALTIE CRUISES guest and grants you entry to selected partner events, beach clubs, and exclusive discounts on extra activities and excursions throughout the week.', color: 'primary' },
    { q: 'What type of yachts do you use?', a: 'Our fleet consists entirely of premium Azimut models refitted in 2020: the Azimut 58, Azimut 66, and Azimut 70. We don\'t do "budget" boats — every vessel in the flotilla is built for an incredible social sailing experience.', color: 'neon-pink' },
]

const comparisonRows = [
    { feature: 'Route planning', us: 'Fixed itineraries, curated by locals', diy: 'Hours of research per island' },
    { feature: 'Yacht & crew', us: 'Premium Azimut + skipper & hostess included', diy: 'Find, vet, and negotiate charters yourself' },
    { feature: 'Meals', us: 'Half-board (breakfast + lunch on board)', diy: 'Cook or eat out every meal' },
    { feature: 'Social scene', us: '~50 yachts sailing together — instant community', diy: 'Just your group, no flotilla vibe' },
    { feature: 'Port fees & fuel', us: 'All included in the price', diy: 'Hidden costs add up fast' },
    { feature: 'Island activities', us: 'Crew recommendations + partner discounts', diy: 'Figure it out on arrival' },
    { feature: 'Safety', us: 'Licensed captain, EU certified, 24/7 ground ops', diy: 'You handle emergencies' },
    { feature: 'Price transparency', us: 'One price. No surprises.', diy: 'Fuel surcharges, cleaning fees, deposits…' },
]

export default function HowItWorksPage() {
    const { openBooking } = useBooking()
    const [openFaq, setOpenFaq] = useState(null)

    return (
        <div className="bg-background-sand text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden">
            <SEO
                title="How to Book a Party Yacht in Greece | Itinerary & Info"
                description="Planning a Greek social sailing holiday? Learn how our simple booking process gets you from AU/NZ/UK to the ultimate Greece party cruise."
                keywords="how to book a party yacht in Greece, planning a Greek social sailing holiday, Greece party cruise guide"
            />
            <Navbar />

            {/* ═══════════════════════════════════════════
               1) HERO
            ═══════════════════════════════════════════ */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Greek island sailing" className="w-full h-full object-cover" src={HERO_IMAGES[0]} />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center px-6 pt-20">
                    <h1 className="sr-only">How to Book a Party Yacht in Greece</h1>
                    <h2 className="text-6xl md:text-9xl font-punchy text-white mb-6 leading-[0.9] italic drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                        HOW IT <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-aqua to-neon-pink">WORKS</span>
                    </h2>
                    <p className="text-white/80 text-lg md:text-2xl font-space max-w-2xl mx-auto mt-6">
                        Three simple steps to your dream Greek island adventure
                    </p>
                    <div className="mt-8 md:mt-12 w-full flex overflow-x-auto gap-3 md:gap-5 hide-scrollbar pb-4 snap-x px-4 justify-start md:justify-center">
                        <span className="snap-center flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold text-white uppercase font-space">🎉 Party</span>
                        <span className="snap-center flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold text-white uppercase font-space">🌊 Chill</span>
                        <span className="snap-center flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold text-white uppercase font-space">🤝 Social</span>
                        <span className="snap-center flex-shrink-0 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold text-white uppercase font-space">⛵ Adventure</span>
                    </div>
                </div>
                <div className="absolute bottom-0 w-full bg-neon-pink py-2 overflow-hidden whitespace-nowrap">
                    <div className="flex animate-marquee gap-12 text-white font-punchy uppercase italic text-[10px] tracking-widest">
                        <span>~50 Yachts Together • Greek Islands • Mon Wed Fri Departures • From €739 pp • ~50 Yachts Together • Greek Islands • Mon Wed Fri Departures • From €739 pp</span>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               2) STEP 1 — CHOOSE YOUR TOUR
            ═══════════════════════════════════════════ */}
            <section className="py-14 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="text-[18rem] font-punchy text-outline-neon text-neon-aqua absolute -top-28 -left-8 opacity-15 select-none pointer-events-none leading-none hidden lg:block">01</div>
                            <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl md:rotate-2 relative z-10">
                                <img alt="Greek islands route" className="w-full aspect-[16/10] md:aspect-[4/5] object-cover" src="img/gal46.webp" />
                            </div>
                        </div>
                        {/* Text */}
                        <div className="relative z-10">
                            <h4 className="text-neon-aqua font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm font-space mb-3 md:mb-4">Step One</h4>
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-punchy italic uppercase leading-[0.9] mb-5 md:mb-8">
                                CHOOSE YOUR <span className="text-primary">TOUR</span>
                            </h2>
                            <p className="text-slate-500 text-base md:text-lg lg:text-xl leading-relaxed font-medium font-space mb-6 md:mb-8">
                                Pick between our 5-night or 7-night Cyclades itinerary. Both routes include island-hopping through Mykonos, Santorini, and Milos — the 7-night adds Ios for extra party energy. Fixed routes, zero planning needed.
                            </p>
                            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h5 className="font-punchy text-xl uppercase italic mb-1">5 Nights</h5>
                                    <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.15em]">Mykonos → Milos → Santorini</p>
                                    <p className="font-punchy text-2xl text-neon-aqua mt-2">€739<span className="text-sm text-slate-400 ml-1">/pp</span></p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                    <h5 className="font-punchy text-xl uppercase italic mb-1">7 Nights</h5>
                                    <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.15em]">Mykonos → Ios → Santorini → Milos</p>
                                    <p className="font-punchy text-2xl text-neon-pink mt-2">€929<span className="text-sm text-slate-400 ml-1">/pp</span></p>
                                </div>
                            </div>
                            <Link to="/routes" className="w-full md:w-auto text-center inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-punchy uppercase tracking-widest text-sm hover:bg-neon-aqua hover:text-slate-900 transition-colors">
                                Explore Routes <span className="material-icons text-lg">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               3) STEP 2 — CHOOSE YOUR YACHT
            ═══════════════════════════════════════════ */}
            <section className="py-14 md:py-32 bg-background-sand">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        {/* Text (below image on mobile, left on desktop) */}
                        <div className="relative z-10 order-2 lg:order-1">
                            <h4 className="text-neon-pink font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm font-space mb-3 md:mb-4">Step Two</h4>
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-punchy italic uppercase leading-[0.9] mb-5 md:mb-8">
                                PICK YOUR <span className="text-neon-pink">YACHT</span>
                            </h2>
                            <p className="text-slate-500 text-base md:text-lg lg:text-xl leading-relaxed font-medium font-space mb-6 md:mb-8">
                                Our fleet is 100% premium Azimut models — no budget boats. Choose the size that fits your crew. Every yacht comes with a professional skipper, hostess, and everything you need for an unforgettable week.
                            </p>
                            <div className="space-y-3 mb-6 md:mb-8">
                                {[
                                    { name: 'Azimut 58', guests: '6 guests', desc: 'Compact & fast — perfect for tight squads' },
                                    { name: 'Azimut 66', guests: '8 guests', desc: 'The crowd favourite — best balance of space & vibe' },
                                    { name: 'Azimut 70', guests: '8 guests', desc: 'Flagship — biggest deck, maximum energy' },
                                ].map((y) => (
                                    <div key={y.name} className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-100">
                                        <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center flex-shrink-0">
                                            <span className="material-icons text-neon-pink">sailing</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-punchy font-bold uppercase text-sm">{y.name}</span>
                                            <span className="text-[10px] text-slate-400 font-space ml-2">· {y.guests}</span>
                                            <p className="text-xs text-slate-500 font-space">{y.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/yachts" className="w-full md:w-auto text-center inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-punchy uppercase tracking-widest text-sm hover:bg-neon-pink transition-colors">
                                View Fleet <span className="material-icons text-lg">arrow_forward</span>
                            </Link>
                        </div>
                        {/* Image (right on desktop) */}
                        <div className="relative order-1 lg:order-2">
                            <div className="text-[18rem] font-punchy text-outline-neon text-neon-pink absolute -top-28 -right-8 opacity-15 select-none pointer-events-none leading-none hidden lg:block">02</div>
                            <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl md:-rotate-2 relative z-10">
                                <img alt="Azimut yacht fleet" className="w-full aspect-[16/10] md:aspect-[4/5] object-cover" src="img/gal15.webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               4) STEP 3 — PAYMENT
            ═══════════════════════════════════════════ */}
            <section className="py-14 md:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="text-[18rem] font-punchy text-outline-neon text-primary absolute -top-28 -left-8 opacity-15 select-none pointer-events-none leading-none hidden lg:block">03</div>
                            <div className="rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl md:rotate-1 relative z-10">
                                <img alt="Secure payment" className="w-full aspect-[16/10] md:aspect-[4/5] object-cover" src="img/gal13.webp" />
                            </div>
                        </div>
                        {/* Text */}
                        <div className="relative z-10">
                            <h4 className="text-primary font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-xs md:text-sm font-space mb-3 md:mb-4">Step Three</h4>
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-punchy italic uppercase leading-[0.9] mb-5 md:mb-8">
                                SECURE YOUR <span className="text-primary">SPOT</span>
                            </h2>
                            <p className="text-slate-500 text-base md:text-lg lg:text-xl leading-relaxed font-medium font-space mb-6 md:mb-8">
                                Flexible payment options that work for you. Lock in your adventure with a 33% booking payment or save big with an early-booking discount.
                            </p>
                            <div className="space-y-4 mb-8">
                                {/* Booking payment option */}
                                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-neon-aqua/10 flex items-center justify-center flex-shrink-0">
                                            <span className="material-icons text-neon-aqua text-xl">lock</span>
                                        </div>
                                        <div>
                                            <h5 className="font-punchy text-lg uppercase italic">33% Booking Payment</h5>
                                            <p className="text-sm text-slate-500 font-space mt-1">Reserve your spot today with 33% upfront. Pay the rest in weekly installments — final payment at least 7 days before departure.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Full payment option */}
                                <div className="bg-gradient-to-r from-neon-aqua/5 to-neon-pink/5 rounded-2xl p-4 md:p-6 border-2 border-neon-aqua/20">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-neon-pink/10 flex items-center justify-center flex-shrink-0">
                                            <span className="material-icons text-neon-pink text-xl">savings</span>
                                        </div>
                                        <div>
                                            <h5 className="font-punchy text-lg uppercase italic">Pay in Full — Save 10%</h5>
                                            <p className="text-sm text-slate-500 font-space mt-1">Pay the full amount before June 14 and get up to 19% off your entire booking including add-ons.</p>
                                            <span className="inline-block mt-2 bg-neon-pink/10 text-neon-pink text-[10px] font-bold px-3 py-1 rounded-full font-space uppercase">Best Value</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Stripe */}
                                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                                            <span className="material-icons text-slate-600 text-xl">credit_card</span>
                                        </div>
                                        <div>
                                            <h5 className="font-punchy text-lg uppercase italic">Secure Checkout</h5>
                                            <p className="text-sm text-slate-500 font-space mt-1">All payments processed via Stripe — bank-grade encryption, instant confirmation, and full buyer protection.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               PRICING & PAYMENT POLICY
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <PaymentPolicyCard />
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               5) CTA BAND
            ═══════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img alt="CTA background" className="w-full h-full object-cover" src={HERO_IMAGES[3]} />
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-8xl font-punchy italic uppercase leading-[0.9] text-white mb-6">
                        READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-aqua to-neon-pink">SAIL?</span>
                    </h2>
                    <p className="text-white/70 text-lg font-space mb-10 max-w-xl mx-auto">
                        Pick your route, choose your yacht, and join 50 boats for the adventure of a lifetime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => openBooking({ action: 'BOOK_TOUR', source: 'how-cta', packageId: '5n' })}
                            className="w-full sm:w-auto bg-neon-aqua text-slate-900 px-10 py-4 rounded-2xl font-punchy uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg font-bold cursor-pointer"
                        >
                            Book 5 Nights — €739
                        </button>
                        <button
                            onClick={() => openBooking({ action: 'BOOK_TOUR', source: 'how-cta', packageId: '7n' })}
                            className="w-full sm:w-auto bg-neon-pink text-white px-10 py-4 rounded-2xl font-punchy uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg font-bold cursor-pointer"
                        >
                            Book 7 Nights — €929
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               6) COMPARISON TABLE — Us vs DIY
            ═══════════════════════════════════════════ */}
            <section className="py-20 md:py-28 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 font-space">Why us?</span>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-punchy italic uppercase leading-none tracking-tighter mt-3 text-slate-900">
                            SALTIE CRUISES <span className="text-neon-aqua">vs</span> DIY
                        </h2>
                        <p className="mt-4 text-slate-500 font-space text-lg">See what you get when everything's taken care of.</p>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-slate-900 text-white">
                            <div className="p-5 font-space text-xs font-bold uppercase tracking-widest text-slate-400">Feature</div>
                            <div className="p-5 text-center">
                                <span className="font-punchy text-lg italic uppercase text-neon-aqua">SALTIE CRUISES</span>
                            </div>
                            <div className="p-5 text-center">
                                <span className="font-punchy text-lg italic uppercase text-slate-400">Plan It Yourself</span>
                            </div>
                        </div>
                        {/* Rows */}
                        {comparisonRows.map((row, i) => (
                            <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0`}>
                                <div className="p-5 font-punchy font-bold uppercase text-sm flex items-center">{row.feature}</div>
                                <div className="p-5 text-center flex items-center justify-center gap-2">
                                    <span className="material-icons text-neon-aqua text-sm">check_circle</span>
                                    <span className="text-sm text-slate-600 font-space">{row.us}</span>
                                </div>
                                <div className="p-5 text-center flex items-center justify-center gap-2">
                                    <span className="material-icons text-red-400 text-sm">cancel</span>
                                    <span className="text-sm text-slate-400 font-space">{row.diy}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-4">
                        {comparisonRows.map((row, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
                                <h4 className="font-punchy font-bold uppercase text-sm mb-3">{row.feature}</h4>
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="material-icons text-neon-aqua text-sm mt-0.5">check_circle</span>
                                    <span className="text-sm text-slate-600 font-space">{row.us}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="material-icons text-red-400 text-sm mt-0.5">cancel</span>
                                    <span className="text-sm text-slate-400 font-space">{row.diy}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               7) TESTIMONIALS
            ═══════════════════════════════════════════ */}
            <Testimonials />

            {/* ═══════════════════════════════════════════
               8) FAQ
            ═══════════════════════════════════════════ */}
            <section className="py-20 px-4 bg-background-light" id="faq">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-slate-900">
                        THE <span className="text-neon-pink">INTEL</span>
                    </h2>
                    <div className="space-y-4 font-space">
                        {faqItems.map((item, i) => (
                            <div key={i} className="accordion-item group">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className={`w-full text-left p-5 glass-panel rounded-2xl flex justify-between items-center hover:border-${item.color} transition-colors focus:outline-none cursor-pointer`}
                                >
                                    <span className="font-punchy text-md md:text-lg uppercase text-slate-800">{item.q}</span>
                                    <span className={`material-icons text-${item.color} transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                                </button>
                                <div className={`accordion-content ${openFaq === i ? 'open' : ''} bg-white/50 rounded-b-2xl px-6`}>
                                    <p className="py-5 text-slate-600 font-medium text-sm md:text-base">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
               9) HOT DEALS
            ═══════════════════════════════════════════ */}
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
