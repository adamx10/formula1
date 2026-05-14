import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountdown, pad2 } from '../hooks/useCountdown';
import { DRIVERS } from '../data/drivers.ts';
import { TEAMS } from '../data/teams.ts';
import { CALENDAR_2026, getNextRace, getLastRace, isRacePast } from '../data/calendar2026.ts';
import { Badge } from '../components/ui/Badge';
import { CarSlider } from '../components/CarSlider';

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
    <div className="flex flex-col items-center min-w-16 border border-carbon-500 bg-carbon-800 rounded-sm px-4 py-3 shadow-inner">
      <span className="num text-3xl font-bold text-white tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{pad2(value)}</span>
      <span className="text-[9px] uppercase tracking-widest text-carbon-200 mt-0.5">{label}</span>
    </div>
  );
}

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  const nextRace = getNextRace();
  const lastRace = getLastRace();
  const { days, hours, minutes, seconds } = useCountdown(nextRace?.date);

  useGSAP(() => {
    // 1. Cinematic Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.fromTo('.anim-hero-text',
      { y: 40, opacity: 0, skewY: 2 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.15 }
    );

    // 2. High-End Car Parallax (Synced with Smooth Scroll)
    if (carRef.current) {
      gsap.fromTo(carRef.current, 
        { scale: 1.1, y: -40 },
        {
          scale: 1.2,
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }

    // 3. Section Reveal Animations
    gsap.utils.toArray<HTMLElement>('.anim-reveal').forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // 4. Spotlight Reveal
    if (spotlightRef.current) {
      gsap.fromTo('.spotlight-img',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 70%',
          }
        }
      );
      
      gsap.fromTo('.spotlight-content > *',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 60%',
          }
        }
      );
    }

    // 5. Stats Counter Effect
    gsap.utils.toArray<HTMLElement>('.stat-val').forEach((stat) => {
      const text = stat.innerText;
      const target = parseInt(text, 10);
      if (isNaN(target)) return;
      
      gsap.fromTo(stat, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 95%',
          }
        }
      );
    });

  }, { scope: containerRef });

  const topDrivers = DRIVERS.filter((d) => d.standing && d.standing <= 5).sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const topTeams = TEAMS.filter((t) => t.standing && t.standing <= 3).sort((a, b) => (a.standing ?? 99) - (b.standing ?? 99));
  const completedCount = CALENDAR_2026.filter(isRacePast).length;

  return (
    <div ref={containerRef} className="pb-24">
      {/* ── Hero Section ── */}
      <div ref={heroRef} className="relative mb-12 overflow-hidden rounded-sm border border-carbon-500 carbon-bg min-h-[550px] flex flex-col justify-center">
        {/* Parallax Background Car */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 lg:opacity-60">
          <img
            ref={carRef}
            src="/images/f1-2026-car.png"
            alt="F1 2026 Car"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-900 via-carbon-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-6 sm:px-12 py-16 max-w-3xl">
          <p className="anim-hero-text text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500/50" />
            Le Paddock · 2026 Season
          </p>
          <h1 className="anim-hero-text font-display text-7xl sm:text-[110px] font-black uppercase leading-[0.85] tracking-tighter text-white italic">
            Pitlane<span className="text-blue-500">.</span>
          </h1>
          <p className="anim-hero-text mt-8 text-carbon-100 text-sm sm:text-base leading-relaxed max-w-xl">
            The next generation of motorsport. Sustainable power, aerodynamic mastery, 
            and the world's elite drivers competing for glory in the 2026 FIA Formula 1 World Championship.
          </p>
          <div className="anim-hero-text mt-10 flex gap-4 flex-wrap">
            <Badge variant="blue" className="hud-border px-4 py-2">⭐ Lando Norris · Reigning Champion</Badge>
            <Badge variant="yellow" className="hud-border px-4 py-2">McLaren · WCC Leaders</Badge>
            <Badge variant="outline" className="hud-border px-4 py-2">{completedCount}/24 Races Complete</Badge>
          </div>
        </div>
        
        <div className="absolute bottom-0 inset-x-0 z-10">
          <HeroTicker />
        </div>
      </div>

      {/* ── Car Gallery Slider ── */}
      <CarSlider />

      {/* ── Next Race Countdown ── */}
      {nextRace && (
        <div className="anim-reveal mb-12 rounded-sm border border-blue-500/20 glass-panel p-8 blue-glow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-start justify-between gap-8 flex-wrap lg:flex-nowrap relative z-10">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-2 flex items-center gap-2">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-blue-500" />
                Live Countdown · Round {nextRace.round}
              </p>
              <h2 className="font-display text-5xl font-black uppercase text-white mb-2 tracking-tight">{nextRace.name}</h2>
              <p className="text-base text-carbon-200">{nextRace.flag} {nextRace.locality} · {nextRace.circuit}</p>
            </div>
            <div className="flex gap-3">
              <CountdownBlock label="Days" value={days} />
              <CountdownBlock label="Hrs"  value={hours} />
              <CountdownBlock label="Min"  value={minutes} />
              <CountdownBlock label="Sec"  value={seconds} />
            </div>
          </div>
        </div>
      )}

      {/* ── Champion Spotlight ── */}
      <div ref={spotlightRef} className="anim-reveal mb-16 grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden rounded-sm border border-carbon-500 bg-carbon-800 shadow-2xl">
        <div className="lg:col-span-2 relative min-h-[400px] overflow-hidden">
          <img 
            src="/images/lando-norris-spotlight.png"
            alt="Lando Norris"
            loading="lazy"
            className="spotlight-img absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 lg:bg-gradient-to-r lg:from-transparent lg:to-carbon-800" />
        </div>
        <div className="spotlight-content lg:col-span-3 p-10 flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-3 flex items-center gap-2">
            <span className="w-4 h-px bg-yellow-400/50" />
            Champion Spotlight
          </p>
          <h2 className="font-display text-6xl font-black uppercase text-white leading-none mb-6">Lando <span className="text-blue-500">Norris</span></h2>
          <p className="text-sm text-carbon-200 mb-10 max-w-lg leading-relaxed">
            Following a dominant 2025 campaign, Lando Norris enters the 2026 season as the man to beat. 
            With McLaren's new aerodynamic package, he looks to defend his crown against the strongest grid in years.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { label: '2025 Points', value: '438' },
              { label: '2025 Wins', value: '11' },
              { label: 'Podiums', value: '17' },
              { label: 'Poles', value: '9' }
            ].map(stat => (
              <div key={stat.label} className="border-l-2 border-blue-500/30 pl-5">
                <p className="stat-val num text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-wider text-carbon-400 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ── WDC Top 5 ── */}
        <div className="anim-reveal rounded-sm border border-carbon-500 bg-carbon-900/50 p-8 glass-panel hud-border shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500" />
              World Driver Standings
            </p>
            <Link to="/standings" className="text-[11px] text-carbon-200 hover:text-white transition-colors animated-link font-bold">View Full Standings →</Link>
          </div>
          <div className="space-y-6">
            {topDrivers.map((d) => {
              const team = TEAMS.find((t) => t.id === d.teamId);
              const maxPts = topDrivers[0]?.points ?? 1;
              const pct = ((d.points ?? 0) / maxPts) * 100;
              return (
                <Link key={d.id} to={`/drivers/${d.id}`} className="flex items-center gap-5 group">
                  <span className={`w-8 text-center num text-lg font-black ${d.standing === 1 ? 'text-yellow-400' : 'text-carbon-300'}`}>{d.standing}</span>
                  <div
                    className="w-1.5 h-12 rounded-full shrink-0 shadow-lg"
                    style={{ backgroundColor: team?.primaryColor ?? '#333', boxShadow: `0 0 10px ${team?.primaryColor}44` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                        {d.flag} {d.firstName} {d.lastName}
                      </span>
                      <span className="num text-base font-black text-white tabular-nums">{d.points}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-carbon-800 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, backgroundColor: team?.primaryColor }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── WCC Top 3 + Last Race ── */}
        <div className="space-y-12">
          <div className="anim-reveal rounded-sm border border-carbon-500 bg-carbon-900/50 p-8 glass-panel hud-border shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500" />
                Constructor Standings
              </p>
              <Link to="/standings" className="text-[11px] text-carbon-200 hover:text-white transition-colors animated-link font-bold">View Full Standings →</Link>
            </div>
            <div className="space-y-7">
              {topTeams.map((t) => (
                <Link key={t.id} to={`/teams/${t.id}`} className="flex items-center gap-5 group">
                  <span className={`w-8 text-center num text-lg font-black ${t.standing === 1 ? 'text-yellow-400' : 'text-carbon-300'}`}>{t.standing}</span>
                  <div className="w-5 h-5 rounded-full shrink-0 border-2 border-white/10 shadow-lg" style={{ backgroundColor: t.primaryColor }} />
                  <span className="flex-1 text-base font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{t.name}</span>
                  <span className="num text-base font-black text-white">{t.points} <span className="text-[10px] text-carbon-400 uppercase ml-1 font-bold">pts</span></span>
                </Link>
              ))}
            </div>
          </div>

          {lastRace && (
            <div className="anim-reveal rounded-sm border border-carbon-500 bg-carbon-800 p-8 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                <span className="text-8xl font-black italic">R{lastRace.round}</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-3 flex items-center gap-3">
                <span className="w-4 h-0.5 bg-blue-500" />
                Previous Round
              </p>
              <h3 className="font-display text-3xl font-black uppercase text-white mb-2">{lastRace.name}</h3>
              <p className="text-sm text-carbon-200 mb-6">{lastRace.flag} {lastRace.locality} · {new Date(lastRace.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
              <Link to="/schedule" className="inline-flex items-center gap-3 text-xs text-blue-500 hover:text-white font-bold uppercase tracking-[0.2em] transition-colors group/link">
                Race Results <span className="text-xl transition-transform group-hover/link:translate-x-2">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
