import { Link } from 'react-router-dom'

export default function CancelPage() {
    return (
        <div className="result-page">
            <div className="result-card">
                <div className="result-icon">😔</div>
                <h1>Payment Cancelled</h1>
                <p>Your booking was not completed. No charges were made. You can try again anytime.</p>

                <div className="flex gap-3 justify-center flex-wrap">
                    <Link to="/" className="inline-block px-10 py-4 bg-neon-pink text-white font-punchy rounded-2xl hover:shadow-neon-pink transition-all uppercase tracking-widest text-sm">
                        Try Again
                    </Link>
                    <Link to="/#fleet" className="inline-block px-10 py-4 border-2 border-slate-200 text-slate-700 font-punchy rounded-2xl hover:border-neon-aqua transition-all uppercase tracking-widest text-sm">
                        View Fleet
                    </Link>
                </div>
            </div>
        </div>
    )
}
