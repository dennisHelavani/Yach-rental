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
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-pink transition-all">
                                <span className="material-icons text-xl">camera_alt</span>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-pink transition-all">
                                <span className="material-icons text-xl">facebook</span>
                            </a>
                        </div>
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
                            <li><a href="/how-it-works" className="hover:text-neon-aqua transition-colors">How It Works</a></li>
                            {/* <li><a href="#add-ons" className="hover:text-neon-aqua transition-colors">Add-Ons</a></li> */}
                            <li><a href="/faq" className="hover:text-neon-aqua transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="hidden md:block" id="contact">
                        <h4 className="font-punchy uppercase italic text-lg mb-4">Stay Fresh</h4>
                        <p className="text-slate-400 font-medium text-sm mb-4">Get notified about new departures and offers.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="you@email.com"
                                className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-neon-aqua text-white flex-1"
                            />
                            <button className="bg-neon-aqua text-slate-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-neon-pink hover:text-white transition-colors cursor-pointer">
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-space">
                    <p>© 2026 SALTIE Greece. All rights reserved.</p>
                    <p className="flex items-center gap-2 italic">
                        FOR THE WILD AT HEART <span className="material-icons text-neon-pink text-[10px]">favorite</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
