import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-8 text-slate-600 font-medium text-sm leading-relaxed">
                <div className="mb-12">
                    <h1 className="text-4xl font-punchy uppercase italic text-slate-900 mb-4 tracking-tight">Terms and Conditions</h1>
                    <p className="text-slate-400">SALTIE Cruises www.saltiecruises.com<br/>Last updated 13 January 2026</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">1. Who we are</h2>
                    <p>SALTIE Cruises. Contact us at support@saltiecruises.com.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">2. Booking and contract</h2>
                    <p>When you complete a booking on our website and make your first payment, a binding contract is formed between you and SALTIE Cruises on the terms set out here.</p>
                    <p>By booking, you confirm that the person making the booking is at least 18 years old, all guests are at least 18 years old, and you accept these terms on behalf of everyone in your group.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">3. Pricing</h2>
                    <p>All prices are in Euros (€).</p>
                    <p><strong>Shared Spots (per person)</strong><br/>5 Nights, half-board: €739<br/>7 Nights, half-board: €929</p>
                    <p><strong>Whole Cabin (up to 2 guests)</strong><br/>5 Nights: €1,480<br/>7 Nights: €1,820</p>
                    <p><strong>Whole Yacht (up to 8 guests)</strong><br/>5 Nights: €5,900<br/>7 Nights: €6,500</p>
                    <p><strong>Alcohol Package (unlimited local spirits, beer and wine)</strong><br/>Shared bookings: €199 per person<br/>Cabin or Yacht bookings: €99 per person</p>
                    <p>Prices may change before you book. Once your booking is confirmed, your price is locked.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">4. What is included</h2>
                    <p>Every charter includes half-board catering (breakfast and lunch), a skipper and hostess, port fees, fuel, drinking water, soft drinks, bed linen, and towels.</p>
                    <p>Dinner, alcohol (unless the alcohol package is purchased), flights, airport transfers, tips, travel insurance, and personal spending are not included.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">5. Payment</h2>
                    <p>Deposits are non-refundable. Full payment required prior to departure.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">6. Cancellation Policy</h2>
                    <p>Charges apply depending on timing. No refunds for unused services.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">7. Your responsibilities</h2>
                    <p>You must arrange travel insurance covering medical expenses, repatriation, cancellation, and personal belongings before departure. We recommend your policy also covers maritime activities. We may ask for proof of insurance before boarding.</p>
                    <p>All guests need a valid passport with at least six months remaining. Non-EU guests should check Greek visa requirements. We are not responsible if you are denied boarding or entry.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">8. On board</h2>
                    <p>The skipper has final authority over all safety and navigation decisions, including changes to the itinerary due to weather, sea conditions, or other safety concerns.</p>
                    <p>We may refuse boarding or require disembarkation of any guest whose behaviour is dangerous, threatening, or significantly disruptive. No refund is given in these circumstances.</p>
                    <p>The crew may refuse alcohol service to any guest who is intoxicated or whose behaviour creates a safety risk.</p>
                    <p>Guests are liable for damage to the vessel or equipment caused through negligence or deliberate action.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">9. Liability</h2>
                    <p>Liability capped at 3x booking value except where prohibited.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">10. Force majeure</h2>
                    <p>Neither party is liable for failure caused by events beyond reasonable control, including severe weather, port closures, pandemic restrictions, vessel mechanical failure, crew illness, strikes, natural disasters, or civil unrest.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">11. Complaints</h2>
                    <p>Raise any issue with the crew first during your charter. If unresolved, email support@saltiecruises.com within 28 days of your return with your booking reference and a description of the problem. We will acknowledge within 5 business days and respond fully within 28 business days.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">12. Your data</h2>
                    <p>We collect personal data to manage your booking. See our Privacy Policy at <a href="/privacy" className="text-amber-600 hover:text-amber-700 underline">www.saltiecruises.com/privacy</a>.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">13. General</h2>
                    <p>We may update these terms. Changes do not apply to confirmed bookings.</p>
                    <p>If any part of these terms is found unenforceable, the rest continues in full effect.</p>
                    <p>These terms, your booking confirmation, and our Privacy Policy are the entire agreement between you and us.</p>
                </section>

            </div>
            <Footer />
        </div>
    )
}
