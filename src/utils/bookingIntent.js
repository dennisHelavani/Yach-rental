// ── Booking Intent Utility ──────────────────────────────
// Builds booking intents and persists to URL + localStorage.
// Used for direct URL-based navigation from CTAs.

const LS_KEY = 'booking_intent'

/**
 * Build a structured booking intent object.
 * @param {Object} opts
 * @param {string} opts.intentType - 'quote' | 'book-yacht' | 'book-tour' | 'book-package' | 'hot-deal'
 * @param {string} [opts.packageId] - '5n' | '7n'
 * @param {string} [opts.routeId]
 * @param {string} [opts.yachtId]
 * @param {string} [opts.experienceId]
 * @param {string} [opts.dealId]
 * @param {string} [opts.sourceCTA] - where the CTA was clicked
 */
export function buildIntent({
    intentType,
    packageId,
    routeId,
    yachtId,
    experienceId,
    dealId,
    sourceCTA,
}) {
    const intent = {
        intentType: intentType || 'quote',
        packageId: packageId || null,
        routeId: routeId || null,
        yachtId: yachtId || null,
        experienceId: experienceId || null,
        dealId: dealId || null,
        sourceCTA: sourceCTA || null,
        timestamp: Date.now(),
    }

    // Persist to localStorage
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(intent))
    } catch { /* silent */ }

    return intent
}

/**
 * Read persisted intent from localStorage.
 */
export function getPersistedIntent() {
    try {
        const raw = localStorage.getItem(LS_KEY)
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

/**
 * Clear persisted intent.
 */
export function clearIntent() {
    try {
        localStorage.removeItem(LS_KEY)
    } catch { /* silent */ }
}

/**
 * Convert an intent object to URL search params string.
 */
function intentToParams(intent) {
    const params = new URLSearchParams()
    if (intent.intentType) params.set('type', intent.intentType)
    if (intent.packageId) params.set('package', intent.packageId)
    if (intent.routeId) params.set('route', intent.routeId)
    if (intent.yachtId) params.set('yacht', intent.yachtId)
    if (intent.experienceId) params.set('experience', intent.experienceId)
    if (intent.dealId) params.set('deal', intent.dealId)
    if (intent.sourceCTA) params.set('source', intent.sourceCTA)
    return params.toString()
}

/**
 * Navigate from a CTA using the intent.
 * Routes to the correct page based on intentType.
 * @param {Object} intent - from buildIntent()
 * @param {Function} navigate - react-router navigate function
 */
export function navigateFromCTA(intent, navigate) {
    const params = intentToParams(intent)

    switch (intent.intentType) {
        case 'quote':
            navigate(`/quote${params ? '?' + params : ''}`)
            break
        case 'book-yacht':
            navigate(`/checkout?flow=BOOK_YACHT&${params}`)
            break
        case 'book-tour':
        case 'book-package':
            navigate(`/checkout?flow=BOOK_TOUR&${params}`)
            break
        case 'hot-deal':
            navigate(`/checkout?flow=BOOK_TOUR&${params}`)
            break
        case 'book-whole-yacht':
            navigate(`/checkout?flow=BOOK_WHOLE_YACHT&wholeYacht=1&${params}`)
            break
        default:
            navigate(`/quote${params ? '?' + params : ''}`)
    }
}
