import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { HERO_IMAGES } from '../data/constants'

export default function NotFoundPage() {
    return (
        <div className="bg-background-sand text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden font-body min-h-screen flex flex-col">
            <SEO
                title="Page Not Found | SALTIE Greece"
                description="Oops! The epic party seems to be somewhere else. Let's get you back on course for your Greece yacht vacation."
                keywords="404 error, page not found, SALTIE Greece"
            />
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden flex-grow">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-aqua/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <span className="inline-block bg-neon-pink/10 text-neon-pink px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 font-space border border-neon-pink/20">
                        Error 404
                    </span>

                    <h1 className="text-8xl md:text-[150px] font-punchy leading-none italic uppercase tracking-tighter text-slate-900 mb-2 drop-shadow-sm">
                        4<span className="text-neon-aqua">0</span>4
                    </h1>

                    <h2 className="text-2xl md:text-4xl font-punchy italic uppercase mb-6 drop-shadow-sm">
                        LOST AT <span className="text-neon-pink">SEA</span>
                    </h2>

                    <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 max-w-md mx-auto">
                        Looks like the coordinates are off. The yacht you're looking for doesn't exist on this route. Let's get you back to the flotilla.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-neon-pink text-white font-punchy uppercase text-sm md:text-base tracking-widest rounded-2xl shadow-lg shadow-neon-pink/20 hover:scale-105 transition-transform"
                        >
                            Back to Home
                        </Link>
                        <Link
                            to="/routes"
                            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-white text-slate-900 border border-slate-200 font-punchy uppercase text-sm md:text-base tracking-widest rounded-2xl shadow-sm hover:scale-105 transition-transform hover:border-slate-300"
                        >
                            View Routes
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
