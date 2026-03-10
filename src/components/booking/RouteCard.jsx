// ── Route Card (data-driven from JSON) ──────────────────
import { DATA } from '../../lib/pricingEngine'

const ROUTE_MAP = {
    '5n': 'route_greece_5n',
    '7n': 'route_greece_7n',
    'package_5_nights_half_board': 'route_greece_5n',
    'package_7_nights_half_board': 'route_greece_7n',
}

export default function RouteCard({ packageId }) {
    const routeId = ROUTE_MAP[packageId]
    const route = DATA.routes.find(r => r.id === routeId)
    if (!route) return null

    const pkg = DATA.packages.find(p =>
        (packageId === '5n' && p.nights === 5) || (packageId === '7n' && p.nights === 7)
    ) || DATA.packages[0]

    const stops = (route.map?.stops || []).map(s => s.name)

    return (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="material-icons text-sm text-primary">sailing</span>
                <h4 className="font-bold text-xs uppercase font-space text-slate-500">{pkg.nights}-Night Route</h4>
                <span className="text-[9px] text-slate-400 font-space ml-auto">{route.region}</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {stops.map((stop, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full border-2 ${i === 0 || i === stops.length - 1 ? 'bg-neon-aqua border-neon-aqua' : 'bg-white border-primary'}`} />
                            <span className="text-[9px] font-bold text-slate-600 mt-1 uppercase font-space whitespace-nowrap">{stop}</span>
                        </div>
                        {i < stops.length - 1 && (
                            <div className="w-6 h-0.5 bg-gradient-to-r from-neon-aqua to-primary mx-0.5 mb-4" />
                        )}
                    </div>
                ))}
            </div>
            {route.disclaimers?.length > 0 && (
                <p className="text-[8px] text-slate-400 mt-2 font-space">{route.disclaimers[0]}</p>
            )}
        </div>
    )
}
