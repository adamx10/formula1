import { useRef} from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountdown, pad2 } from '../hooks/useCountdown';
import { DRIVERS } from '../data/drivers.ts';
import { TEAMS } from '../data/teams.ts';
import { CALENDAR_2026, getNextRace, getLastRace, isRacePast } from '../data/calendar2026.ts';
import { Badge } from '../components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

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
  const carRef = useRef<HTMLImageElement>(null);
  const nextRace = getNextRace();
  const lastRace = getLastRace();
  const { days, hours, minutes, seconds } = useCountdown(nextRace?.date);

  useGSAP(() => {
    // Entrance animations
    gsap.fromTo('.anim-hero-text',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }
    );

    // Parallax effect on Hero Car
    if (carRef.current) {
      gsap.to(carRef.current, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    gsap.fromTo('.anim-card',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07, scrollTrigger: {
        trigger: '.anim-card',
        start: 'top 90%'
      }}
    );
  }, { scope: heroRef });

  const topDrivers = DRIVERS.filter((d) => d.standing && d.standing <= 5).sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const topTeams = TEAMS.filter((t) => t.standing && t.standing <= 3).sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const completedCount = CALENDAR_2026.filter(isRacePast).length;

  return (
    <div ref={heroRef} className="pb-12">
      {/* ── Hero Section: Le Paddock ── */}
      <div className="relative mb-8 overflow-hidden rounded-sm border border-carbon-500 carbon-bg min-h-[450px] flex flex-col justify-center">
        {/* Parallax Background Car */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 lg:opacity-60">
          <img
            ref={carRef}
            src="/images/f1-2026-car.png" // Placeholder URL
            alt="F1 2026 Car"
            loading="lazy"
            className="w-full h-full object-cover scale-110 translate-y-[-20px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-900 via-carbon-900/40 to-transparent" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 py-10 max-w-2xl">
          <p className="anim-hero-text text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-2">
            Le Paddock · 2026 Season
          </p>
          <h1 className="anim-hero-text font-display text-7xl sm:text-9xl font-black uppercase leading-none tracking-tighter text-white italic">
            Pitlane
          </h1>
          <p className="anim-hero-text mt-4 text-carbon-100 text-sm sm:text-base leading-relaxed">
            The next generation of motorsport. Sustainable power, aerodynamic mastery, 
            and the world's elite drivers competing for glory in the 2026 FIA Formula 1 World Championship.
          </p>
          <div className="anim-hero-text mt-6 flex gap-3 flex-wrap">
            <Badge variant="blue" className="hud-border">⭐ Lando Norris · Reigning Champion</Badge>
            <Badge variant="yellow" className="hud-border">McLaren · WCC Leaders</Badge>
            <Badge variant="outline" className="hud-border">{completedCount}/24 Races Complete</Badge>
          </div>
        </div>
        
        <div className="absolute bottom-0 inset-x-0 z-10">
          <HeroTicker />
        </div>
      </div>

      {/* ── Next Race Countdown ── */}
      {nextRace && (
        <div className="anim-card mb-10 rounded-sm border border-blue-500/25 glass-panel p-6 blue-glow-sm">
          <div className="flex items-start justify-between gap-6 flex-wrap lg:flex-nowrap">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-1 flex items-center gap-2">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue-500" />
                Live Countdown · Round {nextRace.round}
              </p>
              <h2 className="font-display text-4xl font-black uppercase text-white mb-1 tracking-tight">{nextRace.name}</h2>
              <p className="text-sm text-carbon-200">{nextRace.flag} {nextRace.locality} · {nextRace.circuit}</p>
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

      {/* ── Champion Spotlight: Lando Norris ── */}
      <div className="anim-card mb-10 grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-sm border border-carbon-500 bg-carbon-800">
        <div className="lg:col-span-2 relative min-h-[300px]">
          <img 
            src="/images/lando-norris-spotlight.png" // Placeholder URL
            alt="Lando Norris"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 lg:bg-gradient-to-r lg:from-transparent lg:to-carbon-800" />
        </div>
        <div className="lg:col-span-3 p-8 flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-2">Champion Spotlight</p>
          <h2 className="font-display text-5xl font-black uppercase text-white leading-none mb-4">Lando <span className="text-blue-500">Norris</span></h2>
          <p className="text-sm text-carbon-200 mb-6 max-w-lg leading-relaxed">
            Following a dominant 2025 campaign, Lando Norris enters the 2026 season as the man to beat. 
            With McLaren's new aerodynamic package, he looks to defend his crown against the strongest grid in years.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: '2025 Points', value: '438' },
              { label: '2025 Wins', value: '11' },
              { label: 'Podiums', value: '17' },
              { label: 'Poles', value: '9' }
            ].map(stat => (
              <div key={stat.label} className="border-l border-carbon-500 pl-4">
                <p className="num text-xl font-black text-white">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-wider text-carbon-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── WDC Top 5 ── */}
        <div className="anim-card rounded-sm border border-carbon-500 bg-carbon-900/50 p-6 glass-panel hud-border">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500" />
              World Driver Standings
            </p>
            <Link to="/standings" className="text-[11px] text-carbon-200 hover:text-white transition-colors animated-link">View Full Standings →</Link>
          </div>
          <div className="space-y-4">
            {topDrivers.map((d) => {
              const team = TEAMS.find((t) => t.id === d.teamId);
              const maxPts = topDrivers[0]?.points ?? 1;
              const pct = ((d.points ?? 0) / maxPts) * 100;
              return (
                <Link key={d.id} to={`/drivers/${d.id}`} className="flex items-center gap-4 group">
                  <span className={`w-6 text-center num text-sm font-bold ${d.standing === 1 ? 'text-yellow-400' : 'text-carbon-300'}`}>{d.standing}</span>
                  <div
                    className="w-1.5 h-10 rounded-full shrink-0"
                    style={{ backgroundColor: team?.primaryColor ?? '#333' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {d.flag} {d.firstName} {d.lastName}
                      </span>
                      <span className="num text-sm font-bold text-white tabular-nums">{d.points}</span>
                    </div>
                    <div className="h-1 rounded-full bg-carbon-800">
                      <div className="h-full rounded-full transition-all duration-700 bg-blue-500" style={{ width: `${pct}%`, backgroundColor: team?.primaryColor }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── WCC Top 3 + Last Race ── */}
        <div className="space-y-8">
          <div className="anim-card rounded-sm border border-carbon-500 bg-carbon-900/50 p-6 glass-panel hud-border">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500" />
                Constructor Standings
              </p>
              <Link to="/standings" className="text-[11px] text-carbon-200 hover:text-white transition-colors animated-link">View Full Standings →</Link>
            </div>
            <div className="space-y-5">
              {topTeams.map((t) => (
                <Link key={t.id} to={`/teams/${t.id}`} className="flex items-center gap-4 group">
                  <span className={`w-6 text-center num text-sm font-bold ${t.standing === 1 ? 'text-yellow-400' : 'text-carbon-300'}`}>{t.standing}</span>
                  <div className="w-4 h-4 rounded-full shrink-0 border border-white/10" style={{ backgroundColor: t.primaryColor }} />
                  <span className="flex-1 text-sm font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-wider">{t.name}</span>
                  <span className="num text-sm font-bold text-white">{t.points} <span className="text-[10px] text-carbon-400 uppercase ml-1">pts</span></span>
                </Link>
              ))}
            </div>
          </div>

          {lastRace && (
            <div className="anim-card rounded-sm border border-carbon-500 bg-carbon-800 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-black italic">R{lastRace.round}</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-2">
                <span className="w-2 h-0.5 bg-blue-500" />
                Previous Round
              </p>
              <h3 className="font-display text-2xl font-black uppercase text-white mb-1">{lastRace.name}</h3>
              <p className="text-xs text-carbon-200 mb-4">{lastRace.flag} {lastRace.locality} · {new Date(lastRace.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
              <Link to="/schedule" className="inline-flex items-center gap-2 text-xs text-blue-500 hover:text-white font-bold uppercase tracking-widest transition-colors">
                Race Results <span className="text-lg">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
