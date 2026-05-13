import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { DRIVERS } from '../data/drivers.ts';
import { TEAMS } from '../data/teams.ts';
import { CALENDAR_2026, isRacePast } from '../data/calendar2026.ts';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Badge } from '../components/ui/Badge';

type Tab = 'drivers' | 'constructors';

export function StandingsPage() {
  const [tab, setTab] = useState<Tab>('drivers');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.stand-row',
      { x: -16, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.035, duration: 0.45, ease: 'power2.out' }
    );
    gsap.fromTo('.stand-bar',
      { scaleX: 0 },
      { scaleX: 1, stagger: 0.035, duration: 0.6, ease: 'power3.out', transformOrigin: 'left center', delay: 0.1 }
    );
  }, { scope: containerRef, dependencies: [tab] });

  const sortedDrivers = [...DRIVERS].sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const sortedTeams  = [...TEAMS].sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const maxDPts = sortedDrivers[0]?.points ?? 1;
  const maxTPts = sortedTeams[0]?.points ?? 1;

  return (
    <div ref={containerRef}>
      <SectionHeader
        label="Championship"
        title="Standings"
        subtitle={`2026 Season · After ${CALENDAR_2026.filter(isRacePast).length} of 24 races`}
        action={
          <div className="flex rounded-sm border border-carbon-500 overflow-hidden">
            {(['drivers', 'constructors'] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${tab === t ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(0,119,255,0.4)]' : 'bg-carbon-800 text-carbon-100 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
        }
      />

      {tab === 'drivers' ? (
        <div className="space-y-1.5">
          {sortedDrivers.map((d, i) => {
            const team = TEAMS.find((t) => t.id === d.teamId);
            const pct = ((d.points ?? 0) / maxDPts) * 100;
            const gap = i === 0 ? '—' : `-${(sortedDrivers[0].points ?? 0) - (d.points ?? 0)}`;
            return (
              <Link key={d.id} to={`/drivers/${d.id}`}
                className="stand-row flex items-center gap-3 rounded-sm border border-carbon-500 bg-carbon-800 px-4 py-3 hover:border-blue-500/40 hover:bg-carbon-700 transition-all group">
                <span className={`w-6 text-center num text-base font-black shrink-0
                  ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-carbon-100' : i === 2 ? 'text-amber-600' : 'text-carbon-300'}`}>
                  {d.standing}
                </span>
                <div className="w-0.5 h-8 rounded-full shrink-0" style={{ backgroundColor: team?.primaryColor ?? '#333' }} />
                <span className="font-mono text-xs font-semibold text-carbon-200 w-8 shrink-0">{d.code}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {d.flag} {d.firstName} <span className="font-black">{d.lastName}</span>
                    </span>
                    {d.isChampion && <Badge variant="yellow">⭐ Champ</Badge>}
                  </div>
                  <div className="mt-1.5 h-0.5 w-full rounded-full bg-carbon-600">
                    <div className="stand-bar h-full rounded-full origin-left" style={{ width: `${pct}%`, backgroundColor: team?.primaryColor ?? '#0077ff' }} />
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-0.5">
                  <div className="num text-base font-black text-white tabular-nums">{d.points ?? 0}</div>
                  <div className="num text-[10px] text-carbon-200">{gap}</div>
                </div>
                <div className="hidden sm:block text-right shrink-0 w-10">
                  <div className="text-[10px] text-carbon-200">{d.wins}W</div>
                  <div className="text-[10px] text-carbon-300">{d.podiums}P</div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="space-y-1.5">
          {sortedTeams.map((t, i) => {
            const pct = ((t.points ?? 0) / maxTPts) * 100;
            const gap = i === 0 ? '—' : `-${(sortedTeams[0].points ?? 0) - (t.points ?? 0)}`;
            const teamDrivers = DRIVERS.filter((d) => d.teamId === t.id);
            return (
              <Link key={t.id} to={`/teams/${t.id}`}
                className="stand-row flex items-center gap-3 rounded-sm border border-carbon-500 bg-carbon-800 px-4 py-3 hover:border-blue-500/40 hover:bg-carbon-700 transition-all group">
                <span className={`w-6 text-center num text-base font-black shrink-0
                  ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-carbon-100' : i === 2 ? 'text-amber-600' : 'text-carbon-300'}`}>
                  {t.standing}
                </span>
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.primaryColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{t.name}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-carbon-200">{teamDrivers.map((d) => d.lastName).join(' · ')}</div>
                  <div className="mt-1.5 h-0.5 w-full rounded-full bg-carbon-600">
                    <div className="stand-bar h-full rounded-full origin-left" style={{ width: `${pct}%`, backgroundColor: t.primaryColor }} />
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-0.5">
                  <div className="num text-base font-black text-white tabular-nums">{t.points ?? 0}</div>
                  <div className="num text-[10px] text-carbon-200">{gap}</div>
                </div>
                <div className="hidden sm:block text-right shrink-0 w-10">
                  <div className="text-[10px] text-carbon-200">{t.wins}W</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
