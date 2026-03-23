import { useState, useEffect } from 'react'

const CONSENT_KEY = 'saltie_cookie_consent'

/**
 * GDPR-compliant cookie consent banner.
 * Defaults to blocking non-essential cookies.
 * Saves consent state to localStorage so it doesn't re-appear.
 */
export default function CookieBanner() {
    const [visible, setVisible] = useState(false)
    const [showPrefs, setShowPrefs] = useState(false)
    const [prefs, setPrefs] = useState({
        necessary: true,      // Always on — session, Stripe payment tokens
        analytics: false,     // GA, Hotjar, etc.
        marketing: false,     // Meta Pixel, Google Ads, etc.
    })

    useEffect(() => {
        const saved = localStorage.getItem(CONSENT_KEY)
        if (!saved) {
            // No consent recorded → show banner
            setVisible(true)
        }
    }, [])

    const saveConsent = (consent) => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({
            ...consent,
            timestamp: new Date().toISOString(),
        }))
        setVisible(false)
        setShowPrefs(false)
    }

    const acceptAll = () => {
        saveConsent({ necessary: true, analytics: true, marketing: true })
    }

    const rejectNonEssential = () => {
        saveConsent({ necessary: true, analytics: false, marketing: false })
    }

    const savePreferences = () => {
        saveConsent(prefs)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6">
            <div className="max-w-4xl mx-auto bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-6 md:p-8">
                {!showPrefs ? (
                    <>
                        <div className="flex items-start gap-3 mb-4">
                            <span className="material-icons text-neon-aqua text-xl mt-0.5">cookie</span>
                            <div>
                                <h3 className="text-white font-punchy uppercase text-lg tracking-tight mb-1">We value your privacy</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    We use cookies to enhance your browsing experience. Strictly necessary cookies
                                    (session management, Stripe payment processing) are always active.
                                    Non-essential cookies are disabled by default and require your explicit consent.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                onClick={acceptAll}
                                className="flex-1 bg-neon-aqua text-slate-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={rejectNonEssential}
                                className="flex-1 bg-white/10 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-colors cursor-pointer"
                            >
                                Reject Non-Essential
                            </button>
                            <button
                                onClick={() => setShowPrefs(true)}
                                className="flex-1 border border-white/20 text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-neon-aqua hover:text-neon-aqua transition-colors cursor-pointer"
                            >
                                Manage Preferences
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-white font-punchy uppercase text-lg tracking-tight mb-4">Cookie Preferences</h3>
                        <div className="space-y-4 mb-6">
                            {/* Necessary — always on */}
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <div>
                                    <p className="text-white text-sm font-bold">Strictly Necessary</p>
                                    <p className="text-slate-400 text-xs mt-0.5">Session cookies, Stripe payment tokens, security. Cannot be disabled.</p>
                                </div>
                                <div className="w-10 h-6 bg-neon-aqua rounded-full relative">
                                    <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                                </div>
                            </div>

                            {/* Analytics */}
                            <label className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer">
                                <div>
                                    <p className="text-white text-sm font-bold">Analytics</p>
                                    <p className="text-slate-400 text-xs mt-0.5">Help us understand how visitors interact with our website.</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={prefs.analytics}
                                    onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                                    className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${prefs.analytics ? 'bg-neon-aqua' : 'bg-slate-600'}`}
                                >
                                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${prefs.analytics ? 'right-0.5' : 'left-0.5'}`} />
                                </button>
                            </label>

                            {/* Marketing */}
                            <label className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer">
                                <div>
                                    <p className="text-white text-sm font-bold">Marketing</p>
                                    <p className="text-slate-400 text-xs mt-0.5">Used for targeted advertising and social media tracking.</p>
                                </div>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={prefs.marketing}
                                    onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                                    className={`w-10 h-6 rounded-full relative transition-colors cursor-pointer ${prefs.marketing ? 'bg-neon-aqua' : 'bg-slate-600'}`}
                                >
                                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${prefs.marketing ? 'right-0.5' : 'left-0.5'}`} />
                                </button>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={savePreferences}
                                className="flex-1 bg-neon-aqua text-slate-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                            >
                                Save Preferences
                            </button>
                            <button
                                onClick={() => setShowPrefs(false)}
                                className="border border-white/20 text-slate-300 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-neon-aqua hover:text-neon-aqua transition-colors cursor-pointer"
                            >
                                Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
