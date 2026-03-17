// ── Booking Cancelled Page ──────────────────────────────
// Shown when user closes Stripe Checkout without paying
// Does NOT clear BookingContext — user selections are preserved

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function BookingCancelledPage() {
    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Payment Not Completed | Yacht Days Greece"
                description="Your booking payment was not completed. You can go back and try again."
            />
            <Navbar />
            <div className="max-w-lg mx-auto px-4 pt-32 pb-20 text-center">
                {/* Icon */}
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-icons text-slate-400 text-4xl">credit_card_off</span>
                </div>

                <h1 className="sr-only">Payment Not Completed</h1>
                <h2 className="font-punchy text-3xl italic uppercase mb-3">
                    Payment <span className="text-slate-400">Not Completed</span>
                </h2>

                <p className="text-sm text-slate-600 mb-8">
                    Your payment was not taken and no booking has been made. You can go back and try again.
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 justify-center flex-wrap">
                    {/* Navigate back to checkout — BookingContext state is preserved */}
                    <Link to="/checkout" className="inline-block px-10 py-4 bg-amber-500 text-white font-punchy rounded-2xl hover:bg-slate-900 transition-all uppercase tracking-widest text-sm">
                        Try Again
                    </Link>
                    <Link to="/" className="inline-block px-10 py-4 border-2 border-slate-200 text-slate-700 font-punchy rounded-2xl hover:border-neon-aqua transition-all uppercase tracking-widest text-sm">
                        Back to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}
