import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-8 text-slate-600 font-medium text-sm leading-relaxed">
                
                <div className="mb-12">
                    <h1 className="text-4xl font-punchy uppercase italic text-slate-900 mb-4 tracking-tight">SALTIE Cruises Privacy Policy</h1>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">What We Collect</h2>
                    <p>We collect your name, email, phone number, and booking details when you make a reservation. Payment card details are handled by Stripe and never stored by us.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">How We Use It</h2>
                    <p>To process your booking, send confirmations and travel information, and respond to any questions or issues.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Who We Share It With</h2>
                    <p>Your booking details are shared with our charter service provider in Greece so they can prepare your trip. Payments are processed by Stripe. Emails are sent through Resend. We do not sell your data.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Marketing</h2>
                    <p>We only send marketing emails if you opt in. You can unsubscribe at any time.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Your Rights</h2>
                    <p>You can ask us to access, correct, or delete your personal data at any time. Email <a href="mailto:support@saltiecruises.com" className="text-amber-600 hover:text-amber-700 underline">support@saltiecruises.com</a>.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Cookies</h2>
                    <p>Our website uses cookies required for the booking and checkout process to function.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Data Storage</h2>
                    <p>We keep booking records for up to 7 years for accounting purposes. Communication records are kept for up to 3 years.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Contact</h2>
                    <p>For any data-related questions or requests, email <a href="mailto:support@saltiecruises.com" className="text-amber-600 hover:text-amber-700 underline">support@saltiecruises.com</a>.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">Complaints</h2>
                    <p>If you are not satisfied with how we handle your data, you can contact: <a href="mailto:support@saltiecruises.com" className="text-amber-600 hover:text-amber-700 underline">support@saltiecruises.com</a></p>
                </section>

            </div>
            <Footer />
        </div>
    )
}
