import { useState, useEffect } from 'react'
import { useBooking } from '../../context/BookingProvider'

const ABANDON_KEY = 'saltie_abandon'
const AUTO_DISMISS_MS = 15000

export default function AbandonWidget() {
    const { isOpen, openBooking } = useBooking()
    const [show, setShow] = useState(false)
    const [intent, setIntent] = useState(null)

    useEffect(() => {
        // When modal closes, check if there's a stored intent
        if (isOpen) {
            setShow(false)
            return
        }

        const timer = setTimeout(() => {
            try {
                const raw = sessionStorage.getItem(ABANDON_KEY)
                if (!raw) return
                const data = JSON.parse(raw)
                // Only show if intent was stored in the last 5 minutes
                if (Date.now() - data.timestamp > 5 * 60 * 1000) {
                    sessionStorage.removeItem(ABANDON_KEY)
                    return
                }
                setIntent(data)
                setShow(true)
            } catch { /* silent */ }
        }, 800) // small delay after modal close

        return () => clearTimeout(timer)
    }, [isOpen])

    // Auto-dismiss after 15s
    useEffect(() => {
        if (!show) return
        const timer = setTimeout(() => {
            setShow(false)
            sessionStorage.removeItem(ABANDON_KEY)
        }, AUTO_DISMISS_MS)
        return () => clearTimeout(timer)
    }, [show])

    if (!show || !intent || isOpen) return null

    const handleClick = () => {
        setShow(false)
        sessionStorage.removeItem(ABANDON_KEY)
        openBooking({
            action: intent.flow,
            entityType: intent.entityType,
            entityId: intent.entityId,
            yachtId: intent.yachtId,
            source: 'abandon-widget',
        })
    }

    const handleDismiss = (e) => {
        e.stopPropagation()
        setShow(false)
        sessionStorage.removeItem(ABANDON_KEY)
    }

    return (
        <div
            className="fixed bottom-6 left-6 z-[190] animate-in cursor-pointer group"
            onClick={handleClick}
        >
            <div className="relative">
                {/* Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-aqua to-primary rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                {/* Card */}
                <div className="relative bg-slate-900 text-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-2xl border border-white/10">
                    <div className="w-8 h-8 bg-neon-aqua/20 rounded-lg flex items-center justify-center shrink-0">
                        <span className="material-icons text-neon-aqua text-sm">sailing</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-neon-aqua uppercase font-space">Continue booking?</p>
                        <p className="text-xs text-white/60">Pick up where you left off →</p>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="ml-2 text-white/30 hover:text-white transition-colors cursor-pointer"
                    >
                        <span className="material-icons text-sm">close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
