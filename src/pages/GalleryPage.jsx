import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingProvider'
import HotRouteCards from '../components/booking/HotRouteCards'
import SEO from '../components/SEO'

/* ── Image URLs ──────────────────────────────────────────── */
const IMG = {
    hero: '/img/gal1.webp',
    party1: '/img/gal2.webp',
    sunset1: '/img/gal3.webp',
    chill1: '/img/gal4.webp',
    party2: '/img/gal5.webp',
    gif1: '/img/gal6.webp',
    gif2: '/img/gal7.webp',
    deal1: '/img/gal8.webp',
    deal2: '/img/gal9.webp',
    deal3: '/img/gal10.webp',
    deal4: '/img/gal11.webp',
    gal12: '/img/gal12.webp',
    gal13: '/img/gal13.webp',
    gal14: '/img/gal14.webp',
    gal15: '/img/gal15.webp',
    gal16: '/img/gal16.webp',
    gal17: '/img/gal17.webp',
    gal18: '/img/gal18.webp',
    gal19: '/img/gal19.webp',
    gal20: '/img/gal20.webp',
    gal21: '/img/gal21.webp',
    gal22: '/img/gal22.webp',
    gal23: '/img/lagunas.webp',
    gal24: '/img/scooter.webp',
    gal25: '/img/gal24.webp',
    gal26: '/img/gal26.webp',
    gal27: '/img/gal27.webp',
    gal28: '/img/gal28.webp',
    gal29: '/img/gal29.webp',
    gal30: '/img/gal30.webp',
    gal31: '/img/gal31.webp',
    gal32: '/img/gal32.webp',
    gal33: '/img/gal33.webp',

    gal40: '/img/gal40.webp',
    gal41: '/img/gal41.webp',
    gal42: '/img/gal42.webp',
    gal43: '/img/gal43.webp',
    gal44: '/img/gal44.webp',
    gal45: '/img/gal45.webp',
    gal46: '/img/gal46.webp',
    gal47: '/img/gal47.webp',
    gal48: '/img/gal48.webp',
}

/* ── Data ────────────────────────────────────────────────── */
const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'party', label: 'Party' },
    { id: 'chill', label: 'Chill' }
]

/* Each category has its own gallery — clicking a tab swaps the entire grid */
const galleries = {
    all: [
        { img: IMG.hero, title: 'Wild Afternoons', span: 'md:col-span-2 md:row-span-2' },
        { img: IMG.party1, title: 'Golden Hours', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.sunset1, title: 'Pure Bliss', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.party2, title: 'Pure Joy', span: 'md:col-span-2 md:row-span-1' },
        { img: IMG.chill1, title: 'Champagne Rain', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal43, title: 'Fleet Ready', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal46, title: 'Hidden Coves', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.deal2, title: 'Jump Cuts', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal42, title: 'Boat Party', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal13, title: 'Insane Energy', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal21, title: 'The FLEET', span: 'md:col-span-2 md:row-span-2' },
        { img: IMG.gal41, title: 'Jump Cuts', span: 'md:col-span-2 md:row-span-1' },
        { img: IMG.deal4, title: 'Wild Afternoons', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal12, title: 'Happy Hours', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal15, title: 'Mysterious Lagunas', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal14, title: 'Deck Vibes', span: 'md:col-span-1 md:row-span-1' },

    ],
    party: [
        { img: IMG.hero, title: 'Wild Afternoons', span: 'md:col-span-2 md:row-span-2' },
        { img: IMG.party1, title: 'Golden Hours', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.sunset1, title: 'Pure Bliss', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.party2, title: 'Pure Joy', span: 'md:col-span-2 md:row-span-1' },
        { img: IMG.chill1, title: 'Champagne Rain', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal15, title: 'Fleet Ready', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal46, title: 'Hidden Coves', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.deal2, title: 'Jump Cuts', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal45, title: 'Boat Party', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal13, title: 'Insane Energy', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal21, title: 'The FLEET', span: 'md:col-span-2 md:row-span-2' },
        { img: IMG.gal41, title: 'Jump Cuts', span: 'md:col-span-2 md:row-span-1' },
        { img: IMG.deal4, title: 'Wild Afternoons', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal19, title: 'Happy Hours', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal43, title: 'Mysterious Lagunas', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal18, title: 'Deck Vibes', span: 'md:col-span-1 md:row-span-1' },
    ],
    chill: [
        { img: IMG.gal15, title: 'Wild Afternoons', span: 'md:col-span-2 md:row-span-2' },
        { img: IMG.gal22, title: 'Golden Hours', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal21, title: 'Pure Bliss', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal23, title: 'Pure Joy', span: 'md:col-span-2 md:row-span-1' },
        { img: IMG.gal26, title: 'Champagne Rain', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal24, title: 'Fleet Ready', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal29, title: 'Hidden Coves', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal27, title: 'Jump Cuts', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal30, title: 'Boat Party', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal31, title: 'Insane Energy', span: 'md:col-span-1 md:row-span-1' },
        { img: IMG.gal28, title: 'The FLEET', span: 'md:col-span-2 md:row-span-2' },
        { img: IMG.gal32, title: 'Jump Cuts', span: 'md:col-span-2 md:row-span-1' },

    ]
}

