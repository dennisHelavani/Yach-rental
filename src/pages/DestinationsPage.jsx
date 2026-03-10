import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useBooking } from '../context/BookingProvider'
import EarlyBirdBanner from '../components/EarlyBirdBanner'

/* ── Image URLs ──────────────────────────────────────────── */
const IMG = {
    hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAI8qSDkDe9ezXJjylyLJR0KP9O61_G4oDtSL0kRmPFHIgEb9Rpm7NmXjS5HtxscdmikR8dSqDwVSCfEhSwEGhXuxREj5I7ZEO9Zvj3btWsqYdok-x_YFkAOGGtTby_2yPstDeuDAslR4XwxXcl0PiJHk6P4el10WSr0aapURhuMARRf4a9VPDo1NdpD1lK7ZSDlRRb3xHrpT4Zz5flP9XRjaIwb3-YdsKY4gYVNavTgtw4q143QCZfWd1yQGvsUs_nXhnV24GJOg',
    mykonos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOewZn_MBTOqV-nDUO98E4NLM87AheoObwXsB2vzSjclpK2RTlEVEG7iU9Qsb8Ad9tiTJyzEkBLiVpoVSIuFb25ZENP6fA7ChHGMRFsSPzVzQe5CHJLRZ2F1omISZt_FdYCDmAMY5yXQTxQck0uQiaEi-DAMIMvE7UOTYrqq0IDZ4UnfWUu4gTUJoET7qYanYNZ1pIo1iN9RrMc82z42A_KmBr7QGqXXb8s9ZzgYr5uSPuGWZtODpeLslyJWoZxGB2kZQd_8Lv-Q',
    ios: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjNrZLE_5OFmWL-3z1THl-85SbkDD7xu5sefzr8PoH56OghfGkHA5337XjYgnKy4OzoJo5zwwJeFadJJQLVGl5RIivJSA7554tME1NJmg6YBEjtLktr_B7eDkpL1ZrSWABiVOaLWohHS-bMInY-RpZr1Mz15KUMyVBGypRooaurq7E_WdIVf-qDTLt2EMJa1hEmOYS6QU7Hoq1fLBWeOikKW0L7vxIWwDu5OmLc1v2cusvGX5LLIKL6ivsFs7KQttXQOMXWQlaTg',
    santorini: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnxIlRKxHkdjbh__byUee9iTgWAJW84msM0MDbRyVFf6jbkexUg_rPG01OES2avh97j5ZyGmAFWGIqDSAMWy1IAeCMKYKLHCKjukPeX5HdvpvrYm-UBIQBV849i1_pPaKDWWmkJ-T6QBCVXUMsBqBRRD90irPBQ02AZzPF6p0OdZR4kN2BvM-lMXPajRmaGAB2LUD6AFWY9_iotKfXgEOfN54XIgVa58IIU1mfIEXRX3O4PMJlZCl78Uk6Za6TOXYCHmqln4w4hw',
    milos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkSzZKjdTTEXoCX-lgQAC8AQ9F9K9GvMzaExpmfiY--jBXCsT0pazf0yejF1i1E6x-w4LNNgp_QcZSKY-cmz-5O6vY9b-OtzlzEcwp2CvB3Jk_aH_uB6G_HHx8t8NpPozzUcm5162hznvguixxBPl9xtBp32YdMahFXEb5oFYnGw6Q8uOXKFOyHr6YTJDjQCgMn09hZYCgOnSvWgLjLZOGCrYCVIAhFlEWqpTzSgvIonyCtnuIjdCdZ_t-RsBG8SJJqtAEpwuctw',
    exp1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf9FNMx4I0I5jytuuJA8MnUZeztmo5Rokw7qElv1wWa6-ZOT1cF3fFUoL2s3bqeR4eo6YSKJYl8l5ChaKNyvbS1HOPhG0yiplVhu4WbhFDqaD8EDT5UTBR-sTdywL51oYeoK9LUtyAxHrRT5oM8hm4A_eJjB-SUMumOnb1TMlqMt2rc6itjbOGVghPVl2n8yhXONt4Iq_Ck2vdzXw2jJWAn2YConKRWMWWdZhSDQXnNOeBHoPETBjdWc7R9oh60HogQpTsW13R6Q',
    exp2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBXLCzehdIBSw66YWPM5F2JXR3cEusgbHhxby1By2hIGsrY9iOVFlT-JQkLC0vOlNXzJ3H_nqDgobOwZaNwdy1MUJ7eb6bjuAO6GMv55X-O0hH2UjWDFwVA9_LEe4-45fSoO2dEYlECNV_yZnlbl1AI5v4Ve3FEq4mMvzMRcF4_Dv0GefqOtUvGu_Zz3UL8teNKmThl_WDWpkH2fzYc-oVVMG8oLHUIXAovAXhZKu3SB6Lqsrzfyqs03ZVWRaX-oDXHsp3d1UFXQ',
    exp3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg947R1wKYXPRyfJkRY0Eig4rDxMnYvAJMBVsL-5W6bAfqhejVHt5iyuI8KMhHtTcGbgzG1uUnrNmQGFLE1Uzf3OpeCojtlOmtaZufHs-3O5ByNbAbclGaZzyeB0lPK_1D5bezdP6q14OOjyokbUZMCMU62vSU8v5apmoIgdW5EoNzTHhBbIIGOes7t4Mcf_A_L5htAbiAQz5OCFtz26fyl3bSxjr6TL4GdFV0m5wbDuXWIrcGdpWOw8qAgJ3ypF7HcaSctejr1g',
    exp4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA5qGDuC36zkOvO1vdvsvFNeJof-0dV5nvF6Ko8lpCQ0TtK9GkkW5CUkCvdAgsy_Mgwn1vpjPoYpoti8FfkMpsS_4k5UEhbxI2ENOZ6FZhlioZLj-ZnjfetI3odhKDYRfjGNTnSym8XHlaGbrH032bFw6JwIC_rELVwMh0nP80mwmj8AGBKNKmpL46zDii692lXGKLAt5LQCCWg1M_7VzcULCBw57-9ncw5xhO_DCnj-oiL7pJVmekkKU2R1Nk7sEQ8ZDy7m7pjQ',
    exp5: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNVaorHUE5FgMzpRtFcjjRHG2wy3XUuGjeZvTR9BGm6c2NJKSamelB6ARzJ5H5LtH3TfvtP5mz0S4U8Cm2oUEQLvm31CLEoeN6qll8xFMgYVnnXdZbx5-Nnd3dKDfZPrVuDl1WAcNz4M7ud9Z-MnR8FhsonaT9Lk_CSpHcg5XzaZcwBy34zItwyJfVFVgKBPN_oFo_82C6fK_3YyKs2GQxyr7HO1dVxP5P-_e_3V5QeWZRnfoMPTxg-G55bBP-Vmbj6msX-GxAjQ',
    exp6: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeBhGLCNEwV3f6QAQ4qlqu9dfMgZMDUB4t8pK3ad2oZ9gMMNpcBP12irPfuo863h1_WxdXBhsfHu0zubuq6rVdISypVmp3QlWmqcYCf50d3e9JBnkRTr2gmNsX5XIboHSUFQ6HAXd231hGmQrdkaF_Cwdl0H7BCvYUuZ8JGOIDU-ldgHWj1ww7FBDJVBBfDg-oK89CIS4EXwnyIDfo0M131GeL2yD7JfvPPfJIxDTxEcuMtVQ_qFQe-h8sulu3C1YcozU-SvPhbA',
    exp7: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOJgR5HIkbXt7E6loMdaRlDJiK4vvYLWsSBnyayzXY1KaTdjrqE5_vV-C5YeV1r-y_tRRtWG9qdLCmWh7gW3Paq5senzWs0inMddk9tkY_uSYstQh_hQdpiCy4mfP9cTGN8Du19-4Xfn-hIH_gp8lk4hAQ9zFRfTDktmQvZ9WhTT4ZN-x7DgqpNqQaZP73ilST14k12FCVAiewht3ARsexj2Oev_sUQH27FejDfrgWuJBdazf8gU9LQrgEDap8nPX6tD159pAyqA',
}

