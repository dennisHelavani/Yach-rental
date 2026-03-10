// ══════════════════════════════════════════════════════════
// Yacht data — rich model for detail pages + fleet list
// Truth Doc: max 8 guests, party-hostel tone, no luxury language
// ══════════════════════════════════════════════════════════

import DATA from './yachtDaysGreece.json'

// ── Copy diversification helpers ──────────────────────────
const templates = DATA.fleetCopyTemplates?.byModel || {}

// Simpler non-pipeline version:
export function cabinsSummary(cabinPlan) {
    const counts = {}
    for (const c of cabinPlan) {
        const key = c.beds.includes('Single') ? 'Twin' : 'Queen'
        counts[key] = (counts[key] || 0) + 1
    }
    return Object.entries(counts).map(([t, n]) => `${n} ${t}`).join(' + ') + ' cabins'
}

export function bedSummary(cabinPlan) {
    const counts = {}
    for (const c of cabinPlan) {
        const key = c.beds.includes('Single') ? 'twin-share' : 'double'
        counts[key] = (counts[key] || 0) + 1
    }
    return Object.entries(counts).map(([t, n]) => `${n} ${t} cabin${n > 1 ? 's' : ''}`).join(' + ')
}

export function fillTemplate(template, yacht) {
    const vars = {
        maxKnots: yacht.speed?.maxKnots ?? 'TBD',
        maxKmh: yacht.speed?.maxKmh ?? 'TBD',
        maxGuestsDisplayed: 8,
        cabinsSummary: cabinsSummary(yacht.cabinPlan),
        bedSummary: bedSummary(yacht.cabinPlan),
    }
    return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? key)
}

export function getYachtCopy(yacht) {
    const id = yacht.slug.replace(/-/g, '_')
    const t = templates[id]
    if (!t) return { headline: yacht.name, subhead: yacht.subtitle, vibeLine: '' }
    // Pick index-based (deterministic per yacht)
    const idx = id === 'azimut_58' ? 0 : id === 'azimut_66' ? 1 : 2
    return {
        headline: fillTemplate(t.headlineTemplates[idx % t.headlineTemplates.length], yacht),
        subhead: fillTemplate(t.subheadTemplates[idx % t.subheadTemplates.length], yacht),
        vibeLine: fillTemplate(t.vibeLineTemplates[idx % t.vibeLineTemplates.length], yacht),
        whyBullets: t.whyThisYachtBullets.map(b => fillTemplate(b, yacht)),
        nickname: t.nickname,
    }
}

export function speedLabel(speed) {
    if (!speed?.maxKnots) return 'TBD'
    return `${speed.maxKnots} kn (${speed.maxKmh} km/h)`
}

export const PACKAGES = {
    '5n': { id: '5n', label: '5 Nights', nights: 5, price: 739, color: 'neonAqua', route: 'Mykonos (2) • Milos (1) • Santorini (2)' },
    '7n': { id: '7n', label: '7 Nights', nights: 7, price: 929, color: 'neonPink', route: 'Mykonos (2) • Ios (2) • Santorini (2) • Milos (1)' },
}

export const ALCOHOL_ADDON = {
    price: 199,
    label: 'Unlimited Alcohol',
    desc: 'Unlimited local spirits, beer, and wine throughout the trip.',
    disclaimer: 'Unlimited alcohol is capped to reasonable usage. Intoxication is not permitted. Crew may refuse service at any time. No BYO alcohol allowed on board.',
}

