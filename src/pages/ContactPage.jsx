import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState('idle') // idle, submitting, success

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
                title="Contact Us | Plan Your Greece Party Yacht Vacation"
                description="Ready to plan your Greek island party holiday? Contact our trusted team today. We help travelers from AU, NZ, UK, and beyond book epic social yacht escapes."
                keywords="Contact Greece party yacht charter, Inquire about Greek social sailing, Book party yacht holidays"
            />
            <Navbar />

            {/* HERO */}
            <section className="pt-40 pb-20 px-4 md:px-6 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,229,0.1)_0%,transparent_50%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="text-neon-aqua font-black uppercase tracking-widest text-xs font-space mb-4 block">Get In Touch</span>
                    <h1 className="text-6xl md:text-8xl font-punchy text-white italic uppercase tracking-tighter leading-none mb-6">
                        STAY<span className="text-neon-pink"> CONNECTED</span>
                    </h1>
                    <p className="text-slate-400 font-medium max-w-xl mx-auto text-lg">
                        Have a question about your booking, a specific route, or general yacht life? Drop us a line.
                    </p>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="py-20 px-4 flex-1">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT COLUMN: INFO & SOCIALS */}
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

                            {/* WhatsApp */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#25D366]/10 rounded-2xl flex items-center justify-center shrink-0">
                                    <span className="material-icons text-[#25D366]">chat</span>
                                </div>
                                <div>
                                    <h4 className="font-punchy uppercase text-lg mb-1">WhatsApp</h4>
                                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-slate-500 font-medium hover:text-[#25D366] transition-colors inline-block">Message our ground ops</a>
                                    <p className="text-xs text-slate-400 mt-1">Available Mon-Fri, 9am - 6pm (EET)</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="font-punchy uppercase text-lg mb-4 text-slate-800">Follow the Fleet</h4>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center hover:bg-neon-pink hover:text-white transition-all shadow-sm text-slate-600">
                                    <span className="material-icons">camera_alt</span>
                                </a>
                                <a href="#" className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center hover:bg-neon-aqua hover:text-white transition-all shadow-sm text-slate-600">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.41-.21-1.61.26-3.23 1.18-4.57 1.25-1.78 3.32-2.91 5.48-3.03 2.07-.11 4.17.47 5.87 1.76l-.61 3.53c-1.28-1-3-1.47-4.63-.98-1.34.42-2.31 1.58-2.67 2.9-.27 1.05-.03 2.18.59 3.03.69.95 1.84 1.48 3.01 1.46 1.63-.04 3.08-1.2 3.42-2.81.09-.43.14-.88.13-1.32-.01-3.65-.01-7.29 0-10.94.01-3.57.01-7.14.02-10.71z" /></svg>
                                </a>
                                <a href="#" className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm text-slate-600">
                                    <span className="material-icons">facebook</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CONTACT FORM */}
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
                                <p className="text-slate-500 text-sm mb-6">Fill out the form below and we'll be in touch.</p>

                                <div>
                                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Subject</label>
                                    <select
                                        id="subject"
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors text-slate-700"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Booking Question</option>
                                        <option>Private Charter</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-space">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-neon-aqua focus:bg-white transition-colors resize-none"
                                        placeholder="How can we help you?"
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
