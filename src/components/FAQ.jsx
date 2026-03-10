import { useState } from 'react'
import { FAQ_ITEMS } from '../data/constants'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <section className="py-20 px-4 bg-slate-50" id="faq">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-punchy italic uppercase leading-none tracking-tighter text-center mb-12 text-slate-900">
                    THE <span className="text-neon-pink">INTEL</span>
                </h2>

                <div className="space-y-4 font-space">
                    {FAQ_ITEMS.map((item, i) => (
                        <div key={i} className="group">
                            <button
                                onClick={() => toggle(i)}
                                className="w-full text-left p-5 glass-panel rounded-2xl flex justify-between items-center focus:outline-none cursor-pointer"
                            >
                                <span className="font-punchy text-base uppercase">{item.q}</span>
                                <span className={`material-icons text-${item.color} transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>
                            <div className={`accordion-content ${openIndex === i ? 'open' : ''} bg-white/50 rounded-b-2xl px-5 overflow-hidden`}>
                                <p className="py-5 text-slate-600 font-medium text-sm">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