export const hotDeals = [
    {
        yacht: 'azimut-58',
        title: 'Azimut 58',
        route: 'Cyclades 5-Night',
        date: 'July 12th',
        discount: '€200 OFF',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdNgIC7dCcYIq8VmTWlpO0OY3JzzqmV3eiBTKFiXqWhTt3o5o4ywEe6voPL4M85iK-J4h8AL6DzjA0mgj4ne2zg9Ss-3rfjrjkjgP9P1XHeqgETPuOMA0xnZwFZfPgL9p9-PwG1WE_3ztHQlZjnrz3a5aFvFaI6v8mIcAZC12h6VLEkgiMB_quEQc5KNE3JlRQCVmVhA3qu6Kr9tVcBgZiGV82JZqFEUrl2ODtPSF03D_GRIa6w3JRHiwS9k-DzYGWkywQC8bVBw',
    },
    {
        yacht: 'azimut-70',
        title: 'Azimut 70',
        route: 'Cyclades 7-Night',
        date: 'Aug 5th',
        discount: '€150 OFF',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCz7w5SW0fSLHahHARbdWIeP0GQGJD7P-j51m5-81Xsb26Tq60mZRgHfI82ag3EcXXtYg7rSJsNRMRAYUWNV8wH4RBWVy3U8xdx2xVs0VhwrSwYC9TmziLQxFXDOfHKuoY9XY6mnxdVLFGJHtDoZSeBCKdSR9JmYlWTlnOlyJKek0lEVQsuZBsXu4B02P8BTyRVifmHF6w8HqWEaPA_yRW5SOp_NjC0XXWYpmIbaOP0vrZmvIEpcBLEaR2aQBZSo8lvqiiLDjQtQ',
    },
    {
        yacht: 'azimut-66',
        title: 'Azimut 66',
        route: 'Cyclades 5-Night',
        date: 'Aug 18th',
        discount: '€300 OFF',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaLZ63nwTwbm38JLBQL8uYlB1KGcdq5NaFJnp6XK_32yy7L3AcZmENgakYSOa9dlbFM6dSw7fWP7ejJ-cOsgJ2wzvBywaG9FuzD6Nw2PbqpM-Ya5YxQqRPQTvuUcU3bh0xBcvjphbU8nFYf8X9M9pWQ_6WCVotrWcZylKPnW6hTgf8btrdTItZl9YvLISi_QNUEBU-7t5_DDJZUNHuKUlkD8SOHc0scf2X2SYNEK3uNyZjVeSIz7snsThtFa0hKi6c_CbTRe_qnw',
    },
]

// ── Yacht array ──────────────────────────────────────────

