import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/',          icon: '⬡', label: 'Home'      },
  { to: '/standings', icon: '◈', label: 'Standings' },
  { to: '/schedule',  icon: '◷', label: 'Schedule'  },
  { to: '/drivers',   icon: '◉', label: 'Drivers'   },
  { to: '/teams',     icon: '◫', label: 'Teams'     },
];

export function Sidebar() {
  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-56 z-40 border-r border-carbon-500 bg-carbon-900">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-carbon-500">
          <div className="flex items-center justify-center w-8 h-8 bg-red-500 rounded-sm">
            <span className="font-display text-xs font-black text-white">PL</span>
          </div>
          <div>
            <p className="font-display text-lg font-black uppercase tracking-widest leading-none text-white">Pitlane</p>
            <p className="text-[9px] text-carbon-200 tracking-[0.15em] uppercase">F1 2026</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-semibold transition-all duration-150 relative
                ${isActive
                  ? 'bg-red-500/10 text-white'
                  : 'text-carbon-100 hover:bg-carbon-600 hover:text-white'}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-y-0 left-0 w-0.5 bg-red-500 rounded-r-full" />
                  )}
                  <span className="text-base leading-none">{icon}</span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Season badge */}
        <div className="px-5 py-4 border-t border-carbon-500">
          <p className="text-[10px] text-carbon-200 uppercase tracking-widest">Season</p>
          <p className="font-display text-2xl font-black text-white/20">2026</p>
        </div>
      </aside>

      {/* ── Mobile bottom bar ── */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-carbon-500 bg-carbon-900 flex">
        {NAV.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-colors
              ${isActive ? 'text-red-500' : 'text-carbon-200'}`
            }
          >
            <span className="text-lg leading-none">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
