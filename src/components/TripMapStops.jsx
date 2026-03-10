// ── Trip Map + Stops Viewer ──────────────────────────────
// Interactive Cyclades map with numbered pins + trip-views panel.
// Data-driven from yachtDaysGreece.json routes.
import { useState, useCallback } from 'react'
import { useBooking } from '../context/BookingProvider'
import DATA from '../data/yachtDaysGreece.json'

/* ── type badge colours ────────────────────────────────── */
const TYPE_COLORS = {
    party: { bg: 'bg-neon-pink/20', text: 'text-neon-pink', border: 'border-neon-pink/30' },
    culture: { bg: 'bg-neon-aqua/20', text: 'text-neon-aqua', border: 'border-neon-aqua/30' },
    'party+culture': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-400/30' },
    'chill+swim': { bg: 'bg-blue-400/20', text: 'text-blue-400', border: 'border-blue-400/30' },
    'culture+views': { bg: 'bg-amber-400/20', text: 'text-amber-400', border: 'border-amber-400/30' },
}

/* ── gradient fallback for missing thumbs ──────────────── */
const FALLBACK_GRADIENTS = [
    'from-neon-pink/60 to-purple-600/60',
    'from-neon-aqua/60 to-blue-600/60',
    'from-amber-500/60 to-rose-500/60',
    'from-emerald-400/60 to-cyan-500/60',
    'from-violet-500/60 to-fuchsia-500/60',
]

const isDevMode = () => {
    try { return new URLSearchParams(window.location.search).has('dev') } catch { return false }
}

