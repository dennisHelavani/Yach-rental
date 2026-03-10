import { useEffect, useRef } from 'react'
import { useBooking } from '../context/BookingProvider'

// ── Patterns ──
const QUOTE_RE = /quote|enquir|inquir|get\s*in\s*touch|contact\s*us/i
const TOUR_RE = /experience|tour|session|excursion|reserve.*cabin|continue.*checkout/i
const BOOK_RE = /book|reserve|checkout|claim|cabin|deposit|secure|continue/i
const SKIP_RE = /view\s*detail|read\s*more|learn\s*more|see\s*all|menu|log\s*in|sign\s*up/i
const NAV_RE = /fleet|destinations|faq|how.it.works|gallery|experiences|home/i

export default function useBookingCTA() {
    const { openBooking } = useBooking()
    const attached = useRef(new WeakSet())

    useEffect(() => {
        function scan() {
            const els = document.querySelectorAll('a, button, [role="button"]')
            els.forEach(el => {
                if (attached.current.has(el)) return

                const action = el.getAttribute('data-action') || el.getAttribute('data-intent')
                const text = (el.textContent || '').trim()

                // Skip nav links, "View Details", external links
                if (SKIP_RE.test(text)) return
                if (NAV_RE.test(text) && !action) return

                // Skip hash-only anchors, detail page links, external
                if (el.tagName === 'A') {
                    const href = el.getAttribute('href') || ''
                    if (href.startsWith('#') && !action) return
                    if (href.startsWith('/yachts/') && !action) return
                    if (href.startsWith('/destinations/') && !action) return
                    if (href.startsWith('/experiences/') && !action) return
                    if (href.startsWith('/checkout') && !action) return
                    if (href.startsWith('http') && !action) return
                }

                // Determine intent (use new UPPERCASE naming)
                let intent = null
                if (action) {
                    intent = action
                } else if (QUOTE_RE.test(text)) {
                    intent = 'QUOTE'
                } else if (TOUR_RE.test(text) && !BOOK_RE.test(text)) {
                    intent = 'BOOK_TOUR'
                } else if (BOOK_RE.test(text)) {
                    intent = 'BOOK_YACHT'
                }

                if (!intent) return

                // Parse context from data attributes
                const entityType = el.getAttribute('data-entity-type') || null
                const entityId = el.getAttribute('data-entity-id') || el.getAttribute('data-yacht') || null
                const yachtId = el.getAttribute('data-yacht-id') || null
                const packageId = el.getAttribute('data-package-id') || null
                const source = el.getAttribute('data-source') || null

                attached.current.add(el)

                el.addEventListener('click', (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    openBooking({ action: intent, entityType, entityId, yachtId, packageId, source, text })
                })
            })
        }

        scan()
        const observer = new MutationObserver(() => scan())
        observer.observe(document.body, { childList: true, subtree: true })

        return () => observer.disconnect()
    }, [openBooking])
}
