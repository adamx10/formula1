import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { TEAMS } from '../data/teams.ts';
import { DRIVERS } from '../data/drivers.ts';
import { SectionHeader } from '../components/ui/SectionHeader';

export function TeamsPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.team-card',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power2.out' }
    );
  }, { scope: ref });

  const sorted = [...TEAMS].sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));

  return (
    <div ref={ref}>
      <SectionHeader label="2026 Grid" title="Teams" subtitle="11 constructors" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {sorted.map((team) => {
          const drivers = DRIVERS.filter((d) => d.teamId === team.id);
          const maxPts = sorted[0]?.points ?? 1;
          const pct = ((team.points ?? 0) / maxPts) * 100;

          return (
            <Link key={team.id} to={`/teams/${team.id}`}
              className="team-card group relative rounded-sm border border-carbon-500 bg-carbon-800 overflow-hidden hover:border-red-500/50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40">
              {/* gradient top border */}
              <div className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${team.primaryColor}, ${team.secondaryColor})` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top, ${team.primaryColor}14, transparent 60%)` }} />

              <div className="relative p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-carbon-200">{team.base}</p>
                    <h3 className="font-display text-xl font-black uppercase leading-tight text-white group-hover:text-red-400 transition-colors">
                      {team.shortName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.primaryColor }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.secondaryColor }} />
                  </div>
                </div>

                {/* Drivers */}
                <div className="mb-4 space-y-1">
                  {drivers.map((d) => (
                    <div key={d.id} className="flex items-center gap-2">
                      <span className="text-sm">{d.flag}</span>
                      <span className="text-xs text-carbon-100">{d.firstName} {d.lastName}</span>
                      <span className="num text-[10px] text-carbon-300 ml-auto">#{d.number}</span>
                      {d.isChampion && <span className="text-yellow-400 text-xs">⭐</span>}
                    </div>
                  ))}
                </div>

                {/* Points bar */}
                <div className="border-t border-carbon-600 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest text-carbon-300">Points</span>
                    <span className="num text-sm font-black text-white">{team.points ?? 0}</span>
                  </div>
                  <div className="h-0.5 rounded-full bg-carbon-600">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: team.primaryColor }} />
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-carbon-300">
                  <span>🏎 {team.chassis}</span>
                  <span>⚡ {team.powerUnit}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
