import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-500/30 bg-carbon-950 py-8 px-6 text-center">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-4">
        <Logo size="sm" />
        
        <p className="text-[11px] text-carbon-400 font-medium uppercase tracking-[0.2em]">
          © 2026 Pitlane - Built with speed by <span className="text-white">Adam-x10</span>
        </p>
        
        <div className="flex gap-6 mt-2">
          <a href="#" className="text-carbon-500 hover:text-blue-400 transition-colors text-[10px] uppercase font-bold tracking-widest">Privacy Policy</a>
          <a href="#" className="text-carbon-500 hover:text-blue-400 transition-colors text-[10px] uppercase font-bold tracking-widest">Terms of Service</a>
          <a href="#" className="text-carbon-500 hover:text-blue-400 transition-colors text-[10px] uppercase font-bold tracking-widest">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
