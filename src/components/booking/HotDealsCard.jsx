import { hotDeals } from '../../data/yachts'
import { useBooking } from '../../context/BookingProvider'

export default function HotDealsCard({ max = 4 }) {
    const { openBooking, closeBooking } = useBooking()
    const deals = hotDeals.slice(0, max)

    if (!deals.length) return null

    return (
        <div className="mt-6">
            <h4 className="text-[10px] font-bold uppercase text-neon-pink tracking-widest mb-3 font-space flex items-center gap-1">
                <span className="material-icons text-xs">local_fire_department</span>
                Hot Deals
            </h4>
            <div className="space-y-2">
                {deals.map((deal) => (
                    <button
                        key={deal.yacht}
                        onClick={() => {
                            closeBooking()
                            setTimeout(() => openBooking({ action: 'book-yacht', entityType: 'yacht', entityId: deal.yacht, source: 'hot-deal-card' }), 350)
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-neon-pink/40 transition-all text-left cursor-pointer group bg-white"
                    >
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                            <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h5 className="font-bold text-xs uppercase truncate">{deal.title}</h5>
                            <p className="text-[10px] text-slate-400 truncate">{deal.route} · {deal.date}</p>
                        </div>
                        <div className="shrink-0 text-right">
                            <span className="bg-neon-pink text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{deal.discount}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
