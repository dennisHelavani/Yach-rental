import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CancellationPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-8 text-slate-600 font-medium text-sm leading-relaxed">
                
                <div className="mb-12">
                    <h1 className="text-4xl font-punchy uppercase italic text-slate-900 mb-4 tracking-tight">Cancellation &amp; Refunds</h1>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">1. Customer cancellations</h2>
                    <p>If you cancel your booking more than 7 working days before the scheduled departure date, the amount refundable will be determined in accordance with the booking terms provided at the time of purchase.</p>
                    <p>If you cancel your booking within 7 working days before the scheduled departure date, we will refund 33% of the total trip price, excluding any alcohol package or other add-ons, to the original payment method.</p>
                    <p>For the purpose of this policy, working days means Monday to Friday, excluding public holidays in New Zealand.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">2. Why cancellation fees apply</h2>
                    <p>Our cancellation charges are intended to reflect the costs and losses associated with cancellations, including administrative costs, reserved accommodation or yacht capacity, staffing, supplier commitments, and the reduced ability to resell the booking close to departure.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">3. Refund timing</h2>
                    <p>Where a refund is due, it will be processed to the original payment method within 7–14 business days after the cancellation is confirmed. Bank or card processing times may vary.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">4. Non-refundable situations</h2>
                    <p>Unless required by applicable law, refunds will not be provided for:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>no-shows;</li>
                        <li>missed departures caused by late arrival, incomplete travel documents, visa issues, or personal circumstances outside our control;</li>
                        <li>unused parts of the trip after departure;</li>
                        <li>the cost of any alcohol package or other non-refundable add-ons, except where required by law.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">5. If we cancel or significantly change the trip</h2>
                    <p>If we cancel your trip before departure, or if we make a significant change to an essential part of the booked service, you will be entitled to the remedies required by applicable law, which may include:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>a replacement trip or alternative arrangement, or</li>
                        <li>a partial or full refund, as appropriate.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">6. Unavoidable and extraordinary circumstances</h2>
                    <p>Nothing in this policy limits any rights you may have under applicable law where cancellation or changes are caused by unavoidable and extraordinary circumstances that significantly affect the performance of the trip or transport to the destination.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">7. Mandatory consumer rights</h2>
                    <p>Nothing in this Cancellation &amp; Refunds section excludes or limits any rights that cannot be excluded under applicable consumer protection laws, including laws that may apply in the European Union, United Kingdom, Australia, or New Zealand.</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-punchy uppercase text-slate-900 tracking-tight">8. How to request a cancellation</h2>
                    <p>All cancellation requests must be submitted in writing to:</p>
                    <ul className="list-none space-y-1">
                        <li><strong>Email:</strong> <a href="mailto:support@saltiecruises.com" className="text-amber-600 hover:text-amber-700 underline">support@saltiecruises.com</a></li>
                        <li><strong>Company:</strong> Hasslich Holtz Limited</li>
                        <li><strong>Registered in:</strong> New Zealand</li>
                    </ul>
                </section>

            </div>
            <Footer />
        </div>
    )
}
