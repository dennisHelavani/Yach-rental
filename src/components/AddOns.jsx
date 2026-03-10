export default function AddOns() {
    return (
        <section className="py-32 px-6" id="add-ons">
            <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden bg-slate-900 relative group min-h-[600px] flex items-center">
                <div className="absolute inset-0 opacity-50">
                    <img
                        alt="Sailing extras"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPV7lrqqiPiXhxzKBslNE_PSCvhdfZyaMa_PdLxD6aDy5cCbp2B_wZ28nIoo0QKx_6AKQw-0T5OyZX0J03dCvtU2KGFz015t8bIVOXMXh3Je4Zmq40ssvS6jI2JUcrJ7z2GakdCMIjl1XC3aOytYucufBN14xzf9dlw7Lr65ewcGGRWrEuyyeTlt4XtQPBLRIeEyo_kYex2VRjt1OW3ziCTtN4ivKTpbzzMLIpMx5BSWB-v5TCeSYsK24yW2QkDN-zxhQL4v6dAQ"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 p-12 lg:p-20 items-center gap-12">
                    <div>
                        <div className="inline-block bg-neon-pink text-white px-4 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-6 font-space">
                            Make It Yours
                        </div>
                        <h2 className="text-5xl md:text-7xl font-punchy text-white italic uppercase leading-none tracking-tighter text-left mb-12">
                            YOUR TRIP, <span className="text-neon-aqua">YOUR</span><br />WAY.
                        </h2>
                        <p className="text-slate-300 text-xl mb-10 leading-relaxed font-medium">
                            Add optional extras to your trip. Unlimited drinks, recommended excursions via GetYourGuide, and more.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                            {['Unlimited Drinks — €199 pp', 'Excursions via GetYourGuide', 'Scooter & Activity Rentals', 'On-Board Extras'].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-white font-bold">
                                    <span className="material-symbols-outlined text-neon-aqua">check_circle</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <button className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-punchy text-xl hover:bg-neon-pink hover:text-white transition-all shadow-xl cursor-pointer">
                            VIEW ADD-ONS
                        </button>
                    </div>

                    <div className="hidden lg:flex justify-end">
                        <div className="glass-panel p-8 rounded-[2rem] w-80 text-slate-900 border-white/20 -rotate-3 hover:rotate-0 transition-transform duration-500 font-space">
                            <img
                                alt="Island activity"
                                className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgE9NlEKr2fUTT1mKJxU7TdM2LjJqFXYwxwk28HkwyicGUI90C0Se8eT7SeqKFW0l143hejv1qA6oyUpCzLy_vL1p1jb_ma2lBaXy8zpEjWWYKky4palOIKudvH5c4V5JkAzT6xnZJIGR-vYmG-sbecJtdMeA-p7HnMuO4L4cGIzzrbUhZweyKrvyk5wI7KKWNQzgLDbwN3vFGDpXLqwNuSBD1q-JKTRmWm2vuXnAPM_5cmxxnHjltaJ9eSNeafsx0HFXNH3OvYA"
                            />
                            <h5 className="text-2xl font-punchy italic mb-1 uppercase">Island Activities</h5>
                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">Recommended via GetYourGuide</p>
                            <div className="h-[2px] bg-slate-100 mb-4" />
                            <div className="flex items-center justify-between text-neon-pink">
                                <div className="flex gap-1">
                                    <span className="material-icons text-sm">star</span>
                                    <span className="material-icons text-sm">star</span>
                                    <span className="material-icons text-sm">star</span>
                                </div>
                                <span className="text-[10px] font-black uppercase text-slate-400">Browse Options</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