/* ── Data ────────────────────────────────────────────────── */
const categoryTabs = ['All', 'Party', 'Chill', 'Culture', 'Sunset', 'Day Trips']

const islands = [
    {
        img: IMG.mykonos, name: 'Mykonos',
        categories: ['Party'],
        tags: [{ label: 'Party Hub', bg: 'bg-neon-pink text-white' }, { label: 'Nightlife', bg: 'bg-white/20 backdrop-blur-md text-white' }],
        desc: "The world's most famous beach clubs and labyrinthine white streets. Non-stop energy.",
    },
    {
        img: IMG.ios, name: 'Ios',
        categories: ['Party', 'Chill'],
        tags: [{ label: 'The Vibe', bg: 'bg-primary text-slate-900' }, { label: 'Secret Bays', bg: 'bg-white/20 backdrop-blur-md text-white' }],
        desc: 'Legendary nightlife meets hidden coves only accessible by yacht. Pure island freedom.',
    },
    {
        img: IMG.santorini, name: 'Santorini',
        categories: ['Sunset', 'Culture'],
        tags: [{ label: 'Iconic Views', bg: 'bg-neon-aqua text-slate-900' }, { label: 'Sunset', bg: 'bg-white/20 backdrop-blur-md text-white' }],
        desc: "The world's most dramatic sunsets and volcanic beaches. A must-see on every bucket list.",
    },
    {
        img: IMG.milos, name: 'Milos',
        categories: ['Chill', 'Day Trips'],
        tags: [{ label: 'Hidden Gem', bg: 'bg-primary text-slate-900' }, { label: 'Chill', bg: 'bg-white/20 backdrop-blur-md text-white' }],
        desc: 'Lunar landscapes and caves. Our favorite spot for sunset drinks on the deck.',
    },
]

