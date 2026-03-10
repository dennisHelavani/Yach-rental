import { useState, useEffect } from 'react'
import { useBooking } from '../../context/BookingProvider'
import { getEvents, clearEvents } from '../../lib/bookingTracker'

export default function DebugPanel() {
    const { isOpen, state, pricing } = useBooking()
    const [visible, setVisible] = useState(false)
    const [collapsed, setCollapsed] = useState(true)
    const [events, setEvents] = useState([])

    // Only render if ?debugBooking=1
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        setVisible(params.get('debugBooking') === '1')
    }, [])

    // Refresh events periodically
    useEffect(() => {
        if (!visible) return
        const refresh = () => setEvents(getEvents().slice(-8).reverse())
        refresh()
        const id = setInterval(refresh, 1000)
        return () => clearInterval(id)
    }, [visible, isOpen, state])

    if (!visible) return null

    return (
        <div className="fixed bottom-4 left-4 z-[300] font-mono text-[10px]" style={{ maxWidth: 380 }}>
            {/* Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="bg-slate-900 text-neon-aqua px-3 py-1.5 rounded-t-lg border border-white/10 border-b-0 font-bold uppercase cursor-pointer hover:bg-slate-800 transition-colors"
            >
                🐛 Debug {collapsed ? '▲' : '▼'}
            </button>

            {!collapsed && (
                <div className="bg-slate-900 text-white border border-white/10 rounded-b-lg rounded-tr-lg p-3 shadow-2xl max-h-[60vh] overflow-y-auto space-y-3">
                    {/* State */}
                    <div>
                        <h5 className="text-neon-aqua font-bold uppercase mb-1">Booking State</h5>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                            <span className="text-white/40">open</span><span>{isOpen ? '✅' : '—'}</span>
                            <span className="text-white/40">flow</span><span className="text-neon-pink">{state.flow || '—'}</span>
                            <span className="text-white/40">step</span><span>{state.step}</span>
                            <span className="text-white/40">entityType</span><span>{state.entityType || '—'}</span>
                            <span className="text-white/40">entityId</span><span>{state.entityId || '—'}</span>
                            <span className="text-white/40">source</span><span>{state.source || '—'}</span>
                            <span className="text-white/40">packageId</span><span>{state.packageId}</span>
                            <span className="text-white/40">alcohol</span><span>{state.alcohol ? '🍷' : '—'}</span>
                            <span className="text-white/40">bookingType</span><span>{state.bookingType}</span>
                            <span className="text-white/40">spots</span><span>{state.spots}</span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div>
                        <h5 className="text-neon-aqua font-bold uppercase mb-1">Pricing</h5>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                            <span className="text-white/40">perPerson</span><span>€{pricing.perPerson}</span>
                            <span className="text-white/40">addons</span><span>€{pricing.addons}</span>
                            <span className="text-white/40">total</span><span className="text-neon-aqua font-bold">€{pricing.total}</span>
                            <span className="text-white/40">dueToday</span><span className="text-neon-pink font-bold">€{pricing.amountDueToday}</span>
                        </div>
                    </div>

                    {/* Events */}
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <h5 className="text-neon-aqua font-bold uppercase">Recent Events</h5>
                            <button onClick={() => { clearEvents(); setEvents([]) }} className="text-white/30 hover:text-white cursor-pointer">clear</button>
                        </div>
                        {events.length === 0 ? (
                            <p className="text-white/30 italic">No events yet</p>
                        ) : (
                            <div className="space-y-1">
                                {events.map((ev, i) => (
                                    <div key={i} className="bg-white/5 rounded px-2 py-1">
                                        <span className="text-neon-pink">{ev.event}</span>
                                        {ev.flow && <span className="text-white/40 ml-2">flow:{ev.flow}</span>}
                                        {ev.step != null && <span className="text-white/40 ml-1">s:{ev.step}</span>}
                                        {ev.source && <span className="text-white/40 ml-1">src:{ev.source}</span>}
                                        <span className="text-white/20 ml-2">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
