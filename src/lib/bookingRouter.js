// ── Intent detection / booking router ───────────────────
// Maps CTA text/attributes to booking intents

const QUOTE_RE = /quote|enquir|inquir/i
const TOUR_RE = /experience|tour|session|excursion|reserve.*cabin|continue.*checkout/i
const BOOK_RE = /book|reserve|checkout|claim|cabin|deposit/i

// Normalize intent strings (support both old and new naming)
const INTENT_MAP = {
    'quote': 'QUOTE',
    'QUOTE': 'QUOTE',
    'book-yacht': 'BOOK_YACHT',
    'BOOK_YACHT': 'BOOK_YACHT',
    'book-tour': 'BOOK_TOUR',
    'BOOK_TOUR': 'BOOK_TOUR',
    'book-whole-yacht': 'BOOK_WHOLE_YACHT',
    'BOOK_WHOLE_YACHT': 'BOOK_WHOLE_YACHT',
    'book-whole-cabin': 'BOOK_WHOLE_CABIN',
    'BOOK_WHOLE_CABIN': 'BOOK_WHOLE_CABIN',
}

export function detectIntent(opts = {}) {
    // Explicit action takes priority
    if (opts.action) {
        return INTENT_MAP[opts.action] || opts.action
    }

    const text = (opts.text || '').toLowerCase()
    if (QUOTE_RE.test(text)) return 'QUOTE'
    if (TOUR_RE.test(text) && !BOOK_RE.test(text)) return 'BOOK_TOUR'
    if (BOOK_RE.test(text)) return 'BOOK_YACHT'

    return null // ambiguous → show intent picker
}

// Convert internal flow ID back to legacy format for components that need it
export function flowToLegacy(flow) {
    const map = { 'QUOTE': 'quote', 'BOOK_YACHT': 'book-yacht', 'BOOK_TOUR': 'book-tour', 'BOOK_WHOLE_YACHT': 'book-whole-yacht', 'BOOK_WHOLE_CABIN': 'book-whole-cabin' }
    return map[flow] || flow
}