const experienceImages = [
    { img: IMG.exp1, span: 'col-span-2 row-span-2', alt: 'Beach party scene with blue water' },
    { img: IMG.exp2, span: '', alt: 'Diving from a yacht into clear water' },
    { img: IMG.exp3, span: '', alt: 'Sunset dinner on a yacht deck' },
    { img: IMG.exp4, span: '', alt: 'Group of friends toasting on a yacht' },
    { img: IMG.exp5, span: '', alt: 'Aerial view of yacht in a lagoon' },
    { img: IMG.exp6, span: '', alt: 'Cocktails at a beach club' },
    { img: IMG.exp7, span: '', alt: 'Greek village blue dome church' },
]

const flashSales = [
    { title: 'Full Cyclades Edge', dates: 'April 15 — April 22', price: '€649', oldPrice: '€929', spotsLeft: 2 },
    { title: 'The Essential Loop', dates: 'May 02 — May 07', price: '€599', oldPrice: '€739', spotsLeft: 1 },
    { title: '7-Night Explorer', dates: 'May 10 — May 17', price: '€699', oldPrice: '€929', spotsLeft: 3 },
]

/* ── Component ───────────────────────────────────────────── */
export default function DestinationsPage() {
    const { openBooking } = useBooking()
    const [activeCategory, setActiveCategory] = useState('All')
    const [showWidget, setShowWidget] = useState(true)
    const [countdown, setCountdown] = useState({ h: 4, m: 22, s: 10 })

    // Filter islands by active category
    const filteredIslands = activeCategory === 'All'
        ? islands
        : islands.filter((island) => island.categories.includes(activeCategory))

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                let { h, m, s } = prev
                s--
                if (s < 0) { s = 59; m-- }
                if (m < 0) { m = 59; h-- }
                if (h < 0) return { h: 0, m: 0, s: 0 }
                return { h, m, s }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const pad = (n) => String(n).padStart(2, '0')

    return (
        <div className="bg-[#f8fafc] text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden font-body min-h-screen">
            <Navbar />

            {/* ─── ANNOUNCEMENT BAR ──────────────────────────────── */}
            <div className="bg-background-dark py-3 px-4 overflow-hidden">
                <div className="flex items-center justify-center gap-4">
                    <span className="text-white font-display uppercase tracking-widest text-xs md:text-sm font-bold flex items-center gap-2">
                        <span className="material-icons text-primary text-lg">local_fire_department</span>
                        Hot Deals live — last cabins discounted
                    </span>
                    <button onClick={() => openBooking({ action: 'book-yacht', source: 'destinations' })} className="px-4 py-1 bg-neon-aqua text-slate-900 font-display text-[10px] font-black uppercase rounded tracking-tighter cursor-pointer hover:scale-105 transition-transform">
                        Grab Yours
                    </button>
                </div>
            </div>
            <EarlyBirdBanner />

            {/* ─── HERO ──────────────────────────────────────────── */}
            <section className="relative h-[85vh] md:h-[600px] flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Cinematic aerial view of yacht in turquoise waters" className="w-full h-full object-cover" src={IMG.hero} />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent opacity-80" />
                </div>
                <div className="relative z-10 w-full px-6 md:px-10 pb-12 md:pb-20 max-w-7xl mx-auto space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        This Summer Season
                    </div>
                    <h1 className="font-punchy text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter leading-[1.1] italic">
                        The Aegean <br /><span className="text-primary">Awaits</span>
                    </h1>
                    <p className="text-white/80 text-lg max-w-xs md:max-w-xl">
                        Join the ~50 yacht flotilla. Experience Greece like never before. Season starts 20 April with Monday, Wednesday, and Friday departures.
                    </p>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-2">
                        <button onClick={() => openBooking({ action: 'book-yacht', source: 'destinations-hero' })} className="flex-1 md:flex-none bg-primary text-background-dark font-display font-bold py-4 md:py-4 px-8 md:px-10 rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-transform active:scale-95 hover:scale-105 uppercase text-sm cursor-pointer">
                            Book Your Route
                            <span className="material-icons text-sm">arrow_forward</span>
                        </button>
                        <Link to="/gallery" className="hidden md:flex px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-display uppercase text-sm font-bold rounded-2xl hover:bg-white hover:text-slate-900 transition-all text-center items-center justify-center">
                            View Yacht Gallery
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── ROUTE SELECTOR ────────────────────────────────── */}
            <section className="px-4 md:px-10 py-10 md:py-24 -mt-8 md:-mt-0 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 md:mb-16 md:text-center">
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-slate-900">Choose Your <span className="md:hidden">Vibe</span><span className="hidden md:inline">Voyage</span></h2>
                        <p className="text-gray-500 md:max-w-xl md:mx-auto text-sm md:text-lg text-center">Curated itineraries for every energy level.</p>
                    </div>
                    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                        {/* 7 Nights Card — Popular */}
                        <div className="glass-panel rounded-3xl p-5 md:p-[3px] relative overflow-hidden border-2 border-primary/50 md:border-0 cursor-pointer hover:scale-[1.02] transition-transform md:bg-gradient-to-br md:from-neon-aqua md:via-primary md:to-neon-pink md:shadow-2xl group" onClick={() => openBooking({ action: 'book-yacht', entityId: '7-night', source: 'destinations' })}>
                            <div className="absolute top-0 right-0 bg-primary px-4 py-1 rounded-bl-2xl text-[10px] font-bold uppercase text-background-dark md:hidden">Popular</div>
                            {/* Mobile layout */}
                            <div className="md:hidden">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-punchy text-2xl font-bold uppercase italic">Full Cyclades Edge</h3>
                                        <p className="text-primary font-bold text-sm">7 Nights • Flotilla</p>
                                    </div>
                                    <span className="material-icons text-primary text-3xl">celebration</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">The ultimate Greek island hopping experience. Non-stop energy from Mykonos to Santorini.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">€929<span className="text-sm font-normal text-gray-400">/pp</span></span>
                                    <button className="bg-background-dark text-white px-6 py-2 rounded-xl font-bold text-sm cursor-pointer">Select</button>
                                </div>
                            </div>
                            {/* Desktop layout */}
                            <div className="hidden md:flex md:flex-col bg-background-dark rounded-[1.4rem] p-10 h-full text-white">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="font-punchy text-4xl font-bold uppercase mb-2 italic">7 Nights</h3>
                                        <p className="text-primary font-display uppercase tracking-widest text-xs font-bold">Full Cyclades Edge</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-primary text-slate-900 px-3 py-1 rounded text-[10px] font-black uppercase mb-2 block">Best Value</span>
                                        <p className="text-5xl font-punchy font-bold tracking-tighter italic">€929</p>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="material-icons text-neon-pink text-lg">stars</span>
                                        Mykonos (2) → Ios (2) → Santorini (2) → Milos (1)
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="material-icons text-neon-pink text-lg">stars</span>
                                        Breakfast & lunch included daily
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="material-icons text-neon-pink text-lg">stars</span>
                                        Professional skipper & crew
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="material-icons text-neon-pink text-lg">stars</span>
                                        2 extra nights for the full Cyclades experience
                                    </li>
                                </ul>
                                <button className="w-full py-4 bg-neon-pink text-white font-punchy uppercase text-sm font-bold rounded-2xl shadow-neon-pink cursor-pointer hover:scale-105 transition-transform">
                                    Select 7-Night Route
                                </button>
                            </div>
                        </div>

                        {/* 5 Nights Card */}
                        <div className="glass-panel rounded-3xl p-5 md:p-[3px] relative overflow-hidden border border-white/20 md:border-0 cursor-pointer hover:scale-[1.02] transition-transform md:bg-gradient-to-br md:from-primary md:to-neon-pink group" onClick={() => openBooking({ action: 'book-yacht', entityId: '5-night', source: 'destinations' })}>
                            {/* Mobile layout */}
                            <div className="md:hidden">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-punchy text-2xl font-bold uppercase italic">The Essential Loop</h3>
                                        <p className="text-neon-aqua font-bold text-sm">5 Nights • Flotilla</p>
                                    </div>
                                    <span className="material-icons text-neon-aqua text-3xl">speed</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Perfect for a high-intensity getaway. Hit the biggest highlights in record time.</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">€739<span className="text-sm font-normal text-gray-400">/pp</span></span>
                                    <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl font-bold text-sm cursor-pointer">Select</button>
                                </div>
                            </div>
                            {/* Desktop layout */}
                            <div className="hidden md:flex md:flex-col bg-white rounded-[1.4rem] p-10 h-full">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="font-punchy text-4xl font-bold uppercase mb-2 italic">5 Nights</h3>
                                        <p className="text-gray-400 font-display uppercase tracking-widest text-xs font-bold">The Essential Loop</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="bg-neon-aqua/20 text-neon-aqua px-3 py-1 rounded text-[10px] font-black uppercase mb-2 block">10% Full-pay disc.</span>
                                        <p className="text-5xl font-punchy font-bold tracking-tighter italic">€739</p>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    <li className="flex items-center gap-3 text-sm">
                                        <span className="material-icons text-primary text-lg">check_circle</span>
                                        Mykonos (2) → Milos (1) → Santorini (2)
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <span className="material-icons text-primary text-lg">check_circle</span>
                                        Breakfast & lunch included daily
                                    </li>
                                    <li className="flex items-center gap-3 text-sm">
                                        <span className="material-icons text-primary text-lg">check_circle</span>
                                        Professional skipper & crew
                                    </li>
                                </ul>
                                <button className="w-full py-4 bg-slate-900 text-white font-punchy uppercase text-sm font-bold rounded-2xl group-hover:bg-primary group-hover:text-slate-900 transition-colors cursor-pointer">
                                    Select 5-Night Route
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CATEGORY SWITCHER ─────────────────────────────── */}
            <div className="flex justify-center mb-8 md:mb-12 pt-8 md:pt-0 px-4">
                <div className="bg-gray-100 p-1.5 md:p-2 rounded-full flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide">
                    {categoryTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveCategory(tab)}
                            className={`px-4 md:px-8 py-2 rounded-full font-display uppercase text-[10px] md:text-xs font-bold tracking-widest transition-colors cursor-pointer whitespace-nowrap ${activeCategory === tab ? 'bg-slate-900 text-white' : 'hover:bg-gray-200 text-gray-500'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── ISLAND CARDS ──────────────────────────────────── */}
            <section className="py-8 md:py-0 md:px-10 md:pb-24 bg-white md:bg-transparent">
                <div className="px-4 md:px-0 mb-6 md:mb-12 md:max-w-7xl md:mx-auto">
                    <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-slate-900">Iconic <span className="text-primary">Stops</span></h2>
                    <p className="text-gray-500 text-sm md:text-lg text-center font-medium font-space">Where the crystal water meets the white-washed streets.</p>
                </div>
                <div className="space-y-4 px-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-10 md:max-w-7xl md:mx-auto md:px-0">
                    {filteredIslands.map((island) => (
                        <Link key={island.name} to={`/destinations/${island.name.toLowerCase()}`} className="group relative h-72 md:aspect-[4/3] md:h-auto w-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer block">
                            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={island.img} alt={island.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex justify-between items-end">
                                <div>
                                    <div className="hidden md:flex gap-2 mb-4">
                                        {island.tags.map((tag) => (
                                            <span key={tag.label} className={`${tag.bg} text-[10px] font-black uppercase px-2 py-1 rounded`}>
                                                {tag.label}
                                            </span>
                                        ))}
                                    </div>
                                    <h4 className="font-punchy text-2xl md:text-4xl font-bold text-white uppercase tracking-wider italic">{island.name}</h4>
                                    <p className="text-xs md:hidden font-bold flex items-center gap-1 uppercase mt-1" style={{ color: island.tags[0]?.bg.includes('neon-pink') ? '#ff00e5' : island.tags[0]?.bg.includes('neon-aqua') ? '#00f2ff' : '#13c8ec' }}>
                                        <span className="material-icons text-xs">
                                            {island.name === 'Mykonos' ? 'local_fire_department' : island.name === 'Santorini' ? 'photo_camera' : island.name === 'Ios' ? 'nightlife' : 'explore'}
                                        </span>
                                        {island.tags[0]?.label}
                                    </p>
                                    <p className="hidden md:block text-gray-300 mt-2 max-w-sm text-base">{island.desc}</p>
                                    <span className="hidden md:inline-flex items-center gap-1 text-primary text-xs font-bold uppercase mt-3 tracking-widest group-hover:gap-2 transition-all">
                                        View Details <span className="material-icons text-sm">arrow_forward</span>
                                    </span>
                                </div>
                                <span className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-background-dark md:hidden shrink-0">
                                    <span className="material-icons">arrow_forward</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── EXPERIENCES PREVIEW ────────────────────────────── */}
            <section className="py-10 md:py-24 bg-background-dark text-white">
                <div className="px-4 md:px-10 max-w-7xl mx-auto">
                    <div className="mb-8 md:mb-16">
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-white">Unforgettable <span className="text-primary">Moments</span></h2>
                        <p className="text-gray-400 text-sm md:text-lg mt-1 text-center font-space">The experiences that define your journey.</p>
                    </div>
                    {/* Mobile: 2x2 grid of square tiles */}
                    <div className="grid grid-cols-2 gap-3 md:hidden">
                        {experienceImages.slice(0, 4).map((item, i) => (
                            <div key={i} className="aspect-square relative rounded-2xl overflow-hidden">
                                <img className="absolute inset-0 w-full h-full object-cover" src={item.img} alt={item.alt} />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                                    <span className="text-white text-xs font-bold leading-tight">{item.alt.split(' ').slice(0, 3).join(' ')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop: original mosaic grid */}
                    <div className="hidden md:grid grid-cols-4 gap-4 aspect-[2/1]">
                        {experienceImages.map((item, i) => (
                            <div key={i} className={`${item.span} rounded-2xl overflow-hidden bg-gray-800`}>
                                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={item.img} alt={item.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOT DEALS ───────────────────────────────────── */}
            <section id="flash-sales" className="py-16 md:py-24 px-4 md:px-10 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-6 text-slate-900">HOT <span className="text-neon-pink">DEALS</span></h2>
                        <p className="text-neon-pink font-display font-bold uppercase animate-pulse text-sm">
                            Deals expire in {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {flashSales.map((deal) => (
                            <div key={deal.title} className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 relative hover:border-primary transition-colors group">
                                <span className="absolute -top-3.5 left-6 md:left-8 bg-neon-pink text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
                                    {deal.spotsLeft} LEFT
                                </span>
                                <h4 className="font-punchy text-xl md:text-2xl font-bold uppercase mb-2 italic">{deal.title}</h4>
                                <p className="text-gray-400 text-sm mb-5 md:mb-6">{deal.dates}</p>
                                <div className="flex items-baseline gap-2 mb-6 md:mb-8">
                                    <span className="text-3xl md:text-4xl font-punchy font-bold text-slate-900 italic">{deal.price}</span>
                                    <span className="text-gray-400 line-through text-sm">{deal.oldPrice}</span>
                                </div>
                                <button onClick={() => openBooking({ action: 'book-yacht', entityId: deal.title, source: 'destinations-deal' })} className="w-full py-3.5 md:py-4 bg-primary text-slate-900 font-punchy uppercase text-xs font-bold rounded-xl cursor-pointer hover:scale-105 transition-transform">
                                    Claim Spot
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-center text-slate-500 font-space text-sm italic mt-12 mb-4">Departure times can change due to weather.</p>
            </section>

            {/* ─── TRUST BADGES ──────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-4 md:px-10 pb-10 md:pb-14">
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <span className="flex items-center gap-2 text-sm text-gray-500 font-display font-bold uppercase tracking-wider">
                        <span className="material-icons text-primary text-lg">lock</span> Secure payment via Stripe
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-500 font-display font-bold uppercase tracking-wider">
                        <span className="material-icons text-neon-pink text-lg">block</span> No BYO alcohol
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-500 font-display font-bold uppercase tracking-wider">
                        <span className="material-icons text-neon-aqua text-lg">verified_user</span> Safety-first crew
                    </span>
                </div>
            </div>

            {/* ─── FINAL CTA BAND ────────────────────────────────── */}
            <section className="mx-4 md:mx-10 mb-10 md:mb-24">
                <div className="max-w-7xl mx-auto rounded-3xl bg-background-dark md:bg-gradient-to-r md:from-primary md:via-neon-aqua md:to-neon-pink md:p-[3px] overflow-hidden">
                    <div className="md:bg-background-dark md:rounded-[1.4rem] px-6 md:px-16 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border border-white/10 md:border-0 rounded-3xl md:rounded-[1.4rem]">
                        <div className="text-center md:text-left">
                            <h2 className="font-punchy text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-2 italic">Ready for the best week of your life?</h2>
                            <p className="text-gray-400 text-sm md:text-lg">Limited spots available this summer season.</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 shrink-0 w-full md:w-auto">
                            <button onClick={() => openBooking({ action: 'book-yacht', source: 'destinations-cta' })} className="px-8 md:px-10 py-4 md:py-5 bg-primary text-slate-900 font-punchy uppercase text-xs md:text-sm font-bold rounded-2xl shadow-neon-blue cursor-pointer hover:scale-105 transition-transform">
                                Book Your Cabin
                            </button>
                            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-display uppercase text-xs md:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-all">
                                <span className="material-icons text-base">chat</span> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ────────────────────────────────────────── */}
            <Footer />

            {/* ─── FLOATING HOT DEAL WIDGET ──────────────────────── */}
            {showWidget && (
                <div className="fixed bottom-6 right-6 z-[60] w-56 md:w-64 glass-panel rounded-2xl p-3 md:p-4 shadow-neon-pink border border-neon-pink/20">
                    <div className="flex justify-between items-start mb-2">
                        <span className="bg-neon-pink text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">LAST CABIN</span>
                        <button onClick={() => setShowWidget(false)} className="text-slate-400 hover:text-slate-900 cursor-pointer">
                            <span className="material-icons text-sm">close</span>
                        </button>
                    </div>
                    <p className="font-punchy font-bold text-sm mb-1 uppercase tracking-tight italic">7-Night Route</p>
                    <div className="flex items-center justify-between">
                        <p className="text-neon-aqua font-punchy font-bold text-xl italic">€649</p>
                        <a href="#flash-sales" className="px-3 md:px-4 py-1.5 bg-primary text-slate-900 font-display text-[10px] font-black uppercase rounded-lg cursor-pointer hover:scale-105 transition-transform inline-block">
                            Claim
                        </a>
                    </div>
                </div>
            )}


        </div>
    )
}
