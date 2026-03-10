// ── Last Cabin Alert Widget ─────────────────────────────
// Floating banner showing low-availability yachts
// Closeable — stores dismissal in sessionStorage

import { useState, useEffect } from 'react'
import { yachtsData } from '../../data/yachts'
import { useBooking } from '../../context/BookingProvider'

const DISMISS_KEY = 'saltie_last_cabin_dismissed'

export default function LastCabinAlert() {
    const [visible, setVisible] = useState(false)
    const [deal, setDeal] = useState(null)
    const { openBooking } = useBooking()

    useEffect(() => {
        const dismissed = sessionStorage.getItem(DISMISS_KEY)
        if (dismissed) return

        // Find yacht with lowest remaining cabins
        const lowAvail = yachtsData
            .filter(y => y.cabinsRemaining && y.cabinsRemaining <= 2)
            .sort((a, b) => a.cabinsRemaining - b.cabinsRemaining)[0]

        if (lowAvail) {
            setDeal(lowAvail)
            // Delay appearance for better UX
            const timer = setTimeout(() => setVisible(true), 4000)
            return () => clearTimeout(timer)
        }
    }, [])

    const dismiss = () => {
        setVisible(false)
        sessionStorage.setItem(DISMISS_KEY, '1')
    }

    if (!visible || !deal) return null

    return (
        <div className="fixed bottom-4 right-4 z-[150] max-w-xs animate-in">
            <div className="bg-slate-900/95 backdrop-blur-md border border-neon-pink/30 rounded-2xl p-4 shadow-2xl shadow-neon-pink/10">
                <button onClick={dismiss} className="absolute top-2 right-2 text-slate-400 hover:text-white cursor-pointer">
                    <span className="material-icons text-sm">close</span>
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neon-pink/20 flex items-center justify-center shrink-0">
                        <span className="material-icons text-neon-pink text-lg">local_fire_department</span>
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">
                            {deal.cabinsRemaining === 1 ? 'Last cabin' : `${deal.cabinsRemaining} cabins left`} on {deal.name}!
                        </p>
                        <p className="text-slate-400 text-[10px] font-space uppercase">{deal.remainingMonth} departures</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        dismiss()
                        openBooking({
                            action: 'BOOK_YACHT',
                            yachtId: deal.slug.replace(/-/g, '_'),
                            source: 'last_cabin_alert',
                        })
                    }}
                    className="w-full mt-3 bg-neon-pink text-white py-2 rounded-xl font-punchy uppercase text-xs tracking-widest hover:bg-neon-pink/80 transition-colors cursor-pointer"
                >
                    Book Now →
                </button>
            </div>
        </div>
    )
}
