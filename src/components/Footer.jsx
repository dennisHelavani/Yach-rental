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
                            <li><a href="/policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-neon-aqua transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-neon-aqua transition-colors">Terms &amp; Conditions</a></li>
                            <li><a href="#" className="hover:text-neon-aqua transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* EU Legal Entity Info */}
                <div className="border-t border-white/10 pt-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-1 text-[10px] text-slate-500 font-space uppercase tracking-widest text-center">
                        <span>SALTIE Cruises Limited</span>
                        <span className="hidden md:inline">•</span>
                        {/* <span>Company No: <span className="text-slate-400">[PENDING]</span></span> */}
                        {/* <span className="hidden md:inline">•</span> */}
                        {/* <span>Registered in <span className="text-slate-400">[PENDING]</span></span> */}
                        {/* <span className="hidden md:inline">•</span> */}
                        <a href="mailto:support@saltiecruises.com" className="text-slate-400 hover:text-neon-aqua transition-colors">support@saltiecruises.com</a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-space">
                    <p>© 2026 SALTIE Cruises Limited. All rights reserved.</p>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        {/* Mobile-only legal links */}
                        <div className="flex items-center gap-4 md:hidden">
                            <a href="/policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-neon-aqua transition-colors">Privacy</a>
                            <a href="#" className="hover:text-neon-aqua transition-colors">Terms</a>
                            <a href="#" className="hover:text-neon-aqua transition-colors">Cookies</a>
                        </div>
                        <p className="flex items-center gap-2 italic">
                            FOR THE WILD AT HEART <span className="material-icons text-neon-pink text-[10px]">favorite</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
