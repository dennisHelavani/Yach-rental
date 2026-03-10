// ── Stripe checkout stub ────────────────────────────────
// TODO: Replace with real Stripe Checkout Session creation
// When VITE_STRIPE_KEY is set, this should call your backend
// to create a Checkout Session and redirect to Stripe.

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY || null

/**
 * Create a Stripe Checkout Session (or stub).
 * @param {Object} bookingData - Full booking payload
 * @returns {Promise<{success: boolean, sessionId?: string, message?: string}>}
 */
export async function createCheckoutSession(bookingData) {
    // ── Save booking to localStorage regardless ──
    try {
        const bookings = JSON.parse(localStorage.getItem('saltie_bookings') || '[]')
        bookings.push({
            ...bookingData,
            id: `booking_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            createdAt: new Date().toISOString(),
            status: STRIPE_KEY ? 'pending_payment' : 'mock_success',
        })
        localStorage.setItem('saltie_bookings', JSON.stringify(bookings))
    } catch { /* storage full — silent */ }

    // ── If Stripe key is configured, call real endpoint ──
    if (STRIPE_KEY) {
        try {
            // TODO: Replace this URL with your actual Stripe Checkout Session endpoint
            // Example: const res = await fetch('/api/create-checkout-session', { ... })
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...bookingData,
                    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.origin}/cancel`,
                }),
            })

            if (!res.ok) throw new Error(`Stripe API error: ${res.status}`)
            const data = await res.json()

            // Redirect to Stripe Checkout
            if (data.url) {
                window.location.href = data.url
            }

            return { success: true, sessionId: data.id }
        } catch (err) {
            console.error('[SALTIE Stripe] Checkout session failed:', err)
            return { success: false, message: err.message }
        }
    }

    // ── Stripe not configured — mock success ──
    console.log('[SALTIE Stripe] No VITE_STRIPE_KEY — running in mock mode. Booking saved to localStorage.')
    return {
        success: true,
        sessionId: null,
        message: 'Stripe not configured — booking saved locally. Set VITE_STRIPE_KEY to enable real payments.',
        mock: true,
    }
}

export function isStripeConfigured() {
    return !!STRIPE_KEY
}
