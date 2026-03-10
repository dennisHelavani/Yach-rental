import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import { useBooking } from '../context/BookingProvider'
import { getYachtBySlug, yachtsData, PACKAGES, getYachtCopy } from '../data/yachts'
import { HERO_IMAGES, WHOLE_YACHT_PACKAGES, WHOLE_CABIN_PACKAGES, WHOLE_YACHT_ALCOHOL_PRICE, ALCOHOL_PRICE_PER_PERSON } from '../data/constants'
import HotRouteCards from '../components/booking/HotRouteCards'

export default function YachtDetailPage() {
    const { slug } = useParams()
    const yacht = getYachtBySlug(slug)
    const { openBooking } = useBooking()
    const [heroIdx, setHeroIdx] = useState(0)

    if (!yacht) return (
        <div className="min-h-screen bg-background-light flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-5xl font-punchy italic uppercase mb-4">Yacht Not Found</h1>
                <Link to="/yachts" className="text-neon-pink font-bold underline">← Back to Fleet</Link>
            </div>
        </div>
    )

    const nameParts = yacht.name.split(' ')
    const nameBase = nameParts.slice(0, -1).join(' ')
    const nameNumber = nameParts[nameParts.length - 1]
    const copy = getYachtCopy(yacht)
    const images = yacht.galleryImages
    const otherYachts = yachtsData.filter(y => y.slug !== yacht.slug)

    return (
        <div className="min-h-screen bg-background-light text-slate-900 selection:bg-neon-pink selection:text-white">
            <Navbar />

            {/* ═══════════════════════════════════════════════════════════
                A) HERO — Full-bleed, matching RouteOverviewPage
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-slate-900">
                    {images.slice(0, 3).map((src, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 animate-fade-in-out"
                            style={{ animationDelay: `${i * 4}s`, opacity: i === 0 ? 1 : 0 }}
                        >
                            <img alt={`${yacht.name} ${i + 1}`} className="w-full h-full object-cover animate-ken-burns" src={src} />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background-light" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6 font-space">
                        <span className="w-2 h-2 bg-neon-aqua rounded-full" />
                        {yacht.badge} · Azimut Fleet · Greece
                    </div>

                    <h1 className="text-6xl md:text-9xl font-punchy text-white mb-6 leading-none italic drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-visible py-2">
                        {nameBase} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-aqua to-neon-pink inline-block pb-2">
                            {nameNumber}
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        {copy.headline}
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                B) PRODUCT CARD — Overlaps hero, same as Route Details card
            ═══════════════════════════════════════════════════════════ */}
            <section className="relative z-20 -mt-16 px-4 mb-12">
                <div className="mx-auto max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 md:p-8">
                        {/* Title row */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="font-punchy text-2xl md:text-3xl uppercase italic tracking-tighter">{yacht.name}</h2>
                                <div className="mt-1 flex items-center gap-3">
                                    <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-icons text-amber-400 text-xs">star</span>
                                            ))}
                                        </div>
                                        <span className="text-[11px] font-bold text-amber-800 font-space">4.9</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-space uppercase tracking-[0.15em]">Guest satisfaction · 200+ reviews</span>
                                </div>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-space hidden md:block">
                                    {copy.subhead}
                                </p>
                            </div>
                            <Link
                                to={`/routes?yacht=${yacht.slug}`}
                                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-neon-aqua hover:text-slate-900 transition-colors cursor-pointer font-space"
                            >
                                Book now from <span className="ml-2 text-neon-aqua font-punchy text-xl italic">€{PACKAGES['5n'].price}</span>
                            </Link>
                        </div>

                        {/* Stat pills — matching RouteOverviewPage */}
                        <div className="hidden sm:grid mt-6 grid-cols-3 gap-3 lg:grid-cols-6">
                            {yacht.specs.map((s) => (
                                <div key={s.label} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-center">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-space">
                                        <span className={`material-icons ${s.color ? `text-${s.color}` : 'text-neon-aqua'} text-xs mr-1 align-middle`}>{s.icon}</span>
                                    </div>
                                    <div className="mt-1 font-punchy font-bold text-sm uppercase">{s.value}</div>
                                    <div className="text-[9px] text-slate-400 font-space uppercase mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* Mobile stat list */}
                        <div className="sm:hidden mt-5 space-y-0 divide-y divide-slate-100">
                            {yacht.specs.map((s) => (
                                <div key={s.label} className="flex items-center gap-3 py-3">
                                    <span className={`material-icons ${s.color ? `text-${s.color}` : 'text-neon-aqua'} text-lg`}>{s.icon}</span>
                                    <span className="font-punchy font-bold text-sm uppercase">{s.label}: {s.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Compliance chips */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {['Max 8 guests', '18+ only', 'Half-board', 'No BYO alcohol'].map((label) => (
                                <span key={label} className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    <span className="material-icons text-neon-aqua text-xs">check_circle</span>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                C) GALLERY + BOOKING OPTIONS — Side by side
            ═══════════════════════════════════════════════════════════ */}
            <section className="px-4 mb-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Left: Gallery */}
                        <div className="lg:w-3/5">
                            {/* Main image */}
                            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-xl mb-3">
                                <img
                                    alt={yacht.name}
                                    className="w-full h-full object-cover transition-all duration-500"
                                    src={images[heroIdx] || yacht.heroImage}
                                />
                                {images.length > 1 && (
                                    <>
                                        <button onClick={() => setHeroIdx((heroIdx - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer">
                                            <span className="material-icons text-sm">arrow_back_ios_new</span>
                                        </button>
                                        <button onClick={() => setHeroIdx((heroIdx + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all cursor-pointer">
                                            <span className="material-icons text-sm">arrow_forward_ios</span>
                                        </button>
                                    </>
                                )}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {images.slice(0, 6).map((_, i) => (
                                        <button key={i} onClick={() => setHeroIdx(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${heroIdx === i ? 'bg-neon-aqua w-5' : 'bg-white/40'}`} />
                                    ))}
                                </div>
                            </div>
                            {/* Thumbnails */}
                            <div className="grid grid-cols-5 gap-2">
                                {images.slice(0, 5).map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setHeroIdx(i)}
                                        className={`rounded-xl overflow-hidden aspect-[4/3] cursor-pointer transition-all ${heroIdx === i ? 'ring-2 ring-neon-aqua ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                                    >
                                        <img alt={`${yacht.name} ${i + 1}`} className="w-full h-full object-cover" src={img} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Booking options */}
                        <div className="lg:w-2/5 space-y-4">
                            {/* Book a Spot */}
                            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-neon-aqua/10 flex items-center justify-center">
                                        <span className="material-icons text-neon-aqua">person</span>
                                    </div>
                                    <div>
                                        <h3 className="font-punchy text-lg italic uppercase">Book a Spot</h3>
                                        <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.2em]">Per-person · shared cabin</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {Object.values(PACKAGES).map((p) => (
                                        <div key={p.id} className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-between">
                                            <div>
                                                <div className="font-punchy font-bold text-sm uppercase">{p.nights} Nights</div>
                                                <div className="text-[10px] text-slate-400 font-space">{p.route}</div>
                                            </div>
                                            <span className={`font-punchy font-bold italic text-xl ${p.id === '5n' ? 'text-neon-aqua' : 'text-neon-pink'}`}>€{p.price}<span className="text-xs text-slate-400 font-normal">/pp</span></span>
                                        </div>
                                    ))}
                                </div>

                                <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-3 mb-4">
                                    <p className="text-[10px] text-amber-800 font-bold flex items-center gap-2 font-space uppercase tracking-widest">
                                        <span className="material-icons text-amber-500 text-sm">savings</span>
                                        Pay 33% to book
                                    </p>
                                </div>

                                <Link
                                    to={`/routes?yacht=${yacht.slug}`}
                                    className="block w-full rounded-2xl bg-slate-900 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white text-center hover:bg-neon-aqua hover:text-slate-900 transition-colors font-space"
                                >
                                    Book a Spot on a Route →
                                </Link>
                            </div>

                            {/* Book Whole Cabin */}
                            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-neon-pink/20 p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                                        <span className="material-icons text-neon-pink">king_bed</span>
                                    </div>
                                    <div>
                                        <h3 className="font-punchy text-lg italic uppercase">Book Whole Cabin</h3>
                                        <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.2em]">Private cabin · no cabin-sharing</p>
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-4">
                                    {['Your cabin, your privacy', 'No sharing with strangers', 'Both beds are yours'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-space">
                                            <span className="material-icons text-neon-pink text-sm">check_circle</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-2 mb-4">
                                    {Object.values(WHOLE_CABIN_PACKAGES).map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => openBooking({ action: 'book-whole-cabin', entityType: 'yacht', entityId: yacht.slug, source: 'yacht-detail-cabin', packageId: p.id })}
                                            className="w-full rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-between hover:border-neon-pink/30 hover:bg-neon-pink/5 transition-all cursor-pointer"
                                        >
                                            <div>
                                                <div className="font-punchy font-bold text-sm uppercase">{p.nights} Nights</div>
                                                <div className="text-[10px] text-slate-400 font-space">{p.route}</div>
                                            </div>
                                            <span className="font-punchy font-bold italic text-xl text-neon-pink">€{p.price}<span className="text-xs text-slate-400 font-normal">/cabin</span></span>
                                        </button>
                                    ))}
                                </div>

                                <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-xl p-3 mb-4">
                                    <p className="text-[10px] text-neon-pink font-bold flex items-center gap-2 font-space">
                                        <span className="material-icons text-neon-pink text-sm">local_bar</span>
                                        🍹 Unlimited alcohol only €{WHOLE_YACHT_ALCOHOL_PRICE}/pp (save €{ALCOHOL_PRICE_PER_PERSON - WHOLE_YACHT_ALCOHOL_PRICE}!)
                                    </p>
                                </div>

                                <button
                                    onClick={() => openBooking({ action: 'book-whole-cabin', entityType: 'yacht', entityId: yacht.slug, source: 'yacht-detail-cabin' })}
                                    className="block w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center bg-neon-pink text-white hover:bg-neon-pink/90 transition-all cursor-pointer font-space"
                                >
                                    Book Whole Cabin →
                                </button>
                            </div>

                            {/* Book Whole Yacht */}
                            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-amber-200 p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                        <span className="material-icons text-amber-600">directions_boat</span>
                                    </div>
                                    <div>
                                        <h3 className="font-punchy text-lg italic uppercase">Book Whole Yacht</h3>
                                        <p className="text-[10px] text-slate-400 font-space uppercase tracking-[0.2em]">Private charter · your group</p>
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-4">
                                    {['Your group, your yacht', 'All cabins reserved for you', 'Same fixed Cyclades routes'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-space">
                                            <span className="material-icons text-amber-500 text-sm">check_circle</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-2 mb-4">
                                    {Object.values(WHOLE_YACHT_PACKAGES).map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => openBooking({ action: 'book-whole-yacht', entityType: 'yacht', entityId: yacht.slug, source: 'yacht-detail-whole', packageId: p.id })}
                                            className="w-full rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-between hover:border-amber-300 hover:bg-amber-50 transition-all cursor-pointer"
                                        >
                                            <div>
                                                <div className="font-punchy font-bold text-sm uppercase">{p.nights} Nights</div>
                                                <div className="text-[10px] text-slate-400 font-space">{p.route}</div>
                                            </div>
                                            <span className="font-punchy font-bold italic text-xl text-amber-600">€{p.price}<span className="text-xs text-slate-400 font-normal">/yacht</span></span>
                                        </button>
                                    ))}
                                </div>

                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                                    <p className="text-[10px] text-amber-800 font-bold flex items-center gap-2 font-space">
                                        <span className="material-icons text-amber-500 text-sm">local_bar</span>
                                        🍹 Unlimited alcohol only €{WHOLE_YACHT_ALCOHOL_PRICE}/pp (save €{ALCOHOL_PRICE_PER_PERSON - WHOLE_YACHT_ALCOHOL_PRICE}!)
                                    </p>
                                </div>

                                <button
                                    onClick={() => openBooking({ action: 'book-whole-yacht', entityType: 'yacht', entityId: yacht.slug, source: 'yacht-detail-whole' })}
                                    className="block w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center bg-amber-500 text-white hover:bg-amber-600 transition-all cursor-pointer font-space"
                                >
                                    Book Whole Yacht →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Why this yacht — below gallery */}
                    {copy.whyBullets?.length > 0 && (
                        <div className="mt-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
                            <h3 className="font-punchy text-xl md:text-2xl italic uppercase tracking-tighter mb-4">Why {yacht.name}?</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {copy.whyBullets.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-space">
                                        <span className="material-icons text-neon-aqua text-sm mt-0.5">check_circle</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            {copy.vibeLine && (
                                <p className="mt-4 text-[11px] text-slate-400 font-space italic">*{copy.vibeLine}</p>
                            )}
                        </div>
                    )}
                </div>
            </section>



            {/* ═══════════════════════════════════════════════════════════
                E) CAPTAIN'S FEW WORDS
            ═══════════════════════════════════════════════════════════ */}
            <section className="px-4 pb-12">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 flex flex-col md:flex-row">
                        <div className="h-64 md:h-auto md:w-2/5 relative">
                            <img alt="Your Captain" className="w-full h-full object-cover" src={HERO_IMAGES[0]} />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent" />
                            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] font-space">
                                    <span className="material-icons text-neon-aqua text-xs">anchor</span>
                                    Your Captain
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-neon-pink via-[#9333ea] to-[#4f46e5] p-8 md:p-10 md:w-3/5 flex flex-col justify-center relative">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-icons text-neon-aqua text-sm">star</span>
                                ))}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-punchy text-white italic mb-6 leading-tight uppercase">
                                "MY JOB IS TO GET YOU TO THE BEST SPOTS — YOU FOCUS ON HAVING THE BEST WEEK."
                            </h3>
                            <p className="text-white/70 text-sm font-space leading-relaxed mb-6">
                                Every trip is different because every crew is different. The hidden coves, the sunsets in Santorini, the party nights in Mykonos — I've done it hundreds of times and it never gets old. See you on board.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full border-2 border-neon-aqua p-0.5 bg-white/20">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-punchy text-slate-900 text-sm">⚓</div>
                                </div>
                                <div>
                                    <h5 className="text-white font-punchy text-base italic uppercase">Captain Nikos</h5>
                                    <p className="text-neon-aqua text-[10px] font-bold uppercase tracking-widest font-space">10+ years · Cyclades specialist</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                F) TESTIMONIALS — Reused homepage component
            ═══════════════════════════════════════════════════════════ */}
            <Testimonials />

            {/* ═══════════════════════════════════════════════════════════
                G) EXPLORE THE FLEET — Other yachts
            ═══════════════════════════════════════════════════════════ */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase tracking-tighter leading-[0.9] text-center mb-10">
                        Explore the <span className="text-neon-aqua">Fleet</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherYachts.map((oy) => (
                            <Link key={oy.slug} to={`/yachts/${oy.slug}`} className="group bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl hover:border-neon-aqua/30 transition-all">
                                <div className="h-52 sm:h-auto sm:w-2/5 overflow-hidden">
                                    <img alt={oy.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={oy.heroImage} />
                                </div>
                                <div className="p-5 sm:w-3/5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-punchy text-xl md:text-2xl italic uppercase tracking-tighter">{oy.name}</h3>
                                            <span className={`${oy.badgeStyle} px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest`}>{oy.badge}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className="material-icons text-amber-400 text-[10px]">star</span>
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-amber-700 font-bold font-space">4.9</span>
                                        </div>
                                        <ul className="space-y-1.5 mb-4">
                                            {oy.specs.slice(0, 3).map((s, i) => (
                                                <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-space">
                                                    <span className="material-icons text-neon-aqua text-xs">{s.icon}</span>
                                                    {s.label}: {s.value}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-punchy font-bold italic text-lg">€{PACKAGES['5n'].price}<span className="text-xs text-slate-400 font-normal">/pp</span></span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-neon-aqua font-space group-hover:translate-x-1 transition-transform">View →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                H) FAQ — Reused homepage component
            ═══════════════════════════════════════════════════════════ */}
            <FAQ />

            {/* ═══════════════════════════════════════════════════════════
                H) HOT DEALS
            ═══════════════════════════════════════════════════════════ */}
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

            {/* ═══════════════════════════════════════════════════════════
                MOBILE STICKY BOOKING BAR
            ═══════════════════════════════════════════════════════════ */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center justify-between gap-3">
                <div>
                    <span className="text-[10px] text-slate-400 font-space uppercase tracking-[0.2em]">From</span>
                    <span className="block text-xl font-punchy font-bold italic">€{PACKAGES['5n'].price}<span className="text-xs text-slate-400 font-normal">/pp</span></span>
                </div>
                <Link
                    to={`/routes?yacht=${yacht.slug}`}
                    className="rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-neon-aqua hover:text-slate-900 transition-colors font-space"
                >
                    Book a Spot →
                </Link>
            </div>

            <Footer />

            {/* WhatsApp FAB */}
            <a className="fixed bottom-20 lg:bottom-8 right-6 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all" href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <span className="material-icons text-3xl">chat</span>
            </a>
        </div>
    )
}
