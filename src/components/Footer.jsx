import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-slate-900 py-16 px-6 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Main content */}
                <div className="flex flex-col items-center text-center md:grid md:grid-cols-4 md:text-left md:items-start gap-12 mb-12">
                    {/* Logo & tagline */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                            <div className="w-10 h-10 bg-gradient-to-tr from-neon-aqua to-neon-pink rounded-xl flex items-center justify-center">
                                <span className="material-icons text-white">sailing</span>
                            </div>
                            <span className="text-2xl font-punchy tracking-tighter uppercase italic">SALTIE</span>
                        </div>
                        <p className="text-slate-400 font-medium mb-8 max-w-sm">
                            Island-hopping the Greek Cyclades with 50 yachts. See you on the water.
                        </p>
                    </div>

                    {/* Desktop-only columns */}
                    <div className="hidden md:block">
                        <h4 className="font-punchy uppercase italic text-lg mb-4">Fleet</h4>
                        <ul className="space-y-2 text-slate-400 font-medium text-sm">
                            <li><Link to="/yachts/azimut-58" className="hover:text-neon-aqua transition-colors">Azimut 58</Link></li>
                            <li><Link to="/yachts/azimut-66" className="hover:text-neon-aqua transition-colors">Azimut 66</Link></li>
                            <li><Link to="/yachts/azimut-70" className="hover:text-neon-aqua transition-colors">Azimut 70</Link></li>
                        </ul>
                    </div>

                    <div className="hidden md:block">
                        <h4 className="font-punchy uppercase italic text-lg mb-4">Experience</h4>
                        <ul className="space-y-2 text-slate-400 font-medium text-sm">
                            <li><Link to="/how-it-works" className="hover:text-neon-aqua transition-colors">How It Works</Link></li>
                            <li><Link to="/faq" className="hover:text-neon-aqua transition-colors">FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-neon-aqua transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal column */}
                    <div className="hidden md:block">
                        <h4 className="font-punchy uppercase italic text-lg mb-4">Legal</h4>
                        <ul className="space-y-2 text-slate-400 font-medium text-sm">
                            <li><a href="/privacy" className="hover:text-neon-aqua transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-neon-aqua transition-colors">Terms &amp; Conditions</a></li>
                            <li><a href="/cancellation" className="hover:text-neon-aqua transition-colors">Cancellation Policy</a></li>
                            <li><a href="#" className="hover:text-neon-aqua transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Legal Entity Info */}
                <div className="border-t border-white/10 pt-6 mb-6">
                    <div className="flex flex-col items-center justify-center gap-y-1 text-[10px] text-slate-500 font-space tracking-widest text-center">
                        <span className="uppercase font-bold">SALTIE Cruises is a trading name of HASSLICH HOLTZ LIMITED</span>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-x-3 gap-y-1 mt-1">
                            <span>Company No: <span className="text-slate-400">9413423</span></span>
                            <span className="hidden md:inline">•</span>
                            <span>NZBN: <span className="text-slate-400">9429053520005</span></span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-x-3 gap-y-1 mt-1">
                            <span>Registered Address: <span className="text-slate-400">10D/76 Albert Street, Auckland 1010</span></span>
                            <span className="hidden md:inline">•</span>
                            <a href="mailto:support@saltiecruises.com" className="text-slate-400 hover:text-neon-aqua transition-colors">support@saltiecruises.com</a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-space">
                    <p>© 2026 HASSLICH HOLTZ LIMITED (trading as SALTIE Cruises). All rights reserved.</p>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        {/* Mobile-only legal links */}
                        <div className="flex items-center gap-4 flex-wrap justify-center md:hidden">
                            <a href="/privacy" className="hover:text-neon-aqua transition-colors">Privacy</a>
                            <a href="/terms" className="hover:text-neon-aqua transition-colors">Terms</a>
                            <a href="/cancellation" className="hover:text-neon-aqua transition-colors">Cancellations</a>
                            <a href="#" className="hover:text-neon-aqua transition-colors">Cookies</a>
                        </div>
                        <a
                            href="https://www.instagram.com/saltie_cruises/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Follow us on Instagram"
                            className="hover:text-neon-pink transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                        </a>
                        <p className="flex items-center gap-2 italic">
                            FOR THE WILD AT HEART <span className="material-icons text-neon-pink text-[10px]">favorite</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
