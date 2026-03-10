/* ─── Destination Data Model ─────────────────────────────────
   Single source of truth for all destination detail pages.
   Each island object drives the DestinationDetailPage template.
──────────────────────────────────────────────────────────── */

const destinations = [
    /* ═══════════════════  MYKONOS  ═══════════════════ */
    {
        slug: 'mykonos',
        name: 'Mykonos',
        tagline: 'Where Beach Clubs Meet White-Street Magic',
        heroSubtitle: 'Where beach clubs meet white-street magic. Ready for the best week of your life?',
        heroHeadlineSuffix: 'Pure Energy',
        vibeTags: [
            { emoji: '⚡', label: 'Party' },
            { emoji: '🏛️', label: 'Culture' },
            { emoji: '🍹', label: 'Beach Clubs' },
            { emoji: '💎', label: 'Luxury' },
        ],
        includedOn5N: true,
        nightsOn5N: 2,
        includedOn7N: true,
        nightsOn7N: 2,

        package5NHighlights: [
            'Sunset views from the deck',
            'Mykonos Town Labyrinth Tour',
            'Recovery Swim in Hidden Bays',
            'Half-Board (Breakfast & Lunch)',
        ],
        package7NHighlights: [
            'Everything in 5N +',
            'Extended Mykonos exploration',
            'Full-Day Rhenia Island Expedition',
            'Extra island time for the full Cyclades experience',
        ],

        includedMoments: [
            {
                tag: 'Day 1', tagColor: 'primary', title: 'Dock-in Celebration',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6hyHHzltCuzkCYbIwW6fjpWNWzDJWD1g0nqwg7K7io8J4ZCfvhvFKAkXOOyRaWYEq9zXmiUhK72jDGXUIrI0Q6QKZcODasF5VYXGv5ScPE_IrpjU2TyXoTaFLmjzB7ScJQvDeTivHc2vn82VNMcY7142ss3wNMdNqyVJL-j7PzjCWFFvQud8_LoB6SwwdRYVTw0o2t6fWS2U8i0-HuUj3BiilMbxLEnUQk-Nhtq_d82BqzbdZl9osD_COsuvwmyXY5ZVTlf9T8w'
            },
            {
                tag: 'Sunset', tagColor: 'neon-pink', title: 'Sunset Beach Club',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLq3K5jrzW0sz-ICB9Pz_kJV0O13obqxMAJhE-7gtFbsMcVaU1GDGuNUQYfIQDGEiE9ZuK678RTpgf_cg-d7J_7pB5ee36O3T-j3Ois8Zk0M2bsLAwihQv707OvGI0vs1qHhWu1LTApL-HYiHgzMZ3dYVVkBK5cS_HXDTkW5OeJdcnK9uo6w6nDtzt0ukQSf25PiKGsSvJVydzWZy2BkSyg595gjcMrnZZI-sqY9dHBDGI59zN53ZxGxkmKiS97aspKJitMTNBzA'
            },
            {
                tag: 'Night', tagColor: 'primary', title: 'Town Labyrinth',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5dhow8F4NX_7iCA0TxFOhITwaBREe8ekZ3ljqJ-LHjQon8SzGis3kCL2-1j81BQRkHY8QFDQY9_qvYqmXR40T-lodsfK-TcC-24w9H-T10QZAIxLLhlhtAjdtaTKwUp29hCxVKM1QeiS6LX45LQWr5XLxeVJe4lA8nbnm0rFx1XdI6JRK76woePJ8qbL_edWGsWCPSGh3vKhQl0UYmIDkBmTbCMBh1ZkRjd8QpQs_nXbxr6h-JZ7HVxHzDGwrjtJswxq8f_ZDPQ'
            },
            {
                tag: 'Morning', tagColor: 'neon-pink', title: 'Recovery Swim',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO-75yIiF74SJTkAYZDbY0ClXS8eO89Pl07dwdNZ1TzWz9RROJLcxhOBcp1yHLhJ_iDicEDXC4-y34i18rpZav_T8kLVPZdTqDf9iVirWfKHiNPP1WXgeDHW9YHlpeKNF96zj3IfKnCtzWbbdqynh7GGiG3ManB6XJaXauEyAdTU4Aeqild_zCG2jw0yQt2-gWqpNsLaLMwgwbUcshCgrCBJeV2gd8JMvqC3R5kWVgs8gE6_96reyi04bAFG73J8Lm2-QoVeEKPg'
            },
            {
                tag: 'Epic', tagColor: 'primary', title: 'Beach Club R2',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFX9_5nALBK022bJEHqsTnWf8gCoY28XeE6Vv4h5gxYAQ73erHtUuVFjP0ufvZnsalZP3A0gJcjrib1yx67PVqm9zRV7OiL3o4O8otuagaPxJHki68I0U_5rtt55jZIe00x_Fi3fyAEneI0j_ixGtra8ogsulHv3zrGUR8PDsdNZyCvubRE3h_FqL01nE-l-aIF45cNb36SgEXHbGoQ1j6EBN8McSfm0T-ZM3HRT5Sf3opJYaJAivl16h8vBtheXglgcNL2qL8cg'
            },
            {
                tag: 'Pre-game', tagColor: 'neon-pink', title: 'Deck Pre-game',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKp5lmka6m5kKw8_puaZ3BzugQhoy3flcu4J78sF1kOhl57cxAzbTvbHpWhXC7Mzkb19NV8zI96W_6OcZHW4KFICIdFIrbqyuIhbPYMauHC3DWmMPSJvPykTOb7gupOBgFiTbHHd9CUw-aDCr82vhFpmf-yjWqL4UK7pLFpRPfs_ILoH9BHDwJAIEWTM3qxgMydzPkxwNsiTVBzweueTYntpKwbt7o99zrkYBFLP3BHhnVz663pZh_vv4VIduS5cE9yhOeGSBN-A'
            },
        ],

        optionalAddOns: [
            {
                title: 'Delos Ancient Tour', priceFrom: 45, category: 'Culture',
                description: 'Explore the birthplace of Apollo. Available via GetYourGuide.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_OWXXIEjIoc4YopJMT4gsDSdjKjvCbtQ-N8BMZZ5zmow63nYk7HN6CCp479mBLDsLihszizRHfz7RcTBue7cFi8RlCIDP9ktMrDMlw2UKmwVVUMiHCOO7oQ4rwrjVt4SvyJ4gjMxp6Cwt-upKrZjfn6Askop6K3L7SQkAMsBN-1ZCbkVJDOcKO38dpruZAD-jKSI-_jAHo4SPQ1aYbBmvC7K-x-hM5Eo1EdfhCA3L3O71v73CFAfrrN3r7RmgUGIhnsk9U7MaOg'
            },
            {
                title: 'Rhenia Island Cruise', priceFrom: 60, category: 'Excursion',
                description: 'Crystal blue waters away from the Mykonos crowds.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUFekGMqhywdzg5WQ3fkzrnInwpasT4tOFSxigUGTNE2SToZDrmp0UiKRNEdGrbUxpdKI4fNoCj2jOjYeX1-NHz3_X52KPerv638JGWv1QEUj7MdPSduZBFBsIX2aDFWrOICCOkMe-Bj20h_YlS-bJ2Fg-7TdqqFnxwYp96r_PJYzOqppiBozcqupcqP0PJ9DNetBGmuKSITO0kV7kQ661XRmYhCz4jhaHg_SW4DOtSRruzx7qApHkMBQbGlYnsU8lVszvq4gDJg'
            },
            {
                title: 'Professional Photos', priceFrom: 35, category: 'Photo',
                description: 'Get that perfect feed shot. Professional yacht photographer.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4GW9MDUGNnW9_QgxrQS0yWIeu83SHpPpKj9tVYAr17m1KympjqhtUiof4fw-K9BmgC1in88wHt6u22Q8JRsOlo9m9Na4MMfnhSxEUThpvV_S74zobAkB7RIcD0ABKm5qlizgmCbVtvYXWsVQseH9ejjU0OxrPubRgeedyOCFlXmJbdVh8P1gkdZkh0DPgm8pRclBaCx_QCVxuv53mt3K2k1dXATm5w_OsPy3EIBcziIs2_AoFl-Z6jaPxQMSrlPDtdz3u2y-ClA'
            },
            {
                title: 'ATV Island Ride', priceFrom: 85, category: 'Adventure',
                description: 'Rent an ATV and conquer the Mykonos hills.',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfYOOFkO-1wE__SxIS4UA5lKeNtVA-lco7yBhCuPVScefm6ZiPhLerINumMEb1PkpgKoPbO9ed7-mc_icJqN2aU_DqGfoKhbmRsTXDWev8vjPce4W4DKYlfEt5NZA3E_NS6JjKlKCID0uq6sE2tnYY2FORGBy7S-wkJADhezy2Kk91oV5rzfkcMGy_gYNZHj5dtWubOVBkZRONl-KLMAkBigW2qj7jQ4yObyDd9fQRleN42PIHi7dkX9BcZ4EIf60J-qSsV2F3g'
            },
        ],

        hotDeals: [
            {
                title: 'Cyclades Explorer', routeLabel: '7N Route', dates: 'April 15 — April 22',
                price: 649, wasPrice: 929, badge: '2 Spots Left', badgeColor: 'bg-primary text-bg-dark',
                dealSlug: 'cyclades-explorer-apr', borderClass: 'border-2 border-primary shadow-2xl'
            },
            {
                title: 'Essential Loop', routeLabel: '5N Route', dates: 'May 02 — May 07',
                price: 599, wasPrice: 739, badge: 'Last Cabin', badgeColor: 'bg-neon-pink text-white',
                dealSlug: 'essential-loop-may', borderClass: 'border border-gray-100 shadow-xl'
            },
            {
                title: 'Cyclades Edge', routeLabel: '7N Route', dates: 'May 10 — May 17',
                price: 699, wasPrice: 929, badge: 'Almost Gone', badgeColor: 'bg-neon-aqua text-bg-dark',
                dealSlug: 'cyclades-edge-may', borderClass: 'border border-gray-100 shadow-xl'
            },
        ],

        heroImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD4hmIsXiitld_APUAcgln7dwOia2k8df1M94qsznht0SP1NvcFht5BBW0IPYBeR2AYFQRI7bBI0WvpczemTUFEYBUMNz-XWWwXBWnSu8iK1YJYBZ8tHi__wFuxYkjUqc63V5UNJrGvQn24lB-Dfts3mMoTQDAnkE2Zzhs6v8KFgRcgWbrnssx-BuMLFY6a39uXGvIS4OD7m5RtFIA3Zy__hAgShFg3hKNWcjI4rlmUz-A2r9ubuAyUk56VTvg-6hd9xocImC_mdA',
        ],

        floatingDeal: {
            badge: 'Last Cabin',
            title: 'Essential Loop',
            price: '€599',
            dealSlug: 'essential-loop-may',
        },
    },

    /* ═══════════════════  IOS  ═══════════════════ */
    {
        slug: 'ios',
        name: 'Ios',
        tagline: 'Where Midnight Meets the Sunrise Swim',
        heroSubtitle: 'Legendary nightlife meets hidden coves only accessible by yacht. Pure island freedom.',
        heroHeadlineSuffix: 'Island Freedom',
        vibeTags: [
            { emoji: '🔥', label: 'Nightlife' },
            { emoji: '🏖️', label: 'Hidden Bays' },
            { emoji: '🎵', label: 'Live Music' },
            { emoji: '🤿', label: 'Snorkeling' },
        ],
        includedOn5N: true,
        nightsOn5N: 1,
        includedOn7N: true,
        nightsOn7N: 2,

        package5NHighlights: [
            'Chora Village Evening Stroll',
            'Mylopotas Beach Day',
            'Secret Cove Snorkel Stop',
            'Half-Board (Breakfast & Lunch)',
        ],
        package7NHighlights: [
            'Everything in 5N +',
            'Extended south coast exploration',
            'Full-Day South Coast Exploration',
            'Night Market & Street Food Tour',
        ],

        includedMoments: [
            {
                tag: 'Arrival', tagColor: 'primary', title: 'Harbour Welcome',
                img: 'https://source.unsplash.com/featured/?ios,greece,harbour,boat'
            },
            {
                tag: 'Night', tagColor: 'neon-pink', title: 'Chora Evening',
                img: 'https://source.unsplash.com/featured/?nightclub,party,friends'
            },
            {
                tag: 'Morning', tagColor: 'primary', title: 'Sunrise Swim',
                img: 'https://source.unsplash.com/featured/?swimming,ocean,sunrise'
            },
            {
                tag: 'Adventure', tagColor: 'neon-pink', title: 'Hidden Cove',
                img: 'https://source.unsplash.com/featured/?hidden,cove,boat,greece'
            },
            {
                tag: 'Sunset', tagColor: 'primary', title: 'Deck Sunset',
                img: 'https://source.unsplash.com/featured/?yacht,cocktails,sunset'
            },
            {
                tag: 'Epic', tagColor: 'neon-pink', title: 'Beach Club Night',
                img: 'https://source.unsplash.com/featured/?beach,club,party,night'
            },
        ],

        optionalAddOns: [
            {
                title: 'Homer\'s Tomb Hike', priceFrom: 30, category: 'Culture',
                description: 'Trek to the legendary tomb of Homer with panoramic island views.',
                img: 'https://source.unsplash.com/featured/?hiking,greece,ancient'
            },
            {
                title: 'Jet Ski Safari', priceFrom: 75, category: 'Adventure',
                description: 'Blast around the south coast on high-power jet skis.',
                img: 'https://source.unsplash.com/featured/?jetski,ocean,adventure'
            },
            {
                title: 'Professional Photos', priceFrom: 35, category: 'Photo',
                description: 'Capture the crew vibes with a pro yacht photographer.',
                img: 'https://source.unsplash.com/featured/?photography,yacht,friends'
            },
            {
                title: 'Cooking Class', priceFrom: 50, category: 'Culture',
                description: 'Learn Greek cuisine on deck with a local chef.',
                img: 'https://source.unsplash.com/featured/?cooking,class,greek,food'
            },
        ],

        hotDeals: [
            {
                title: 'Ios Explorer', routeLabel: '7N Route', dates: 'April 20 — April 27',
                price: 679, wasPrice: 929, badge: '3 Spots Left', badgeColor: 'bg-primary text-bg-dark',
                dealSlug: 'ios-explorer-apr', borderClass: 'border-2 border-primary shadow-2xl'
            },
            {
                title: 'Ios Essential', routeLabel: '5N Route', dates: 'May 10 — May 15',
                price: 579, wasPrice: 739, badge: 'Last Cabin', badgeColor: 'bg-neon-pink text-white',
                dealSlug: 'ios-essential-may', borderClass: 'border border-gray-100 shadow-xl'
            },
            {
                title: 'Ios Finale', routeLabel: '7N Route', dates: 'May 19 — May 26',
                price: 649, wasPrice: 929, badge: 'Almost Gone', badgeColor: 'bg-neon-aqua text-bg-dark',
                dealSlug: 'ios-finale-may', borderClass: 'border border-gray-100 shadow-xl'
            },
        ],

        heroImages: [
            'https://source.unsplash.com/featured/?ios,greece,beach,party',
        ],

        floatingDeal: {
            badge: 'Last Cabin',
            title: 'Ios Essential',
            price: '€579',
            dealSlug: 'ios-essential-may',
        },
    },

    /* ═══════════════════  SANTORINI  ═══════════════════ */
    {
        slug: 'santorini',
        name: 'Santorini',
        tagline: 'Volcanic Sunsets & Caldera Dreams',
        heroSubtitle: 'The world\'s most dramatic sunsets and volcanic beaches. A must-see on every bucket list.',
        heroHeadlineSuffix: 'Caldera Magic',
        vibeTags: [
            { emoji: '🌅', label: 'Sunsets' },
            { emoji: '🌋', label: 'Volcanic' },
            { emoji: '🍷', label: 'Wine' },
            { emoji: '📸', label: 'Iconic Views' },
        ],
        includedOn5N: true,
        nightsOn5N: 2,
        includedOn7N: true,
        nightsOn7N: 2,

        package5NHighlights: [
            'Caldera Sunset Sail',
            'Oia Golden Hour Walk',
            'Red Beach & White Beach Stops',
            'Half-Board (Breakfast & Lunch)',
        ],
        package7NHighlights: [
            'Everything in 5N +',
            'Volcanic Hot Springs Swim',
            'Private Wine Tasting at Santo Wines (via GetYourGuide)',
            'Night Dinner in Fira with Caldera Views',
        ],

        includedMoments: [
            {
                tag: 'Arrival', tagColor: 'primary', title: 'Caldera Approach',
                img: 'https://source.unsplash.com/featured/?santorini,caldera,yacht'
            },
            {
                tag: 'Golden Hour', tagColor: 'neon-pink', title: 'Oia Sunset',
                img: 'https://source.unsplash.com/featured/?santorini,oia,sunset'
            },
            {
                tag: 'Morning', tagColor: 'primary', title: 'Red Beach Swim',
                img: 'https://source.unsplash.com/featured/?santorini,red,beach'
            },
            {
                tag: 'Experience', tagColor: 'neon-pink', title: 'Wine Tasting',
                img: 'https://source.unsplash.com/featured/?wine,tasting,greece'
            },
            {
                tag: 'Night', tagColor: 'primary', title: 'Fira Nightlife',
                img: 'https://source.unsplash.com/featured/?santorini,night,restaurant'
            },
            {
                tag: 'Pre-game', tagColor: 'neon-pink', title: 'Deck Vibes',
                img: 'https://source.unsplash.com/featured/?yacht,party,deck,friends'
            },
        ],

        optionalAddOns: [
            {
                title: 'Volcano & Hot Springs', priceFrom: 40, category: 'Adventure',
                description: 'Hike the active volcano then soak in natural hot springs.',
                img: 'https://source.unsplash.com/featured/?volcano,santorini,springs'
            },
            {
                title: 'Wine Tour Experience', priceFrom: 65, category: 'Culture',
                description: 'Visit 3 boutique wineries with sunset caldera views.',
                img: 'https://source.unsplash.com/featured/?wine,tour,santorini'
            },
            {
                title: 'Professional Photos', priceFrom: 35, category: 'Photo',
                description: 'Capture your Santorini moments with a pro photographer.',
                img: 'https://source.unsplash.com/featured/?photography,santorini,couple'
            },
            {
                title: 'Akrotiri Archaeological Site', priceFrom: 25, category: 'Culture',
                description: 'Explore the "Greek Pompeii" buried by a volcanic eruption.',
                img: 'https://source.unsplash.com/featured/?akrotiri,ruins,ancient'
            },
        ],

        hotDeals: [
            {
                title: 'Sunset Voyager', routeLabel: '7N Route', dates: 'April 18 — April 25',
                price: 699, wasPrice: 929, badge: '2 Spots Left', badgeColor: 'bg-primary text-bg-dark',
                dealSlug: 'sunset-voyager-apr', borderClass: 'border-2 border-primary shadow-2xl'
            },
            {
                title: 'Santorini Dream', routeLabel: '5N Route', dates: 'May 05 — May 10',
                price: 619, wasPrice: 739, badge: 'Hot', badgeColor: 'bg-neon-pink text-white',
                dealSlug: 'santorini-dream-may', borderClass: 'border border-gray-100 shadow-xl'
            },
            {
                title: 'Caldera Finale', routeLabel: '7N Route', dates: 'May 15 — May 22',
                price: 669, wasPrice: 929, badge: 'Almost Gone', badgeColor: 'bg-neon-aqua text-bg-dark',
                dealSlug: 'caldera-finale-may', borderClass: 'border border-gray-100 shadow-xl'
            },
        ],

        heroImages: [
            'https://source.unsplash.com/featured/?santorini,sunset,caldera',
        ],

        floatingDeal: {
            badge: 'Hot',
            title: 'Santorini Dream',
            price: '€619',
            dealSlug: 'santorini-dream-may',
        },
    },

    /* ═══════════════════  MILOS  ═══════════════════ */
    {
        slug: 'milos',
        name: 'Milos',
        tagline: 'Lunar Landscapes & Secret Sea Caves',
        heroSubtitle: 'Lunar landscapes, 70+ beaches, and sea caves only accessible by boat. Our hidden gem.',
        heroHeadlineSuffix: 'Hidden Paradise',
        vibeTags: [
            { emoji: '🌙', label: 'Lunar' },
            { emoji: '🏝️', label: 'Secret Beaches' },
            { emoji: '🚣', label: 'Sea Caves' },
            { emoji: '✨', label: 'Untouched' },
        ],
        includedOn5N: true,
        nightsOn5N: 1,
        includedOn7N: true,
        nightsOn7N: 1,

        package5NHighlights: [
            'Kleftiko Sea Caves by Yacht',
            'Sarakiniko Lunar Beach Visit',
            'Sunset Drinks on Deck',
            'Half-Board (Breakfast & Lunch)',
        ],
        package7NHighlights: [
            'Everything in 5N +',
            'Full-Day Milos Coast Exploration',
            'Firopotamos Fishing Village Walk',
            'Secret Beach Snorkel Session',
        ],

        includedMoments: [
            {
                tag: 'Arrival', tagColor: 'primary', title: 'Milos Approach',
                img: 'https://source.unsplash.com/featured/?milos,greece,boat'
            },
            {
                tag: 'Epic', tagColor: 'neon-pink', title: 'Kleftiko Caves',
                img: 'https://source.unsplash.com/featured/?kleftiko,milos,caves'
            },
            {
                tag: 'Morning', tagColor: 'primary', title: 'Sarakiniko Walk',
                img: 'https://source.unsplash.com/featured/?sarakiniko,milos,white'
            },
            {
                tag: 'Sunset', tagColor: 'neon-pink', title: 'Deck Sundowners',
                img: 'https://source.unsplash.com/featured/?yacht,sunset,drinks,deck'
            },
            {
                tag: 'Adventure', tagColor: 'primary', title: 'Snorkel Mission',
                img: 'https://source.unsplash.com/featured/?snorkeling,clear,water,greece'
            },
            {
                tag: 'Village', tagColor: 'neon-pink', title: 'Fishing Village',
                img: 'https://source.unsplash.com/featured/?greek,fishing,village,colorful'
            },
        ],

        optionalAddOns: [
            {
                title: 'Catacombs of Milos', priceFrom: 20, category: 'Culture',
                description: 'Explore early Christian catacombs carved into volcanic rock.',
                img: 'https://source.unsplash.com/featured/?catacombs,ancient,greece'
            },
            {
                title: 'SUP Adventure', priceFrom: 40, category: 'Adventure',
                description: 'Stand-up paddleboard through sea arches and volcanic formations.',
                img: 'https://source.unsplash.com/featured/?paddleboard,sup,ocean'
            },
            {
                title: 'Professional Photos', priceFrom: 35, category: 'Photo',
                description: 'Capture the alien landscapes with a pro photographer.',
                img: 'https://source.unsplash.com/featured/?photography,landscape,greece'
            },
            {
                title: 'Plaka Sunset Walk', priceFrom: 15, category: 'Culture',
                description: 'Walk through the hilltop village of Plaka for the best free sunset.',
                img: 'https://source.unsplash.com/featured/?plaka,milos,sunset,village'
            },
        ],

        hotDeals: [
            {
                title: 'Milos Discovery', routeLabel: '7N Route', dates: 'April 22 — April 29',
                price: 659, wasPrice: 929, badge: '4 Spots Left', badgeColor: 'bg-primary text-bg-dark',
                dealSlug: 'milos-discovery-apr', borderClass: 'border-2 border-primary shadow-2xl'
            },
            {
                title: 'Cave Explorer', routeLabel: '5N Route', dates: 'May 08 — May 13',
                price: 569, wasPrice: 739, badge: 'Last Cabin', badgeColor: 'bg-neon-pink text-white',
                dealSlug: 'cave-explorer-may', borderClass: 'border border-gray-100 shadow-xl'
            },
            {
                title: 'Hidden Gem Finale', routeLabel: '7N Route', dates: 'May 12 — May 19',
                price: 639, wasPrice: 929, badge: 'Almost Gone', badgeColor: 'bg-neon-aqua text-bg-dark',
                dealSlug: 'hidden-gem-finale-may', borderClass: 'border border-gray-100 shadow-xl'
            },
        ],

        heroImages: [
            'https://source.unsplash.com/featured/?milos,greece,sarakiniko',
        ],

        floatingDeal: {
            badge: 'Last Cabin',
            title: 'Cave Explorer',
            price: '€569',
            dealSlug: 'cave-explorer-may',
        },
    },
]

export default destinations

/** Lookup helper */
export function getDestinationBySlug(slug) {
    return destinations.find((d) => d.slug === slug) || null
}
