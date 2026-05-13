import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { getDriver, DRIVERS } from '../data/drivers.ts';
import { TEAMS } from '../data/teams.ts';
import { Badge } from '../components/ui/Badge';

export function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const driver = id ? getDriver(id) : undefined;
  const team = driver ? TEAMS.find((t) => t.id === driver.teamId) : undefined;
  const teammates = driver ? DRIVERS.filter((d) => d.teamId === driver.teamId && d.id !== driver.id) : [];

  useGSAP(() => {
    gsap.fromTo('.detail-block', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' });
  }, { scope: ref });

  if (!driver || !team) {
    return (
      <div className="text-center py-20">
        <p className="text-carbon-200">Driver not found.</p>
        <Link to="/drivers" className="mt-4 inline-block text-blue-500 hover:text-blue-400 text-sm font-semibold">← Back to Drivers</Link>
      </div>
    );
  }

  const age = Math.floor((Date.now() - new Date(driver.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  const dob = new Date(driver.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div ref={ref}>
      <Link to="/drivers" className="detail-block inline-flex items-center gap-1.5 text-xs text-carbon-200 hover:text-white mb-6 transition-colors">
        ← All Drivers
      </Link>

      {/* Hero */}
      <div className="detail-block relative rounded-sm border border-carbon-500 bg-carbon-800 overflow-hidden mb-4">
        <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${team.primaryColor}, ${team.secondaryColor})` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${team.primaryColor}18, transparent 55%)` }} />
        <div className="relative p-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-carbon-200 mb-1">{driver.flag} {driver.nationality}</p>
            <h1 className="font-display text-5xl font-black uppercase leading-none text-white">{driver.firstName} <span style={{ color: team.primaryColor }}>{driver.lastName}</span></h1>
            <p className="mt-2 text-carbon-200 text-sm">{team.name}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              {driver.isChampion && <Badge variant="yellow">⭐ Reigning Champion</Badge>}
              <Badge variant="outline">{driver.code}</Badge>
            </div>
          </div>
          <div className="num text-8xl font-black leading-none opacity-20" style={{ color: team.primaryColor }}>
            #{driver.number}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="detail-block grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Championship', value: `P${driver.standing}` },
          { label: 'Points', value: driver.points ?? 0 },
          { label: 'Wins 2026', value: driver.wins ?? 0 },
          { label: 'Podiums 2026', value: driver.podiums ?? 0 },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-sm border border-carbon-500 bg-carbon-800 px-4 py-3 text-center">
            <p className="num text-2xl font-black text-white">{value}</p>
            <p className="text-[10px] uppercase tracking-widest text-carbon-200 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="detail-block grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-sm border border-carbon-500 bg-carbon-800 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3">Profile</p>
          <div className="space-y-2 text-sm">
            {[
              ['Date of Birth', dob],
              ['Age', `${age} years`],
              ['Nationality', driver.nationality],
              ['Car Number', `#${driver.number}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <span className="text-carbon-200">{k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-sm border border-carbon-500 bg-carbon-800 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3">Team</p>
          <Link to={`/teams/${team.id}`} className="group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.primaryColor }} />
              <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">{team.name}</span>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['Chassis', team.chassis],
                ['Power Unit', team.powerUnit],
                ['Base', team.base],
                ['Principal', team.principal],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-carbon-200">{k}</span>
                  <span className="text-white font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
          </Link>
        </div>
      </div>

      {/* Teammates */}
      {teammates.length > 0 && (
        <div className="detail-block rounded-sm border border-carbon-500 bg-carbon-800 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3">Teammate</p>
          {teammates.map((tm) => (
            <Link key={tm.id} to={`/drivers/${tm.id}`}
              className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
              <span className="text-xl">{tm.flag}</span>
              <div className="flex-1">
                <p className="font-semibold text-white group-hover:text-blue-400 text-sm">{tm.firstName} {tm.lastName}</p>
                <p className="text-xs text-carbon-200">#{tm.number} · P{tm.standing} · {tm.points ?? 0} pts</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
