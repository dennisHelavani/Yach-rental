import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingProvider'
import { HERO_IMAGES } from '../data/constants'
import HotRouteCards from '../components/booking/HotRouteCards'
import SEO from '../components/SEO'

/* ══════════════════════════════════════════════════════════════
   FAQ DATA — rewritten from reference, adapted for SALTIE CRUISES Greece
   ══════════════════════════════════════════════════════════════ */
const faqCategories = [
    {
        id: 'about-your-trip',
        label: 'About Your Trip',
        icon: 'flight_takeoff',
        questions: [
            {
                q: 'How do I find my departure marina details?',
                a: 'In hte booking and confirmation mail you will find all the details about the departure marina.',
            },
            {
                q: 'How do I travel to the departure marina?',
                a: 'We operate from Greek marinas. Detailed travel guides with directions, airport transfers, and public transport options are available on our <a href="/how-it-works" class="text-primary underline font-bold">How It Works</a> page. We recommend arriving a day early so you\'re refreshed for embarkation.',
            },
            {
                q: 'Do I need travel insurance?',
                a: 'Yes — comprehensive travel insurance is mandatory and a condition of your booking. Your policy must cover cancellation, pre-existing medical conditions, lost luggage, personal property, illness, and injuries. We may request a copy of your policy at any time after booking.',
            },
            {
                q: 'What are the check-in and check-out times?',
                a: 'The season starts 20 April with departures every Monday, Wednesday, and Friday. Exact boarding and check-out times will be provided 14 days prior to your trip in your departure guide.',
            },
            {
                q: 'Is the itinerary guaranteed?',
                a: 'We sail fixed island itineraries, but the exact routing or timing between islands can change daily based on weather, sea conditions, or yacht status. The skipper has ultimate authority to adjust the course for safety — that\'s part of the adventure!',
            },
            {
                q: 'What travel documents do I need?',
                a: 'For Greece you\'ll need a passport valid for at least 90 days from departure. Some nationalities may require a visa — we recommend checking <a href="https://www.visahq.co.uk/" target="_blank" rel="noopener noreferrer" class="text-primary underline font-bold">VisaHQ</a> to confirm your requirements.',
            },
        ],
    },
    {
        id: 'standards-services',
        label: 'Standards & Services',
        icon: 'star',
        questions: [
            {
                q: 'What standard of service should I expect onboard?',
                a: 'We aim for the highest quality, but remember: a yacht is not a hotel. Amenities like Wi-Fi, bathrooms, air conditioning, and refrigeration may perform differently at sea compared to land. It\'s all part of the nautical experience.',
            },
            {
                q: 'What does the wristband cover?',
                a: 'Your wristband is included in the booking price. It identifies you as a SALTIE CRUISES guest and grants you entry to selected partner events, beach clubs, and exclusive discounts on extra activities and excursions throughout the week.',
            },
            {
                q: 'What type of clothes should I pack?',
                a: 'Bring a mix of beach wear, casual day clothes, and one or two evening outfits if you plan to hit the nightlife. Most guests tend to overpack — keep it light! We recommend soft-sided bags for easier storage. Check our <a href="/how-it-works" class="text-primary underline font-bold">packing guide</a> for a full list.',
            },
            {
                q: 'Are there health requirements to join?',
                a: 'You must not have any medical conditions that would make sailing unsafe. The trip is not physically strenuous unless you opt into activities like snorkeling or sailing participation. If you have concerns, please <a href="mailto:info@yachtdays.gr" class="text-primary underline font-bold">contact us</a> before booking.',
            },
            {
                q: 'What if someone in my group has a disability?',
                a: 'We want everyone to have an incredible time. If you or any member of your group has a disability, please contact us at <a href="mailto:info@yachtdays.gr" class="text-primary underline font-bold">info@yachtdays.gr</a> <strong>before</strong> completing your reservation so we can make the necessary arrangements.',
            },
            {
                q: 'Will there be photos taken during the trip?',
                a: 'Yes! We capture plenty of photos throughout the week and share them with guests. We may also use selected photos for promotional purposes. If you prefer not to appear in marketing materials, let us know on boarding day. We love it when guests share their own shots too — tag us on social media!',
            },
            {
                q: 'What if I get seasick?',
                a: 'Seasickness is manageable. Our skippers carry prevention tablets. Avoiding acidic foods, staying hydrated, and getting enough sleep all help. If you know you\'re prone to it, consider preparing in advance with over-the-counter motion sickness medication.',
            },
            {
                q: 'I can\'t swim — can I still come?',
                a: 'Absolutely. Every yacht is equipped with life jackets and a dinghy. The skipper will happily take you to and from shore whenever the yacht is anchored offshore.',
            },
        ],
    },
    {
        id: 'booking-payments',
        label: 'Booking & Payments',
        icon: 'payments',
        questions: [
            {
                q: 'What are local payments?',
                a: 'Local payments cover tourist taxes, marina/port fees, and fuel for the week. They apply to all bookings and are paid <strong>in cash (EUR)</strong> at check-in.<br/><br/><strong>Greece:</strong> €150 per person (monohull or catamaran).',
            },
            {
                q: 'What additional costs are not included in the booking?',
                a: 'Your booking does not cover:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Local payments (€150/person)</li><li>Excursions & extra activities (we recommend GetYourGuide)</li><li>Club entrances</li><li>Alcohol & dining out</li><li>Airport/marina transfers</li></ul>',
            },
            {
                q: 'Will I be charged extra fees for paying with a non-EUR card?',
                a: 'All our prices are in EUR. We don\'t charge currency conversion fees — however, your bank may apply exchange rate margins or foreign transaction fees. We receive exactly the stated amount. Please check with your bank before the transaction for the best payment option.',
            },
            {
                q: 'When are payments due?',
                a: 'Your booking payment is 33% of the total, followed by 33% and 34% in weekly installments. Final payment must be at least 7 days before departure. Bookings within 14 days require full payment. <strong>Bonus:</strong> Book before June 15 for 10% off your first payment, or up to 19% off with full payment!',
            },
            {
                q: 'Can I pay by bank transfer?',
                a: 'Payments are accepted by Visa or MasterCard (credit or debit). We never have access to your card details or bank account numbers. Bank transfers are unfortunately not available.',
            },
            {
                q: 'When do I need to submit crew list details?',
                a: 'Crew list details are <strong>mandatory</strong> for every passenger — required by the Port Authority. Key deadlines:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Must be completed at least <strong>60 days before departure</strong></li><li>Without a complete crew list, you cannot make your final payment</li><li>Incomplete crew lists may result in booking cancellation without refund</li><li>Required info: full name, date/place of birth, passport number, nationality, email, and phone</li></ul>',
            },
        ],
    },
    {
        id: 'cabin-yacht-bookings',
        label: 'Cabin & Yacht Bookings',
        icon: 'directions_boat',
        questions: [
            {
                q: 'Should I book a cabin (spot) or a full yacht?',
                a: 'For groups of 6+, a full yacht is usually better value — lower per-person cost and guaranteed togetherness. Cabin bookings are ideal if you want to meet new people. You\'ll be grouped with like-minded travelers and don\'t need to coordinate a full crew. If friends book separately, just reference each other\'s reservation numbers and we\'ll place you together.',
            },
            {
                q: 'How many spots can I book at once?',
                a: 'You can book up to 6 spots per reservation. Groups larger than 6 should explore full yacht options. Note: full yacht bookings don\'t automatically include a host, water taxi, or food package — these can be added during checkout.',
            },
            {
                q: 'How many people are needed to rent a full yacht?',
                a: 'We recommend 6–10 guests for a full yacht. Some yacht options work for as few as 4 people. Full yachts sell out fast in peak season — book early for the best selection!',
            },
            {
                q: 'Can I book a spot if I\'m traveling solo?',
                a: 'Yes! We have individual cabin/spot bookings available. Book online through our website, or contact us by email at <a href="mailto:info@yachtdays.gr" class="text-primary underline font-bold">info@yachtdays.gr</a> if you need assistance.',
            },
            {
                q: 'Is there an age limit?',
                a: 'Yes. All guests must be between <strong>18 and 45</strong> years old. Our trips are designed as high-energy, social experiences for this demographic. If we discover guests outside this range, we reserve the right to cancel without refund.',
            },
            {
                q: 'How can I guarantee my friends and I are on the same yacht?',
                a: 'Three scenarios:<ol class="list-decimal ml-6 mt-2 space-y-2"><li><strong>Book & pay together:</strong> Same reservation number = same yacht, automatically.</li><li><strong>Book separately:</strong> Add a note with your friends\' names or reservation numbers when booking, and we\'ll place you together.</li><li><strong>Already booked separately:</strong> Email us at <a href="mailto:info@yachtdays.gr" class="text-primary underline font-bold">info@yachtdays.gr</a> with all names and reservation numbers at least 60 days before departure.</li></ol><br/>Note: yachts hold 6–10 guests. Groups larger than 6 may be split across yachts if cabins are unavailable — in that case, consider a full yacht booking.',
            },
            {
                q: 'Can a small group rent a full yacht for more people?',
                a: 'Yes. When you rent a full yacht, you\'re responsible for assembling the crew. There\'s no minimum number of guests — only a maximum based on yacht capacity. You can add or change crew member names up to 30 days before departure, and split costs among the group.',
            },
            {
                q: 'Do I need to leave a security deposit?',
                a: 'No security deposit is required for individual cabin/spot bookings. For full private yacht charters, the local charter company may require a refundable deposit by card authorization on your first day, which is returned within 3–4 weeks provided there is no damage.',
            },
            {
                q: 'What if my booked yacht becomes unavailable?',
                a: 'Yacht availability can occasionally change due to damage or charter issues. We reserve the right to cancel within 10 working days of booking or replace the vessel. If a replacement is needed, we\'ll provide the same or similar standard. If the replacement is a lower class, we refund the price difference. If no suitable alternative exists, a full refund is offered.',
            },
        ],
    },
    {
        id: 'changes-cancellations',
        label: 'Changes & Cancellations',
        icon: 'sync_alt',
        questions: [
            {
                q: 'Can I change my booking dates, route, or package?',
                a: '<strong>Spot bookings:</strong> Changes must be requested via email at least <strong>60 days before departure</strong>, and can only apply to the current season. Changes are granted at our discretion. If the new date/route costs more, you pay the difference. If it costs less, the original price stands.<br/><br/><strong>Full yacht bookings:</strong> No changes permitted. Any modification is treated as a cancellation.',
            },
            {
                q: 'What is the cancellation policy?',
                a: 'Cancellation and refund terms are to be confirmed. Please check back soon or contact us directly at <a href="mailto:info@yachtdays.gr" class="text-primary underline font-bold">info@yachtdays.gr</a> for the latest policy information.',
            },
            {
                q: 'Can I postpone my trip to a future season?',
                a: 'Unfortunately, postponements to future seasons are not available.',
            },
            {
                q: 'I\'ve booked but can\'t make it anymore. What are my options?',
                a: 'Please contact us immediately in writing. We can issue a Letter of Cancellation that you can use to file a claim with your travel insurance provider.',
            },
        ],
    },
    {
        id: 'yachts',
        label: 'Yachts & Cabins',
        icon: 'sailing',
        questions: [
            {
                q: 'What type of yachts do you use?',
                a: 'Our fleet consists entirely of premium Azimut models refitted in 2020: the <strong>Azimut 58, Azimut 66, and Azimut 70</strong>. We don\'t do "budget" boats — every vessel in the flotilla is built for an incredible social sailing experience.',
            },
            {
                q: 'Will the yacht look exactly like the website photos?',
                a: 'Photos and specs on our website are for general reference only. Minor discrepancies between the images and your actual yacht are possible, though we always aim for the same standard or better.',
            },
            {
                q: 'Is there Wi-Fi onboard?',
                a: 'Wi-Fi availability depends on the destination and yacht. Cafés and restaurants at our ports of call offer free Wi-Fi and are easily accessible whenever we\'re not sailing.',
            },
            {
                q: 'Is there air conditioning on the yachts?',
                a: 'A/C is <strong>not available</strong> on standard spot bookings. Premium and deluxe spots have salon A/C when connected to shore power (around 3–4 nights/week while docked). Keep in mind: onboard A/C is not as powerful as land-based systems and may not reach every cabin.',
            },
            {
                q: 'Who will be on my yacht?',
                a: 'Around 50 yachts depart together as a flotilla! Each individual yacht holds 6 or 8 guests plus the skipper depending on the model (Azimut 58/66/70). We aim to create balanced crews by age, gender, and nationality — but you\'ll be partying with the entire flotilla of ~500 travelers throughout the week.',
            },
            {
                q: 'What are the cabins like?',
                a: 'Cabins are shared — either double bed or bunk bed configurations. Each yacht has an indoor salon, outdoor lounge, a full kitchen, refrigeration, electricity, and speakers. There are bathrooms and showers onboard. The setup is compact but comfortable — think RV on the water, not a luxury hotel.',
            },
            {
                q: 'Can I request a bunk bed or a private cabin?',
                a: 'All cabins are shared (2 people per cabin). Most yachts don\'t have bunk beds. When available, bunk beds are prioritized for solo travelers or odd-numbered groups. If you\'re traveling with a friend, expect a shared double-bed cabin.',
            },
            {
                q: 'Will my hair dryer and electronics work onboard?',
                a: 'High-wattage appliances (hair dryers, shavers) need 240V power, which is only available when docked in a marina (typically 3–4 nights/week). Phones, tablets, and GoPros can be charged anytime via the 12V USB converter provided on each yacht.',
            },
            {
                q: 'How much luggage can I bring?',
                a: 'Space is limited — bring a soft-sided bag, not a rigid suitcase. If you\'re staying longer and have a large suitcase, we offer luggage storage at the marina for €30/week per bag.',
            },
            {
                q: 'How long do we spend sailing each day?',
                a: 'Typically 2–4 hours daily. The islands are close together and you\'ll always be within sight of land. When not sailing, you can explore the islands, swim, or relax on deck.',
            },
            {
                q: 'Can I play my own music through the yacht speakers?',
                a: 'Yes! Most yachts have a stereo with an input jack to connect your phone or music device. We provide the necessary cables so you can DJ your own sailing soundtrack.',
            },
            {
                q: 'Is the yacht safe?',
                a: 'Safety is our top priority. All yachts are crewed by experienced, licensed skippers. Follow your skipper\'s instructions and you\'ll be in excellent hands throughout the trip.',
            },
        ],
    },
    {
        id: 'food-dining',
        label: 'Food & Dining',
        icon: 'restaurant',
        questions: [
            {
                q: 'Is food included?',
                a: 'Yes! Half-board is included for all guests. This covers groceries delivered to your yacht before departure for breakfast and a light lunch daily.<br/><br/><strong>Includes:</strong> Cereal, fruit, bread, spreads, cheese, eggs, milk, coffee, tea, pasta, fresh vegetables, and snacks. Guests are responsible for simple meal preparation and sharing cleanup duties. For dinner, the flotilla anchors near incredible local tavernas and restaurants.',
            },
            {
                q: 'Do I need to feed the skipper and host?',
                a: 'No. Skipper food expenses are covered by the company. If a food package is on your yacht, the skipper and host eat from the same package. If your group dines out at a restaurant, treating the skipper is entirely optional — no pressure.',
            },
            {
                q: 'Who handles cooking and cleaning?',
                a: 'Guests prepare their own breakfast and lunch, wash dishes, and keep the yacht tidy. Everyone rotates duties — the skipper pitches in too. It\'s a communal living experience.',
            },
            {
                q: 'Do you accommodate dietary restrictions or allergies?',
                a: 'Our food packages are pre-set and cannot be modified. We don\'t cater to specific dietary needs (vegan, vegetarian, gluten-free, celiac, etc.). Guests with dietary restrictions are welcome to bring their own food onboard. Note: the food package is provided per yacht, not per person.',
            },
        ],
    },
    {
        id: 'skipper-crew',
        label: 'Skipper & Crew',
        icon: 'person',
        questions: [
            {
                q: 'Does the crew speak English?',
                a: 'Yes — all our crew members are fluent in English and are experienced hosts who go above and beyond to make your trip exceptional.',
            },
            {
                q: 'Do I need to help the skipper?',
                a: 'Helping out with sailing tasks (throwing ropes, dropping anchor, swimming landlines to shore) is part of the adventure and most guests love it. It\'s a learning experience, not an obligation.',
            },
            {
                q: 'When will I hear from my skipper?',
                a: 'Your skipper will contact you the day before departure with all the arrival details and any last-minute info you need.',
            },
            {
                q: 'How much should I tip the skipper and host?',
                a: 'Tipping is common in the maritime industry but entirely discretionary. We don\'t set a specific rate. If you feel the crew provided outstanding service, show your appreciation as you see fit.',
            },
        ],
    },
    {
        id: 'safety-conduct',
        label: 'Safety & Conduct',
        icon: 'shield',
        questions: [
            {
                q: 'What is the Captain\'s authority onboard?',
                a: 'The Captain has <strong>ultimate authority</strong> over the vessel and all passengers. Any behavior that endangers the crew or yacht — including excessive intoxication, jumping from a moving boat, or ignoring safety instructions — may result in immediate charter termination <strong>without refund</strong>.',
            },
            {
                q: 'Is there a safety briefing before departure?',
                a: 'Yes. Every guest must complete a safety briefing before we set sail. This covers emergency procedures, life jacket locations, fire safety, and man-overboard protocols.',
            },
            {
                q: 'What is the alcohol policy?',
                a: '<strong>No BYO alcohol</strong> is permitted on any voyage. Alcohol is available through our optional Unlimited Drinks package add-on (€199/person), which includes local spirits and beer. Crew discretion applies at all times — alcohol service may be refused to intoxicated guests to ensure safety.',
            },
            {
                q: 'What behavior can get me removed from the yacht?',
                a: 'The following may result in immediate removal without refund:<ul class="list-disc ml-6 mt-2 space-y-1"><li>Excessive intoxication putting yourself or others at risk</li><li>Aggressive, violent, or threatening behavior</li><li>Ignoring skipper instructions</li><li>Vandalism or deliberate damage to the yacht</li><li>Jumping from a moving vessel</li><li>Possession of illegal substances</li></ul>',
            },
        ],
    },
    {
        id: 'routes-destinations',
        label: 'Routes & Destinations',
        icon: 'map',
        questions: [
            {
                q: 'What routes are available?',
                a: 'We operate two fixed Cyclades itineraries:<br/><br/><strong>5 Nights:</strong> Mykonos (2 nights), Milos (1 night), Santorini (2 nights).<br/><strong>7 Nights:</strong> Mykonos (2 nights), Ios (2 nights), Santorini (2 nights), Milos (1 night).',
            },
            {
                q: 'Can I choose which islands to visit?',
                a: 'All our trips follow the fixed 5-night or 7-night itineraries above. We sail as a flotilla of 50 yachts, so custom routing is not available.',
            },
            {
                q: 'Where does the yacht depart from?',
                a: 'All routes depart from the Athens area (Alimos Marina). You\'ll receive your exact departure marina details and arrival instructions 14 days before the trip by logging into your account.',
            },
        ],
    },
]

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function FaqPage() {
    const { openBooking } = useBooking()
    const [activeCategory, setActiveCategory] = useState(faqCategories[0].id)
    const [openItems, setOpenItems] = useState({})
    const [searchQuery, setSearchQuery] = useState('')

    const sectionRefs = useRef({})
    const categoryNavRef = useRef(null)

    const toggleItem = (catId, idx) => {
        const key = `${catId}-${idx}`
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    /* ─── Scroll spy: highlight active category ─── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveCategory(entry.target.id)
                    }
                })
            },
            { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
        )

        faqCategories.forEach((cat) => {
            const el = sectionRefs.current[cat.id]
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    /* ─── Scroll category nav into view on mobile ─── */
    useEffect(() => {
        if (!categoryNavRef.current) return
        const activeBtn = categoryNavRef.current.querySelector(`[data-cat="${activeCategory}"]`)
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
    }, [activeCategory])

    const scrollToCategory = useCallback((catId) => {
        const el = sectionRefs.current[catId]
        if (el) {
            const offset = 120
            const y = el.getBoundingClientRect().top + window.scrollY - offset
            window.scrollTo({ top: y, behavior: 'smooth' })
        }
    }, [])

    /* ─── Filter Q/A by search ─── */
    const getFilteredCategories = () => {
        if (!searchQuery.trim()) return faqCategories
        const q = searchQuery.toLowerCase()
        return faqCategories
            .map((cat) => ({
                ...cat,
                questions: cat.questions.filter(
                    (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
                ),
            }))
            .filter((cat) => cat.questions.length > 0)
    }

    const filtered = getFilteredCategories()

    return (
        <div className="bg-background-sand text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden mesh-bg font-body min-h-screen">
            <SEO
                title="FAQ | Greece Party Yacht Charter & Social Sailing Tips"
                description="Got questions about sailing the Greek islands? Read our FAQ for everything you need to know about our epic, highly social, and fun party yacht vacations."
                keywords="Greece party yacht charter FAQ, social sailing Greece questions, Greek island party cruise tips"
            />
            <Navbar />

            {/* ─── HERO (unchanged) ──────────────────────────────────── */}
            <section className="relative pt-44 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="FAQ Background" className="w-full h-full object-cover" src={HERO_IMAGES[0]} />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-neon-pink/10 text-neon-pink px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 font-display border border-neon-pink/20">
                        The Rules of the Game
                    </span>
                    <h1 className="sr-only">Greece Party Yacht Charter FAQ</h1>
                    <h2 className="text-7xl md:text-9xl font-punchy text-slate-900 mb-6 leading-[0.9] italic drop-shadow-sm uppercase">
                        F.A.<span className="text-neon-pink">Q.</span>
                    </h2>
                    <div className="relative max-w-xl mx-auto mt-8 md:mt-12">
                        <input
                            className="w-full bg-white/90 border-none rounded-2xl px-6 py-4 md:px-8 md:py-5 text-sm md:text-lg font-display focus:ring-2 focus:ring-neon-aqua shadow-2xl backdrop-blur-md placeholder:text-xs md:placeholder:text-base placeholder:text-slate-400"
                            placeholder="Search questions…"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-3 rounded-xl hover:bg-neon-pink transition-all cursor-pointer">
                            <span className="material-icons">search</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── FAQ BODY: Two-column layout ──────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 pb-24 pt-12">


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* ─── LEFT: Category Nav (desktop sticky) ──────── */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-2">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 font-display">Categories</h4>
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => scrollToCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all cursor-pointer font-display ${activeCategory === cat.id
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-lg ${activeCategory === cat.id ? 'text-neon-aqua' : 'text-slate-400'}`}>
                                        {cat.icon}
                                    </span>
                                    {cat.label}
                                </button>
                            ))}

                            {/* Sidebar CTA */}
                            <div className="mt-8 bg-gradient-to-br from-neon-pink to-indigo-600 rounded-[2rem] p-6 text-white">
                                <h3 className="text-lg font-punchy uppercase italic mb-2">Still Got Questions?</h3>
                                <p className="text-white/80 font-display text-xs mb-4 leading-relaxed">Get a personalized answer in under 60 minutes.</p>
                                <button onClick={() => openBooking({ action: 'book-yacht', source: 'faq' })} className="w-full bg-white text-slate-900 py-3 rounded-xl font-punchy text-sm hover:scale-[1.02] transition-transform uppercase tracking-wider cursor-pointer">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* ─── RIGHT: Accordion Sections ─────────────────── */}
                    <div className="lg:col-span-9 space-y-16">
                        {filtered.map((cat) => (
                            <div
                                key={cat.id}
                                id={cat.id}
                                ref={(el) => (sectionRefs.current[cat.id] = el)}
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-neon-aqua text-xl">{cat.icon}</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-punchy italic uppercase tracking-tighter">{cat.label}</h2>
                                </div>

                                {/* Accordion Items */}
                                <div className="space-y-3">
                                    {cat.questions.map((item, idx) => {
                                        const key = `${cat.id}-${idx}`
                                        const isOpen = openItems[key]
                                        return (
                                            <div key={idx} className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden transition-all hover:border-neon-aqua/50">
                                                <button
                                                    onClick={() => toggleItem(cat.id, idx)}
                                                    className="w-full flex justify-between items-center p-5 md:p-6 text-left cursor-pointer gap-4"
                                                >
                                                    <span className="font-punchy text-base md:text-lg uppercase italic tracking-tight leading-snug">{item.q}</span>
                                                    <span className={`material-icons text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                                                        expand_more
                                                    </span>
                                                </button>
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                                        }`}
                                                >
                                                    <div
                                                        className="px-5 md:px-6 pb-6 text-sm md:text-base text-slate-600 font-display leading-relaxed border-t border-slate-50 pt-4"
                                                        dangerouslySetInnerHTML={{ __html: item.a }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}

                        {filtered.length === 0 && (
                            <div className="text-center py-20">
                                <span className="material-icons text-6xl text-slate-300 mb-4 block">search_off</span>
                                <h3 className="font-punchy text-2xl uppercase italic mb-2">No results found</h3>
                                <p className="text-slate-500 font-display">Try a different search term or <button onClick={() => setSearchQuery('')} className="text-neon-pink underline font-bold cursor-pointer">clear the search</button>.</p>
                            </div>
                        )}
                        <p className="text-center text-slate-500 font-space text-sm italic mt-12 mb-8">Departure times can change due to weather.</p>
                    </div>
                </div>
            </section>

            {/* ─── HOT DEALS / ROUTE SELECTION ─────────────────────────── */}
            <section className="py-20 px-4 bg-slate-900 relative overflow-hidden border-t-8 border-neon-aqua" id="hot-deals">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,229,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-white">
                        HEAVY GRIT. <span className="text-neon-pink">LIGHT PRICE.</span>
                    </h2>
                    <HotRouteCards />
                </div>
            </section>

            <Footer />

            {/* ─── WHATSAPP FAB ──────────────────────────────────── */}
            <a
                className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="material-icons text-4xl">chat</span>
            </a>


        </div>
    )
}
