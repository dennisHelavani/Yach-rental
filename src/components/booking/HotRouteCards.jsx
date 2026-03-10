import { Link } from 'react-router-dom'
import { useRef } from 'react'
import DATA from '../../data/yachtDaysGreece.json'
import { WHOLE_YACHT_PACKAGES, WHOLE_CABIN_PACKAGES, WHOLE_YACHT_ALCOHOL_PRICE, ALCOHOL_PRICE_PER_PERSON } from '../../data/constants'
import { useBooking } from '../../context/BookingProvider'

const { routes, packages } = DATA

const routeCardsData = [
    {
        route: routes.find(r => r.id === 'route_greece_5n'),
        pkg: packages[0],
        slug: '5-nights',
        title: 'THE QUICK FIX',
        accent: 'neon-aqua',
        img: '/img/gal40.webp',
    },
    {
        route: routes.find(r => r.id === 'route_greece_7n'),
        pkg: packages[1],
        slug: '7-nights',
        title: 'THE FULL SEND',
        accent: 'neon-pink',
        img: '/img/gal21.webp',
    },
]

export default function HotRouteCards() {
    const scrollRef = useRef(null)
    const { openBooking } = useBooking()

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    return (
        <div className="relative max-w-5xl mx-auto">
            {/* Swipe Arrow - Only visible on mobile */}
            <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2 pointer-events-none">
                <button
                    onClick={scrollRight}
                    className="bg-white/90 backdrop-blur-md w-12 h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] pointer-events-auto text-primary flex items-center justify-center animate-pulse border border-slate-100/50 hover:bg-white transition-colors"
                >
                    <span className="material-icons ml-1">arrow_forward_ios</span>
                </button>
            </div>

            <div ref={scrollRef} className="flex md:grid md:grid-cols-2 gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-auto md:px-0">
                {routeCardsData.map((card) => {
                    const { route, pkg, title, img, slug, accent } = card

                    return (
                        <div key={slug} className="snap-center shrink-0 w-[75vw] md:w-auto bg-white group shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all flex flex-col p-4 md:p-5 rounded-3xl md:rounded-none">
                            {/* Image Header */}
                            <div className="relative h-64 md:h-72 overflow-hidden mb-6">
                                <img
                                    src={img}
                                    alt={title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Country Badge */}

                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-punchy text-4xl md:text-[2.75rem] uppercase tracking-tighter text-[#1c1c1c] mb-6 leading-none">
                                    {title}
                                </h3>

                                {/* Stats Pills */}
                                <div className="flex flex-wrap gap-x-2 gap-y-3 mb-8">
                                    {[
                                        { icon: 'dark_mode', label: `${pkg.nights} Nights` },
                                        { icon: 'groups', label: '1 - 8 People' },
                                        { icon: 'calendar_month', label: 'Mon, Wed, Fri' },

                                        { icon: '18_up_rating', label: '18 - 45 Age Range' },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest font-space border border-slate-200">
                                            <span className={`material-icons text-sm text-neon-aqua`}>{stat.icon}</span>
                                            {stat.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Button CTA */}
                                <div className="mt-auto">
                                    <Link
                                        to={`/routes/${slug}`}
                                        className="w-full bg-slate-900 text-white flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-neon-aqua hover:text-slate-900 transition-colors shadow-lg group/btn"
                                    >
                                        <span className="font-punchy text-lg md:text-xl uppercase tracking-widest">
                                            Book Now From
                                        </span>
                                        <div className="flex items-center">
                                            <span className="w-[1px] h-8 bg-white/20 group-hover/btn:bg-slate-900/20 mx-5 transition-colors"></span>
                                            <span className={`font-punchy text-3xl md:text-4xl italic text-${accent} group-hover/btn:text-slate-900 leading-none tracking-tighter transition-colors`}>
                                                €{pkg.price}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* Whole Cabin Cards */}
                {Object.values(WHOLE_CABIN_PACKAGES).map((wp) => (
                    <div key={`whole-${wp.id}`} className="snap-center shrink-0 w-[75vw] md:w-auto bg-white group shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all flex flex-col p-4 md:p-5 rounded-3xl md:rounded-none border-2 border-amber-200">
                        {/* Image Header */}
                        <div className="relative h-64 md:h-72 overflow-hidden mb-6">
                            <img
                                src={wp.nights === 5 ? '/img/gal41.webp' : '/img/gal13.webp'}
                                alt={`Whole Yacht ${wp.nights}N`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase font-space tracking-widest">
                                🛏️ Whole Cabin
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                            <h3 className="font-punchy text-4xl md:text-[2.75rem] uppercase tracking-tighter text-[#1c1c1c] mb-3 leading-none">
                                {wp.nights}N WHOLE CABIN
                            </h3>

                            {/* Stats Pills */}
                            <div className="flex flex-wrap gap-x-2 gap-y-3 mb-4">
                                {[
                                    { icon: 'dark_mode', label: `${wp.nights} Nights` },
                                    { icon: 'directions_boat', label: 'Whole Cabin' },
                                    { icon: 'calendar_month', label: 'Mon, Wed, Fri' },
                                    { icon: 'local_bar', label: `Alcohol €${WHOLE_YACHT_ALCOHOL_PRICE}/pp` },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest font-space border border-amber-200">
                                        <span className="material-icons text-sm text-amber-500">{stat.icon}</span>
                                        {stat.label}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 mb-4">
                                <p className="text-[10px] text-amber-800 font-bold flex items-center gap-1 font-space">
                                    <span className="material-icons text-amber-500 text-xs">savings</span>
                                    Alcohol €{WHOLE_YACHT_ALCOHOL_PRICE}/pp instead of €{ALCOHOL_PRICE_PER_PERSON} — Save €{ALCOHOL_PRICE_PER_PERSON - WHOLE_YACHT_ALCOHOL_PRICE}!
                                </p>
                            </div>

                            {/* Button CTA */}
                            <div className="mt-auto">
                                <button
                                    onClick={() => openBooking({ action: 'book-whole-cabin', source: 'hot-route-card-cabin', packageId: wp.id })}
                                    className="w-full bg-amber-500 text-white flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-amber-600 transition-colors shadow-lg group/btn cursor-pointer"
                                >
                                    <span className="font-punchy text-lg md:text-xl uppercase tracking-widest">
                                        Book Whole Cabin
                                    </span>
                                    <div className="flex items-center">
                                        <span className="w-[1px] h-8 bg-white/30 mx-5 transition-colors"></span>
                                        <span className="font-punchy text-3xl md:text-4xl italic text-white leading-none tracking-tighter transition-colors">
                                            €{wp.price}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
