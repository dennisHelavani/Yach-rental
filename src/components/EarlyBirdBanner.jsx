// ── Early Bird Discount Banner ───────────────────────────
// Marquee-style running banner advertising the discount window.
// Reads deadline from yachtDaysGreece.json discountWindow.
import { useBooking } from '../context/BookingProvider'
import DATA from '../data/yachtDaysGreece.json'

const promo = DATA.promotions.discountWindow

export default function EarlyBirdBanner() {
    const { openBooking } = useBooking()

    if (!promo?.enabled) return null

    const endDate = new Date(promo.discountEndDateExclusive)
    const now = new Date()
    if (now >= endDate) return null

    // Show the last eligible day (June 14) for user-friendly copy
    const lastDay = new Date(endDate)
    lastDay.setDate(lastDay.getDate() - 1)
    const deadlineLabel = lastDay.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    // Build the repeating message
    const msg = `BOOK BEFORE ${deadlineLabel.toUpperCase()} — SAVE UP TO 19% `
    // Repeat enough times for smooth infinite scroll
    const items = Array.from({ length: 8 }, (_, i) => i)

    return (
        <div
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => openBooking({ action: 'BOOK_TOUR', source: 'early-bird-banner' })}
            role="banner"
            aria-label="Early booking discount promotion"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-purple-600 to-neon-pink bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />

            {/* Glow top/bottom edges */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Marquee content */}
            <div className="relative flex items-center py-2.5 md:py-3 whitespace-nowrap">
                <div className="flex animate-marquee gap-0">
                    {items.map((i) => (
                        <span key={i} className="flex items-center gap-6 px-6 md:px-8">
                            <span className="font-punchy text-[11px] md:text-sm font-black uppercase tracking-[0.15em] text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                {msg}
                            </span>

                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
