import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success
    const [formType, setFormType] = useState('individual') // 'individual' | 'company'

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormStatus('submitting')
        setTimeout(() => {
            setFormStatus('success')
        }, 1500)
    }

    return (
        <div className="bg-background-sand text-slate-900 selection:bg-neon-pink selection:text-white overflow-x-hidden min-h-screen flex flex-col">
            <SEO
                title="Contact Us | Book Your Greece Party Yacht Holiday"
                description="Ready to plan your Greek island party trip? Contact our trusted team today. We help travelers from AU, NZ, UK, and beyond book epic social yacht escapes."
                keywords="Contact Greece party yacht charter, Inquire about Greek social sailing, Book party yacht holidays"
            />
            <Navbar />

            {/* HERO */}
            <section className="pt-40 pb-20 px-4 md:px-6 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,229,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="text-neon-aqua font-black uppercase tracking-widest text-xs font-space mb-4 block">Get In Touch</span>
                    <h1 className="sr-only">Contact Us to Book Your Greece Party Yacht Holiday</h1>
                    <h2 className="text-6xl md:text-8xl font-punchy text-white italic uppercase tracking-tighter leading-none mb-6">
                        STAY<span className="text-neon-pink"> CONNECTED</span>
                    </h2>
                    <p className="text-slate-400 font-medium max-w-xl mx-auto text-lg">
                        Have a question about your booking, a specific route, or general yacht life? Drop us a line.
                    </p>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="py-20 px-4 flex-1">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT COLUMN: INFO (email only) */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-4xl md:text-6xl font-punchy italic uppercase leading-none tracking-tighter text-slate-900 mb-8">
                            REACH <span className="text-primary">OUT</span>
                        </h2>

                        <div className="space-y-8 mb-12">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                                    <span className="material-icons text-primary">email</span>
                                </div>
                                <div>
                                    <h4 className="font-punchy uppercase text-lg mb-1">Email Us</h4>
                                    <a href="mailto:info@yachtdays.gr" className="text-slate-500 font-medium hover:text-primary transition-colors inline-block">info@yachtdays.gr</a>
                                    <p className="text-xs text-slate-400 mt-1">We usually reply within 24 hours.</p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ nudge */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h4 className="font-punchy uppercase text-lg mb-2">Looking for quick answers?</h4>
                            <p className="text-sm text-slate-500 mb-4">Check out our FAQ page for common questions about bookings, routes, and yacht life.</p>
                            <a href="/faq" className="inline-block text-sm font-bold text-primary hover:text-neon-pink transition-colors uppercase tracking-widest font-space">
                                Visit FAQ →
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CONTACT FORM with Individual / Company tabs */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-slate-100 relative">
                        {formStatus === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                                <div className="w-20 h-20 bg-neon-aqua/10 text-neon-aqua rounded-full flex items-center justify-center mb-6">
                                    <span className="material-icons text-4xl">check_circle</span>
                                </div>
                                <h3 className="font-punchy text-3xl uppercase italic tracking-tighter mb-4">Message Sent!</h3>
                                <p className="text-slate-500 mb-8 max-w-xs">We've received your message and will get back to you shortly.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neon-aqua hover:text-slate-900 transition-colors"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="font-punchy text-2xl uppercase tracking-tighter mb-2">Send a Message</h3>

                                {/* Individual / Company toggle */}
                                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => setFormType('individual')}
                                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest font-space transition-all cursor-pointer ${
                                            formType === 'individual'
                                                ? 'bg-white text-slate-900 shadow-sm'
                                                : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        Individual
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormType('company')}
                                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest font-space transition-all cursor-pointer ${
                                            formType === 'company'
                                                ? 'bg-white text-slate-900 shadow-sm'
                                                : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        Company
                                    </button>
                                </div>

                                {/* Common: Name */}
                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">
                                        {formType === 'company' ? 'Contact Person' : 'Your Name'}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors"
                                        placeholder={formType === 'company' ? 'Jane Smith' : 'John Doe'}
                                    />
                                </div>

                                {/* Company-only: Company Name */}
                                {formType === 'company' && (
                                    <div>
                                        <label htmlFor="company" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Company Name</label>
                                        <input
                                            type="text"
                                            id="company"
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors"
                                            placeholder="Acme Corp"
                                        />
                                    </div>
                                )}

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">
                                        {formType === 'company' ? 'Business Email' : 'Email Address'}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors"
                                        placeholder={formType === 'company' ? 'bookings@company.com' : 'john@example.com'}
                                    />
                                </div>

                                {/* Company-only: Group Size */}
                                {formType === 'company' && (
                                    <div>
                                        <label htmlFor="groupSize" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Estimated Group Size</label>
                                        <input
                                            type="number"
                                            id="groupSize"
                                            min="1"
                                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors"
                                            placeholder="e.g. 20"
                                        />
                                    </div>
                                )}

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Subject</label>
                                    <select
                                        id="subject"
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors text-slate-700"
                                    >
                                        {formType === 'individual' ? (
                                            <>
                                                <option>General Inquiry</option>
                                                <option>Booking Question</option>
                                                <option>Private Charter</option>
                                                <option>Other</option>
                                            </>
                                        ) : (
                                            <>
                                                <option>Corporate Event</option>
                                                <option>Team Building Trip</option>
                                                <option>Multi-Yacht Charter</option>
                                                <option>Partnership Inquiry</option>
                                                <option>Other</option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors resize-none"
                                        placeholder={formType === 'company' ? 'Tell us about your event or group trip...' : 'How can we help you?'}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full bg-neon-aqua text-slate-900 font-punchy uppercase tracking-widest text-lg py-4 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-lg shadow-neon-aqua/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
