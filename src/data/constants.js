// Yacht data — single source of truth for frontend
export const YACHTS = {
    'azimut-58': {
        slug: 'azimut-58',
        name: 'Azimut 58',
        maxGuests: 6,
        cabins: '3 Luxury Cabins',
        cabinDetail: '1 Queen, 2 twin cabins',
        year: 2020,
        basePrice: 15_000,
        included: ['Breakfast', 'Light evening meal'],
        features: ['Spacious Sun Deck', 'Swim Platform & Snorkelling Gear', 'Full Galley Kitchen'],
        featureIcon: 'bolt',
        guestBadgeColor: 'neon-aqua',
        image: '/img/azimut58.webp',
        badge: 'Built 2020',
        badgeStyle: 'bg-white/90 text-slate-900',
    },
    'azimut-66': {
        slug: 'azimut-66',
        name: 'Azimut 66',
        maxGuests: 8,
        cabins: '4 Luxury Cabins',
        cabinDetail: '2 Queens, 2 twin cabins',
        year: 2020,
        basePrice: 20_000,
        included: ['Breakfast', 'Light evening meal'],
        features: ['Flybridge Lounge', 'Full Galley Kitchen', 'Jacuzzi on Deck'],
        featureIcon: 'celebration',
        guestBadgeColor: 'neon-pink',
        image: '/img/azimut66.webp',
        badge: 'Most Popular',
        badgeStyle: 'bg-neon-pink text-white',
        popular: true,
    },
    'azimut-70': {
        slug: 'azimut-70',
        name: 'Azimut 70',
        maxGuests: 10,
        cabins: '5 Cabins',
        cabinDetail: '2 Queens, 3 twin cabins',
        year: 2020,
        basePrice: 28_000,
        included: ['Breakfast', 'Light evening meal'],
        features: ['Full Crew (Skipper + Hostess)', 'Premium Sound System', 'Spacious Flybridge'],
        featureIcon: 'star',
        guestBadgeColor: 'primary',
        image: '/img/azimut70.webp',
        badge: 'Built 2020',
        badgeStyle: 'bg-white/90 text-slate-900',
    },
}

// Pricing constants
export const ALCOHOL_PRICE_PER_PERSON = 199
export const WHOLE_YACHT_ALCOHOL_PRICE = 99

// Whole-yacht flat-rate pricing (entire boat, not per-person)
export const WHOLE_YACHT_PACKAGES = {
    '5n': { id: '5n', label: '5 Nights — Whole Yacht', nights: 5, price: 5900, route: 'Mykonos (2) • Milos (1) • Santorini (2)' },
    '7n': { id: '7n', label: '7 Nights — Whole Yacht', nights: 7, price: 6500, route: 'Mykonos (2) • Ios (2) • Santorini (2) • Milos (1)' },
}
export const WHOLE_CABIN_PACKAGES = {
    '5n': { id: '5n', label: '5 Nights — Whole Cabin', nights: 5, price: 1480, route: 'Mykonos (2) • Milos (1) • Santorini (2)' },
    '7n': { id: '7n', label: '7 Nights — Whole Cabin', nights: 7, price: 1820, route: 'Mykonos (2) • Ios (2) • Santorini (2) • Milos (1)' },
}

// Supabase config — TODO: replace with real values
export const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
export const SUPABASE_ANON = 'YOUR_ANON_KEY'
export const FUNCTION_URL = `${SUPABASE_URL}/functions/v1`

