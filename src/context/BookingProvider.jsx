// ── Booking Provider (data-driven) ──────────────────────
// Global state management for all booking flows

import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { detectIntent } from '../lib/bookingRouter'
import { pricingEngine } from '../lib/pricingEngine'
import { trackEvent } from '../lib/bookingTracker'

const BookingContext = createContext(null)
export const useBooking = () => useContext(BookingContext)

const ABANDON_KEY = 'saltie_abandon'

const INITIAL_STATE = {
    flow: null,         // 'QUOTE' | 'BOOK_YACHT' | 'BOOK_TOUR' | 'BOOK_WHOLE_YACHT' | 'BOOK_WHOLE_CABIN'
    step: 0,
    source: null,
    entityType: null,
    entityId: null,
    // Shared
    packageId: '5n',
    guestCount: 1,
    alcohol: false,
    paymentOption: 'INSTALLMENTS', // 'INSTALLMENTS' | 'FULL'
    date: '',
    // Yacht-specific
    yachtId: null,
    wholeYacht: false,
    wholeCabin: false,
    // Quote-specific
    quote: {
        name: '', email: '', phone: '', groupSize: '',
        preferredPackage: '', preferredYacht: '', preferredMonth: '', notes: '',
    },
}

export default function BookingProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({ ...INITIAL_STATE })

    // Pricing derived from state
    const pricing = useMemo(() => pricingEngine({
        packageId: state.packageId,
        alcohol: state.alcohol,
        guestCount: state.guestCount,
        paymentOption: state.paymentOption,
        wholeYacht: state.wholeYacht,
        wholeCabin: state.wholeCabin,
        departureDate: state.date || null,
    }), [state.packageId, state.alcohol, state.guestCount, state.paymentOption, state.wholeYacht, state.wholeCabin, state.date])

    const openBooking = useCallback((opts = {}) => {
        const intent = detectIntent(opts)
        const newState = {
            ...INITIAL_STATE,
            flow: intent,
            source: opts.source || null,
            entityType: opts.entityType || null,
            entityId: opts.entityId || null,
            yachtId: opts.yachtId || null,
            packageId: opts.packageId || '5n',
            wholeYacht: intent === 'BOOK_WHOLE_YACHT',
            wholeCabin: intent === 'BOOK_WHOLE_CABIN',
            guestCount: intent === 'BOOK_WHOLE_CABIN' ? 2 : 1,
            quote: { ...INITIAL_STATE.quote },
        }
        setState(newState)
        setIsOpen(true)
        trackEvent('booking_opened', {
            intent, entityType: opts.entityType, entityId: opts.entityId,
            source: opts.source, yachtId: opts.yachtId,
        })
    }, [])

    const closeBooking = useCallback(() => {
        // Save abandon state if mid-flow
        if (state.flow && state.step > 0) {
            try {
                sessionStorage.setItem(ABANDON_KEY, JSON.stringify({
                    flow: state.flow,
                    entityType: state.entityType,
                    entityId: state.entityId,
                    yachtId: state.yachtId,
                    source: state.source,
                    timestamp: Date.now(),
                }))
            } catch { /* silent */ }
        }
        trackEvent('booking_closed', {
            flow: state.flow, step: state.step,
            selections: {
                packageId: state.packageId, alcohol: state.alcohol,
                guestCount: state.guestCount, paymentOption: state.paymentOption,
                yachtId: state.yachtId,
            },
        })
        setIsOpen(false)
        setState({ ...INITIAL_STATE, quote: { ...INITIAL_STATE.quote } })
    }, [state])

    const setFlow = useCallback((flow) => {
        setState(s => ({ ...s, flow, step: 0 }))
        trackEvent('flow_selected', { flow })
    }, [])

    const nextStep = useCallback(() => {
        setState(s => {
            trackEvent('step_advanced', { flow: s.flow, from: s.step, to: s.step + 1 })
            return { ...s, step: s.step + 1 }
        })
    }, [])

    const prevStep = useCallback(() => {
        setState(s => ({ ...s, step: Math.max(0, s.step - 1) }))
    }, [])

    const updateState = useCallback((patch) => {
        setState(s => ({ ...s, ...patch }))
    }, [])

    const updateQuote = useCallback((patch) => {
        setState(s => ({ ...s, quote: { ...s.quote, ...patch } }))
    }, [])

    const value = {
        isOpen, state, pricing,
        openBooking, closeBooking, setFlow, nextStep, prevStep,
        updateState, updateQuote,
    }

    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