const hotDeals = [
    {
        img: IMG.deal1, badge: '5-Night Flotilla', badgeBg: 'bg-neon-pink',
        title: 'The Essential Loop', perks: ['Half-Board Included', '~50 Yacht Flotilla'],
        price: 'From €739', duration: '5 Nights',
    },
    {
        img: IMG.deal2, badge: '7-Night Explorer', badgeBg: 'bg-neon-aqua text-slate-900',
        title: 'Full Cyclades Edge', perks: ['4 Greek Islands', 'Half-Board Included'],
        price: 'From €929', duration: '7 Nights',
    },
    {
        img: IMG.deal3, badge: 'Island Extras', badgeBg: 'bg-primary',
        title: 'Excursions & Tours', perks: ['Via GetYourGuide', 'Book Independently'],
        price: 'Varies', duration: 'Flexible',
    },
    {
        img: IMG.deal4, badge: 'Full Yacht Charter', badgeBg: 'bg-slate-900 text-white border border-slate-700',
        title: 'Private Azimut 70', perks: ['Up to 8 Guests', 'Host & Skipper Incl.'],
        price: 'Custom Quote', duration: '5 or 7 Nights',
    },
]

/* ── Component ───────────────────────────────────────────── */
export default function GalleryPage() {
    const { openBooking } = useBooking()
    const [activeFilter, setActiveFilter] = useState('all')
    const [lightbox, setLightbox] = useState(null)

    const currentGallery = galleries[activeFilter] || galleries.all

    return (
        <div className="bg-[#f8fafc] text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden font-body min-h-screen">
            <SEO
                title="Greece Party Yacht Photos | See the Epic Adventure"
                description="See the flotilla in action. Browse photos and videos of our party yachts, island destinations, and epic social moments."
                keywords="Greece party yacht pictures, Social sailing Greece photos, Yacht party images"
            />
            <Navbar />

            {/* ─── HERO ──────────────────────────────────────────── */}
            <section className="relative h-[55vh] md:h-[65vh] min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Hero Background Yacht" className="w-full h-full object-cover" src={IMG.hero} />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-[#f8fafc]" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    {/* Badges: hidden on mobile to avoid overflow */}
                    <div className="hidden md:flex justify-center gap-3 mb-6">
                        {['Best Value', '18–45 Flotilla', 'Starts 20 April'].map((b) => (
                            <span key={b} className="px-4 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-xs font-bold tracking-widest uppercase">
                                {b}
                            </span>
                        ))}
                    </div>
                    {/* Mobile: smaller badge row */}
                    <div className="flex md:hidden justify-center gap-2 mb-4">
                        {['Best Value', '18–45', '20 April'].map((b) => (
                            <span key={b} className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[10px] font-bold tracking-wider uppercase">
                                {b}
                            </span>
                        ))}
                    </div>
                    <h1 className="sr-only">Greece Party Yacht Charter Gallery</h1>
                    <h2 className="font-punchy text-5xl md:text-8xl text-white italic font-black uppercase leading-tight drop-shadow-lg">
                        GALL<span className="text-neon-aqua">E</span>RY
                    </h2>
                    <p className="text-base md:text-2xl text-white/90 mt-3 md:mt-4 font-medium max-w-2xl mx-auto font-display">
                        50 yachts. 500 travelers. One unforgettable week.
                    </p>

                </div>
            </section>

            {/* ─── CATEGORY FILTER TABS ──────────────────────────── */}
            <section className="py-6 md:py-12 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Mobile: fixed-width tabs filling the screen */}
                    <div className="md:hidden flex p-1.5 bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-white">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`flex-1 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer text-center ${activeFilter === tab.id ? 'active-tab' : 'text-slate-500'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {/* Desktop: centered tabs */}
                    <div className="hidden md:flex flex-wrap justify-center gap-4 p-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm max-w-fit mx-auto border border-white">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${activeFilter === tab.id ? 'active-tab' : 'text-slate-500 hover:text-primary'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── GALLERY GRID ──────────────────────────────────── */}
            <section className="pb-12 md:pb-24 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-0 md:px-4">
                    {/* Desktop: 4-col complex layout */}
                    <div className="hidden md:grid md:grid-cols-4 gap-4 h-auto">
                        {currentGallery.map((item, i) => (
                            <div
                                key={`${activeFilter}-${i}`}
                                className={`${item.span} overflow-hidden relative group cursor-pointer transition-all duration-500 min-h-[200px]`}
                                onClick={() => setLightbox({ img: item.img, title: item.title })}
                            >
                                <img alt={item.title} className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" src={item.img} />
                                <div className="gallery-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                                    <h3 className="font-punchy text-3xl font-black uppercase italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile: alternating mosaic — 2 small, 1 full-width, repeat */}
                    <div className="md:hidden grid grid-cols-2 gap-[3px] px-[3px]">
                        {currentGallery.map((item, i) => {
                            // Every 3rd item (index 2, 5, 8) spans full width
                            const isFullWidth = i % 3 === 2
                            // Alternate shorter/taller for paired items
                            const isOddPair = Math.floor(i / 3) % 2 === 1
                            return (
                                <div
                                    key={`${activeFilter}-mob-${i}`}
                                    className={`${isFullWidth ? 'col-span-2' : ''} overflow-hidden relative group cursor-pointer rounded-sm`}
                                    style={{ height: isFullWidth ? '220px' : isOddPair ? '200px' : '160px' }}
                                    onClick={() => setLightbox({ img: item.img, title: item.title })}
                                >
                                    <img alt={item.title} className="w-full h-full object-cover" src={item.img} />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                        <h3 className="font-punchy text-sm font-black uppercase italic text-white leading-tight">{item.title}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
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

            {/* ─── FOOTER ────────────────────────────────────────── */}
            <Footer />

            {/* ─── LIGHTBOX MODAL ────────────────────────────────── */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110] bg-white/10 p-2.5 md:p-3 rounded-full backdrop-blur-md cursor-pointer"
                        onClick={() => setLightbox(null)}
                    >
                        <span className="material-icons text-xl md:text-2xl">close</span>
                    </button>
                    <div className="relative flex flex-col items-center max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img alt="Full size preview" className="max-w-full max-h-[75vh] md:max-h-[80vh] shadow-2xl" src={lightbox.img} />
                        <div className="mt-4 md:mt-8 text-center">
                            <h2 className="text-white font-punchy text-2xl md:text-4xl uppercase italic">{lightbox.title}</h2>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}
