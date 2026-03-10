// ── Quote Page ──────────────────────────────────────────
// Simple lead capture form with prefill from URL intent params.
// Styled to match the existing neon/glass design system.

import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { saveLead } from '../lib/leadsApi'
import { trackEvent } from '../lib/bookingTracker'
import DATA from '../data/yachtDaysGreece.json'
import { getPersistedIntent, clearIntent } from '../utils/bookingIntent'
import SEO from '../components/SEO'

export default function QuotePage() {
    const [params] = useSearchParams()

    // Prefill from URL params or persisted intent
    const intent = getPersistedIntent()
    const prefillPackage = params.get('package') || intent?.packageId || ''
    const prefillYacht = params.get('yacht') || intent?.yachtId || ''
    const prefillSource = params.get('source') || intent?.sourceCTA || 'quote-page'

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        groupSize: '',
        preferredPackage: prefillPackage,
        preferredMonth: '',
        notes: '',
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const update = (key, value) => setForm(f => ({ ...f, [key]: value }))

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Required'
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
        if (!form.groupSize) e.groupSize = 'Required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        saveLead({ ...form, source: prefillSource, yachtId: prefillYacht })
        trackEvent('quote_submitted', { flow: 'QUOTE', source: prefillSource, package: form.preferredPackage })
        clearIntent()
        setSubmitted(true)
    }

    // ── Success Screen ──
    if (submitted) return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900">
            <SEO
                title="Greece Yacht Vacation Cost | Get a Custom Quote"
                description="Find out the cost of a highly social Greece party yacht vacation. Get a personalized quote for your unforgettable Greek island sailing holiday today."
                keywords="Greece party yacht vacation cost, Greek social sailing holiday prices, Yacht cruise quote"
            />
            <Navbar />
            <div className="max-w-lg mx-auto px-6 pt-32 pb-20 text-center">
                <div className="w-20 h-20 bg-neon-aqua/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-icons text-neon-aqua text-4xl">check_circle</span>
                </div>
                <h1 className="sr-only">Get a Quote for Your Greek Yacht Vacation</h1>
                <h2 className="font-punchy text-3xl italic uppercase mb-3">Request <span className="text-neon-aqua">Sent!</span></h2>
                <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">We'll reply within 24 hours. Check your inbox (and spam) for a confirmation.</p>
                <div className="space-y-3">
                    <Link to="/" className="block w-full px-10 py-4 bg-neon-aqua text-slate-900 font-punchy rounded-2xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest text-sm text-center">
                        Back to Home
                    </Link>
                    {/* <Link to="/destinations" className="block w-full px-10 py-4 bg-slate-100 text-slate-900 font-punchy rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-sm text-center">
                        Explore Destinations
                    </Link> */}
                </div>
            </div>
            <Footer />
        </div>
    )

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900">
            <SEO
                title="Greece Yacht Vacation Cost | Get a Custom Quote"
                description="Find out the cost of a highly social Greece party yacht vacation. Get a personalized quote for your unforgettable Greek island sailing holiday today."
                keywords="Greece party yacht vacation cost, Greek social sailing holiday prices, Yacht cruise quote"
            />
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
                <h1 className="sr-only">Get a Quote for Your Greek Yacht Vacation</h1>
                <h2 className="font-punchy text-3xl md:text-4xl italic uppercase mb-2">
                    Get a <span className="text-neon-aqua">Quote</span>
                </h2>
                <p className="text-sm text-slate-500 mb-8">Tell us what you're looking for — we'll reply within 24 hours.</p>

                {/* Prefill indicator */}
                {(prefillPackage || prefillYacht) && (
                    <div className="bg-neon-aqua/10 border border-neon-aqua/20 rounded-xl p-4 mb-6">
                        <span className="text-[10px] font-bold font-space text-neon-aqua uppercase">Enquiring About</span>
                        <p className="font-bold text-sm mt-1 capitalize">
                            {prefillPackage && `${prefillPackage === '5n' ? '5 Night' : '7 Night'} Package`}
                            {prefillPackage && prefillYacht && ' • '}
                            {prefillYacht && prefillYacht.replace(/[-_]/g, ' ')}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Full Name *</label>
                            <input
                                className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm`}
                                type="text" value={form.name} placeholder="Your name"
                                onChange={e => update('name', e.target.value)}
                            />
                            {errors.name && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.name}</span>}
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Email *</label>
                            <input
                                className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm`}
                                type="email" value={form.email} placeholder="you@example.com"
                                onChange={e => update('email', e.target.value)}
                            />
                            {errors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.email}</span>}
                        </div>
                    </div>

                    {/* Phone + Group Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Phone / WhatsApp</label>
                            <input
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm"
                                type="tel" value={form.phone} placeholder="+44 7..."
                                onChange={e => update('phone', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Group Size *</label>
                            <input
                                className={`w-full bg-white border ${errors.groupSize ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm`}
                                type="number" value={form.groupSize} placeholder="e.g. 6"
                                onChange={e => update('groupSize', e.target.value)}
                            />
                            {errors.groupSize && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.groupSize}</span>}
                        </div>
                    </div>

                    {/* Package + Month */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Preferred Package</label>
                            <select
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm"
                                value={form.preferredPackage}
                                onChange={e => update('preferredPackage', e.target.value)}
                            >
                                <option value="">Any</option>
                                {DATA.packages.map(p => <option key={p.id} value={p.nights === 5 ? '5n' : '7n'}>{p.name} — €{p.price}/pp</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Preferred Month</label>
                            <select
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm"
                                value={form.preferredMonth}
                                onChange={e => update('preferredMonth', e.target.value)}
                            >
                                <option value="">Flexible</option>
                                {['April', 'May', 'June', 'July', 'August', 'September', 'October'].map(m => <option key={m} value={m}>{m} 2026</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 block font-space">Notes</label>
                        <textarea
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-aqua shadow-sm resize-none h-24"
                            value={form.notes}
                            onChange={e => update('notes', e.target.value)}
                            placeholder="Anything else we should know..."
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-neon-aqua text-slate-900 py-4 rounded-2xl font-punchy uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all cursor-pointer text-sm shadow-lg shadow-neon-aqua/20"
                    >
                        Send Quote Request →
                    </button>

                    {/* Trust signals */}
                    <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-space uppercase">
                        <span className="flex items-center gap-1"><span className="material-icons text-xs text-neon-aqua">shield</span> No spam</span>
                        <span className="flex items-center gap-1"><span className="material-icons text-xs text-neon-aqua">schedule</span> Reply in 24h</span>
                        <span className="flex items-center gap-1"><span className="material-icons text-xs text-neon-aqua">lock</span> Secure</span>
                    </div>
                </form>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-sm uppercase mb-2">5 Nights • €739/pp</h4>
                        <p className="text-xs text-slate-500">Mykonos (2) → Milos (1) → Santorini (2)</p>
                        <p className="text-[10px] text-slate-400 mt-1">Half-board included</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-sm uppercase mb-2">7 Nights • €929/pp</h4>
                        <p className="text-xs text-slate-500">Mykonos (2) → Ios (2) → Santorini (2) → Milos (1)</p>
                        <p className="text-[10px] text-slate-400 mt-1">Half-board included</p>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-[10px] text-slate-400 mt-6 font-space">
                    {DATA.operations.timeDisclaimer} • {DATA.globalRules.ageCheck.copy}
                </p>
            </div>
            <Footer />
        </div>
    )
}