export default function TripMapStops({ routeId, activeStopIdx, onStopClick, hidePanel }) {
    const route = DATA.routes.find(r => r.id === routeId)
    const { openBooking } = useBooking()
    const [internalIdx, setInternalIdx] = useState(0)
    const [imgErrors, setImgErrors] = useState({})

    // Use external index if provided, otherwise internal
    const activeIdx = activeStopIdx !== undefined ? activeStopIdx : internalIdx
    const handleStopClick = (i) => {
        if (onStopClick) onStopClick(i)
        else setInternalIdx(i)
    }

    const stops = route?.map?.stops || []
    const mapAsset = route?.map?.asset
    const activeStop = stops[activeIdx] || stops[0]

    /* ── dev-mode: log click position on map ───────────── */
    const handleMapClick = useCallback((e) => {
        if (!isDevMode()) return
        const rect = e.currentTarget.getBoundingClientRect()
        const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
        const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)
        console.log(`📍 Pin position: { "x": ${x}, "y": ${y} }`)
    }, [])

    if (!route || stops.length === 0) return null

    const typeStyle = TYPE_COLORS[activeStop.type] || TYPE_COLORS.culture

    return (
        <section className={`${hidePanel ? '' : 'py-16 px-6 md:py-24 bg-background-dark'}`} id="route-map">
            <div className="max-w-7xl mx-auto">
                {/* ── Section Header ────────────────────── */}
                {!hidePanel && (
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="font-punchy text-3xl md:text-6xl font-bold uppercase tracking-tighter italic text-white">
                            Route Map <span className="text-neon-aqua">& Stops</span>
                        </h2>
                        <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mt-2">
                            {route.name} • {route.region}
                        </p>
                    </div>
                )}

                {/* ── Layout: Map + Panel ───────────────── */}
                <div className={`flex flex-col ${hidePanel ? '' : 'lg:flex-row'} gap-6 lg:gap-8`}>

                    {/* LEFT: Map */}
                    <div className={`${hidePanel ? 'w-full' : 'lg:w-[60%]'} relative`}>
                        <div
                            className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 cursor-crosshair"
                            style={{ aspectRatio: '16/10' }}
                            onClick={handleMapClick}
                        >
                            {/* Map background */}
                            {mapAsset ? (
                                <img src={mapAsset} alt="Cyclades map" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800" />
                            )}

                            {/* ── SVG overlay: route lines + pins ── */}
                            <svg
                                className="absolute inset-0 w-full h-full"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Dashed route polyline */}
                                <polyline
                                    points={stops.map(s => `${s.pos.x},${s.pos.y}`).join(' ')}
                                    fill="none"
                                    stroke="rgba(57,245,226,0.35)"
                                    strokeWidth="0.4"
                                    strokeDasharray="1.5,1"
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* ── Pins (HTML for richer styling) ── */}
                            {stops.map((stop, i) => {
                                const isActive = i === activeIdx
                                return (
                                    <button
                                        key={stop.id}
                                        onClick={(e) => { e.stopPropagation(); handleStopClick(i) }}
                                        className={`absolute flex items-center justify-center transition-all duration-300 group z-10
                                            ${isActive
                                                ? 'w-10 h-10 md:w-12 md:h-12 -ml-5 -mt-5 md:-ml-6 md:-mt-6 scale-110'
                                                : 'w-8 h-8 md:w-9 md:h-9 -ml-4 -mt-4 md:-ml-[18px] md:-mt-[18px] hover:scale-110'
                                            }`}
                                        style={{ left: `${stop.pos.x}%`, top: `${stop.pos.y}%` }}
                                        aria-label={`Stop ${stop.label}: ${stop.name}`}
                                    >
                                        {/* Glow ring */}
                                        {isActive && (
                                            <span className="absolute inset-0 rounded-xl bg-neon-aqua/30 animate-ping" />
                                        )}
                                        {/* Pin body */}
                                        <span className={`relative flex items-center justify-center rounded-xl font-punchy text-xs font-black uppercase tracking-tighter transition-all
                                            ${isActive
                                                ? 'w-10 h-10 md:w-12 md:h-12 bg-neon-aqua text-background-dark shadow-lg shadow-neon-aqua/50 border-2 border-white/30'
                                                : 'w-8 h-8 md:w-9 md:h-9 bg-background-dark/90 text-white/80 border border-white/20 group-hover:border-neon-aqua/60 group-hover:text-neon-aqua'
                                            }`}
                                        >
                                            {stop.label}
                                        </span>
                                        {/* Name tooltip */}
                                        <span className={`absolute whitespace-nowrap text-[9px] md:text-[10px] font-bold uppercase tracking-wider pointer-events-none transition-all
                                            ${isActive ? 'text-neon-aqua opacity-100' : 'text-white/60 opacity-0 group-hover:opacity-100'}
                                            ${stop.pos.y < 30 ? 'top-full mt-1' : 'bottom-full mb-1'}
                                        `}>
                                            {stop.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Stop dots row (mobile shortcut) — hidden when parent controls navigation */}
                        {!hidePanel && (
                            <div className="flex items-center justify-center gap-2 mt-4 lg:hidden">
                                {stops.map((stop, i) => (
                                    <button
                                        key={stop.id}
                                        onClick={() => handleStopClick(i)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all border
                                        ${i === activeIdx
                                                ? 'bg-neon-aqua/20 border-neon-aqua text-neon-aqua'
                                                : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                                            }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${i === activeIdx ? 'bg-neon-aqua' : 'bg-white/30'}`} />
                                        {stop.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Trip Views Panel */}
                    {!hidePanel && (
                        <div className="lg:w-[40%] flex flex-col">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex-1 flex flex-col">
                                {/* Panel header */}
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-2 h-2 rounded-full bg-neon-aqua animate-pulse" />
                                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-space">
                                        Trip Views
                                    </h3>
                                    <span className="ml-auto text-[9px] font-bold text-white/30 uppercase font-space">
                                        {activeIdx + 1} / {stops.length}
                                    </span>
                                </div>

                                {/* Thumbnail */}
                                <div className="relative w-full rounded-2xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
                                    {activeStop.thumb && !imgErrors[activeStop.id] ? (
                                        <img
                                            src={activeStop.thumb}
                                            alt={activeStop.name}
                                            className="w-full h-full object-cover"
                                            onError={() => setImgErrors(prev => ({ ...prev, [activeStop.id]: true }))}
                                        />
                                    ) : (
                                        /* Gradient fallback */
                                        <div className={`w-full h-full bg-gradient-to-br ${FALLBACK_GRADIENTS[activeIdx % FALLBACK_GRADIENTS.length]} flex items-center justify-center`}>
                                            <span className="text-white/80 font-punchy text-2xl md:text-3xl font-bold uppercase italic tracking-tighter">
                                                {activeStop.name}
                                            </span>
                                        </div>
                                    )}
                                    {/* Day badge */}
                                    {activeStop.day && (
                                        <div className="absolute top-3 left-3 bg-background-dark/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                            <span className="text-[9px] font-bold text-neon-aqua uppercase font-space">Day {activeStop.day}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Stop name + type */}
                                <div className="flex items-center gap-3 mb-3">
                                    <h4 className="font-punchy text-xl md:text-2xl font-bold text-white uppercase italic tracking-tighter">
                                        {activeStop.viewTitle || activeStop.name}
                                    </h4>
                                </div>
                                {activeStop.type && (
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase border mb-4 w-fit
                                    ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>
                                        {activeStop.type === 'party' && '🎉'}
                                        {activeStop.type === 'culture' && '🏛️'}
                                        {activeStop.type === 'party+culture' && '🎉🏛️'}
                                        {activeStop.type === 'chill+swim' && '🏊'}
                                        {activeStop.type === 'culture+views' && '🏛️🌅'}
                                        {' '}{activeStop.type.replace('+', ' + ')}
                                    </span>
                                )}

                                {/* Copy */}
                                <p className="text-sm md:text-base text-white/70 leading-relaxed flex-1">
                                    {activeStop.viewCopy || 'Details coming soon.'}
                                </p>

                                {/* Divider */}
                                <div className="border-t border-white/10 my-6" />

                                {/* CTA */}
                                <button
                                    onClick={() => openBooking({ action: 'BOOK_TOUR', source: 'route-map' })}
                                    className="w-full bg-gradient-to-r from-neon-pink to-neon-pink/80 text-white font-bold py-4 rounded-2xl uppercase tracking-wider text-sm shadow-lg shadow-neon-pink/30 cursor-pointer hover:opacity-90 transition-opacity font-punchy"
                                >
                                    Reserve This Trip →
                                </button>
                            </div>

                            {/* Disclaimer */}
                            <p className="text-[9px] text-white/30 text-center mt-3 font-space">
                                ⚓ Stops may shift slightly due to weather/safety.
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Dev mode indicator ────────────────── */}
                {isDevMode() && (
                    <div className="fixed bottom-4 left-4 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-full z-50 shadow-lg">
                        🛠 DEV MODE — Click map to log pin positions
                    </div>
                )}
            </div>
        </section>
    )
}
