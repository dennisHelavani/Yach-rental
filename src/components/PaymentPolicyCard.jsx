// ── Payment Policy Card ─────────────────────────────────
// Reusable component showing payment options, discount rules, and examples.
// Drop into route detail pages, checkout, FAQ, how-it-works.

import { isDiscountEligible, computeInstallments, computeFullPayment } from '../lib/pricingEngine'
import DATA from '../data/yachtDaysGreece.json'

const examples = [
    { label: '5 Nights', price: 739 },
    { label: '7 Nights', price: 929 },
]

export default function PaymentPolicyCard({ compact = false }) {
    const eligible = isDiscountEligible()
    const dw = DATA.promotions.discountWindow

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 px-5 md:px-6 py-4">
                <h3 className="font-punchy text-lg md:text-xl italic uppercase text-white flex items-center gap-2">
                    <span className="material-icons text-neon-aqua text-base">payments</span>
                    Pricing & Payments
                </h3>
            </div>

            <div className="p-5 md:p-6 space-y-5">
                {/* Payment plans */}
                <div>
                    <h4 className="text-[10px] font-bold uppercase text-slate-400 font-space tracking-widest mb-3">Payment Options</h4>
                    <div className="space-y-2">
                        <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <span className="material-icons text-neon-aqua text-sm mt-0.5">calendar_month</span>
                            <div>
                                <span className="font-bold text-sm">3 Installments (33% / 33% / 34%)</span>
                                <p className="text-xs text-slate-500 mt-0.5">Weekly payments. Final payment at least 7 days before departure.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <span className="material-icons text-neon-pink text-sm mt-0.5">bolt</span>
                            <div>
                                <span className="font-bold text-sm">Short notice (14–29 days out)</span>
                                <p className="text-xs text-slate-500 mt-0.5">33% now, remaining 67% due within 7 days.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <span className="material-icons text-slate-500 text-sm mt-0.5">warning</span>
                            <div>
                                <span className="font-bold text-sm">Within 14 days of departure</span>
                                <p className="text-xs text-slate-500 mt-0.5">Full payment required.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Discount rules */}
                {eligible && (
                    <div>
                        <h4 className="text-[10px] font-bold uppercase text-slate-400 font-space tracking-widest mb-3">
                            <span className="text-neon-aqua">★</span> Early Booking Discount
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-start gap-3 bg-neon-aqua/5 rounded-xl p-3 border border-neon-aqua/20">
                                <span className="material-icons text-neon-aqua text-sm mt-0.5">local_offer</span>
                                <div>
                                    <span className="font-bold text-sm">Installments — 10% off first payment</span>
                                    <p className="text-xs text-slate-500 mt-0.5">{dw.discountRules.installments.description}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-gradient-to-r from-neon-aqua/5 to-neon-pink/5 rounded-xl p-3 border-2 border-neon-aqua/20">
                                <span className="material-icons text-neon-pink text-sm mt-0.5">savings</span>
                                <div>
                                    <span className="font-bold text-sm">Full payment — save up to 19%</span>
                                    <p className="text-xs text-slate-500 mt-0.5">{dw.discountRules.fullPayment.description}</p>
                                    <span className="inline-block mt-1 bg-neon-pink/10 text-neon-pink text-[9px] font-bold px-2 py-0.5 rounded-full font-space uppercase">Best Value</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Examples */}
                {!compact && (
                    <div>
                        <h4 className="text-[10px] font-bold uppercase text-slate-400 font-space tracking-widest mb-3">Price Examples</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {examples.map(ex => {
                                const inst = computeInstallments(ex.price, eligible)
                                const full = computeFullPayment(ex.price, eligible)
                                return (
                                    <div key={ex.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <span className="font-punchy text-sm uppercase italic">{ex.label}</span>
                                        <span className="text-xs text-slate-400 ml-1">€{ex.price}/pp</span>
                                        <div className="mt-2 space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-500">1st payment</span>
                                                <span className="font-bold">€{inst.amounts[0]}</span>
                                            </div>
                                            {eligible && inst.discount > 0 && (
                                                <p className="text-[9px] text-neon-aqua font-bold">Saving €{inst.discount} on booking</p>
                                            )}
                                            <div className="flex justify-between text-xs border-t border-slate-200 pt-1 mt-1">
                                                <span className="text-slate-500">Full pay</span>
                                                <span className="font-bold">€{full.amount}</span>
                                            </div>
                                            {eligible && full.discount > 0 && (
                                                <p className="text-[9px] text-neon-pink font-bold">Saving €{full.discount} total</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Legal line */}
                <p className="text-[10px] text-slate-400 font-space border-t border-slate-100 pt-3">
                    {dw.legalCopy} Booking = first payment. No BYO alcohol.
                </p>
            </div>
        </div>
    )
}
