import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingProvider'
import { YACHTS } from '../data/constants'

const yachtList = Object.values(YACHTS)

const colorMap = {
    'neon-aqua': { badge: 'bg-neon-aqua/10 text-neon-aqua', icon: 'text-neon-aqua', btn: 'bg-slate-900 text-white hover:bg-neon-aqua hover:text-slate-900', border: '' },
    'neon-pink': { badge: 'bg-neon-pink/10 text-neon-pink', icon: 'text-neon-pink', btn: 'bg-neon-pink text-white hover:scale-105 shadow-neon-pink', border: 'shadow-neon-pink border-neon-pink/20 md:scale-105 z-10', mobileBorder: 'border-neon-pink/30 border-2' },
    'primary': { badge: 'bg-primary/10 text-primary', icon: 'text-primary', btn: 'bg-slate-900 text-white hover:bg-primary hover:text-slate-900', border: '' },
}

// Mobile feature subset (fewer items for compact display)
const mobileFeatures = {
    'azimut-58': ['Spacious Sun Deck', 'Swim Platform'],
    'azimut-66': ['Flybridge Lounge', 'Jacuzzi Deck'],
    'azimut-70': ['Full Crew', 'Spacious Flybridge'],
}

export default function Fleet() {
    const { openBooking } = useBooking()

    return (
        <section className="py-20 px-4 md:px-6 mesh-bg relative overflow-hidden" id="fleet">
            <div className="max-w-7xl mx-auto">
                {/* Included badges — desktop only */}
                <div className="hidden md:flex flex-wrap justify-center gap-4 mb-12 font-space">
                    <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 border-neon-aqua/30">
                        <span className="material-icons text-neon-aqua text-sm">restaurant</span>
                        <span className="font-bold text-xs uppercase tracking-widest">Breakfast Included</span>
                    </div>
                    <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 border-neon-pink/30">
                        <span className="material-icons text-neon-pink text-sm">dinner_dining</span>
                        <span className="font-bold text-xs uppercase tracking-widest">Evening Meal Included</span>
                    </div>
                    <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 border-primary/30">
                        <span className="material-icons text-primary text-sm">event</span>
                        <span className="font-bold text-xs uppercase tracking-widest">Year: 2020</span>
                    </div>
                    <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 border-slate-900/10">
                        <span className="material-icons text-slate-900 text-sm">verified_user</span>
                        <span className="font-bold text-xs uppercase tracking-widest">Free Safety Briefing</span>
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-neon-pink font-black uppercase tracking-widest text-xs font-space mb-4">
                        <span className="hidden md:inline">Our Flotilla</span>
                        <span className="md:hidden">The Fleet</span>
                    </span>
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-slate-900">
                        THE <span className="text-primary">FLEET</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">~50 Azimut yachts sail together every departure. Choose your model below.</p>
                </div>

                {/* Desktop: 3-col grid | Mobile: stacked */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 font-space">
                    {yachtList.map((yacht) => {
                        const cm = colorMap[yacht.guestBadgeColor]
                        const features = mobileFeatures[yacht.slug] || yacht.features
                        return (
                            <div
                                key={yacht.slug}
                                className={`group relative glass-panel rounded-3xl overflow-hidden transition-all duration-500 ${yacht.popular ? `${cm.border} ${cm.mobileBorder || ''}` : 'hover:shadow-neon-blue'
                                    }`}
                            >
                                {/* Image */}
                                <div className="h-64 md:h-80 overflow-hidden relative">
                                    <div className={`absolute top-4 left-4 z-10 ${yacht.badgeStyle} px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                                        {yacht.badge}
                                    </div>
                                    <img alt={yacht.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={yacht.image} />
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-4 md:mb-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-punchy italic uppercase">{yacht.name.toUpperCase()}</h3>
                                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{yacht.cabins}</p>
                                        </div>
                                        <div className={`${cm.badge} px-3 md:px-4 py-1 rounded-lg font-black text-xs md:text-sm italic`}>
                                            {yacht.maxGuests} GUESTS
                                        </div>
                                    </div>

                                    {/* Desktop: full features | Mobile: fewer features */}
                                    <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-slate-600 font-medium text-sm">
                                        {/* Mobile */}
                                        <li className="md:hidden flex items-center gap-2">
                                            <span className={`material-icons ${cm.icon} text-sm`}>{yacht.featureIcon}</span>
                                            {features[0]}
                                        </li>
                                        <li className="md:hidden flex items-center gap-2">
                                            <span className={`material-icons ${cm.icon} text-sm`}>{yacht.featureIcon}</span>
                                            {features[1]}
                                        </li>
                                        {/* Desktop */}
                                        {yacht.features.map((f) => (
                                            <li key={f} className="hidden md:flex items-center gap-2">
                                                <span className={`material-icons ${cm.icon} text-sm`}>{yacht.featureIcon}</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to={`/yachts/${yacht.slug}`}
                                        className="block w-full py-3 mb-3 font-punchy rounded-2xl transition-all uppercase tracking-widest text-center border-2 border-slate-200 text-slate-700 hover:border-neon-aqua hover:text-neon-aqua text-sm"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        data-yacht={yacht.slug}
                                        data-action="book-yacht"
                                        data-entity-type="yacht"
                                        data-entity-id={yacht.slug}
                                        data-source="card"
                                        onClick={() => openBooking({ action: 'book-yacht', entityType: 'yacht', entityId: yacht.slug, source: 'card' })}
                                        className={`w-full py-4 font-punchy rounded-2xl transition-all uppercase tracking-widest cursor-pointer ${cm.btn}`}
                                    >
                                        Book Vessel
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
