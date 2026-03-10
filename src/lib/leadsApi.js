// ── Leads API layer ─────────────────────────────────────
// localStorage + fire-and-forget POST to /api/leads

const STORAGE_KEY = 'saltie_leads'

export function saveLead(data) {
    const lead = {
        ...data,
        timestamp: new Date().toISOString(),
    }

    // localStorage (always works)
    try {
        const leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        leads.push(lead)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
    } catch { /* silent */ }

    // Fire-and-forget API call
    fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
    }).catch(() => { /* expected to fail in dev — silent */ })

    return lead
}

export function getLeads() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
        return []
    }
}
