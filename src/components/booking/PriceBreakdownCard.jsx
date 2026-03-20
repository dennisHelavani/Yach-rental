// ── Price Breakdown Card (installments vs full + discount) ──
import { isDiscountEligible, DATA } from '../../lib/pricingEngine'

export default function PriceBreakdownCard({ pricing, state }) {
    if (!pricing) return null

    const { subtotal, earlyBird, lastMinute, discountAmount, total, amountDueToday, remaining, paymentOption, guestCount } = pricing

    // Determine the base package price (before add-ons)
    const packagePrice = pricing.wholeYachtBasePrice || pricing.wholeCabinBasePrice || (pricing.perPerson * guestCount)

    // Determine alcohol total from pricing engine (already uses alcoholQuantity)
    const alcoholTotal = pricing.alcoholTotal || 0
    const alcoholQty = pricing.alcoholQuantity != null ? pricing.alcoholQuantity : (pricing.addonPerPerson > 0 ? guestCount : 0)
    const alcoholUnitPrice = pricing.addonPerPerson || 0

    // Determine booking type label
    const bookingLabel = pricing.wholeYacht
        ? `Whole Yacht (${pricing.pkg?.nights || '?'}N)`
        : pricing.wholeCabin
            ? `Whole Cabin (${pricing.pkg?.nights || '?'}N)`
            : `Package (${pricing.pkg?.nights || '?'}N × ${guestCount} guest${guestCount > 1 ? 's' : ''})`

    // Discount label
    const discountLabel = lastMinute
        ? 'Last-Minute Discount (10% OFF)'
        : paymentOption === 'FULL'
            ? 'Full Payment Discount (~19% OFF)'
            : '10% off booking payment'

    return (
        <div className="bg-slate-50 rounded-2xl p-5 space-y-3 border border-slate-100">
            <h4 className="text-[10px] font-bold uppercase text-slate-400 font-space">Price Breakdown</h4>

            {/* Base package */}
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">{bookingLabel}</span>
                <span className="font-bold">€{packagePrice}</span>
            </div>

            {/* Alcohol addon */}
            {alcoholTotal > 0 && (
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                        Alcohol Add-on ({alcoholQty} × €{alcoholUnitPrice})
                        {(pricing.wholeYacht || pricing.wholeCabin) && <span className="text-[9px] text-amber-600 ml-1 font-bold">DISCOUNTED</span>}
                    </span>
                    <span className={`font-bold ${(pricing.wholeYacht || pricing.wholeCabin) ? 'text-amber-600' : 'text-neon-pink'}`}>+€{alcoholTotal}</span>
                </div>
            )}

            {/* Subtotal */}
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold">€{subtotal}</span>
            </div>

            {/* Discount */}
            {(earlyBird || lastMinute) && discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 flex items-center gap-1">
                        <span className="material-icons text-xs">local_offer</span>
                        {discountLabel}
                    </span>
                    <span className="font-bold text-emerald-600">−€{discountAmount}</span>
                </div>
            )}

            {/* ── INSTALLMENTS: To be paid now / Left to pay / Total trip price ── */}
            {paymentOption !== 'FULL' ? (
                <div className="border-t border-slate-200 pt-3 space-y-3">
                    {/* To be paid now */}
                    <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-xl p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-emerald-600 font-space">
                                    To be paid now (33%)
                                </span>
                                {earlyBird && discountAmount > 0 && (
                                    <p className="text-[10px] text-emerald-600 mt-0.5 font-bold">Saving €{discountAmount} on your booking payment!</p>
                                )}
                            </div>
                            <span className="font-punchy text-2xl italic text-emerald-600">€{amountDueToday}</span>
                        </div>
                    </div>

                    {/* Left to pay */}
                    {remaining > 0 && (
                        <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-bold uppercase text-slate-500 font-space">
                                        Left to pay
                                    </span>
                                    <p className="text-[10px] text-slate-400 mt-0.5">
                                        {pricing.paymentPlan === 'SHORT_NOTICE' ? 'Due within 7 days' : 'In weekly installments'}
                                    </p>
                                </div>
                                <span className="font-bold text-lg text-slate-600">€{remaining}</span>
                            </div>
                        </div>
                    )}

                    {/* Total trip price */}
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-base">
                        <span>Total trip price</span>
                        <span>€{subtotal}</span>
                    </div>
                </div>
            ) : (
                /* ── FULL PAYMENT: Discounted total ── */
                <div className="border-t border-slate-200 pt-3 space-y-3">
                    {/* Pay today */}
                    <div className="bg-emerald-600/10 border border-emerald-600/20 rounded-xl p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-emerald-600 font-space">
                                    Full Payment Today
                                </span>
                                {(earlyBird || lastMinute) && discountAmount > 0 && (
                                    <p className="text-[10px] text-emerald-600 mt-0.5 font-bold">You're saving €{discountAmount} with {lastMinute ? 'last-minute' : 'full payment'} discount!</p>
                                )}
                            </div>
                            <span className="font-punchy text-2xl italic text-emerald-600">€{total}</span>
                        </div>
                    </div>

                    {/* Original vs discounted */}
                    {(earlyBird || lastMinute) && discountAmount > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Original price</span>
                            <span className="text-slate-400 line-through">€{subtotal}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Installment schedule (when applicable) */}
            {paymentOption !== 'FULL' && pricing.installments && pricing.installments.amounts.length > 2 && (
                <div className="border-t border-slate-100 pt-2">
                    <h5 className="text-[9px] font-bold uppercase text-slate-400 font-space mb-2">Payment Schedule</h5>
                    <div className="space-y-1">
                        {pricing.installments.labels.map((label, i) => (
                            <div key={i} className="flex justify-between text-xs">
                                <span className="text-slate-500">{label}</span>
                                <span className={`font-bold ${i === 0 && earlyBird && discountAmount > 0 ? 'text-emerald-600' : ''}`}>
                                    €{pricing.installments.amounts[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