// Hero images
export const HERO_IMAGES = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ-qYPs8mCCAPKiLtoglqADj_FZbGZQaLpeR1KQAhNv4ePngk0MQs0NAKxBa5cIBvog5X1l1QyQ_vEgc5UwvVH9aEHX4MbWzntnFLztYbn8252je6wO0WXjpnwjbtq9Y92XPIcqvK7vgVOEdUSKSZoDc4_u-VRcCn4--fMnKIXNfcwYDripgB_UgK2W94kMXQZqvg-XTRsvmrmVnkSQsK2LNepaQpaszadPqBsZRf71KPso593twAOCkXwSF9R73M33ZtIOUZhpA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA8fehR8tXSqCg0sqQY77nJxvdINnQ9guatHWL16Y65HltYOrYzTgdMJSsM3sW-WZCGoF_eaqILnrpLrBuK5xthEO4mDJLCV2-9-WYb4haVo1n6zS7jS31Zb_28FHzl_Y6LSXHOVNTjSX3hu5LWGuiSLi77T8QrGpS77Tetmk3M7MYIjEPIWtRArwiS9wbTG9-4YBHYVVDgF9mJXAGDmpmVjB0up2pvPAv29zrqvSqLocdJZh4kA-cBmwsIMGsktQWmoJfJDN4Ikw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDg8c0gKLR2UEMnUBnaL7m0n0HmKSec7qDsQeHKwhR3POXidA3Jw0DyTGInBPEUw-malMtFpKqESyJY8DbDLWpz9QYX_NInef6k2OBvsAtmpAKu-mib5bWjA9PzBO5IbQEChu8v3Y9Wa88FYEoIKBrdtWYEP5gvpO6S-azGO4iWcpS9NfZVCXn3Aj6hrr9X4O2BSQG-Zn0gypyim4mOb1wYrrh32q4LBG1-PvhHF2F3D8WKJKQBD1M6oKGxKxIW9_lmtZ89Vl2DoQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCFTlKGcFylRSqabr1fif-RG_TCc1qKBK1IOMBE9ytvMK7rZO6WlZ6JV1TI63gEaO9921sWoHcX0qcv3zi5hhVkzPbVAR45-I_chZcSfWLDqhAdevX0Q4Q3QjUYjiTZE8rFZ6XgjL_feAyw-qQy5pM7pivpGAah2H7wml02IvcnytV-Sam_7OAypMsvmCc6OrghKq1NYFgf5i2OQ2_4K4p-V31i1pNjoRcBHHv-0ZTv4vUZaca5k8a2bfgsVTE7i34niKzlFyja4w',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBPV7lrqqiPiXhxzKBslNE_PSCvhdfZyaMa_PdLxD6aDy5cCbp2B_wZ28nIoo0QKx_6AKQw-0T5OyZX0J03dCvtU2KGFz015t8bIVOXMXh3Je4Zmq40ssvS6jI2JUcrJ7z2GakdCMIjl1XC3aOytYucufBN14xzf9dlw7Lr65ewcGGRWrEuyyeTlt4XtQPBLRIeEyo_kYex2VRjt1OW3ziCTtN4ivKTpbzzMLIpMx5BSWB-v5TCeSYsK24yW2QkDN-zxhQL4v6dAQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgE9NlEKr2fUTT1mKJxU7TdM2LjJqFXYwxwk28HkwyicGUI90C0Se8eT7SeqKFW0l143hejv1qA6oyUpCzLy_vL1p1jb_ma2lBaXy8zpEjWWYKky4palOIKudvH5c4V5JkAzT6xnZJIGR-vYmG-sbecJtdMeA-p7HnMuO4L4cGIzzrbUhZweyKrvyk5wI7KKWNQzgLDbwN3vFGDpXLqwNuSBD1q-JKTRmWm2vuXnAPM_5cmxxnHjltaJ9eSNeafsx0HFXNH3OvYA',
]

