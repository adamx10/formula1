export function Footer() {
  return (
    <footer className="mt-auto border-t border-blue-500/30 bg-carbon-950 py-8 px-6 text-center">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(0,119,255,0.3)]">
            <span className="font-display text-[10px] font-black text-white">PL</span>
          </div>
          <span className="font-display text-sm font-black uppercase tracking-widest text-white">Pitlane</span>
        </div>
        
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
