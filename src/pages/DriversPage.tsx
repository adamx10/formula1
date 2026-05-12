import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { DRIVERS } from '../data/drivers.ts';
import { TEAMS } from '../data/teams.ts';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Badge } from '../components/ui/Badge';

export function DriversPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.driver-card',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out' }
    );
  }, { scope: ref });

  const sorted = [...DRIVERS].sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));

  return (
    <div ref={ref}>
      <SectionHeader label="2026 Grid" title="Drivers" subtitle="22 drivers · 11 teams" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {sorted.map((d) => {
          const team = TEAMS.find((t) => t.id === d.teamId);
          return (
            <Link key={d.id} to={`/drivers/${d.id}`}
              className="driver-card group relative rounded-sm border border-carbon-500 bg-carbon-800 overflow-hidden hover:border-red-500/50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40">
              {/* team color stripe */}
              <div className="absolute inset-x-0 top-0 h-0.5" style={{ backgroundColor: team?.primaryColor ?? '#333' }} />
              {/* team color glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top right, ${team?.primaryColor ?? '#333'}18, transparent 60%)` }} />

              <div className="relative p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{d.flag}</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-carbon-200">{team?.shortName}</p>
                      <p className="font-mono text-xs font-semibold" style={{ color: team?.primaryColor ?? '#666' }}>{d.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="num text-3xl font-black leading-none" style={{ color: team?.primaryColor ?? '#fff', opacity: 0.4 }}>
                      {d.number}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-carbon-200">{d.firstName}</p>
                  <p className="font-display text-xl font-black uppercase leading-tight text-white group-hover:text-red-400 transition-colors">
                    {d.lastName}
                  </p>
                  {d.isChampion && <Badge variant="yellow" className="mt-1">⭐ Reigning Champion</Badge>}
                </div>

                <div className="flex items-center justify-between border-t border-carbon-600 pt-3">
                  <div className="text-center">
                    <p className="num text-base font-black text-white">{d.points ?? 0}</p>
                    <p className="text-[9px] uppercase tracking-wider text-carbon-300">Pts</p>
                  </div>
                  <div className="text-center">
                    <p className="num text-base font-black text-white">{d.wins ?? 0}</p>
                    <p className="text-[9px] uppercase tracking-wider text-carbon-300">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="num text-base font-black text-white">{d.podiums ?? 0}</p>
                    <p className="text-[9px] uppercase tracking-wider text-carbon-300">Pods</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`num text-xs font-black ${d.standing === 1 ? 'text-yellow-400' : 'text-carbon-200'}`}>P{d.standing}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