// Testimonials data
export const TESTIMONIALS = [
    {
        initials: 'SJ',
        name: 'Sarah Jenkins',
        location: 'Belfast, Ireland',
        quote: '"I DON’T THINK I’VE EVER SLEPT SO LITTLE AND LIVED SO MUCH IN ONE WEEK. EVERY NIGHT TURNED INTO A MAD ONE, EVERY DAY WAS SWIMS, SUN AND CHAOS. SOMEHOW WE WERE RUNNING ON ZERO ENERGY BY DAY 4 AND STILL DIDN’T WANT IT TO END. 100% COMING BACK NEXT YEAR."',
        image: '/img/gal52.webp',
    },
    {
        initials: 'LC',
        name: 'Lachlan Cooper',
        location: 'Sydney, Australia',
        quote: '"HONESTLY, THERE WAS ALWAYS SOMETHING HAPPENING. BOAT PARTIES, BEACH STOPS, SUNSET DRINKS, RANDOM PLANS WITH THE GROUP — IT WAS NON-STOP IN THE BEST WAY. WE KEPT SAYING WE’D HAVE A CHILLED DAY AND IT NEVER HAPPENED. NO REGRETS AT ALL."',
        image: '/img/gal49.webp'
    },
    {
        initials: 'MK',
        name: 'Laura Andersen',
        location: 'Manchester, UK',
        quote: '"THE WHOLE THING JUST FELT SO EASY. AMAZING CREW, BEAUTIFUL YACHT, GOOD PEOPLE, INSANE LOCATIONS. IT HAD THAT PERFECT MIX OF FEELING LOOKED AFTER BUT STILL FEELING LIKE THE BEST KIND OF FREEDOM. PROPERLY ONE OF THOSE TRIPS YOU TALK ABOUT FOR AGES AFTER."',
        image: '/img/gal51.webp',
    },
    {
        initials: 'TW',
        name: 'Tama Wyatt',
        location: 'Melbourne, Australia',
        quote: '"THE ONLY PROBLEM WAS THAT THERE WAS WAY TOO MUCH GOING ON TO EVER GET A PROPER NIGHT’S SLEEP — AND SOMEHOW THAT MADE IT EVEN BETTER. EVERY NIGHT HAD A DIFFERENT ENERGY, EVERY STOP FELT LIKE A HIGHLIGHT, AND BY THE END NONE OF US WANTED TO GO HOME."',
        image: '/img/gal53.webp',
    },
]

// FAQ data
export const FAQ_ITEMS = [
    { q: 'How many guests per yacht?', a: 'Each yacht accommodates 6 or 8 guests depending on the model (Azimut 58, 66, or 70). Around 50 yachts depart together as a flotilla, so you\'ll be travelling with a huge social group.', color: 'neon-pink' },
    { q: 'Is there an alcohol add-on?', a: 'Yes — an optional unlimited drinks package is available for €199 per person and includes local spirits and beer, served responsibly. No BYO alcohol is permitted on board.', color: 'neon-aqua' },
    { q: 'Are there payment discounts?', a: 'Book before June 15 and save: 10% off your first payment with installments, or up to 19% off when you pay in full. Payment is split 33%/33%/34% in weekly installments. Bookings within 14 days of departure require full payment.', color: 'primary' },
    { q: 'When do departures run?', a: 'The season starts 20 April. Departures leave every Monday, Wednesday, and Friday throughout the season.', color: 'neon-pink' },
    { q: 'What about the safety briefing?', a: 'Every trip includes a free mandatory EU safety briefing before departure to ensure everyone stays safe on board.', color: 'neon-aqua' },
    { q: 'What are the itineraries?', a: '5 Nights: Mykonos (2 nights) → Milos (1 night) → Santorini (2 nights). 7 Nights: Mykonos (2) → Ios (2) → Santorini (2) → Milos (1). Itineraries are fixed — no custom routing.', color: 'primary' },
    { q: 'What is the "Year 2020" badge?', a: 'It means our entire fleet underwent a full mechanical and aesthetic refit in 2020. They are like new.', color: 'neon-pink' },
    { q: "What's the weather policy?", a: 'Departure times can change due to weather and sea conditions. If conditions are unsafe, we will work with you to reschedule. Cancellation and refund terms to be confirmed.', color: 'neon-aqua' },
]
