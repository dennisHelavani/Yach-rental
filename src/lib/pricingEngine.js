// ── Pricing engine (data-driven) ────────────────────────
// Reads from yachtDaysGreece.json for all config
// Supports: 33/33/34 installments, full pay, discount before June 15

import DATA from '../data/yachtDaysGreece.json'
import { WHOLE_YACHT_PACKAGES, WHOLE_CABIN_PACKAGES, WHOLE_YACHT_ALCOHOL_PRICE } from '../data/constants'

const { payments, promotions, addons } = DATA
const ALCOHOL_ADDON = addons.find(a => a.id === 'alcohol_unlimited')
const discountWindow = promotions.discountWindow

// ── Package lookup by shorthand or full id ──
export function getPackage(id) {
    const map = {
        '5n': DATA.packages[0],
        '7n': DATA.packages[1],
        'package_5_nights_half_board': DATA.packages[0],
        'package_7_nights_half_board': DATA.packages[1],
    }
    return map[id] || DATA.packages[0]
}

// ── Fleet lookup ──
export function getFleetYacht(yachtId) {
    return DATA.fleet.find(y => y.id === yachtId) || null
}

// ── Discount eligibility ──
// Returns true if booking is made before the exclusive end date
export function isDiscountEligible() {
    if (!discountWindow?.enabled) return false
    const endDate = new Date(discountWindow.discountEndDateExclusive)
    return new Date() < endDate
}

// Legacy compat — some components still call isEarlyBirdEligible
export function isEarlyBirdEligible(_paymentOption) {
    return isDiscountEligible()
}

// ── Payment plan based on days to departure ──
export function getPaymentPlan(departureDate) {
    if (!departureDate) return 'INSTALLMENTS_3' // default when no date selected

    const now = new Date()
    const dep = new Date(departureDate)
    const diffMs = dep.getTime() - now.getTime()
    const daysToDeparture = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (daysToDeparture <= 13) return 'FULL_ONLY'
    if (daysToDeparture <= 29) return 'SHORT_NOTICE'
    return 'INSTALLMENTS_3'
}

// ── Compute installment amounts ──
export function computeInstallments(total, eligible) {
    const split = [33, 33, 34]
    const amounts = split.map(pct => Math.round(total * pct / 100))
    // Adjust rounding so amounts sum exactly to total
    const sum = amounts.reduce((a, b) => a + b, 0)
    if (sum !== total) amounts[2] += (total - sum)

    if (eligible) {
        // 10% off first payment only
        const discount = Math.round(amounts[0] * 0.1)
        amounts[0] -= discount
        return { amounts, discount, labels: ['Booking payment (33%)', '2nd payment (33%)', 'Final payment (34%)'] }
    }
    return { amounts, discount: 0, labels: ['Booking payment (33%)', '2nd payment (33%)', 'Final payment (34%)'] }
}

// ── Compute short-notice amounts (33% + 67%) ──
export function computeShortNotice(total, eligible) {
    const first = Math.round(total * 0.33)
    const remainder = total - first

    if (eligible) {
        const discount = Math.round(first * 0.1)
        return { amounts: [first - discount, remainder], discount, labels: ['Booking payment (33%)', 'Remainder due within 7 days'] }
    }
    return { amounts: [first, remainder], discount: 0, labels: ['Booking payment (33%)', 'Remainder due within 7 days'] }
}

// ── Compute full payment with double discount ──
export function computeFullPayment(total, eligible) {
    if (eligible) {
        // First discount: 10% off total
        const afterFirst = Math.round(total * 0.9)
        // Second discount: 10% off the remaining amount
        const finalAmount = Math.round(afterFirst * 0.9)
        const totalDiscount = total - finalAmount
        return { amount: finalAmount, discount: totalDiscount, effectivePercent: 19 }
    }
    return { amount: total, discount: 0, effectivePercent: 0 }
}

