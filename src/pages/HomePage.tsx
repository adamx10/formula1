import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { useCountdown, pad2 } from '../hooks/useCountdown';
import { DRIVERS } from '../data/drivers.ts';
import { TEAMS } from '../data/teams.ts';
import { CALENDAR_2026, getNextRace, getLastRace, isRacePast } from '../data/calendar2026.ts';
import { Badge } from '../components/ui/Badge';

function HeroTicker() {
  const items = CALENDAR_2026.map((r) => `R${r.round} ${r.flag} ${r.shortName}`);
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-carbon-500 bg-carbon-800 py-2">
      <div className="ticker-inner flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-[11px] font-mono font-semibold text-carbon-200 uppercase tracking-widest mr-12">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center min-w-16 border border-carbon-500 bg-carbon-800 rounded-sm px-4 py-3">
      <span className="num text-3xl font-bold text-white tabular-nums">{pad2(value)}</span>
      <span className="text-[9px] uppercase tracking-widest text-carbon-200 mt-0.5">{label}</span>
    </div>
  );
}

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nextRace = getNextRace();
  const lastRace = getLastRace();
  const { days, hours, minutes, seconds } = useCountdown(nextRace?.date);

  useGSAP(() => {
    gsap.fromTo('.anim-hero-text',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
    );
    gsap.fromTo('.anim-card',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07, delay: 0.4 }
    );
  }, { scope: heroRef });

  const topDrivers = DRIVERS.filter((d) => d.standing && d.standing <= 5).sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const topTeams = TEAMS.filter((t) => t.standing && t.standing <= 3).sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const completedCount = CALENDAR_2026.filter(isRacePast).length;

  return (
    <div ref={heroRef}>
      {/* ── Hero ── */}
      <div className="mb-6 overflow-hidden rounded-sm border border-carbon-500 carbon-bg">
        <div className="px-6 pt-8 pb-6">
          <p className="anim-hero-text text-[10px] font-bold uppercase tracking-[0.25em] text-red-500 mb-2">
            Formula 1 · Season {new Date().getFullYear()}
          </p>
          <h1 className="anim-hero-text font-display text-6xl sm:text-8xl font-black uppercase leading-none tracking-tight text-white">
            Pitlane
          </h1>
          <p className="anim-hero-text mt-3 text-carbon-100 text-sm max-w-md">
            Your real-time F1 2026 companion. 24 races. 11 teams. 22 drivers. Live standings.
          </p>
          <div className="anim-hero-text mt-4 flex gap-2 flex-wrap">
            <Badge variant="red">⭐ Norris #4 leads WDC</Badge>
            <Badge variant="yellow">McLaren leads WCC</Badge>
            <Badge variant="muted">{completedCount}/24 races complete</Badge>
          </div>
        </div>
        <HeroTicker />
      </div>

      {/* ── Next Race Countdown ── */}
      {nextRace && (
        <div className="anim-card mb-6 rounded-sm border border-red-500/25 bg-carbon-800 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 mb-1">
                <span className="pulse-dot inline-block mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                Next Race · Round {nextRace.round}
              </p>
              <h2 className="font-display text-2xl font-black uppercase text-white">{nextRace.name}</h2>
              <p className="text-sm text-carbon-100">{nextRace.flag} {nextRace.locality} · {nextRace.circuit}</p>
            </div>
            <div className="flex gap-2">
              <CountdownBlock label="Days" value={days} />
              <CountdownBlock label="Hrs"  value={hours} />
              <CountdownBlock label="Min"  value={minutes} />
              <CountdownBlock label="Sec"  value={seconds} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── WDC Top 5 ── */}
        <div className="anim-card rounded-sm border border-carbon-500 bg-carbon-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">Driver Standings</p>
            <Link to="/standings" className="text-[11px] text-carbon-200 hover:text-white transition-colors animated-link">View All →</Link>
          </div>
          <div className="space-y-2">
            {topDrivers.map((d) => {
              const team = TEAMS.find((t) => t.id === d.teamId);
              const maxPts = topDrivers[0]?.points ?? 1;
              const pct = ((d.points ?? 0) / maxPts) * 100;
              return (
                <Link key={d.id} to={`/drivers/${d.id}`} className="flex items-center gap-3 group">
                  <span className={`w-5 text-center num text-sm font-bold ${d.standing === 1 ? 'text-yellow-400' : 'text-carbon-200'}`}>{d.standing}</span>
                  <div
                    className="w-1 h-8 rounded-full shrink-0"
                    style={{ backgroundColor: team?.primaryColor ?? '#333' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                        {d.flag} {d.firstName[0]}. {d.lastName}
                      </span>
                      {d.isChampion && <span className="text-yellow-400 text-xs">⭐</span>}
                    </div>
                    <div className="mt-1 h-0.5 rounded-full bg-carbon-600">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: team?.primaryColor ?? '#e10600' }} />
                    </div>
                  </div>
                  <span className="num text-sm font-bold text-white tabular-nums w-12 text-right">{d.points}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── WCC Top 3 + Last Race ── */}
        <div className="space-y-6">
          <div className="anim-card rounded-sm border border-carbon-500 bg-carbon-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">Constructor Standings</p>
              <Link to="/standings" className="text-[11px] text-carbon-200 hover:text-white transition-colors animated-link">View All →</Link>
            </div>
            <div className="space-y-3">
              {topTeams.map((t) => (
                <Link key={t.id} to={`/teams/${t.id}`} className="flex items-center gap-3 group">
                  <span className={`w-5 text-center num text-sm font-bold ${t.standing === 1 ? 'text-yellow-400' : 'text-carbon-200'}`}>{t.standing}</span>
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.primaryColor }} />
                  <span className="flex-1 text-sm font-semibold text-white group-hover:text-red-400 transition-colors">{t.shortName}</span>
                  <span className="num text-sm font-bold text-white">{t.points} pts</span>
                </Link>
              ))}
            </div>
          </div>

          {lastRace && (
            <div className="anim-card rounded-sm border border-carbon-500 bg-carbon-800 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1">Last Race</p>
              <h3 className="font-display text-lg font-black uppercase text-white">{lastRace.name}</h3>
              <p className="text-xs text-carbon-100 mb-3">{lastRace.flag} Round {lastRace.round} · {new Date(lastRace.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              <Link to="/schedule" className="text-xs text-red-500 hover:text-red-400 font-semibold transition-colors">View Results →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