export const yachtsData = [
    {
        slug: 'azimut-58',
        name: 'Azimut 58',
        subtitle: 'Fast & social — perfect for smaller squads.',
        bestFor: 'Small squads',
        tagline: 'Tight crew, quick hops between islands, and zero dead time. The 58 is built for groups who want the party to start the moment they step on board.',
        description: 'The Azimut 58 is your compact party machine. Tuned for quick island hops with a max speed of 32 knots, this boat gets you from Mykonos to Ios faster than you can finish your first drink. Three cabins, max 8 guests due to regulations, and enough deck space to keep the vibes rolling from sunrise yoga to sunset DJ sets. No fluff, no filler — just pure Aegean energy.',
        heroImage: '/img/azimut58.webp',
        galleryImages: [
            '/img/azimut58/azimut58_10.jpg',
            '/img/azimut58/azimut58_7.jpg',
            '/img/azimut58/azimut58_8.jpg',
            '/img/azimut58/azimut58_1.jpg',
            '/img/azimut58/azimut58_2.jpg',
            '/img/azimut58/azimut58_3.jpg',
            '/img/azimut58/azimut58_4.jpg',
            '/img/azimut58/azimut58_5.jpg',
            '/img/azimut58/azimut58_6.jpg',
        ],
        speed: { cruiseKnots: null, maxKnots: 32, maxKmh: 59 },
        vibeTags: ['18+ Only', 'Max 8 guests', 'No BYO Alcohol', 'Half-board included'],
        specs: [
            { label: 'Max Guests', value: '8', icon: 'groups' },
            { label: 'Cabins', value: '3', icon: 'bed' },
            { label: 'Cabin Types', value: '1 Queen + 2 Twin', icon: 'meeting_room' },
            { label: 'Crew', value: 'Skipper + Hostess', icon: 'person' },
            { label: 'Max Speed', value: '32 kn (59 km/h)', icon: 'speed' },
            { label: 'Best For', value: 'Small squads', icon: 'emoji_people', color: 'neon-aqua' },
        ],
        cabinPlan: [
            { name: 'Queen Cabin', beds: 'Queen Bed', sleeps: 2, label: 'Private / Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdvLlgxn8pZgKFmk9knTM1f0qybByWpT7kMMTxLQbtiGX5GaYGGe6Mv5BJBgKjtxHAsu-hDA9rhW7kdkDN_vb623RDTxARj8w4BJs0GnbprQ5SSCm4Pzp31eYAojKGUdZX1RzIWDLDD-ZK_o0mOBZqNU9q36U8wYFWb0LOp44JdzXJUbKcUqT9R0vbMUkpEHA-WyyrFPVpozpUyzfzU5v46F66fttszVIQLR6UKT7P_gBtcnaneGq54j8avwoKa9TCYIKh4peKYg' },
            { name: 'Twin Cabin 1', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
            { name: 'Twin Cabin 2', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
        ],
        included: [
            'Breakfast + lunch onboard',
            'Skipper + hostess',
            'Port & fuel fees',
            'Water + soft drinks',
            'Linens + towels',
        ],
        notIncluded: [
            'Flights to/from Greece',
            'Dinner on land',
            'Alcohol (optional add-on available)',
            'Personal travel insurance',
        ],
        rules: [
            { title: 'No BYO Alcohol', desc: 'For licensing and safety reasons, guests cannot bring their own alcohol onboard.', color: 'neonPink' },
            { title: 'Max 8 Guests', desc: 'Due to Greek maritime regulations, max 8 guests per yacht — no exceptions.' },
            { title: 'Weather Policy', desc: 'Routes may be adjusted for safety. The crew always has the final call on conditions.' },
        ],
        reviews: [
            { text: '"Perfect for a small crew. Every cove felt like our private swimming pool. The sound system is insane."', name: 'Jake, Amsterdam', initials: 'JA' },
            { text: '"We booked the 58 for 6 of us and it was the best decision. Intimate vibes, massive parties on shore."', name: 'Maria, Barcelona', initials: 'MB' },
            { text: '"The sunrise from the sundeck with coffee — that\'s a core memory. Already planning the next trip."', name: 'Tom, Dublin', initials: 'TD' },
        ],
        relatedYachts: ['azimut-66', 'azimut-70'],
        badge: 'Built 2020',
        badgeStyle: 'bg-white/90 text-slate-900',
        cabinsRemaining: 2,
        remainingMonth: 'July',
    },

    {
        slug: 'azimut-66',
        name: 'Azimut 66',
        subtitle: 'The balanced party base — best layout for mixed groups.',
        bestFor: 'Mixed groups',
        tagline: 'The sweet spot of the fleet. Enough space for different vibes, enough energy to keep everyone together. Your floating hostel, sorted.',
        description: 'The Azimut 66 is the crowd favourite for a reason. Four cabins (2 queen + 2 twin) fit mixed groups perfectly — couples, mates, solo travellers all under one roof. Max 8 guests due to regulations keeps it social without feeling packed. Deck space for days, pro-grade sound system, and your own hostess cooking up daily breakfast and lunch. This is where the magic happens.',
        heroImage: '/img/azimut66.webp',
        galleryImages: [

            '/img/azimut66/azimut_66_1.jpg',
            '/img/azimut66/azimut66_2.jpg',
            '/img/azimut66/azimut66_3.jpg',
            '/img/azimut66/azimut66_4.jpg',
            '/img/azimut66/azimut66_5.jpg',
            '/img/azimut66/azimut66_6.jpg',
            '/img/azimut66/azimut66_7.jpg',
            '/img/azimut66/azimut66_8.jpg',
            '/img/azimut66/azimut66_9.jpg',
            '/img/azimut66/azimut66_10.jpg',
            '/img/azimut66/azimut66_11.jpg',
            '/img/azimut66/azimut66_12.jpg',
            '/img/azimut66/azimut66_13.jpg',
            '/img/azimut66/azimut66_14.jpg',
            '/img/azimut66/azimut66_15.jpg',
            '/img/azimut66/azimut66_16.jpg',
        ],
        speed: { cruiseKnots: null, maxKnots: 32, maxKmh: 59 },
        vibeTags: ['18+ Only', 'Max 8 guests', 'No BYO Alcohol', 'Half-board included'],
        specs: [
            { label: 'Max Guests', value: '8', icon: 'groups' },
            { label: 'Cabins', value: '4', icon: 'bed' },
            { label: 'Cabin Types', value: '2 Queen + 2 Twin', icon: 'meeting_room' },
            { label: 'Crew', value: 'Skipper + Hostess', icon: 'person' },
            { label: 'Max Speed', value: '32 kn (59 km/h)', icon: 'speed' },
            { label: 'Best For', value: 'Mixed groups', icon: 'emoji_people', color: 'neon-pink' },
        ],
        cabinPlan: [
            { name: 'Queen Cabin 1', beds: 'Queen Bed', sleeps: 2, label: 'Private / Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdvLlgxn8pZgKFmk9knTM1f0qybByWpT7kMMTxLQbtiGX5GaYGGe6Mv5BJBgKjtxHAsu-hDA9rhW7kdkDN_vb623RDTxARj8w4BJs0GnbprQ5SSCm4Pzp31eYAojKGUdZX1RzIWDLDD-ZK_o0mOBZqNU9q36U8wYFWb0LOp44JdzXJUbKcUqT9R0vbMUkpEHA-WyyrFPVpozpUyzfzU5v46F66fttszVIQLR6UKT7P_gBtcnaneGq54j8avwoKa9TCYIKh4peKYg' },
            { name: 'Queen Cabin 2', beds: 'Queen Bed', sleeps: 2, label: 'Private / Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
            { name: 'Twin Cabin 1', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
            { name: 'Twin Cabin 2', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
        ],
        included: [
            'Breakfast + lunch onboard',
            'Skipper + hostess',
            'Port & fuel fees',
            'Water + soft drinks',
            'Linens + towels',
        ],
        notIncluded: [
            'Flights to/from Greece',
            'Dinner on land',
            'Alcohol (optional add-on available)',
            'Personal travel insurance',
        ],
        rules: [
            { title: 'No BYO Alcohol', desc: 'For licensing and safety reasons, guests cannot bring their own alcohol onboard.', color: 'neonPink' },
            { title: 'Max 8 Guests', desc: 'Due to Greek maritime regulations, max 8 guests per yacht — no exceptions.' },
            { title: 'Weather Policy', desc: 'Routes may be adjusted for safety. The crew always has the final call on conditions.' },
        ],
        reviews: [
            { text: '"Best week of my life. The music on the Azimut 66 is literally club-level. We didn\'t want to leave."', name: 'Sarah, London', initials: 'SL' },
            { text: '"Mykonos sunrise from the flybridge is something I\'ll never forget. The crew is amazing."', name: 'Marc, Berlin', initials: 'MB' },
            { text: '"Half-board was a lifesaver. Gourmet food every morning before heading to the beach clubs."', name: 'Elena, Madrid', initials: 'EM' },
        ],
        relatedYachts: ['azimut-58', 'azimut-70'],
        badge: 'Most Popular',
        badgeStyle: 'bg-neonPink text-white',
        popular: true,
        cabinsRemaining: 2,
        remainingMonth: 'July',
    },

    {
        slug: 'azimut-70',
        name: 'Azimut 70',
        subtitle: 'Big-deck energy — flagship vibes, still capped at 8.',
        bestFor: 'Big-deck party',
        tagline: 'The biggest boat in the fleet. More deck, more sound, more everything — but still max 8 guests because regulations hit different in Greece.',
        description: 'The Azimut 70 is the flagship of the fleet. Massive deck space, two queen cabins plus three twins, and a sound system that turns every anchorage into a floating festival. At 33 knots max speed, she gets you to the next island quick. Max 8 guests due to regulations keeps things social, not sardine-can. Your skipper and hostess handle everything — you just show up and send it.',
        heroImage: '/img/azimut70.webp',
        galleryImages: [
            '/img/azimut70/azimut70_1.jpg',
            '/img/azimut70/azimut70_2.jpg',
            '/img/azimut70/azimut70_3.jpg',
            '/img/azimut70/azimut70_4.jpg',
            '/img/azimut70/azimut70_5.jpg',
            '/img/azimut70/azimut70_6.jpg',
            '/img/azimut70/azimut70_7.jpg',
            '/img/azimut70/azimut70_8.jpg',
            '/img/azimut70/azimut70_9.jpg',
            '/img/azimut70/azimut70_10.jpg',
            '/img/azimut70/azimut70_11.jpg',
            '/img/azimut70/azimut70_12.jpg',
            '/img/azimut70/azimut70_13.jpg',
            '/img/azimut70/azimut70_14.jpg',
            '/img/azimut70/azimut70_15.jpg',
        ],
        speed: { cruiseKnots: null, maxKnots: 33, maxKmh: 61 },
        vibeTags: ['18+ Only', 'Max 8 guests', 'No BYO Alcohol', 'Half-board included'],
        specs: [
            { label: 'Max Guests', value: '8', icon: 'groups' },
            { label: 'Cabins', value: '5', icon: 'bed' },
            { label: 'Cabin Types', value: '2 Queen + 3 Twin', icon: 'meeting_room' },
            { label: 'Crew', value: 'Skipper + Hostess', icon: 'person' },
            { label: 'Max Speed', value: '33 kn (61 km/h)', icon: 'speed' },
            { label: 'Best For', value: 'Big-deck party', icon: 'emoji_people', color: 'neon-aqua' },
        ],
        cabinPlan: [
            { name: 'Queen Cabin 1', beds: 'Queen Bed', sleeps: 2, label: 'Private / Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdvLlgxn8pZgKFmk9knTM1f0qybByWpT7kMMTxLQbtiGX5GaYGGe6Mv5BJBgKjtxHAsu-hDA9rhW7kdkDN_vb623RDTxARj8w4BJs0GnbprQ5SSCm4Pzp31eYAojKGUdZX1RzIWDLDD-ZK_o0mOBZqNU9q36U8wYFWb0LOp44JdzXJUbKcUqT9R0vbMUkpEHA-WyyrFPVpozpUyzfzU5v46F66fttszVIQLR6UKT7P_gBtcnaneGq54j8avwoKa9TCYIKh4peKYg' },
            { name: 'Queen Cabin 2', beds: 'Queen Bed', sleeps: 2, label: 'Private / Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
            { name: 'Twin Cabin 1', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
            { name: 'Twin Cabin 2', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
            { name: 'Twin Cabin 3', beds: '2 Single Beds', sleeps: 2, label: 'Shared', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLY9luAtV_1T746H8uDaKsrIdXltLVVIqalmPZTnCxuNLEBSpVNVArUMdRkdujkhOFcbxNWySPwBYy20bp6rOP9uHSQ9pIrAxldtxpCqUWO11Tz3c1YscxZX6t0qKfJfardSALe6vf-ZD6q3UipsxpoBDHiJ8J69EmQZirdACDjhrbnuMqL2pd1JbMZyC2AJnx5d5tGLQBHl9tmtwGqegCWauY2vi3WEBjf0xOni5eQcXX7hyhJIaHCsqaGC4_D9pQPr2KepEG0g' },
        ],
        included: [
            'Breakfast + lunch onboard',
            'Skipper + hostess',
            'Port & fuel fees',
            'Water + soft drinks',
            'Linens + towels',
        ],
        notIncluded: [
            'Flights to/from Greece',
            'Dinner on land',
            'Alcohol (optional add-on available)',
            'Personal travel insurance',
        ],
        rules: [
            { title: 'No BYO Alcohol', desc: 'For licensing and safety reasons, guests cannot bring their own alcohol onboard.', color: 'neonPink' },
            { title: 'Max 8 Guests', desc: 'Due to Greek maritime regulations, max 8 guests per yacht — no exceptions.' },
            { title: 'Weather Policy', desc: 'Routes may be adjusted for safety. The crew always has the final call on conditions.' },
        ],
        reviews: [
            { text: '"The flagship lives up to the hype. The deck space is something else entirely."', name: 'Alex, Sydney', initials: 'AS' },
            { text: '"Five cabins meant our whole group stayed together. The hostess was an absolute game-changer."', name: 'Sophie, Paris', initials: 'SP' },
            { text: '"Honestly the best money we\'ve ever spent. Big boat, big energy, still felt personal."', name: 'Carlos, Lisbon', initials: 'CL' },
        ],
        relatedYachts: ['azimut-58', 'azimut-66'],
        badge: 'Flagship',
        badgeStyle: 'bg-white/90 text-slate-900',
        cabinsRemaining: 1,
        remainingMonth: 'August',
    },
]

// ── Helpers ──────────────────────────────────────────────

export function getYachtBySlug(slug) {
    return yachtsData.find((y) => y.slug === slug) || null
}