// ── Main pricing engine ──
export function pricingEngine({
    packageId = '5n',
    alcohol = false,
    guestCount = 1,
    paymentOption = 'INSTALLMENTS', // 'INSTALLMENTS' | 'FULL'
    wholeYacht = false,
    wholeCabin = false,
    departureDate = null,
}) {
    const pkg = getPackage(packageId)
    if (!pkg) return { perPerson: 0, addons: 0, total: 0, amountDueToday: 0 }

    const eligible = isDiscountEligible()
    const plan = getPaymentPlan(departureDate)

    // Whole-cabin uses flat-rate cabin pricing
    if (wholeCabin) {
        const cabinPkg = WHOLE_CABIN_PACKAGES[packageId] || WHOLE_CABIN_PACKAGES['5n']
        const basePrice = cabinPkg.price
        const alcoholPrice = alcohol ? WHOLE_YACHT_ALCOHOL_PRICE : 0
        const alcoholTotal = alcoholPrice * guestCount
        const subtotal = basePrice + alcoholTotal

        const fullPay = computeFullPayment(subtotal, eligible)
        const installments = computeInstallments(subtotal, eligible)
        const shortNotice = computeShortNotice(subtotal, eligible)

        const effectiveOption = plan === 'FULL_ONLY' ? 'FULL' : paymentOption
        let amountDueToday, discountAmount, total

        if (effectiveOption === 'FULL') {
            total = fullPay.amount
            discountAmount = fullPay.discount
            amountDueToday = total
        } else {
            total = subtotal
            discountAmount = plan === 'SHORT_NOTICE' ? shortNotice.discount : installments.discount
            amountDueToday = plan === 'SHORT_NOTICE' ? shortNotice.amounts[0] : installments.amounts[0]
        }

        return {
            perPerson: 0,
            addonPerPerson: alcoholPrice,
            subtotalPerPerson: 0,
            subtotal,
            eligible,
            earlyBird: eligible,
            discountAmount,
            total,
            amountDueToday,
            remaining: effectiveOption === 'FULL' ? 0 : subtotal - amountDueToday,
            paymentOption: effectiveOption,
            paymentPlan: plan,
            installments: effectiveOption !== 'FULL' ? (plan === 'SHORT_NOTICE' ? shortNotice : installments) : null,
            fullPayment: effectiveOption === 'FULL' ? fullPay : null,
            pkg: { ...pkg, name: cabinPkg.label, price: cabinPkg.price },
            guestCount,
            alcoholAddon: ALCOHOL_ADDON,
            wholeCabin: true,
            wholeCabinBasePrice: basePrice,
            alcoholTotal,
        }
    }

    // Whole-yacht uses flat-rate pricing
    if (wholeYacht) {
        const wholeYachtPkg = WHOLE_YACHT_PACKAGES[packageId] || WHOLE_YACHT_PACKAGES['5n']
        const basePrice = wholeYachtPkg.price
        const alcoholPrice = alcohol ? WHOLE_YACHT_ALCOHOL_PRICE : 0
        const alcoholTotal = alcoholPrice * guestCount
        const subtotal = basePrice + alcoholTotal

        const fullPay = computeFullPayment(subtotal, eligible)
        const installments = computeInstallments(subtotal, eligible)
        const shortNotice = computeShortNotice(subtotal, eligible)

        const effectiveOption = plan === 'FULL_ONLY' ? 'FULL' : paymentOption
        let amountDueToday, discountAmount, total

        if (effectiveOption === 'FULL') {
            total = fullPay.amount
            discountAmount = fullPay.discount
            amountDueToday = total
        } else {
            total = subtotal
            discountAmount = plan === 'SHORT_NOTICE' ? shortNotice.discount : installments.discount
            amountDueToday = plan === 'SHORT_NOTICE' ? shortNotice.amounts[0] : installments.amounts[0]
        }

        return {
            perPerson: 0,
            addonPerPerson: alcoholPrice,
            subtotalPerPerson: 0,
            subtotal,
            eligible,
            earlyBird: eligible, // compat
            discountAmount,
            total,
            amountDueToday,
            remaining: effectiveOption === 'FULL' ? 0 : subtotal - amountDueToday,
            paymentOption: effectiveOption,
            paymentPlan: plan,
            installments: effectiveOption !== 'FULL' ? (plan === 'SHORT_NOTICE' ? shortNotice : installments) : null,
            fullPayment: effectiveOption === 'FULL' ? fullPay : null,
            pkg: { ...pkg, name: wholeYachtPkg.label, price: wholeYachtPkg.price },
            guestCount,
            alcoholAddon: ALCOHOL_ADDON,
            wholeYacht: true,
            wholeYachtBasePrice: basePrice,
            alcoholTotal,
        }
    }

    const perPerson = pkg.price
    const addonPerPerson = alcohol && ALCOHOL_ADDON ? ALCOHOL_ADDON.price : 0
    const subtotalPerPerson = perPerson + addonPerPerson
    const subtotal = subtotalPerPerson * guestCount

    const fullPay = computeFullPayment(subtotal, eligible)
    const installments = computeInstallments(subtotal, eligible)
    const shortNotice = computeShortNotice(subtotal, eligible)

    const effectiveOption = plan === 'FULL_ONLY' ? 'FULL' : paymentOption
    let amountDueToday, discountAmount, total

    if (effectiveOption === 'FULL') {
        total = fullPay.amount
        discountAmount = fullPay.discount
        amountDueToday = total
    } else {
        total = subtotal
        discountAmount = plan === 'SHORT_NOTICE' ? shortNotice.discount : installments.discount
        amountDueToday = plan === 'SHORT_NOTICE' ? shortNotice.amounts[0] : installments.amounts[0]
    }

    return {
        perPerson,
        addonPerPerson,
        subtotalPerPerson,
        subtotal,
        eligible,
        earlyBird: eligible, // compat
        discountAmount,
        total,
        amountDueToday,
        remaining: effectiveOption === 'FULL' ? 0 : subtotal - amountDueToday,
        paymentOption: effectiveOption,
        paymentPlan: plan,
        installments: effectiveOption !== 'FULL' ? (plan === 'SHORT_NOTICE' ? shortNotice : installments) : null,
        fullPayment: effectiveOption === 'FULL' ? fullPay : null,
        pkg,
        guestCount,
        alcoholAddon: ALCOHOL_ADDON,
    }
}

// Re-export JSON data for convenience
export { DATA }
export { ALCOHOL_ADDON }
