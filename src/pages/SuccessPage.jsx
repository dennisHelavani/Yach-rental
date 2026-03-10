import { useSearchParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function SuccessPage() {
    const [params] = useSearchParams()
    const sessionId = params.get('session_id')

    return (
        <div className="result-page">
            <SEO
                title="Booking Confirmed | Yacht Days Greece"
                description="Your Greece yacht vacation has been successfully booked."
            />
            <div className="result-card">
                <div className="result-icon">✅</div>
                <h1>Booking Confirmed!</h1>
                <p>Your payment was successful. We'll send a confirmation email with all the details shortly.</p>

                {sessionId && (
                    <div className="mb-7 p-5 rounded-xl bg-slate-50 border border-slate-100 text-left">
                        <div className="flex justify-between py-1.5 text-sm text-slate-500">
                            <span>Confirmation</span>
                            <span className="font-semibold text-slate-700">{sessionId.substring(0, 20)}…</span>
                        </div>
                        <div className="flex justify-between py-1.5 text-sm text-slate-500">
                            <span>Status</span>
                            <span className="font-semibold text-green-500">Paid</span>
                        </div>
                    </div>
                )}

                <p className="text-sm text-primary">
                    🛟 You'll receive a safety briefing before boarding — no additional cost.
                </p>

                <Link to="/" className="inline-block mt-6 px-10 py-4 bg-neon-pink text-white font-punchy rounded-2xl hover:shadow-neon-pink transition-all uppercase tracking-widest text-sm">
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
