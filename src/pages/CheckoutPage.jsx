// ── Checkout Page ────────────────────────────────────────
// Full checkout with T&C, disclaimers, real backend API call
// Reads booking state from URL params

import { useState, useMemo } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { pricingEngine, DATA, ALCOHOL_ADDON, getFleetYacht, isEarlyBirdEligible, computeFullPayment } from '../lib/pricingEngine'
import { trackEvent } from '../lib/bookingTracker'
import { yachtsData } from '../data/yachts'
import PriceBreakdownCard from '../components/booking/PriceBreakdownCard'
import RouteCard from '../components/booking/RouteCard'
import SEO from '../components/SEO'

export default function CheckoutPage() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null)

    // ── NEW: contact info fields for the API payload ──
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // Parse state from URL params
    const flow = params.get('flow') || 'BOOK_TOUR'
    const packageId = params.get('package') || '5n'
    const yachtId = params.get('yacht') || null
    const guestCount = parseInt(params.get('guests') || '1', 10)
    const alcohol = params.get('alcohol') === '1'
    const paymentOption = params.get('payment') || 'INSTALLMENTS'
    const date = params.get('date') || ''
    const dealId = params.get('deal') || null
    const wholeYacht = params.get('wholeYacht') === '1' || flow === 'BOOK_WHOLE_YACHT'
    const wholeCabin = params.get('wholeCabin') === '1' || flow === 'BOOK_WHOLE_CABIN'

    const state = { packageId, yachtId, guestCount, alcohol, paymentOption, date, flow, wholeYacht, wholeCabin }

    const pricing = useMemo(() => pricingEngine({
        packageId, alcohol, guestCount, paymentOption, wholeYacht, wholeCabin,
        departureDate: date || null,
    }), [packageId, alcohol, guestCount, paymentOption, wholeYacht, wholeCabin, date])

    const yacht = yachtId ? yachtsData.find(y => y.slug === yachtId.replace(/_/g, '-')) : null
    const fleetYacht = yachtId ? getFleetYacht(yachtId) : null
    const route = DATA.routes.find(r => r.id === (packageId === '7n' ? 'route_greece_7n' : 'route_greece_5n'))

    // ── NEW: map internal flow/state to API payload schema ──
    const mapBookingMode = (flow, wholeYacht, wholeCabin) => {
        if (wholeYacht || flow === 'BOOK_WHOLE_YACHT') return 'full_yacht'
        if (wholeCabin || flow === 'BOOK_WHOLE_CABIN') return 'private_cabin'
        return 'shared'
    }

    // ── handleCheckout — calls real backend API ──
    const handleCheckout = async () => {
        if (!termsAccepted) {
            setError('Please accept the Terms & Conditions to continue.')
            return
        }

        // Validate required contact fields
        if (!fullName.trim()) {
            setError('Please enter your full name.')
            return
        }
        if (!email.trim()) {
            setError('Please enter your email address.')
            return
        }

        setError(null)
        setProcessing(true)

        trackEvent('payment_initiated', {
            flow, packageId, yachtId, guestCount, paymentOption,
            alcohol, amountDueToday: pricing.amountDueToday,
        })

        // Build API payload — keys match backend schema exactly
        const payload = {
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            packageType: packageId.toUpperCase(),
            departureDate: date ? date.slice(0, 10) : undefined,
            guestCount: guestCount,
            bookingMode: mapBookingMode(flow, wholeYacht, wholeCabin),
            addOns: {
                alcohol: !!alcohol,
                luggageStorageBags: 0
            },
            paymentPreference: paymentOption.toUpperCase() === 'FULL' ? 'full' : 'installments'
        };

        console.log('[SALTIE Checkout] Sending payload:', JSON.stringify(payload, null, 2))

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/create-checkout-session`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            )



            const data = await res.json().catch(() => ({}))

            // Check for BOTH checkoutUrl and url to be safe
            const redirectUrl = data.checkoutUrl || data.url;

            if (res.ok && redirectUrl) {
                // Redirect to Stripe Checkout (full browser redirect)
                window.location.href = redirectUrl;
                return;
            }

            // API returned an error — surface backend validation errors if present
            setError(data.error || data.errors?.join(', ') || 'Something went wrong. Please try again.')
            setProcessing(false)
        } catch (err) {
            // Network failure
            setError('Unable to connect to the payment server. Please check your connection and try again.')
            setProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Secure Checkout | Book Your Greece Yacht Holiday"
                description="Finalize your Greece yacht vacation booking. Secure checkout for our epic 5-night and 7-night party sailing packages."
                keywords="Book Greece party yacht, Secure checkout yacht charter, Pay for Greek sailing holiday"
            />
            <Navbar />
            <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
                {/* Header */}
                <h1 className="sr-only">Secure Booking Checkout for Your Greece Party Yacht</h1>
                <h2 className="font-punchy text-3xl md:text-4xl italic uppercase mb-2">
                    {wholeCabin ? 'Whole Cabin' : wholeYacht ? 'Whole Yacht' : flow === 'BOOK_YACHT' ? 'Yacht' : 'Tour'} <span className="text-amber-500">Checkout</span>
                </h2>
                <p className="text-sm text-slate-500 mb-8">Review your booking and complete payment</p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Left — Details */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Yacht info (if applicable) */}
                        {yacht && (
                            <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <img src={yacht.heroImage} alt={yacht.name} className="w-20 h-20 rounded-xl object-cover" />
                                <div>
                                    <h3 className="font-bold text-base">{yacht.name}</h3>
                                    <p className="text-xs text-slate-500">{guestCount} guests • {fleetYacht?.capacityGuests || '?'} capacity • Built {fleetYacht?.year}</p>
                                    {yacht.badge && <span className={`inline-block mt-1 text-[9px] px-2 py-0.5 rounded-full font-bold font-space ${yacht.badgeStyle}`}>{yacht.badge}</span>}
                                </div>
                            </div>
                        )}

                        {/* Package info */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
                            <h4 className="font-bold text-sm uppercase">Package Details</h4>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Package</span><span className="font-bold">{pricing.pkg?.name}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Guests</span><span className="font-bold">{guestCount}</span></div>
                            {date && <div className="flex justify-between text-sm"><span className="text-slate-500">Date</span><span className="font-bold">{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>}
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Alcohol Add-on</span><span className="font-bold">{alcohol ? '✓ Yes' : '✗ No'}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-500">Payment</span><span className="font-bold">{paymentOption === 'FULL' ? 'Full Payment' : 'Booking Payment (33%)'}</span></div>
                        </div>

                        {/* Route */}
                        <RouteCard packageId={packageId} />

                        {/* ── NEW: Contact Information fields ── */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                            <h4 className="font-bold text-sm uppercase">Your Details</h4>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1" htmlFor="checkout-fullname">Full Name *</label>
                                <input
                                    id="checkout-fullname"
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="e.g. Sarah Jenkins"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1" htmlFor="checkout-email">Email *</label>
                                <input
                                    id="checkout-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="e.g. sarah@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500 mb-1" htmlFor="checkout-phone">Phone (optional)</label>
                                <input
                                    id="checkout-phone"
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="e.g. +44 7700 900000"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                                />
                            </div>
                        </div>

                        {/* What's included */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <h4 className="font-bold text-sm uppercase mb-3">What's Included</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                {pricing.pkg?.included?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                        <span className="material-icons text-amber-500 text-xs">check</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Disclaimers section */}
                        <div className="space-y-3">
                            {/* Alcohol disclaimer — conditional */}
                            {alcohol && (
                                <div className="p-4 bg-neon-pink/5 border border-neon-pink/20 rounded-xl">
                                    <h4 className="text-xs font-bold text-neon-pink uppercase mb-1 font-space">{ALCOHOL_ADDON.disclaimer.title}</h4>
                                    <p className="text-[10px] text-slate-600 leading-tight">{ALCOHOL_ADDON.disclaimer.text}</p>
                                </div>
                            )}

                            {/* No BYO — always shown */}
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                                <span className="material-icons text-neon-pink text-sm">block</span>
                                <span className="text-[10px] font-bold text-slate-600 uppercase font-space">{DATA.globalRules.intoxicationPolicy.copyShort}</span>
                            </div>

                            {/* Safety briefing */}
                            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                                <span className="material-icons text-amber-500 text-sm">shield</span>
                                <span className="text-[10px] font-bold text-slate-600 uppercase font-space">Mandatory safety briefing before boarding — no additional cost</span>
                            </div>

                            {/* Route disclaimer */}
                            {route?.disclaimers?.map((d, i) => (
                                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                                    <span className="material-icons text-slate-400 text-sm">info</span>
                                    <span className="text-[10px] text-slate-500 font-space">{d}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Payment summary */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="md:sticky md:top-24">
                            <PriceBreakdownCard pricing={pricing} state={state} />

                            {/* T&C checkbox */}
                            <label className="flex items-start gap-3 mt-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={e => { setTermsAccepted(e.target.checked); setError(null) }}
                                    className="mt-1 w-4 h-4 rounded accent-amber-500"
                                />
                                <span className="text-xs text-slate-500 leading-tight">
                                    I agree to the <a href="#" className="text-amber-600 underline">Terms & Conditions</a>, <a href="#" className="text-amber-600 underline">Privacy Policy</a>, and the cancellation policy. I confirm I am at least 18 years old.
                                </span>
                            </label>

                            {/* Error — visible in the UI near the submit button */}
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-xl mt-3">
                                    <p className="text-xs text-red-600 font-bold">{error}</p>
                                </div>
                            )}

                            {/* Pay button */}
                            <button
                                onClick={handleCheckout}
                                disabled={processing}
                                className={`w-full mt-4 py-4 rounded-2xl font-punchy uppercase tracking-widest transition-all text-sm cursor-pointer
                                    ${processing ? 'bg-slate-200 text-slate-400 cursor-wait' : 'bg-amber-500 text-white hover:bg-slate-900'}`}
                            >
                                {processing ? 'Processing...' : `Pay €${pricing.amountDueToday} Now →`}
                            </button>

                            <p className="text-center text-[10px] text-slate-400 mt-2 font-space">
                                Secure payment via Stripe. Your card details never touch our servers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
