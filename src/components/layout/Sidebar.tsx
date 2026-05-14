import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

const NAV = [
  { to: '/',          icon: '⬡', label: 'Home'      },
  { to: '/standings', icon: '◈', label: 'Standings' },
  { to: '/schedule',  icon: '◷', label: 'Schedule'  },
  { to: '/drivers',   icon: '◉', label: 'Drivers'   },
  { to: '/teams',     icon: '◫', label: 'Teams'     },
];

export function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Sidebar entry
    gsap.fromTo(sidebarRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // Nav items stagger
    gsap.fromTo('.nav-item',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
    );
  }, { scope: sidebarRef });

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside ref={sidebarRef} className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-56 z-40 border-r border-carbon-500 bg-carbon-900 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-carbon-500 bg-carbon-950">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-sm shadow-[0_0_15px_rgba(0,119,255,0.4)]">
            <span className="font-display text-xs font-black text-white">PL</span>
          </div>
          <div>
            <p className="font-display text-lg font-black uppercase tracking-widest leading-none text-white">Pitlane</p>
            <p className="text-[9px] text-carbon-200 tracking-[0.15em] uppercase mt-0.5">F1 2026</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-item group flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden
                ${isActive
                  ? 'bg-blue-500/10 text-white'
                  : 'text-carbon-200 hover:text-white hover:bg-carbon-800'}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-blue-500 shadow-[0_0_8px_#0077ff]" />
                  )}
                  <span className={`text-lg leading-none transition-transform group-hover:scale-110 ${isActive ? 'text-blue-500' : 'text-carbon-400 group-hover:text-blue-400'}`}>
                    {icon}
                  </span>
                  <span>{label}</span>
                  {/* Subtle hover glow effect */}
                  <span className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors pointer-events-none" />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Season badge */}
        <div className="px-5 py-6 border-t border-carbon-500 bg-carbon-950/50">
          <p className="text-[10px] text-carbon-200 uppercase tracking-[0.3em] font-bold">Season</p>
          <p className="font-display text-3xl font-black text-white/10 italic">2026</p>
        </div>
      </aside>

      {/* ── Mobile bottom bar ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-carbon-500 bg-carbon-900/90 backdrop-blur-md flex">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all
              ${isActive ? 'text-blue-500' : 'text-carbon-300'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-xl leading-none transition-transform ${isActive ? 'scale-110' : ''}`}>{icon}</span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
