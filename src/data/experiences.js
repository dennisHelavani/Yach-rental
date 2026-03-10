/* ─── Experience Detail Data Model ───────────────────────── */

export const packages = [
    { id: '5N', name: '5 Nights', label: 'Essential Loop', price: 739, routeSummary: 'Mykonos + Paros + Ios', discountLabel: '10% OFF (Pay in full by Apr 5)' },
    { id: '7N', name: '7 Nights', label: 'Full Experience', price: 929, routeSummary: 'Full Cyclades Explorer', discountLabel: '10% OFF (Pay in full by Apr 5)' },
]

export const hotDeals = [
    { id: 'cyclades-explorer-jul', title: 'Cyclades Explorer', dateRangeText: 'July 15 — July 22', currentPrice: 649, oldPrice: 929, slotsLeftText: '2 Spots Left', badge: 'HOT', ctaLink: '/checkout?deal=cyclades-explorer-jul' },
    { id: 'mykonos-weekender-aug', title: 'Mykonos Weekender', dateRangeText: 'Aug 02 — Aug 07', currentPrice: 599, oldPrice: 739, slotsLeftText: 'Last Cabin', badge: 'HOT', ctaLink: '/checkout?deal=mykonos-weekender-aug' },
    { id: 'santorini-dream-sep', title: 'Santorini Dream', dateRangeText: 'Sept 10 — Sept 17', currentPrice: 699, oldPrice: 929, slotsLeftText: 'Almost Gone', badge: 'HOT', ctaLink: '/checkout?deal=santorini-dream-sep' },
]

export const destinationsMini = [
    { slug: 'mykonos', name: 'Mykonos' },
    { slug: 'ios', name: 'Ios' },
    { slug: 'santorini', name: 'Santorini' },
    { slug: 'milos', name: 'Milos' },
]

