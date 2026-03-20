// ── Booking Date Picker ─────────────────────────────────
// Calendar grid: only Mon/Wed/Fri from 20 Apr 2026 → 31 Oct 2026 are selectable
import { useState, useMemo } from 'react'

const SEASON_START = new Date(2026, 2, 20) // Apr 20 2026
const SEASON_END = new Date(2026, 9, 31) // Oct 31 2026
const ALLOWED_DAYS = [1, 3, 5]             // Mon, Wed, Fri

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isSelectable(date) {
    if (date < SEASON_START || date > SEASON_END) return false
    return ALLOWED_DAYS.includes(date.getDay())
}

function getCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1)
    let startOffset = (firstDay.getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    for (let i = 0; i < startOffset; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))
    return days
}

export default function BookingDatePicker({ selectedDate, onSelect }) {
    const [viewMonth, setViewMonth] = useState(() => {
        if (selectedDate) return { year: selectedDate.getFullYear(), month: selectedDate.getMonth() }
        return { year: SEASON_START.getFullYear(), month: SEASON_START.getMonth() }
    })

    const days = useMemo(() => getCalendarDays(viewMonth.year, viewMonth.month), [viewMonth.year, viewMonth.month])

    const canGoPrev = viewMonth.year > 2026 || (viewMonth.year === 2026 && viewMonth.month > 3)
    const canGoNext = viewMonth.year < 2026 || (viewMonth.year === 2026 && viewMonth.month < 9)

    const prevMonth = () => {
        if (!canGoPrev) return
        setViewMonth(v => {
            const m = v.month - 1
            return m < 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: m }
        })
    }

    const nextMonth = () => {
        if (!canGoNext) return
        setViewMonth(v => {
            const m = v.month + 1
            return m > 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: m }
        })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {/* Header — month/year nav */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                <button
                    onClick={prevMonth}
                    disabled={!canGoPrev}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${canGoPrev ? 'hover:bg-slate-200 cursor-pointer text-slate-700' : 'text-slate-300 cursor-default'}`}
                >
                    <span className="material-icons text-lg">chevron_left</span>
                </button>
                <span className="font-punchy text-sm uppercase tracking-wider">
                    {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
                </span>
                <button
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${canGoNext ? 'hover:bg-slate-200 cursor-pointer text-slate-700' : 'text-slate-300 cursor-default'}`}
                >
                    <span className="material-icons text-lg">chevron_right</span>
                </button>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 px-2 pt-2">
                {DAY_LABELS.map(d => (
                    <div key={d} className={`text-center text-[10px] font-bold uppercase font-space py-1 ${['Mon', 'Wed', 'Fri'].includes(d) ? 'text-neon-aqua' : 'text-slate-300'}`}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 px-2 pb-3 gap-y-1">
                {days.map((day, i) => {
                    if (!day) return <div key={`blank-${i}`} />

                    const selectable = isSelectable(day) && day >= today
                    const isSelected = selectedDate && isSameDay(day, selectedDate)
                    const isToday = isSameDay(day, today)
                    const isPast = day < today

                    return (
                        <button
                            key={day.toISOString()}
                            disabled={!selectable}
                            onClick={() => selectable && onSelect(day)}
                            className={`
                                relative w-full aspect-square flex items-center justify-center rounded-xl text-sm font-space transition-all
                                ${isSelected
                                    ? 'bg-neon-aqua text-white font-bold shadow-lg shadow-neon-aqua/30 scale-105'
                                    : selectable
                                        ? 'hover:bg-neon-aqua/10 hover:text-neon-aqua cursor-pointer text-slate-700 font-medium'
                                        : isPast
                                            ? 'text-slate-200 cursor-default'
                                            : 'text-slate-300 cursor-default'
                                }
                            `}
                        >
                            {day.getDate()}
                            {isToday && !isSelected && (
                                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-pink" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="px-4 pb-3 flex items-center gap-4 border-t border-slate-100 pt-2">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-neon-aqua" />
                    <span className="text-[10px] text-slate-500 font-space">Available (Mon · Wed · Fri)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-[10px] text-slate-500 font-space">Unavailable</span>
                </div>
            </div>
        </div>
    )
}
