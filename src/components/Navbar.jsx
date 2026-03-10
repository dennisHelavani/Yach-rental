import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingProvider'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [routesOpen, setRoutesOpen] = useState(false)
    const routesRef = useRef(null)
    const location = useLocation()
    const path = location.pathname
    const { openBooking } = useBooking()

    const handleBookNow = () => openBooking({ action: 'book-yacht', source: 'nav', text: 'Book Now' })

    const isActive = (to) => path === to || path.startsWith(to + '/')
    const isRoutesActive = path.startsWith('/routes')

    const deskLink = (to) =>
        `transition-colors ${isActive(to) ? 'text-primary border-b-2 border-primary pb-0.5' : 'hover:text-primary'}`

    const mobLink = (to) =>
        `font-punchy text-3xl uppercase italic tracking-tight transition-colors ${isActive(to) ? 'text-neon-aqua' : 'text-white hover:text-neon-aqua'}`

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    // Close routes dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (routesRef.current && !routesRef.current.contains(e.target)) setRoutesOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLink = () => {
        setMenuOpen(false)
        setRoutesOpen(false)
    }

    return (
        <>
            <nav className="fixed top-0 w-full z-[100] px-4 py-3">
                <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 md:px-8 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-neon-aqua to-neon-pink rounded-lg flex items-center justify-center shadow-neon-blue">
                            <span className="material-icons text-white text-base md:text-xl">sailing</span>
                        </div>
                        <span className="text-xl md:text-2xl font-punchy tracking-tighter uppercase italic">
                            SALTIE <span className="text-primary">Greece</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-10 font-bold text-sm uppercase tracking-wider font-space">
                        {/* Routes dropdown */}
                        <div ref={routesRef} className="relative">
                            <button
                                onClick={() => setRoutesOpen(!routesOpen)}
                                onMouseEnter={() => setRoutesOpen(true)}
                                className={`flex items-center gap-1 transition-colors cursor-pointer ${isRoutesActive ? 'text-primary border-b-2 border-primary pb-0.5' : 'hover:text-primary'}`}
                            >
                                <Link to="/routes" onClick={() => setRoutesOpen(false)}>ROUTES</Link>
                                <span className={`material-icons text-sm transition-transform ${routesOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            {routesOpen && (
                                <div
                                    onMouseLeave={() => setRoutesOpen(false)}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-2xl py-2 min-w-[180px] z-50"
                                >
                                    <Link
                                        to="/routes/5-nights"
                                        onClick={() => setRoutesOpen(false)}
                                        className={`block px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${path === '/routes/5-nights' ? 'text-primary bg-primary/5' : 'text-slate-700 hover:text-primary hover:bg-slate-50'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="material-icons text-sm">sailing</span>
                                            5 Nights
                                        </span>
                                    </Link>
                                    <Link
                                        to="/routes/7-nights"
                                        onClick={() => setRoutesOpen(false)}
                                        className={`block px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${path === '/routes/7-nights' ? 'text-primary bg-primary/5' : 'text-slate-700 hover:text-primary hover:bg-slate-50'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="material-icons text-sm">sailing</span>
                                            7 Nights
                                        </span>
                                    </Link>

                                </div>
                            )}
                        </div>

                        <Link className={deskLink('/yachts')} to="/yachts">Fleet</Link>
                        <Link className={deskLink('/how-it-works')} to="/how-it-works">How it Works</Link>
                        <Link className={deskLink('/gallery')} to="/gallery">Gallery</Link>
                        <Link className={deskLink('/faq')} to="/faq">FAQ</Link>
                        <Link className={deskLink('/contact')} to="/contact">Contact</Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBookNow}
                            className="hidden sm:block bg-neon-pink text-white px-6 py-2 rounded-full font-bold hover:shadow-neon-pink transition-all uppercase text-xs tracking-[0.2em] font-space cursor-pointer"
                        >
                            Book Now
                        </button>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <div className={`w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <div className={`w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                            <div className={`w-6 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen menu */}
            <div
                className={`fixed inset-0 z-[99] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-500 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Routes section */}
                <div className="flex flex-col items-center gap-2">
                    <Link onClick={handleLink} to="/routes" className="font-punchy text-3xl uppercase italic tracking-tight text-white hover:text-white transition-colors">Routes</Link>
                    <Link onClick={handleLink} to="/routes/5-nights" className="font-space text-lg uppercase tracking-widest text-neon-aqua hover:text-white transition-colors">5 Nights — €739</Link>
                    <Link onClick={handleLink} to="/routes/7-nights" className="font-space text-lg uppercase tracking-widest text-neon-aqua hover:text-white transition-colors">7 Nights — €929</Link>
                </div>

                <Link onClick={handleLink} className={mobLink('/yachts')} to="/yachts">Fleet</Link>
                <Link onClick={handleLink} className={mobLink('/how-it-works')} to="/how-it-works">How it Works</Link>
                <Link onClick={handleLink} className={mobLink('/gallery')} to="/gallery">Gallery</Link>
                <Link onClick={handleLink} className={mobLink('/faq')} to="/faq">FAQ</Link>
                <Link onClick={handleLink} className={mobLink('/contact')} to="/contact">Contact</Link>

                <button
                    onClick={() => { setMenuOpen(false); handleBookNow() }}
                    className="mt-4 bg-neon-pink text-white px-12 py-4 rounded-full font-punchy text-xl uppercase tracking-widest shadow-neon-pink cursor-pointer"
                >
                    Book Now
                </button>
            </div >
        </>
    )
}
