// ── Booking event tracker ───────────────────────────────
// Logs booking events to console + localStorage for analytics

const STORAGE_KEY = 'saltie_booking_events'
const MAX_EVENTS = 200

export function trackEvent(eventName, payload = {}) {
    const event = {
        event: eventName,
        action: payload.action || null,
        entityType: payload.entityType || null,
        entityId: payload.entityId || null,
        source: payload.source || null,
        flow: payload.flow || null,
        step: payload.step ?? null,
        selections: payload.selections || null,
        timestamp: new Date().toISOString(),
    }

    // Console log (always)
    console.log(`[SALTIE Booking] ${eventName}`, event)

    // Persist to localStorage
    try {
        const events = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        events.push(event)
        // Cap at MAX_EVENTS to avoid storage bloat
        if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    } catch { /* storage full or unavailable — silent fail */ }

    return event
}

export function getEvents() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
        return []
    }
}

export function clearEvents() {
    localStorage.removeItem(STORAGE_KEY)
}
