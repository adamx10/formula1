import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { getTeam } from '../data/teams.ts';
import { DRIVERS } from '../data/drivers.ts';

export function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const team = id ? getTeam(id) : undefined;
  const drivers = team ? DRIVERS.filter((d) => d.teamId === team.id) : [];

  useGSAP(() => {
    gsap.fromTo('.detail-block', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' });
  }, { scope: ref });

  if (!team) {
    return (
      <div className="text-center py-20">
        <p className="text-carbon-200">Team not found.</p>
        <Link to="/teams" className="mt-4 inline-block text-blue-500 hover:text-blue-400 text-sm font-semibold">← Back to Teams</Link>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Link to="/teams" className="detail-block inline-flex items-center gap-1.5 text-xs text-carbon-200 hover:text-white mb-6 transition-colors">
        ← All Teams
      </Link>

      {/* Hero */}
      <div className="detail-block relative rounded-sm border border-carbon-500 bg-carbon-800 overflow-hidden mb-4">
        <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${team.primaryColor}, ${team.secondaryColor})` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${team.primaryColor}14, transparent 60%)` }} />
        <div className="relative p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-carbon-200 mb-1">{team.base} · P{team.standing}</p>
          <h1 className="font-display text-5xl font-black uppercase leading-none text-white">{team.name}</h1>
          <p className="mt-2 text-sm text-carbon-200">Principal: {team.principal}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="detail-block grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Position', value: `P${team.standing}` },
          { label: 'Points', value: team.points ?? 0 },
          { label: 'Wins 2026', value: team.wins ?? 0 },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-sm border border-carbon-500 bg-carbon-800 px-4 py-3 text-center">
            <p className="num text-2xl font-black text-white">{value}</p>
            <p className="text-[10px] uppercase tracking-widest text-carbon-200 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Info + Drivers */}
      <div className="detail-block grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-sm border border-carbon-500 bg-carbon-800 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3">Technical</p>
          <div className="space-y-2 text-sm">
            {[['Chassis', team.chassis], ['Power Unit', team.powerUnit], ['Base', team.base]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <span className="text-carbon-200">{k}</span>
                <span className="text-white font-semibold">{v}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.primaryColor }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.secondaryColor }} />
              <span className="text-xs text-carbon-300">Livery</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-carbon-500 bg-carbon-800 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3">Drivers</p>
          <div className="space-y-3">
            {drivers.map((d) => (
              <Link key={d.id} to={`/drivers/${d.id}`}
                className="flex items-center gap-3 group">
                <span className="text-2xl">{d.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {d.firstName} {d.lastName} {d.isChampion ? '⭐' : ''}
                  </p>
                  <p className="text-xs text-carbon-200">#{d.number} · P{d.standing} · {d.points ?? 0} pts</p>
                </div>
                <span className="num text-xs text-carbon-300">{d.code}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
