import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingProvider'
import { yachtsData, PACKAGES, hotDeals } from '../data/yachts'
import { HERO_IMAGES } from '../data/constants'
import HotRouteCards from '../components/booking/HotRouteCards'
import SEO from '../components/SEO'

export default function YachtsPage() {
    const { openBooking } = useBooking()

    return (
        <div className="bg-background-sand text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden font-body min-h-screen">
            <SEO
                title="Fleet | Greece Yacht Holiday for Groups & Friends"
                description="Browse our flotilla fleet for your next Greece yacht holiday. The perfect setup for a group yacht trip in Greece with friends or young adult travel groups."
                keywords="Greece yacht holiday, group yacht trip Greece, yacht vacation Greece for friends, young adult travel groups"
            />
            <Navbar />

            {/* ═══ HERO ═══ */}
            <section className="relative pt-40 md:pt-44 pb-16 md:pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Fleet" className="w-full h-full object-cover" src={HERO_IMAGES[1]} />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <span className="inline-block bg-neon-pink/10 text-neon-pink px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 font-space border border-neon-pink/20">
                        Epic Azimut Party Fleet
                    </span>
                    <h1 className="sr-only">The Ultimate Greece Yacht Holiday Fleet</h1>
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-punchy text-white mb-6 leading-[0.85] italic uppercase tracking-tighter">
                        THE <span className="text-neon-aqua">FLEET</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto font-medium mb-4 drop-shadow-md">
                        Browse our modern flotilla fleet. Whether you're organizing a group yacht trip in Greece or planning a yacht vacation in Greece for friends, we have the perfect boat for your crew.
                    </p>
                    <p className="hidden md:block text-sm md:text-base text-white/80 max-w-3xl mx-auto font-medium">
                        Only the boldest Azimut vessels, refitted in 2020 for the ultimate 50 yachts flotilla experience. Season starts 20 April with Monday, Wednesday, and Friday departures.
                    </p>
                </div>
            </section>

            {/* ═══ INCLUDED BADGES ═══ */}
            <section className="bg-white border-b border-slate-100 py-6 md:py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-space">
                        {[
                            { icon: 'restaurant', label: 'Breakfast Included', color: 'neon-aqua' },
                            { icon: 'dinner_dining', label: 'Lunch Included', color: 'neon-pink' },
                            { icon: 'event', label: 'Year: 2020', color: 'primary' },
                            { icon: 'verified_user', label: 'Free Safety Briefing', color: 'slate-900' },
                        ].map((b, i) => (
                            <div key={i} className="glass-panel px-4 md:px-6 py-2.5 md:py-3 rounded-full flex items-center gap-2 md:gap-3">
                                <span className={`material-icons text-${b.color} text-sm`}>{b.icon}</span>
                                <span className="font-bold text-[10px] md:text-xs uppercase tracking-widest">{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ YACHT CARDS ═══ */}
            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {yachtsData.map((yacht) => {
                        const isPopular = yacht.popular
                        return (
                            <div
                                key={yacht.slug}
                                className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 border ${isPopular
                                    ? 'border-neon-pink/30 border-2 shadow-xl shadow-neon-pink/10 md:scale-105 z-10'
                                    : 'border-slate-100 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {/* Image */}
                                <div className="h-56 md:h-72 overflow-hidden relative">
                                    <div className={`absolute top-4 left-4 z-10 ${yacht.badgeStyle} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                                        {yacht.badge}
                                    </div>
                                    <img alt={yacht.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={yacht.heroImage} />
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-4 md:mb-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-punchy italic uppercase">{yacht.name}</h3>
                                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest font-space">{yacht.specs[1].value} Cabins</p>
                                        </div>
                                        <div className="bg-neon-aqua/10 text-neon-aqua px-3 py-1 rounded-lg font-black text-xs italic">
                                            MAX 8 GUESTS
                                        </div>
                                    </div>

                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{yacht.tagline}</p>

                                    {/* Key specs */}
                                    <ul className="space-y-2 mb-6 text-slate-600 font-medium text-sm">
                                        {yacht.specs.slice(0, 3).map((s, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="material-icons text-neon-aqua text-sm">{s.icon}</span>
                                                {s.label}: {s.value}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Price + CTA */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <span className="text-xs text-slate-400 font-space uppercase">From</span>
                                            <span className="block text-2xl font-punchy font-bold italic">€{PACKAGES['5n'].price}<span className="text-sm text-slate-400 font-normal">/pp</span></span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/yachts/${yacht.slug}`}
                                        className={`block w-full py-4 font-punchy rounded-2xl transition-all uppercase tracking-widest text-center text-sm ${isPopular
                                            ? 'bg-neon-pink text-white hover:scale-105 shadow-lg shadow-neon-pink/20'
                                            : 'bg-slate-900 text-white hover:bg-neon-aqua hover:text-slate-900'
                                            }`}
                                    >
                                        View Yacht
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>




            {/* ─── HOT DEALS / ROUTE SELECTION ─────────────────────────── */}
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

            {/* WhatsApp FAB */}
            <a className="fixed bottom-8 right-8 z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all" href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <span className="material-icons text-3xl md:text-4xl">chat</span>
            </a>


        </div>
    )
}
