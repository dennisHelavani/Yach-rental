// ── Booking Success Page ────────────────────────────────
// Shown after successful Stripe payment redirect

import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function BookingSuccessPage() {
    const [params] = useSearchParams()
    const ref = params.get('ref')

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Booking Confirmed | SALTIE CRUISES Greece"
                description="Your Greece yacht vacation has been successfully booked."
            />
            <Navbar />
            <div className="max-w-lg mx-auto px-4 pt-32 pb-20 text-center">
                {/* Success icon */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-icons text-green-500 text-4xl">check_circle</span>
                </div>

                <h1 className="sr-only">Booking Confirmed</h1>
                <h2 className="font-punchy text-3xl italic uppercase mb-3">
                    Booking <span className="text-green-500">Confirmed!</span>
                </h2>

                {/* Confirmation message */}
                <p className="text-sm text-slate-600 mb-6">
                    Your booking is confirmed. A confirmation email has been sent to you.
                </p>

                {/* Booking reference — prominent styled box */}
                {ref ? (
                    <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-100 text-left">
                        <div className="flex justify-between py-1.5 text-sm text-slate-500">
                            <span>Booking Reference</span>
                            <span className="font-semibold text-slate-700 font-space">{ref}</span>
                        </div>
                        <div className="flex justify-between py-1.5 text-sm text-slate-500">
                            <span>Status</span>
                            <span className="font-semibold text-green-500">Confirmed</span>
                        </div>
                    </div>
                ) : (
                    /* Generic confirmation if ref is missing */
                    <div className="mb-6 p-5 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-sm text-slate-600">Your booking has been processed successfully. Check your email for full details.</p>
                    </div>
                )}



                {/* Safety briefing reminder */}
                <p className="text-sm text-slate-500 mb-6">
                    🛟 You'll receive a safety briefing before boarding — no additional cost.
                </p>

                {/* Back to home */}
                <Link to="/" className="inline-block px-10 py-4 bg-neon-pink text-white font-punchy rounded-2xl hover:shadow-neon-pink transition-all uppercase tracking-widest text-sm">
                    Back to Home
                </Link>
            </div>
            <Footer />
        </div>
    )
}
