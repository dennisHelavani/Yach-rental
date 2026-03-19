import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingProvider'
import { DATA, ALCOHOL_ADDON, getFleetYacht, isEarlyBirdEligible, computeFullPayment, computeInstallments } from '../lib/pricingEngine'
import { yachtsData } from '../data/yachts'
import { saveLead } from '../lib/leadsApi'
import { trackEvent } from '../lib/bookingTracker'
import TrustCard from './booking/TrustCard'
import HotDealsCard from './booking/HotDealsCard'
import PriceBreakdownCard from './booking/PriceBreakdownCard'
import RouteCard from './booking/RouteCard'
import BookingDatePicker from './booking/BookingDatePicker'
import { WHOLE_YACHT_PACKAGES, WHOLE_CABIN_PACKAGES, WHOLE_YACHT_ALCOHOL_PRICE } from '../data/constants'

function formatDate(d) {
    if (!d) return ''
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

const FLOW_STEPS = {
    QUOTE: ['Your Request', 'Contact Details', 'Confirmation'],
    BOOK_YACHT: ['Yacht', 'Package', 'Date', 'Guests', 'Add-ons', 'Payment', 'Summary'],
    BOOK_TOUR: ['Yacht', 'Package', 'Date', 'Guests', 'Add-ons', 'Payment', 'Summary'],
    BOOK_WHOLE_YACHT: ['Yacht', 'Package', 'Date', 'Add-ons', 'Payment', 'Summary'],
    BOOK_WHOLE_CABIN: ['Yacht', 'Package', 'Date', 'Add-ons', 'Payment', 'Summary'],
}

export default function SmartBookingModal() {
    const { isOpen, state, pricing, closeBooking, setFlow, nextStep, prevStep, updateState, updateQuote } = useBooking()
    const navigate = useNavigate()
    const [quoteErrors, setQuoteErrors] = useState({})

    if (!isOpen) return null

    const flow = state.flow
    const step = state.step
    const steps = FLOW_STEPS[flow] || []
    const hasSteps = steps.length > 0

    /* ── Progress bar ── */
    const ProgressBar = () => hasSteps ? (
        <div className="flex items-center gap-1 mb-6">
            {steps.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`h-1 w-full rounded-full transition-all ${i <= step ? 'bg-amber-500' : 'bg-slate-200'}`} />
                    <span className={`text-[9px] uppercase font-bold font-space ${i <= step ? 'text-amber-600' : 'text-slate-400'}`}>{s}</span>
                </div>
            ))}
        </div>
    ) : null

    /* ── Nav ── */
    const Nav = () => (
        <div className="flex items-center justify-between mb-4">
            {step > 0 ? (
                <button onClick={prevStep} className="text-slate-400 hover:text-slate-900 font-bold text-xs uppercase flex items-center gap-1 cursor-pointer font-space">
                    <span className="material-icons text-sm">arrow_back</span> Back
                </button>
            ) : <div />}
            <button onClick={closeBooking} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
                <span className="material-icons text-base text-slate-500">close</span>
            </button>
        </div>
    )

    /* ── CTA Button ── */
    const CTA = ({ onClick, disabled, children, color = 'slate-900' }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-4 rounded-2xl font-punchy uppercase tracking-widest transition-all cursor-pointer text-sm
                ${disabled ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : `bg-${color} text-white hover:bg-amber-500 hover:text-white`}`}
        >
            {children}
        </button>
    )

    /* ═══════════════════════════════════════════════
       INTENT PICKER
    ═══════════════════════════════════════════════ */
    const IntentPicker = () => (
        <div className="space-y-4">
            <h2 className="font-punchy text-2xl md:text-3xl italic uppercase text-center">How can we <span className="text-neon-aqua">help?</span></h2>
            <p className="text-center text-sm text-slate-500 mb-6">Choose what you'd like to do</p>
            <div className="space-y-3">
                {[
                    { flow: 'QUOTE', icon: 'mail_outline', title: 'Get a Quote', desc: 'Questions? Custom trip? We\'ll reply fast.', color: 'neon-aqua' },
                    { flow: 'BOOK_YACHT', icon: 'sailing', title: 'Book a Yacht', desc: 'Choose your yacht, pick your package, pay 33% to book.', color: 'neon-pink' },
                    { flow: 'BOOK_TOUR', icon: 'explore', title: 'Book a Tour', desc: 'Pick your package and reserve your spot now.', color: 'primary' },
                    { flow: 'BOOK_WHOLE_CABIN', icon: 'bed', title: 'Book Whole Cabin', desc: 'Private cabin from €1,480. Discounted alcohol at €99/pp!', color: 'neon-pink' },
                    { flow: 'BOOK_WHOLE_YACHT', icon: 'directions_boat', title: 'Book Whole Yacht', desc: 'Private charter from €5,900. Alcohol only €99/pp!', color: 'amber-500' },
                ].map((o) => (
                    <button
                        key={o.flow}
                        onClick={() => setFlow(o.flow)}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-100 hover:border-${o.color} transition-all text-left cursor-pointer group`}
                    >
                        <div className={`w-12 h-12 rounded-xl bg-${o.color}/10 flex items-center justify-center shrink-0`}>
                            <span className={`material-icons text-${o.color}`}>{o.icon}</span>
                        </div>
                        <div>
                            <h3 className="font-bold uppercase text-sm">{o.title}</h3>
                            <p className="text-xs text-slate-500">{o.desc}</p>
                        </div>
                        <span className="material-icons text-slate-300 ml-auto group-hover:text-slate-900 transition-colors">chevron_right</span>
                    </button>
                ))}
            </div>
            <TrustCard />
        </div>
    )

    /* ═══════════════════════════════════════════════
       A) QUOTE FLOW
    ═══════════════════════════════════════════════ */
    const QuoteFlow = () => {
        const q = state.quote

        const validateQuote = () => {
            const e = {}
            if (!q.name.trim()) e.name = 'Required'
            if (!q.email.trim() || !/\S+@\S+\.\S+/.test(q.email)) e.email = 'Valid email required'
            if (!q.groupSize) e.groupSize = 'Required'
            setQuoteErrors(e)
            return Object.keys(e).length === 0
        }

        const submitQuote = () => {
            if (!validateQuote()) return
            saveLead({ ...q, source: state.source, entityId: state.entityId })
            trackEvent('quote_submitted', { flow: 'QUOTE', source: state.source })
            nextStep()
        }

        if (step === 0) return (
            <div className="space-y-4">
                <h2 className="font-punchy text-2xl italic uppercase">Your <span className="text-neon-aqua">Request</span></h2>
                {state.entityId && (
                    <div className="bg-neon-aqua/10 border border-neon-aqua/20 rounded-xl p-4">
                        <span className="text-[10px] font-bold font-space text-neon-aqua uppercase">Regarding</span>
                        <p className="font-bold text-sm mt-1 capitalize">{state.entityId.replace(/[-_]/g, ' ')}</p>
                    </div>
                )}
                <p className="text-sm text-slate-500">Tell us what you're looking for — we'll reply within 24 hours.</p>
                <CTA onClick={nextStep}>Continue</CTA>
                <TrustCard compact />
            </div>
        )

        if (step === 1) return (
            <div className="space-y-4">
                <h2 className="font-punchy text-xl italic uppercase">Contact <span className="text-neon-aqua">Details</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { key: 'name', label: 'Full Name *', type: 'text', ph: 'Your name', err: quoteErrors.name },
                        { key: 'email', label: 'Email *', type: 'email', ph: 'you@example.com', err: quoteErrors.email },
                        { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', ph: '+44 7...', err: null },
                        { key: 'groupSize', label: 'Group Size *', type: 'number', ph: 'e.g. 6', err: quoteErrors.groupSize },
                    ].map(f => (
                        <div key={f.key}>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">{f.label}</label>
                            <input
                                className={`w-full bg-slate-50 border ${f.err ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua`}
                                type={f.type} value={q[f.key]} placeholder={f.ph}
                                onChange={e => updateQuote({ [f.key]: e.target.value })}
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Preferred Package</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua" value={q.preferredPackage} onChange={e => updateQuote({ preferredPackage: e.target.value })}>
                            <option value="">Any</option>
                            {DATA.packages.map(p => <option key={p.id} value={p.id}>{p.name} — €{p.price}/pp</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Preferred Yacht</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua" value={q.preferredYacht} onChange={e => updateQuote({ preferredYacht: e.target.value })}>
                            <option value="">Any</option>
                            {DATA.fleet.map(y => <option key={y.id} value={y.id}>{y.name} (up to {y.capacityGuests} guests)</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Preferred Month</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua" value={q.preferredMonth} onChange={e => updateQuote({ preferredMonth: e.target.value })}>
                        <option value="">Flexible</option>
                        {['June', 'July', 'August', 'September', 'October'].map(m => <option key={m} value={m}>{m} 2026</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Notes</label>
                    <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua resize-none h-20" value={q.notes} onChange={e => updateQuote({ notes: e.target.value })} placeholder="Anything else we should know..." />
                </div>
                <button onClick={submitQuote} className="w-full bg-neon-aqua text-slate-900 py-4 rounded-2xl font-punchy uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all cursor-pointer text-sm">
                    Send Quote Request →
                </button>
            </div>
        )

        return (
            <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-neon-aqua/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="material-icons text-neon-aqua text-3xl">check_circle</span>
                </div>
                <h2 className="font-punchy text-2xl italic uppercase">Request <span className="text-neon-aqua">Sent!</span></h2>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">We'll reply within 24 hours. Check your inbox (and spam) for a confirmation.</p>
                <HotDealsCard max={4} />
                <button onClick={closeBooking} className="text-slate-400 text-xs font-bold uppercase hover:text-slate-900 cursor-pointer font-space">Close</button>
            </div>
        )
    }

    /* ═══════════════════════════════════════════════
       B) YACHT BOOKING FLOW
    ═══════════════════════════════════════════════ */
    const YachtFlow = () => {
        const selectedYacht = state.yachtId ? getFleetYacht(state.yachtId) : null
        const yachtDisplay = state.yachtId ? yachtsData.find(y => y.slug === state.yachtId.replace(/_/g, '-')) : null
        const capacityMax = selectedYacht?.capacityGuests || 10
        const overCapacity = state.guestCount > capacityMax

        // Step 0 — Yacht selection
        if (step === 0) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-neon-pink">Yacht</span></h2>
                <div className="space-y-3">
                    {yachtsData.map(y => {
                        const fleetData = DATA.fleet.find(f => f.id === y.slug.replace(/-/g, '_'))
                        const isSelected = state.yachtId === y.slug.replace(/-/g, '_')
                        return (
                            <button
                                key={y.slug}
                                onClick={() => updateState({ yachtId: y.slug.replace(/-/g, '_'), guestCount: Math.min(state.guestCount, fleetData?.capacityGuests || 10) })}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${isSelected ? 'border-neon-pink bg-neon-pink/5 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                    <img src={y.heroImage} alt={y.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm uppercase">{y.name}</h4>
                                        {y.badge && <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-space ${y.badgeStyle}`}>{y.badge}</span>}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Up to {fleetData?.capacityGuests || '?'} guests • {fleetData?.cabins?.length || '?'} cabin types • {y.specs?.find(s => s.label === 'Length')?.value}</p>
                                </div>
                                {y.cabinsRemaining <= 2 && (
                                    <span className="text-[9px] bg-neon-pink/10 text-neon-pink font-bold px-2 py-1 rounded-full whitespace-nowrap font-space">
                                        {y.cabinsRemaining} left
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
                <CTA onClick={() => { if (state.yachtId) nextStep() }} disabled={!state.yachtId}>Continue</CTA>
            </div>
        )

        // Step 1 — Package selection
        if (step === 1) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-amber-500">Package</span></h2>
                {yachtDisplay && <p className="text-sm text-slate-500">Yacht: <strong>{yachtDisplay.name}</strong></p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DATA.packages.map(p => {
                        const shortId = p.nights === 5 ? '5n' : '7n'
                        return (
                            <button
                                key={p.id}
                                onClick={() => updateState({ packageId: shortId })}
                                className={`text-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${state.packageId === shortId ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <span className="block font-punchy text-2xl italic uppercase">{p.nights}N</span>
                                <span className="block font-bold text-lg mt-1">€{p.price}<span className="text-xs text-slate-400 font-normal">/pp</span></span>
                                <span className="block text-[10px] text-slate-500 mt-2 font-space">{p.name}</span>
                            </button>
                        )
                    })}
                </div>
                <RouteCard packageId={state.packageId} />
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 2 — Date selection
        if (step === 2) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Pick Your <span className="text-amber-500">Date</span></h2>
                <p className="text-sm text-slate-500">Departures on Mon · Wed · Fri only (Apr 20 – Oct 31, 2026)</p>
                <BookingDatePicker
                    selectedDate={state.date ? new Date(state.date) : null}
                    onSelect={(d) => updateState({ date: d.toISOString() })}
                />
                {state.date && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                        <span className="text-sm font-bold text-amber-500">{formatDate(new Date(state.date))}</span>
                    </div>
                )}
                <CTA onClick={nextStep} disabled={!state.date}>Continue</CTA>
            </div>
        )

        // Step 3 — Guest count (with capacity enforcement)
        if (step === 3) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">How Many <span className="text-amber-500">Guests?</span></h2>
                {selectedYacht && <p className="text-sm text-slate-500">{selectedYacht.name} — max {capacityMax} guests</p>}
                <div className="flex items-center justify-center gap-6 py-4">
                    <button
                        onClick={() => updateState({ guestCount: Math.max(1, state.guestCount - 1) })}
                        className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                    >
                        <span className="material-icons">remove</span>
                    </button>
                    <span className="font-punchy text-5xl italic">{state.guestCount}</span>
                    <button
                        onClick={() => updateState({ guestCount: Math.min(capacityMax, state.guestCount + 1) })}
                        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${state.guestCount >= capacityMax ? 'bg-neon-pink/10 text-neon-pink' : 'bg-slate-100 hover:bg-slate-200'}`}
                    >
                        <span className="material-icons">add</span>
                    </button>
                </div>
                {overCapacity && (
                    <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-neon-pink uppercase font-space">Max capacity reached ({capacityMax} guests)</p>
                    </div>
                )}
                {state.guestCount >= capacityMax && (
                    <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-neon-pink uppercase font-space">🔥 Full yacht — maximum capacity!</p>
                    </div>
                )}
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <span className="text-sm text-slate-500">Subtotal: </span>
                    <span className="font-bold text-lg">€{pricing.subtotal}</span>
                    <span className="text-xs text-slate-400 ml-1">({state.guestCount} × €{pricing.perPerson})</span>
                </div>
                <CTA onClick={nextStep} disabled={overCapacity}>Continue</CTA>
            </div>
        )

        // Step 4 — Add-ons (alcohol)
        if (step === 4) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Add-<span className="text-neon-pink">ons</span></h2>
                <div
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${state.alcohol ? 'border-neon-pink bg-neon-pink/5' : 'border-slate-100'}`}
                    onClick={() => updateState({ alcohol: !state.alcohol })}
                >
                    <div>
                        <span className="block font-bold text-sm">{ALCOHOL_ADDON.name}</span>
                        <span className="block text-xs text-slate-500">{ALCOHOL_ADDON.description}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-4">
                        <span className="font-bold text-neon-pink text-sm">+€{ALCOHOL_ADDON.price}/pp</span>
                        <div className={`w-11 h-6 rounded-full relative transition-colors mt-1 ${state.alcohol ? 'bg-neon-pink' : 'bg-slate-200'}`}>
                            <span className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform shadow ${state.alcohol ? 'left-[22px]' : 'left-[2px]'}`} />
                        </div>
                    </div>
                </div>
                {/* Disclaimer — shown ONLY when alcohol addon selected */}
                {state.alcohol && (
                    <div className="p-4 bg-neon-pink/5 border border-neon-pink/20 rounded-xl">
                        <h4 className="text-xs font-bold text-neon-pink uppercase mb-1 font-space">{ALCOHOL_ADDON.disclaimer.title}</h4>
                        <p className="text-[10px] text-slate-600 leading-tight font-bold">{ALCOHOL_ADDON.disclaimer.text}</p>
                    </div>
                )}
                {/* No BYO always visible */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                    <span className="material-icons text-neon-pink text-sm">block</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase font-space">No BYO alcohol — for licensing & safety</span>
                </div>
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 5 — Payment option
        if (step === 5) {
            const eligible = isEarlyBirdEligible()
            const basePrice = pricing.subtotal - (pricing.alcoholTotal || 0)
            const alcoholTotal = pricing.alcoholTotal || 0
            const fullPay = computeFullPayment(basePrice, eligible, alcoholTotal)
            const installments = computeInstallments(basePrice, eligible, alcoholTotal)
            const showInstallments = pricing.paymentPlan === 'INSTALLMENTS_3'
            // Auto-select FULL when installments not available
            if (!showInstallments && state.paymentOption !== 'FULL') updateState({ paymentOption: 'FULL' })
            return (
                <div className="space-y-5">
                    <h2 className="font-punchy text-2xl italic uppercase">Payment <span className="text-amber-500">Option</span></h2>
                    <div className="space-y-3">
                        {/* Short notice banner */}
                        {!showInstallments && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="material-icons text-amber-500 text-sm">info</span>
                                <span className="text-[10px] font-bold text-amber-700 uppercase font-space">
                                    {pricing.paymentPlan === 'FULL_ONLY' ? 'Departure within 14 days — full payment required' : 'Short notice booking — full payment required'}
                                </span>
                            </div>
                        )}
                        {/* Installments — only when >29 days to departure */}
                        {showInstallments && (
                        <button
                            onClick={() => updateState({ paymentOption: 'INSTALLMENTS' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'INSTALLMENTS' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.paymentPlans.installments_3.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-space">10% off booking payment</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.paymentPlans.installments_3.hint}</p>
                            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">To be paid now</span>
                                    <span className="font-bold text-slate-900">€{installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Left to pay</span>
                                    <span className="text-slate-500">€{pricing.subtotal - installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Total trip price</span>
                                    <span className="text-slate-500">€{pricing.subtotal}</span>
                                </div>
                            </div>
                        </button>
                        )}
                        {/* Full Pay */}
                        <button
                            onClick={() => updateState({ paymentOption: 'FULL' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'FULL' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.fullPayment.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-space">Save 19%</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.fullPayment.hint}</p>
                            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Pay today</span>
                                    <span className="font-bold text-slate-900">€{fullPay.amount}</span>
                                </div>
                                {eligible && fullPay.discount > 0 && (
                                    <>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Original price</span>
                                            <span className="text-slate-400 line-through">€{pricing.subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-emerald-600 font-bold">You save</span>
                                            <span className="text-emerald-600 font-bold">€{fullPay.discount}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                    <CTA onClick={nextStep}>Continue to Summary</CTA>
                </div>
            )
        }

        // Step 6 — Summary
        return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Booking <span className="text-amber-500">Summary</span></h2>
                {yachtDisplay && (
                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <img src={yachtDisplay.heroImage} alt={yachtDisplay.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div>
                            <h4 className="font-bold text-sm">{yachtDisplay.name}</h4>
                            <p className="text-[10px] text-slate-500">{state.guestCount} guests • {pricing.pkg?.nights}N package</p>
                        </div>
                    </div>
                )}
                <PriceBreakdownCard pricing={pricing} state={state} />
                <RouteCard packageId={state.packageId} />
                <button
                    onClick={() => {
                        trackEvent('checkout_started', { flow: 'BOOK_YACHT', yachtId: state.yachtId, packageId: state.packageId, guestCount: state.guestCount, paymentOption: state.paymentOption })
                        const params = new URLSearchParams({
                            flow: 'BOOK_YACHT',
                            package: state.packageId, yacht: state.yachtId || '',
                            guests: state.guestCount, alcohol: state.alcohol ? '1' : '0',
                            payment: state.paymentOption, date: state.date || '',
                        })
                        closeBooking()
                        navigate(`/checkout?${params.toString()}`)
                    }}
                    className="w-full bg-amber-500 text-white py-4 rounded-2xl font-punchy uppercase tracking-widest hover:bg-slate-900 transition-all cursor-pointer group text-sm"
                >
                    Continue to Checkout <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-center text-xs text-slate-400">
                    {state.paymentOption !== 'FULL' ? `Only €${pricing.amountDueToday} today — remaining €${pricing.remaining} in installments` : 'Full payment — no further charges'}
                </p>
            </div>
        )
    }

    /* ═══════════════════════════════════════════════
       C) TOUR BOOKING FLOW (Packages) — now with Yacht selection
    ═══════════════════════════════════════════════ */
    const TourFlow = () => {
        const selectedYacht = state.yachtId ? getFleetYacht(state.yachtId) : null
        const yachtDisplay = state.yachtId ? yachtsData.find(y => y.slug === state.yachtId.replace(/_/g, '-')) : null
        const capacityMax = selectedYacht?.capacityGuests || 10

        // Step 0 — Yacht selection
        if (step === 0) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-amber-500">Yacht</span></h2>
                <p className="text-sm text-slate-500">Select your preferred yacht for the trip</p>
                <div className="space-y-3">
                    {yachtsData.map(y => {
                        const fleetData = DATA.fleet.find(f => f.id === y.slug.replace(/-/g, '_'))
                        const isSelected = state.yachtId === y.slug.replace(/-/g, '_')
                        return (
                            <button
                                key={y.slug}
                                onClick={() => updateState({ yachtId: y.slug.replace(/-/g, '_'), guestCount: Math.min(state.guestCount, fleetData?.capacityGuests || 10) })}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${isSelected ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                    <img src={y.heroImage} alt={y.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm uppercase">{y.name}</h4>
                                        {y.badge && <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-space ${y.badgeStyle}`}>{y.badge}</span>}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Up to {fleetData?.capacityGuests || '?'} guests • {fleetData?.cabins?.length || '?'} cabin types • {y.specs?.find(s => s.label === 'Length')?.value}</p>
                                </div>
                                {y.cabinsRemaining <= 2 && (
                                    <span className="text-[9px] bg-neon-pink/10 text-neon-pink font-bold px-2 py-1 rounded-full whitespace-nowrap font-space">
                                        {y.cabinsRemaining} left
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
                <CTA onClick={() => { if (state.yachtId) nextStep() }} disabled={!state.yachtId}>Continue</CTA>
            </div>
        )

        // Step 1 — Package selection
        if (step === 1) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-amber-500">Package</span></h2>
                {yachtDisplay && <p className="text-sm text-slate-500">Yacht: <strong>{yachtDisplay.name}</strong></p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DATA.packages.map(p => {
                        const shortId = p.nights === 5 ? '5n' : '7n'
                        return (
                            <button
                                key={p.id}
                                onClick={() => updateState({ packageId: shortId })}
                                className={`text-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${state.packageId === shortId ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <span className="block font-punchy text-2xl italic uppercase">{p.nights}N</span>
                                <span className="block font-bold text-lg mt-1">€{p.price}<span className="text-xs text-slate-400 font-normal">/pp</span></span>
                                <span className="block text-[10px] text-slate-500 mt-2 font-space">{p.name}</span>
                                {isEarlyBirdEligible() && (
                                    <span className="inline-block mt-2 text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold font-space">Up to 19% off before June 14</span>
                                )}
                            </button>
                        )
                    })}
                </div>
                <RouteCard packageId={state.packageId} />
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 2 — Date selection
        if (step === 2) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Pick Your <span className="text-amber-500">Date</span></h2>
                <p className="text-sm text-slate-500">Departures on Mon · Wed · Fri only (Apr 20 – Oct 31, 2026)</p>
                <BookingDatePicker
                    selectedDate={state.date ? new Date(state.date) : null}
                    onSelect={(d) => updateState({ date: d.toISOString() })}
                />
                {state.date && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                        <span className="text-sm font-bold text-amber-600">{formatDate(new Date(state.date))}</span>
                    </div>
                )}
                <CTA onClick={nextStep} disabled={!state.date}>Continue</CTA>
            </div>
        )

        // Step 3 — Guest count
        if (step === 3) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">How Many <span className="text-amber-500">Guests?</span></h2>
                {selectedYacht && <p className="text-sm text-slate-500">{selectedYacht.name} — max {capacityMax} guests</p>}
                <div className="flex items-center justify-center gap-6 py-4">
                    <button onClick={() => updateState({ guestCount: Math.max(1, state.guestCount - 1) })} className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors">
                        <span className="material-icons">remove</span>
                    </button>
                    <span className="font-punchy text-5xl italic">{state.guestCount}</span>
                    <button onClick={() => updateState({ guestCount: Math.min(capacityMax, state.guestCount + 1) })} className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${state.guestCount >= capacityMax ? 'bg-neon-pink/10 text-neon-pink' : 'bg-slate-100 hover:bg-slate-200'}`}>
                        <span className="material-icons">add</span>
                    </button>
                </div>
                {state.guestCount >= capacityMax && (
                    <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-xl p-3 text-center">
                        <p className="text-xs font-bold text-neon-pink uppercase font-space">🔥 Full yacht — maximum capacity!</p>
                    </div>
                )}
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <span className="text-sm text-slate-500">Subtotal: </span>
                    <span className="font-bold text-lg">€{pricing.subtotal}</span>
                    <span className="text-xs text-slate-400 ml-1">({state.guestCount} × €{pricing.perPerson})</span>
                </div>
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 4 — Add-ons
        if (step === 4) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Add-<span className="text-amber-500">ons</span></h2>
                <div
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${state.alcohol ? 'border-amber-500 bg-amber-50' : 'border-slate-100'}`}
                    onClick={() => updateState({ alcohol: !state.alcohol })}
                >
                    <div>
                        <span className="block font-bold text-sm">{ALCOHOL_ADDON.name}</span>
                        <span className="block text-xs text-slate-500">{ALCOHOL_ADDON.description}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-4">
                        <span className="font-bold text-amber-600 text-sm">+€{ALCOHOL_ADDON.price}/pp</span>
                        <div className={`w-11 h-6 rounded-full relative transition-colors mt-1 ${state.alcohol ? 'bg-amber-500' : 'bg-slate-200'}`}>
                            <span className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform shadow ${state.alcohol ? 'left-[22px]' : 'left-[2px]'}`} />
                        </div>
                    </div>
                </div>
                {state.alcohol && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <h4 className="text-xs font-bold text-amber-700 uppercase mb-1 font-space">{ALCOHOL_ADDON.disclaimer.title}</h4>
                        <p className="text-[10px] text-slate-600 leading-tight font-bold">{ALCOHOL_ADDON.disclaimer.text}</p>
                    </div>
                )}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                    <span className="material-icons text-neon-pink text-sm">block</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase font-space">No BYO alcohol — for licensing & safety</span>
                </div>
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 5 — Payment option
        if (step === 5) {
            const eligible = isEarlyBirdEligible()
            const basePrice = pricing.subtotal - (pricing.alcoholTotal || 0)
            const alcoholTotal = pricing.alcoholTotal || 0
            const fullPay = computeFullPayment(basePrice, eligible, alcoholTotal)
            const installments = computeInstallments(basePrice, eligible, alcoholTotal)
            const showInstallments = pricing.paymentPlan === 'INSTALLMENTS_3'
            if (!showInstallments && state.paymentOption !== 'FULL') updateState({ paymentOption: 'FULL' })
            return (
                <div className="space-y-5">
                    <h2 className="font-punchy text-2xl italic uppercase">Payment <span className="text-amber-500">Option</span></h2>
                    <div className="space-y-3">
                        {!showInstallments && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="material-icons text-amber-500 text-sm">info</span>
                                <span className="text-[10px] font-bold text-amber-700 uppercase font-space">
                                    {pricing.paymentPlan === 'FULL_ONLY' ? 'Departure within 14 days — full payment required' : 'Short notice booking — full payment required'}
                                </span>
                            </div>
                        )}
                        {showInstallments && (
                        <button
                            onClick={() => updateState({ paymentOption: 'INSTALLMENTS' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'INSTALLMENTS' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.paymentPlans.installments_3.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-space">10% off booking payment</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.paymentPlans.installments_3.hint}</p>
                            <div className="mt-3 pt-3 border-t border-amber-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">To be paid now</span>
                                    <span className="font-bold text-slate-900">€{installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Left to pay</span>
                                    <span className="text-slate-500">€{pricing.subtotal - installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Total trip price</span>
                                    <span className="text-slate-500">€{pricing.subtotal}</span>
                                </div>
                            </div>
                        </button>
                        )}
                        <button
                            onClick={() => updateState({ paymentOption: 'FULL' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'FULL' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.fullPayment.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-space">Save 19%</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.fullPayment.hint}</p>
                            <div className="mt-3 pt-3 border-t border-amber-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Pay today</span>
                                    <span className="font-bold text-slate-900">€{fullPay.amount}</span>
                                </div>
                                {eligible && fullPay.discount > 0 && (
                                    <>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Original price</span>
                                            <span className="text-slate-400 line-through">€{pricing.subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-emerald-600 font-bold">You save</span>
                                            <span className="text-emerald-600 font-bold">€{fullPay.discount}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                    <CTA onClick={nextStep}>Continue to Summary</CTA>
                </div>
            )
        }

        // Step 6 — Summary
        return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Booking <span className="text-amber-500">Summary</span></h2>
                {yachtDisplay && (
                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <img src={yachtDisplay.heroImage} alt={yachtDisplay.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div>
                            <h4 className="font-bold text-sm">{yachtDisplay.name}</h4>
                            <p className="text-[10px] text-slate-500">{state.guestCount} guests • {pricing.pkg?.nights}N package</p>
                        </div>
                    </div>
                )}
                <PriceBreakdownCard pricing={pricing} state={state} />
                <RouteCard packageId={state.packageId} />
                <TrustCard compact />
                <button
                    onClick={() => {
                        trackEvent('checkout_started', { flow: 'BOOK_TOUR', packageId: state.packageId, yachtId: state.yachtId, guestCount: state.guestCount, paymentOption: state.paymentOption })
                        const params = new URLSearchParams({
                            flow: 'BOOK_TOUR',
                            package: state.packageId, yacht: state.yachtId || '',
                            guests: state.guestCount, alcohol: state.alcohol ? '1' : '0',
                            payment: state.paymentOption, date: state.date || '',
                        })
                        closeBooking()
                        navigate(`/checkout?${params.toString()}`)
                    }}
                    className="w-full bg-amber-500 text-white py-4 rounded-2xl font-punchy uppercase tracking-widest hover:bg-slate-900 transition-all cursor-pointer group text-sm"
                >
                    Continue to Checkout <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-center text-xs text-slate-400">
                    {state.paymentOption !== 'FULL' ? `Only €${pricing.amountDueToday} today — remaining €${pricing.remaining} in installments` : 'Full payment — no further charges'}
                </p>
            </div>
        )
    }

    /* ═══════════════════════════════════════════════
       D) WHOLE YACHT BOOKING FLOW
    ═══════════════════════════════════════════════ */
    const WholeYachtFlow = () => {
        const selectedYacht = state.yachtId ? getFleetYacht(state.yachtId) : null
        const yachtDisplay = state.yachtId ? yachtsData.find(y => y.slug === state.yachtId.replace(/_/g, '-')) : null

        // Step 0 — Yacht selection
        if (step === 0) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-amber-500">Yacht</span></h2>
                <p className="text-sm text-slate-500">Book the entire yacht for your private group</p>
                <div className="space-y-3">
                    {yachtsData.map(y => {
                        const fleetData = DATA.fleet.find(f => f.id === y.slug.replace(/-/g, '_'))
                        const isSelected = state.yachtId === y.slug.replace(/-/g, '_')
                        return (
                            <button
                                key={y.slug}
                                onClick={() => updateState({ yachtId: y.slug.replace(/-/g, '_') })}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${isSelected ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                    <img src={y.heroImage} alt={y.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm uppercase">{y.name}</h4>
                                        {y.badge && <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-space ${y.badgeStyle}`}>{y.badge}</span>}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Up to {fleetData?.capacityGuests || '?'} guests • {fleetData?.cabins?.length || '?'} cabins</p>
                                </div>
                                <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full whitespace-nowrap font-space uppercase">Whole Yacht</span>
                            </button>
                        )
                    })}
                </div>
                <CTA onClick={() => { if (state.yachtId) nextStep() }} disabled={!state.yachtId}>Continue</CTA>
            </div>
        )

        // Step 1 — Package selection (flat rate)
        if (step === 1) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-amber-500">Trip</span></h2>
                {yachtDisplay && <p className="text-sm text-slate-500">Yacht: <strong>{yachtDisplay.name}</strong> — whole yacht charter</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.values(WHOLE_YACHT_PACKAGES).map(p => (
                        <button
                            key={p.id}
                            onClick={() => updateState({ packageId: p.id })}
                            className={`text-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${state.packageId === p.id ? 'border-amber-500 bg-amber-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <span className="inline-block bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-space mb-2">Whole Yacht</span>
                            <span className="block font-punchy text-2xl italic uppercase">{p.nights}N</span>
                            <span className="block font-bold text-lg mt-1">€{p.price}<span className="text-xs text-slate-400 font-normal">/yacht</span></span>
                            <span className="block text-[10px] text-slate-500 mt-2 font-space">{p.route}</span>
                        </button>
                    ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-[10px] text-amber-800 font-bold flex items-center gap-2 font-space">
                        <span className="material-icons text-amber-500 text-sm">local_bar</span>
                        🍹 Unlimited alcohol only €{WHOLE_YACHT_ALCOHOL_PRICE}/pp (save €{ALCOHOL_ADDON.price - WHOLE_YACHT_ALCOHOL_PRICE}!)
                    </p>
                </div>
                <RouteCard packageId={state.packageId} />
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 2 — Date selection
        if (step === 2) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Pick Your <span className="text-amber-500">Date</span></h2>
                <p className="text-sm text-slate-500">Departures on Mon · Wed · Fri only (Apr 20 – Oct 31, 2026)</p>
                <BookingDatePicker
                    selectedDate={state.date ? new Date(state.date) : null}
                    onSelect={(d) => updateState({ date: d.toISOString() })}
                />
                {state.date && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                        <span className="text-sm font-bold text-amber-600">{formatDate(new Date(state.date))}</span>
                    </div>
                )}
                <CTA onClick={nextStep} disabled={!state.date}>Continue</CTA>
            </div>
        )

        // Step 3 — Add-ons (discounted alcohol)
        if (step === 3) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Add-<span className="text-amber-500">ons</span></h2>
                <div
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${state.alcohol ? 'border-amber-500 bg-amber-50' : 'border-slate-100'}`}
                    onClick={() => updateState({ alcohol: !state.alcohol })}
                >
                    <div>
                        <span className="block font-bold text-sm">{ALCOHOL_ADDON.name}</span>
                        <span className="block text-xs text-slate-500">{ALCOHOL_ADDON.description}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 line-through">€{ALCOHOL_ADDON.price}/pp</span>
                            <span className="font-bold text-amber-600 text-sm">€{WHOLE_YACHT_ALCOHOL_PRICE}/pp</span>
                        </div>
                        <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full mt-1 font-space">SAVE €{ALCOHOL_ADDON.price - WHOLE_YACHT_ALCOHOL_PRICE}</span>
                        <div className={`w-11 h-6 rounded-full relative transition-colors mt-1 ${state.alcohol ? 'bg-amber-500' : 'bg-slate-200'}`}>
                            <span className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform shadow ${state.alcohol ? 'left-[22px]' : 'left-[2px]'}`} />
                        </div>
                    </div>
                </div>
                {state.alcohol && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <h4 className="text-xs font-bold text-amber-700 uppercase mb-1 font-space">{ALCOHOL_ADDON.disclaimer.title}</h4>
                        <p className="text-[10px] text-slate-600 leading-tight font-bold">{ALCOHOL_ADDON.disclaimer.text}</p>
                    </div>
                )}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                    <span className="material-icons text-neon-pink text-sm">block</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase font-space">No BYO alcohol — for licensing & safety</span>
                </div>
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 4 — Payment option
        if (step === 4) {
            const eligible = isEarlyBirdEligible()
            const basePrice = pricing.wholeYachtBasePrice || (pricing.subtotal - (pricing.alcoholTotal || 0))
            const alcoholTotal = pricing.alcoholTotal || 0
            const fullPay = computeFullPayment(basePrice, eligible, alcoholTotal)
            const installments = computeInstallments(basePrice, eligible, alcoholTotal)
            const showInstallments = pricing.paymentPlan === 'INSTALLMENTS_3'
            if (!showInstallments && state.paymentOption !== 'FULL') updateState({ paymentOption: 'FULL' })
            return (
                <div className="space-y-5">
                    <h2 className="font-punchy text-2xl italic uppercase">Payment <span className="text-amber-500">Option</span></h2>
                    <div className="space-y-3">
                        {!showInstallments && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                                <span className="material-icons text-amber-500 text-sm">info</span>
                                <span className="text-[10px] font-bold text-amber-700 uppercase font-space">
                                    {pricing.paymentPlan === 'FULL_ONLY' ? 'Departure within 14 days — full payment required' : 'Short notice booking — full payment required'}
                                </span>
                            </div>
                        )}
                        {showInstallments && (
                        <button
                            onClick={() => updateState({ paymentOption: 'INSTALLMENTS' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'INSTALLMENTS' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.paymentPlans.installments_3.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-space">10% off booking payment</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.paymentPlans.installments_3.hint}</p>
                            <div className="mt-3 pt-3 border-t border-amber-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">To be paid now</span>
                                    <span className="font-bold text-amber-600">€{installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Left to pay</span>
                                    <span className="text-slate-500">€{pricing.subtotal - installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Total trip price</span>
                                    <span className="text-slate-500">€{pricing.subtotal}</span>
                                </div>
                            </div>
                        </button>
                        )}
                        <button
                            onClick={() => updateState({ paymentOption: 'FULL' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'FULL' ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.fullPayment.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-space">Save 19%</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.fullPayment.hint}</p>
                            <div className="mt-3 pt-3 border-t border-amber-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Pay today</span>
                                    <span className="font-bold text-amber-600">€{fullPay.amount}</span>
                                </div>
                                {eligible && fullPay.discount > 0 && (
                                    <>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Original price</span>
                                            <span className="text-slate-400 line-through">€{pricing.subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-amber-600 font-bold">You save</span>
                                            <span className="text-amber-600 font-bold">€{fullPay.discount}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                    <CTA onClick={nextStep}>Continue to Summary</CTA>
                </div>
            )
        }

        // Step 5 — Summary
        return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Booking <span className="text-amber-500">Summary</span></h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-bold text-amber-700 uppercase font-space">🚤 Whole Yacht Charter</span>
                </div>
                {yachtDisplay && (
                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <img src={yachtDisplay.heroImage} alt={yachtDisplay.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div>
                            <h4 className="font-bold text-sm">{yachtDisplay.name}</h4>
                            <p className="text-[10px] text-slate-500">Whole yacht • {pricing.pkg?.nights}N package</p>
                        </div>
                    </div>
                )}
                <PriceBreakdownCard pricing={pricing} state={state} />
                <RouteCard packageId={state.packageId} />
                <button
                    onClick={() => {
                        trackEvent('checkout_started', { flow: 'BOOK_WHOLE_YACHT', yachtId: state.yachtId, packageId: state.packageId, paymentOption: state.paymentOption })
                        const params = new URLSearchParams({
                            flow: 'BOOK_WHOLE_YACHT',
                            package: state.packageId, yacht: state.yachtId || '',
                            guests: state.guestCount, alcohol: state.alcohol ? '1' : '0',
                            payment: state.paymentOption, wholeYacht: '1',
                            date: state.date || '',
                        })
                        closeBooking()
                        navigate(`/checkout?${params.toString()}`)
                    }}
                    className="w-full bg-amber-500 text-white py-4 rounded-2xl font-punchy uppercase tracking-widest hover:bg-slate-900 transition-all cursor-pointer group text-sm"
                >
                    Continue to Checkout <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-center text-xs text-slate-400">
                    {state.paymentOption !== 'FULL' ? `Only €${pricing.amountDueToday} today — remaining €${pricing.remaining} in installments` : 'Full payment — no further charges'}
                </p>
            </div>
        )
    }

    /* ═══════════════════════════════════════════════
       E) WHOLE CABIN BOOKING FLOW
    ═══════════════════════════════════════════════ */
    const WholeCabinFlow = () => {
        const selectedYacht = state.yachtId ? getFleetYacht(state.yachtId) : null
        const yachtDisplay = state.yachtId ? yachtsData.find(y => y.slug === state.yachtId.replace(/_/g, '-')) : null

        // Step 0 — Yacht selection
        if (step === 0) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-neon-pink">Yacht</span></h2>
                <p className="text-sm text-slate-500">Select a yacht for your private cabin</p>
                <div className="space-y-3">
                    {yachtsData.map(y => {
                        const fleetData = DATA.fleet.find(f => f.id === y.slug.replace(/-/g, '_'))
                        const isSelected = state.yachtId === y.slug.replace(/-/g, '_')
                        return (
                            <button
                                key={y.slug}
                                onClick={() => updateState({ yachtId: y.slug.replace(/-/g, '_') })}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left cursor-pointer ${isSelected ? 'border-neon-pink bg-neon-pink/5 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                    <img src={y.heroImage} alt={y.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm uppercase">{y.name}</h4>
                                        {y.badge && <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold font-space ${y.badgeStyle}`}>{y.badge}</span>}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Up to {fleetData?.capacityGuests || '?'} guests • {fleetData?.cabins?.length || '?'} cabins</p>
                                </div>
                                <span className="text-[9px] bg-neon-pink/10 text-neon-pink font-bold px-2 py-1 rounded-full whitespace-nowrap font-space uppercase">Whole Cabin</span>
                            </button>
                        )
                    })}
                </div>
                <CTA onClick={() => { if (state.yachtId) nextStep() }} disabled={!state.yachtId}>Continue</CTA>
            </div>
        )

        // Step 1 — Cabin package selection
        if (step === 1) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Choose Your <span className="text-neon-pink">Cabin</span></h2>
                {yachtDisplay && <p className="text-sm text-slate-500">Yacht: <strong>{yachtDisplay.name}</strong> — whole cabin charter</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.values(WHOLE_CABIN_PACKAGES).map(p => (
                        <button
                            key={p.id}
                            onClick={() => updateState({ packageId: p.id })}
                            className={`text-center p-5 border-2 rounded-2xl cursor-pointer transition-all ${state.packageId === p.id ? 'border-neon-pink bg-neon-pink/5 shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <span className="inline-block bg-neon-pink/10 text-neon-pink text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-space mb-2">Whole Cabin</span>
                            <span className="block font-punchy text-2xl italic uppercase">{p.nights}N</span>
                            <span className="block font-bold text-lg mt-1">€{p.price}<span className="text-xs text-slate-400 font-normal">/cabin</span></span>
                            <span className="block text-[10px] text-slate-500 mt-2 font-space">{p.route}</span>
                        </button>
                    ))}
                </div>
                <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-xl p-3">
                    <p className="text-[10px] text-neon-pink font-bold flex items-center gap-2 font-space">
                        <span className="material-icons text-neon-pink text-sm">local_bar</span>
                        🍹 Unlimited alcohol only €{WHOLE_YACHT_ALCOHOL_PRICE}/pp (save €{ALCOHOL_ADDON.price - WHOLE_YACHT_ALCOHOL_PRICE}!)
                    </p>
                </div>
                <RouteCard packageId={state.packageId} />
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 2 — Date selection
        if (step === 2) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Pick Your <span className="text-neon-pink">Date</span></h2>
                <p className="text-sm text-slate-500">Departures on Mon · Wed · Fri only (Apr 20 – Oct 31, 2026)</p>
                <BookingDatePicker
                    selectedDate={state.date ? new Date(state.date) : null}
                    onSelect={(d) => updateState({ date: d.toISOString() })}
                />
                {state.date && (
                    <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-xl p-3 text-center">
                        <span className="text-sm font-bold text-neon-pink">{formatDate(new Date(state.date))}</span>
                    </div>
                )}
                <CTA onClick={nextStep} disabled={!state.date}>Continue</CTA>
            </div>
        )

        // Step 3 — Add-ons (discounted alcohol)
        if (step === 3) return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Add-<span className="text-neon-pink">ons</span></h2>
                <div
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${state.alcohol ? 'border-neon-pink bg-neon-pink/5' : 'border-slate-100'}`}
                    onClick={() => updateState({ alcohol: !state.alcohol })}
                >
                    <div>
                        <span className="block font-bold text-sm">{ALCOHOL_ADDON.name}</span>
                        <span className="block text-xs text-slate-500">{ALCOHOL_ADDON.description}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 line-through">€{ALCOHOL_ADDON.price}/pp</span>
                            <span className="font-bold text-neon-pink text-sm">€{WHOLE_YACHT_ALCOHOL_PRICE}/pp</span>
                        </div>
                        <span className="text-[9px] bg-neon-pink/10 text-neon-pink font-bold px-2 py-0.5 rounded-full mt-1 font-space">SAVE €{ALCOHOL_ADDON.price - WHOLE_YACHT_ALCOHOL_PRICE}</span>
                        <div className={`w-11 h-6 rounded-full relative transition-colors mt-1 ${state.alcohol ? 'bg-neon-pink' : 'bg-slate-200'}`}>
                            <span className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform shadow ${state.alcohol ? 'left-[22px]' : 'left-[2px]'}`} />
                        </div>
                    </div>
                </div>
                {state.alcohol && (
                    <div className="p-4 bg-neon-pink/5 border border-neon-pink/20 rounded-xl">
                        <h4 className="text-xs font-bold text-neon-pink uppercase mb-1 font-space">{ALCOHOL_ADDON.disclaimer.title}</h4>
                        <p className="text-[10px] text-slate-600 leading-tight font-bold">{ALCOHOL_ADDON.disclaimer.text}</p>
                    </div>
                )}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                    <span className="material-icons text-neon-pink text-sm">block</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase font-space">No BYO alcohol — for licensing & safety</span>
                </div>
                <CTA onClick={nextStep}>Continue</CTA>
            </div>
        )

        // Step 4 — Payment option
        if (step === 4) {
            const eligible = isEarlyBirdEligible()
            const basePrice = pricing.wholeCabinBasePrice || (pricing.subtotal - (pricing.alcoholTotal || 0))
            const alcoholTotal = pricing.alcoholTotal || 0
            const fullPay = computeFullPayment(basePrice, eligible, alcoholTotal)
            const installments = computeInstallments(basePrice, eligible, alcoholTotal)
            const showInstallments = pricing.paymentPlan === 'INSTALLMENTS_3'
            if (!showInstallments && state.paymentOption !== 'FULL') updateState({ paymentOption: 'FULL' })
            return (
                <div className="space-y-5">
                    <h2 className="font-punchy text-2xl italic uppercase">Payment <span className="text-neon-pink">Option</span></h2>
                    <div className="space-y-3">
                        {!showInstallments && (
                            <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-xl p-3 flex items-center gap-2">
                                <span className="material-icons text-neon-pink text-sm">info</span>
                                <span className="text-[10px] font-bold text-neon-pink uppercase font-space">
                                    {pricing.paymentPlan === 'FULL_ONLY' ? 'Departure within 14 days — full payment required' : 'Short notice booking — full payment required'}
                                </span>
                            </div>
                        )}
                        {showInstallments && (
                        <button
                            onClick={() => updateState({ paymentOption: 'INSTALLMENTS' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'INSTALLMENTS' ? 'border-neon-pink bg-neon-pink/5' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.paymentPlans.installments_3.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-neon-pink/10 text-neon-pink px-2 py-0.5 rounded-full font-space">10% off booking payment</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.paymentPlans.installments_3.hint}</p>
                            <div className="mt-3 pt-3 border-t border-pink-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">To be paid now</span>
                                    <span className="font-bold text-slate-900">€{installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Left to pay</span>
                                    <span className="text-slate-500">€{pricing.subtotal - installments.amounts[0]}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Total trip price</span>
                                    <span className="text-slate-500">€{pricing.subtotal}</span>
                                </div>
                            </div>
                        </button>
                        )}
                        <button
                            onClick={() => updateState({ paymentOption: 'FULL' })}
                            className={`w-full p-5 rounded-2xl border-2 transition-all text-left cursor-pointer ${state.paymentOption === 'FULL' ? 'border-neon-pink bg-neon-pink/5' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-sm uppercase">{DATA.payments.fullPayment.label}</h4>
                                {eligible && (
                                    <span className="text-[9px] bg-neon-pink/10 text-neon-pink px-2 py-0.5 rounded-full font-space">Save 19%</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{DATA.payments.fullPayment.hint}</p>
                            <div className="mt-3 pt-3 border-t border-pink-100 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Pay today</span>
                                    <span className="font-bold text-slate-900">€{fullPay.amount}</span>
                                </div>
                                {eligible && fullPay.discount > 0 && (
                                    <>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-400">Original price</span>
                                            <span className="text-slate-400 line-through">€{pricing.subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-emerald-600 font-bold">You save</span>
                                            <span className="text-emerald-600 font-bold">€{fullPay.discount}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                    <CTA onClick={nextStep}>Continue to Summary</CTA>
                </div>
            )
        }

        // Step 5 — Summary
        return (
            <div className="space-y-5">
                <h2 className="font-punchy text-2xl italic uppercase">Booking <span className="text-neon-pink">Summary</span></h2>
                <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-bold text-neon-pink uppercase font-space">🛏️ Whole Cabin Booking</span>
                </div>
                {yachtDisplay && (
                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <img src={yachtDisplay.heroImage} alt={yachtDisplay.name} className="w-14 h-14 rounded-lg object-cover" />
                        <div>
                            <h4 className="font-bold text-sm">{yachtDisplay.name}</h4>
                            <p className="text-[10px] text-slate-500">Whole cabin • {pricing.pkg?.nights}N package</p>
                        </div>
                    </div>
                )}
                <PriceBreakdownCard pricing={pricing} state={state} />
                <RouteCard packageId={state.packageId} />
                <button
                    onClick={() => {
                        trackEvent('checkout_started', { flow: 'BOOK_WHOLE_CABIN', yachtId: state.yachtId, packageId: state.packageId, paymentOption: state.paymentOption })
                        const params = new URLSearchParams({
                            flow: 'BOOK_WHOLE_CABIN',
                            package: state.packageId, yacht: state.yachtId || '',
                            guests: state.guestCount, alcohol: state.alcohol ? '1' : '0',
                            payment: state.paymentOption, wholeCabin: '1',
                            date: state.date || '',
                        })
                        closeBooking()
                        navigate(`/checkout?${params.toString()}`)
                    }}
                    className="w-full bg-neon-pink text-white py-4 rounded-2xl font-punchy uppercase tracking-widest hover:bg-slate-900 transition-all cursor-pointer group text-sm"
                >
                    Continue to Checkout <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <p className="text-center text-xs text-slate-400">
                    {state.paymentOption !== 'FULL' ? `Only €${pricing.amountDueToday} today — remaining €${pricing.remaining} in installments` : 'Full payment — no further charges'}
                </p>
            </div>
        )
    }

    /* ═══════════════════════════════════════════════
       RENDER
    ═══════════════════════════════════════════════ */
    return (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center" onClick={e => { if (e.target === e.currentTarget) closeBooking() }}>
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <div className="relative z-10 bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in">
                <div className="p-6 md:p-8">
                    <Nav />
                    {hasSteps && <ProgressBar />}
                    {!flow && <IntentPicker />}
                    {flow === 'QUOTE' && <QuoteFlow />}
                    {flow === 'BOOK_YACHT' && <YachtFlow />}
                    {flow === 'BOOK_TOUR' && <TourFlow />}
                    {flow === 'BOOK_WHOLE_YACHT' && <WholeYachtFlow />}
                    {flow === 'BOOK_WHOLE_CABIN' && <WholeCabinFlow />}
                </div>
            </div>
        </div>
    )
}
