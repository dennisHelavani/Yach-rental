export default function TrustCard({ compact = false }) {
    const items = [
        { icon: 'verified_user', text: 'Safety-first crew', color: 'text-neon-aqua' },
        { icon: 'no_drinks', text: 'No BYO alcohol', color: 'text-neon-pink' },
        { icon: 'shield', text: 'Licensed & insured', color: 'text-primary' },
        { icon: 'bolt', text: 'Fast reply within 24h', color: 'text-neon-aqua' },
    ]

    if (compact) {
        return (
            <div className="flex flex-wrap gap-2 mt-4">
                {items.map((t, i) => (
                    <span key={i} className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 font-space">
                        <span className={`material-icons text-xs ${t.color}`}>{t.icon}</span> {t.text}
                    </span>
                ))}
            </div>
        )
    }

    return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-neon-aqua/10 rounded-lg flex items-center justify-center">
                    <span className="material-icons text-sm text-neon-aqua">verified</span>
                </div>
                <h4 className="font-bold text-xs uppercase font-space">Your Safety, Our Priority</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {items.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className={`material-icons text-sm ${t.color}`}>{t.icon}</span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase">{t.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