export const experiences = [
    {
        slug: 'sunset-dj-session',
        title: 'Sunset DJ Sessions',
        heroSubtitle: 'Golden hour beats on the Aegean. World-class DJs, signature cocktails, and your own luxury Azimut yacht anchored in a secret bay.',
        descriptionSEO: 'Experience the ultimate sunset DJ sessions aboard a luxury Azimut yacht in Greece. Curated music, stunning views, and unforgettable vibes on the Cyclades.',
        category: 'party',
        tags: ['DJ', 'Sunset', 'Deck Party'],
        destinationSlugs: ['mykonos', 'ios'],
        includedType: 'included',
        optionalPrice: null,
        durationLabel: '2–4 hours',
        bestForTags: ['Party Seekers', 'Music Lovers', 'Sunset Chasers', 'Celebrations'],
        whatHappensParagraphs: [
            'As the sun begins its descent over the Aegean, our resident DJs take over the deck of your luxury Azimut yacht, blending melodic techno with the sound of the waves.',
            'Anchored in a secret bay near Delos, you\'ll feel the energy build as golden light floods the deck. Professional sound systems and immersive LED lighting transform the yacht into a floating club.',
        ],
        whatHappensBullets: [
            'Exclusive sunset anchoring in secret bays near Delos.',
            'Professional sound systems and immersive LED lighting.',
            'Fresh Mediterranean hors d\'oeuvres prepared by our on-board chef.',
            'Signature mocktails and soft drinks included (alcohol available as add-on).',
        ],
        galleryImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuA5wWWdBBBXBhAsiPwU7qfuA3xuT15zpWgoTbQ8D0_lwv5HMN5DQSc8hgWskZoxMLDhW_IH_O5yQ4iQ7zeA8gJqe2cRvEmoMolYC2R-3b6nXP8VWaMTGHtz0R3TVlDf1hBB52d64to1YMKxas4WvnH2bBjcxlKdHx8xD817NZLS5R6alekIUu2LPyxqzrGCBnnRbHt7W5JSkV0TymavTIRE7k1iVJnVegfKCFrd1QSKRdnYBqrvmYrwOliGJXDF6U4MrCMHLBtvfw',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB7LYyNX6Ragh4d_KcDbHH249fN4v_b5to-PIF5DtN08lWjHqNPJR3TIEtxECtCmv_-5BBtMMuDG3ESl15sUxTnVvwke9WU07jfk9H-6yP_zGchtuJa2OsxkIPol7QOX67y3lrTPjofDkBTDvMv4k1KGCwM5scRSYKF3f905sYhQX8P5vC7SrbhhBUggUvssnKye-oy4j5fcbo5bSpXE8mhl26ULPsOp_lwUHjLQJOCsEPEutpJN1Vb8HnvcMpH5JsspuYENAUD-w',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB1bjGBsHPabENFAa9s83AflZXLL2aNge3LwlQE_x72QF_-FguUOu1IJyVBkqqFB-X4PiG1iOQE2ahGZMypRSPgeCeqWh5sNzI2cLNBoHWEIli_gITUInrNZWSzWBUjLNi6NNMg6qs5dK67dp9T8FW0Ox-f8NVJkl3DFBAF3HFsRc1vjHcgj22pVm4HmNFAgq666jbDYSZ9b73bNnK9qnxIkrKKjcktvugo6oMAA70lAUicca8a0cqcDg5a_Eo-ER72bUuMdcVfyg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAPOX-dQ7HEmFJSbji_Hjs_tpD18iOYkOo7eYLQW27mZm2JZQhnp3yCY_Pre7oF6Prc8HXoJOnnZgPzONUR9tgb-2ujBh60zUCrE87pTIpGR-rFTh7lSCaH7qYCa3GEQq5zqB_EHhKjpohvs2FfWC9UaudhrU9kF8KyPefLbZAXh_cOzyh12QCXrv7w3dsvchQuSXksUS22CxuwcRBr-tFHTHayDs_WeeaAQf_QrN1QwQ-L7uIlIilljKoh4hHUWgPfHa73G1ywJQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC3epHdc88qDHLH4NgVjesrkjAQlvn8HyMjbTCI7N0UWNoyD_H0qY9c-21Kl-BBY2-8he-fsCojDmp88-bjnco7ykgHz3tYJUlIFSpTwc8o35L5W3yHm6DuKZr0RZpH-u7E3VQ-N0NljxDne5JSFWPVQ_Gsm1pI_qC343OqteZwHwkmVB1w2h6Sr5SToW1X2CzzEpH-Woe6qLcwalx3zbu5HihyIPEBvei0mAjtSw0hEJk0pkEU_12V-kJu96VZVeuT4PfxE6roQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD478tLfVyjMGKUs-p4hlH8PaJFjAS8rLrr0t8yG--xt1aDpfK17macUQfWX81QmW6BD8kmI_6ZEqXLhdPPreyvMeP9K-npfm4pE8tcDzzJ6pQM4cDKExi5-pMVnoYxVkqwKt2t89TiF4_drbZYGMvHE4wHPEUTHshn2WjvJOGgMH9BH3c3pUlpfIi9XhdLJhwnZZ8wIpZ3tVH9B2zLb8gBwiwUuKMdpX_mr5tjerM1EVBzXjUP5gBb3G2OjSUZ875MzMhmPBMM4w',
        ],
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnZfDtTI-eLKT3yEDyJTOwOVG4FTMTGdz54r_2Kvehh8lRrMb19dmY3pxI7Z409OOMksRs9mIcV0HemOqpc_W7PyUIYf2AbQyMRSkYKoybRz3ksdgkZdDnvo-8YVoWuQyAUvRt9wxVwjbLYl2EnSYYEYzPOPjWcMaHryP_AFGt8WYUIovUExw4g_FLBaZQsGY-EWFFZ_Cd9Zd9cry3WbKEoeSqnssUKK1tdquMB9TSTOH6dNEJI_D6azppuaW_zhhsf5d7r6i_tQ',
        relatedExperienceSlugs: ['blue-cave-swim', 'morning-deck-yoga', 'mykonos-after-dark'],
        routePlacement: { availableOnPackages: ['5N', '7N'], appearsOnRoutes: ['Cyclades Explorer', 'Mykonos Weekender'], placementNote: 'Happens on Mykonos & Ios sunset nights' },
        safetyNote: 'All sessions are supervised by our certified safety-first crew and professional skippers.',
    },
    {
        slug: 'blue-cave-swim',
        title: 'Blue Cave Swim',
        heroSubtitle: 'Crystal-clear waters and hidden grottos only accessible by yacht. The ultimate recovery day activity after a big night.',
        descriptionSEO: 'Swim through stunning blue caves and hidden grottos on a luxury Azimut yacht in the Greek Cyclades. The ultimate chill experience.',
        category: 'chill',
        tags: ['Swimming', 'Nature', 'Recovery'],
        destinationSlugs: ['milos', 'santorini'],
        includedType: 'included',
        optionalPrice: null,
        durationLabel: '2–3 hours',
        bestForTags: ['Nature Lovers', 'Recovery Day', 'Instagram Shots', 'Couples'],
        whatHappensParagraphs: [
            'Your Azimut yacht drops anchor at spectacular sea caves only reachable by boat. Dive into impossibly blue water while the crew prepares snorkeling gear.',
            'Float through illuminated grottos where light refracts off the volcanic rock into shades of electric blue. This is Greece at its most untouched.',
        ],
        whatHappensBullets: [
            'Yacht-access-only sea caves in Milos or Santorini.',
            'Full snorkeling gear provided by the crew.',
            'Towels, fresh fruit, and cold drinks on deck after your swim.',
            'Photography spots the crowds never reach.',
        ],
        galleryImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDWx6690sdnrF2TGCqNZE3LyBmLzPAjBV-x9qpKVCMdkvd1ZcyCkOF9hk3_aHP-ErVa--Z66B4nlIy6dGKddjs3c_BrsZsjJr021Sc19s-CFlqbg_xYErbJUU0Tq_C7-pqXAGlyUjLzNi02dwJrW2iZolng72fFuVZWO2A0ngK-u65umHaFPYLWL6ziFy9KLQ4nPB7EaniQgRLK7SgK_xYjXL-ymKxcaXW6l0O8iJ9nD8C19aW5cuFKg-jXsTCt-LiOduD78rRUIg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAabBz8k4Hg8VjteeTUVXkmxOSSNbLyZr7Zi0AH6aAouSQ6FM7y57yj_6yV-auTOfGkVKxfGb8F0NF73MdeAyy4jcgY6nMrW7eGUw3Yy2Re3SGNE7XI27-3JgagCJx5QO7XxUaZDyBzm5DZsCJqWCZ8WDzdeC-uuKmPyuIHf-xU-XuSVo3IUCTFozD6nz93XGvWxWfdnv4LGq-NmNYl5hsRJaO7vmoZ_sOTWcq86AmhK7ogSr6j_8ZofintaBKVTXGxJpgfKs1P-Q',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCrt6xMh02lNW4XUn7FBgnnhn2YrT3773orMGJge5MajOx1gVeDY5N6v6fU9ggNsMi6zdVjlIjn5TBE9yNodWtwdLZ6BUPFr1XA6tq8cO65hOkMtIUZLjTwvPbKTjEAg57OaIVUEobj9t3In55kJq7SAuAU8MvqqW2324xnbZv4pc7Y30QPmmdWEj9DxF_OxnJ30DAIzOeyydtUGhxMBiTe0wmZM-4YFQkSz8-FROKuVyt5S7_gwdb3lpcCNe0WCbmOTcmzj5QacQ',
        ],
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWx6690sdnrF2TGCqNZE3LyBmLzPAjBV-x9qpKVCMdkvd1ZcyCkOF9hk3_aHP-ErVa--Z66B4nlIy6dGKddjs3c_BrsZsjJr021Sc19s-CFlqbg_xYErbJUU0Tq_C7-pqXAGlyUjLzNi02dwJrW2iZolng72fFuVZWO2A0ngK-u65umHaFPYLWL6ziFy9KLQ4nPB7EaniQgRLK7SgK_xYjXL-ymKxcaXW6l0O8iJ9nD8C19aW5cuFKg-jXsTCt-LiOduD78rRUIg',
        relatedExperienceSlugs: ['sunset-dj-session', 'morning-deck-yoga', 'ancient-ruins-tour'],
        routePlacement: { availableOnPackages: ['5N', '7N'], appearsOnRoutes: ['Cyclades Explorer'], placementNote: 'Happens on Milos or Santorini mornings' },
        safetyNote: 'Life jackets provided. Crew-supervised swimming in designated safe zones only.',
    },
    {
        slug: 'morning-deck-yoga',
        title: 'Morning Deck Yoga',
        heroSubtitle: 'Sunrise salutations on the bow of your Azimut yacht, surrounded by nothing but open sea and golden light.',
        descriptionSEO: 'Start your Greek island morning with sunrise yoga on the deck of a luxury Azimut yacht. Wellness meets the Aegean.',
        category: 'wellness',
        tags: ['Yoga', 'Sunrise', 'Wellness'],
        destinationSlugs: ['santorini', 'milos'],
        includedType: 'included',
        optionalPrice: null,
        durationLabel: '60–90 min',
        bestForTags: ['Wellness Seekers', 'Early Risers', 'Recovery Day', 'Solo Travelers'],
        whatHappensParagraphs: [
            'Before the rest of the crew wakes, roll out your mat on the bow of the Azimut yacht. A certified instructor guides you through a flow tailored to sea conditions.',
            'Fresh smoothies and fruit bowls follow the session as you watch the Greek islands wake up around you.',
        ],
        whatHappensBullets: [
            'Certified yoga instructor on board.',
            'Mats and props provided.',
            'Post-session smoothie bar and fruit bowls.',
            'Available every morning of your voyage.',
        ],
        galleryImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBXT3I5Sg88jC7fUhyNMENOysitjbw8JHGGmn-_WAdwaEXuNRwaoBBXc5k5oId3F9DstPS2QWYLfjWotUu9HcGt-TQEQYSSyk87PWvygyFKPBkUDd2pV2LJnqa6SL3b6qGPMTD4T6nsdBz_RE11MihOm4CZgb1r_hPG93PREdyI-1NjXkngrSTxsIR84CSe66Z05bxyROYOu7ZEshTUoqVr2UH3XkYwBAtj1ijg2Y3j94GC_iaed0oCyi62Jn7uhKKGEw-tndZNzQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCm6RzcUaD_eOu3Y2jAFz8RO5tmDcLGkTaJ6oauAci-ub5uhXsSKplRsKz8BxrnAEIXhVxx1_SePdonCMI7NH4EjCQWEMjnqGqqvRVsAWAYbCsNzUMgJY_SCSekFsklMHCPC1QWH37bKgjJaxo_cU0SfCcaMFmaLBy6N_TwZmq5xrmpvgOOxUgb8xeCjSagMwFI6SijvKsw1mKMp1j-V9UCLKqFdNRdUtrrjUZ5zUrFxzfF9W2FeUP_CeNTi_iJlAJvu-djbvVizg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC_rMTdjXzQnzpRopHTu_9F32szXvHUh3qdU18ke21ThSpFwS4zP2GGsuRx6dCvVDDnnEkjxGkzmff2JQO_ntcYmtfJ6loGUYi5tOLm1vVFNiKhgyoAabVwZ6ra1_Y64dt22c1pAGDB2hNYKhMtmDTBVqpIwgGgAY-PB4NwnKBzlWMGDt2a9u6YWUBYI2uEGnZ4Fj8ASbuZ3CYUVqoNu_GQ1YCfsLG47d0YTOLK-vWLTfabQrekBjzfRCos1kUeIwN2otPRxSw31Q',
        ],
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXT3I5Sg88jC7fUhyNMENOysitjbw8JHGGmn-_WAdwaEXuNRwaoBBXc5k5oId3F9DstPS2QWYLfjWotUu9HcGt-TQEQYSSyk87PWvygyFKPBkUDd2pV2LJnqa6SL3b6qGPMTD4T6nsdBz_RE11MihOm4CZgb1r_hPG93PREdyI-1NjXkngrSTxsIR84CSe66Z05bxyROYOu7ZEshTUoqVr2UH3XkYwBAtj1ijg2Y3j94GC_iaed0oCyi62Jn7uhKKGEw-tndZNzQ',
        relatedExperienceSlugs: ['blue-cave-swim', 'sunset-dj-session', 'ceviche-deck-tasting'],
        routePlacement: { availableOnPackages: ['5N', '7N'], appearsOnRoutes: ['Cyclades Explorer', 'Mykonos Weekender'], placementNote: 'Available every morning during your voyage' },
        safetyNote: 'Instructor certified. Suitable for all levels.',
    },
    {
        slug: 'mykonos-after-dark',
        title: 'Mykonos After Dark',
        heroSubtitle: 'VIP nightlife tour through the labyrinth streets of Mykonos Town. Pre-game on deck, then hit the clubs with our crew.',
        descriptionSEO: 'Experience Mykonos nightlife like a VIP. Pre-game on a luxury Azimut yacht then hit the best clubs with our crew guides.',
        category: 'party',
        tags: ['Nightlife', 'VIP', 'Clubs'],
        destinationSlugs: ['mykonos'],
        includedType: 'included',
        optionalPrice: null,
        durationLabel: 'All Night',
        bestForTags: ['Party Animals', 'Nightlife Lovers', 'Groups', 'Celebrations'],
        whatHappensParagraphs: [
            'The night starts on the deck of your Azimut yacht with a pre-game session — music, energy, and your crew getting hyped for what\'s coming.',
            'Then your crew guide leads you through the labyrinth streets of Mykonos Town to the hottest spots, skipping the lines.',
        ],
        whatHappensBullets: [
            'Pre-game session on the yacht deck with music and drinks.',
            'Crew-guided nightlife tour through Mykonos Town.',
            'Priority entry at partner venues (no queues).',
            'Safe return to the yacht arranged by the crew.',
        ],
        galleryImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBqhMTObgtLFu6AidayRUxAPXm-QGuDxQjoyJD3qCvymftpvVnZjfunQjCkj1caVdWP1F07-2kQ58-ZdfS7i6RzMd_Al8O_nDw_f9YELlvfruRk5OBtge7tvSc7zCOne55D30S2r_9-RurjTltP1XCS7kBuj3ouCbZJhqxSAPs65p89vdqfbftMRns9t3tgN0H1YgW4DMwxpyk0I0yz9LXN5QKMA_EIzOzpfO9q2iS6yXec1_Dxf3Pt_IoywlMWucJrbWEikJhGjA',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuARoANR-NP1rVG0Lm7kEkMrU8lQA_4GfDV3ZFUW4fuItOgKoyRLqsnpABFaqoKBk7w8xmfDgVQEK2yNBWTwMMo9cyAvtCS1gfrdV7msYoIx8bsMt8b2GBV8Bo-7DWbmFix3K1rjNeWqOGi-qDXRjI3831DeSrPwNCIQE06s9QRAJZiEInlMwlms4iEHZsx3RH3mcaZ7CTUZSdlfwP1FseGLw0CCVv8iEpt8E4XNSkkkm7WnD_9zVWTdXsKEm7U8D8T6Cw2naLTB7w',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB2cMplowRAYNza5OJ682XGvva5wE3nvpNdOfE57dltRkOS9pvn7-WqlngHK14XHOZa9x07eXRlGt1IkQmCy2Oqsn5W--A8Ndy3GF4QrbJl-AvEcFkADXUB3KxYrrp2OYd0wNThfpCviQfP0ip2gTrgYQZcZotWD2thg_wEyNZsZ_hZy4pywbKFyeI_Jmezv3ACR0y_XVyIMR3xmAZt-R1PY7MEyS0aEthnK6wLds0yi7wll7om_n0_LtgxFYHgcXVP_wCCTBtDqw',
        ],
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqhMTObgtLFu6AidayRUxAPXm-QGuDxQjoyJD3qCvymftpvVnZjfunQjCkj1caVdWP1F07-2kQ58-ZdfS7i6RzMd_Al8O_nDw_f9YELlvfruRk5OBtge7tvSc7zCOne55D30S2r_9-RurjTltP1XCS7kBuj3ouCbZJhqxSAPs65p89vdqfbftMRns9t3tgN0H1YgW4DMwxpyk0I0yz9LXN5QKMA_EIzOzpfO9q2iS6yXec1_Dxf3Pt_IoywlMWucJrbWEikJhGjA',
        relatedExperienceSlugs: ['sunset-dj-session', 'ceviche-deck-tasting', 'ancient-ruins-tour'],
        routePlacement: { availableOnPackages: ['5N', '7N'], appearsOnRoutes: ['Cyclades Explorer', 'Mykonos Weekender'], placementNote: 'Happens on Mykonos nights' },
        safetyNote: 'Crew accompanies you at all times. Safe return to the yacht guaranteed.',
    },
    {
        slug: 'ceviche-deck-tasting',
        title: 'Ceviche Deck Tasting',
        heroSubtitle: 'Fresh-caught flavours prepared live on deck by a guest chef. A culinary journey while surrounded by turquoise waters.',
        descriptionSEO: 'Enjoy a live ceviche tasting on the deck of a luxury Azimut yacht in Greece. Fresh seafood, guest chef, and Cyclades views.',
        category: 'dining',
        tags: ['Foodie', 'Chef', 'Seafood'],
        destinationSlugs: ['santorini', 'mykonos'],
        includedType: 'optional',
        optionalPrice: 45,
        durationLabel: '1.5–2 hours',
        bestForTags: ['Foodies', 'Couples', 'Instagram Shots', 'Culture Seekers'],
        whatHappensParagraphs: [
            'A guest chef boards your Azimut yacht and sets up a live preparation station on the aft deck. Using the freshest local catch, they prepare a multi-course ceviche tasting.',
            'Paired with Greek wines and craft soft drinks, this is elevated island dining at its finest — with the caldera or harbour as your backdrop.',
        ],
        whatHappensBullets: [
            'Live ceviche preparation by a guest chef on deck.',
            '4-course tasting with seasonal Greek seafood.',
            'Wine pairing available (included with alcohol add-on).',
            'Vegetarian / vegan options available on request.',
        ],
        galleryImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC2M11H568dMI_HOZHoI8qp9czWcqY2mPuOjeUsXxZmysWQJh42Z_n9QCO7Mw6z583kwlsOTldpzBip75eMWyQ8TDLqAWXt2rOzu0Tww49pHXNfGP5ULqmrOWnPEBO1xAr91FMRHY3qjqekOnyFDlp4jksN_2CsYf8vuuYzsAv0pdcZ4CMSRZtnHqwt-mw5C_waW0CDdmRDR2jjrykYIAaWuEQJyD14EQIkPM7gGVRdggXTaAu6lO4kb3dxlbNh0-NcezNIH6aV9Q',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB7hBtgImgV7VqnLwzor8iauVvm5cYpnKaylgyUJmZ4izGIyPkp4GfXUePYA2EcZlo0V9GSYWfjr_4r2aLysPGam3JeouIK-F8hV7NRsjGQMbSdXF8r1dFAB5Z8mwCftT_bgy7o0zxy3poGVWHR9Chgj6O1rIjtlGVClEyXDDM4qpSW5hof4XPGUha5PxcT0OwHQMGe-VSqcRJcEiCBTxZHRWw4C92G_pN9YBHD6l1e0YzJv9TbqqI6ImJ4ayh8In-d13X1dK1ewg',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD0FFMU1GZVzIDB6zNek1Id94IfqepnK6WnuSGBf9L4wkS2MI2iGUloEZhFkLXl5H3wgTHYMr3SnciAczQjvwKYfz4Rp1_mmUOF0-d8slDt2OOrqOBvRDkOk40h1NZ0OPraP67z0cv0SZOjZ-EJmlshkyvATtqORQ-JYbVOy1hVQhNUk1xPS0HLdSuQFmiraRIgs6a2icGSc1pdBTQcf-cPKX74EsasdduQM2gOXtAqtFyOwTIf5P8JJxdmM4B5SzUTOe7UM8Jc9Q',
        ],
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2M11H568dMI_HOZHoI8qp9czWcqY2mPuOjeUsXxZmysWQJh42Z_n9QCO7Mw6z583kwlsOTldpzBip75eMWyQ8TDLqAWXt2rOzu0Tww49pHXNfGP5ULqmrOWnPEBO1xAr91FMRHY3qjqekOnyFDlp4jksN_2CsYf8vuuYzsAv0pdcZ4CMSRZtnHqwt-mw5C_waW0CDdmRDR2jjrykYIAaWuEQJyD14EQIkPM7gGVRdggXTaAu6lO4kb3dxlbNh0-NcezNIH6aV9Q',
        relatedExperienceSlugs: ['sunset-dj-session', 'blue-cave-swim', 'ancient-ruins-tour'],
        routePlacement: { availableOnPackages: ['7N'], appearsOnRoutes: ['Cyclades Explorer'], placementNote: 'Available on Santorini or Mykonos evenings (7N only)' },
        safetyNote: 'Allergen info available. Notify crew of dietary requirements in advance.',
    },
    {
        slug: 'ancient-ruins-tour',
        title: 'Ancient Ruins Tour',
        heroSubtitle: 'Step off the yacht and into millennia of history. Guided tours of sacred sites on Delos and Santorini\'s Ancient Thera.',
        descriptionSEO: 'Explore ancient Greek ruins on Delos and Santorini with expert-guided tours, departing directly from your luxury Azimut yacht.',
        category: 'culture',
        tags: ['History', 'Guided Tour', 'UNESCO'],
        destinationSlugs: ['mykonos', 'santorini'],
        includedType: 'optional',
        optionalPrice: 55,
        durationLabel: '3–4 hours',
        bestForTags: ['History Buffs', 'Culture Seekers', 'Photographers', 'Couples'],
        whatHappensParagraphs: [
            'Your Azimut yacht anchors near the sacred island of Delos or the clifftop ruins of Ancient Thera. An expert archaeologist guide meets you at the dock.',
            'Walk through temples, mosaics, and ancient marketplaces while your guide brings 3,000 years of history to life — then return to the yacht for lunch.',
        ],
        whatHappensBullets: [
            'Expert archaeologist guide included.',
            'Visit Delos (UNESCO World Heritage) or Ancient Thera.',
            'Return to the yacht for a post-tour lunch on deck.',
            'Small group sizes for a personal experience.',
        ],
        galleryImages: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDrbnxBjZojztKBwX_UIqZv7Bu-4a3O-S2aKSgq8jDHiUoP9EtgnYOVG_J96No7o0m-v3Hl1YN77ilcHawE8rrLZiZp8BOO_q2qf_l9PZ082OjGGKg1B6_b6AWw8Sm3HkvGDfOrGowf71c3DHiINae_2ISFw4I-Jv-nLfCFkg-nsm2Z3FUtjbxWMnETGbbb-tdkq5iabLnDHxe1Dtc8xDpSOHv4lsVG3In7LrAqATx1w2oPxsxe0jABr5cFI3MuNseIKoe1BR8E9A',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuC_rMTdjXzQnzpRopHTu_9F32szXvHUh3qdU18ke21ThSpFwS4zP2GGsuRx6dCvVDDnnEkjxGkzmff2JQO_ntcYmtfJ6loGUYi5tOLm1vVFNiKhgyoAabVwZ6ra1_Y64dt22c1pAGDB2hNYKhMtmDTBVqpIwgGgAY-PB4NwnKBzlWMGDt2a9u6YWUBYI2uEGnZ4Fj8ASbuZ3CYUVqoNu_GQ1YCfsLG47d0YTOLK-vWLTfabQrekBjzfRCos1kUeIwN2otPRxSw31Q',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAHDItSAbsdKbvmXgsZNjjAepLSwkwvDoTp_6g0KyWmV-UUzfhvjoyAtKtfsxyz1vG72AMcuvRkt2G4xN9JE0SsiWUUBktlK7tGbcBc4-KLQyUmZwHLjNxSZ-yAO87rUKOfLkgUoL2veRjKfisY9Ue3rVqpA0M8Xdw4QbNIrD5MHr3HpHpS8CAsxrPVoLcezhINCnd0izRGlVdntM4oYMb6P88L02BWTKE8n9eglw-Nsz1YN71565LX8s0SkbincrJLu8tZZwugHg',
        ],
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrbnxBjZojztKBwX_UIqZv7Bu-4a3O-S2aKSgq8jDHiUoP9EtgnYOVG_J96No7o0m-v3Hl1YN77ilcHawE8rrLZiZp8BOO_q2qf_l9PZ082OjGGKg1B6_b6AWw8Sm3HkvGDfOrGowf71c3DHiINae_2ISFw4I-Jv-nLfCFkg-nsm2Z3FUtjbxWMnETGbbb-tdkq5iabLnDHxe1Dtc8xDpSOHv4lsVG3In7LrAqATx1w2oPxsxe0jABr5cFI3MuNseIKoe1BR8E9A',
        relatedExperienceSlugs: ['blue-cave-swim', 'ceviche-deck-tasting', 'morning-deck-yoga'],
        routePlacement: { availableOnPackages: ['5N', '7N'], appearsOnRoutes: ['Cyclades Explorer'], placementNote: 'Happens on Mykonos (Delos) or Santorini (Ancient Thera) mornings' },
        safetyNote: 'Comfortable shoes required. Sun protection recommended.',
    },
]

/* ─── Helpers ────────────────────────────────────────────── */
export function getExperienceBySlug(slug) {
    return experiences.find((e) => e.slug === slug) || null
}

export function getPrimaryDestination(destinationSlugs) {
    if (!destinationSlugs?.length) return null
    return destinationsMini.find((d) => d.slug === destinationSlugs[0]) || null
}

export function getBestHotDeal() {
    return hotDeals[0] || null
}
