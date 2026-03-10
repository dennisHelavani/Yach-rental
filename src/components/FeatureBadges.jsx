const badges = [
    { icon: 'sailing', label: '~50 Yachts', mobileLabel: '~50 Yachts', color: 'text-neon-pink' },
    { icon: 'restaurant', label: 'Half-Board Included', mobileLabel: 'Half-Board', color: 'text-neon-aqua' },
    { icon: 'verified', label: 'From €739 pp', mobileLabel: 'From €739 pp', color: 'text-primary' },
    { icon: 'gavel', label: 'EU Safety Briefing', mobileLabel: 'EU Safety', color: 'text-green-500' },
]

export default function FeatureBadges() {
    return (
        <div className="relative z-20 pt-10 pb-4 md:pt-16 md:pb-8 px-4 md:px-6 font-space bg-background-light">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {badges.map((b) => (
                    <div key={b.label} className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform">
                        <span className={`material-symbols-outlined ${b.color} text-3xl md:text-4xl mb-1 md:mb-2`}>{b.icon}</span>
                        <span className="font-punchy text-sm md:text-lg uppercase tracking-tight">
                            <span className="hidden md:inline">{b.label}</span>
                            <span className="md:hidden">{b.mobileLabel}</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
