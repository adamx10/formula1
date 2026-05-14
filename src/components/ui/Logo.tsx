export function Logo({ size = "md", showText = true }: { size?: 'sm' | 'md' | 'lg', showText?: boolean }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-3 group">
      {/* Track Curve Icon (Refined) */}
      <div className={`relative ${iconSizes[size]} shrink-0`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Largest outer arc */}
          <path 
            d="M26 26C26 15 17 6 6 6" 
            stroke="#0077ff" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="transition-all duration-500 group-hover:stroke-white"
          />
          {/* Middle arc */}
          <path 
            d="M20 26C20 18.5 13.5 12 6 12" 
            stroke="#0077ff" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.7"
            className="transition-all duration-500 group-hover:opacity-100"
          />
          {/* Smallest inner arc */}
          <path 
            d="M14 26C14 21.5 10.5 18 6 18" 
            stroke="#0077ff" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.4"
            className="transition-all duration-500 group-hover:opacity-100"
          />
        </svg>
      </div>

      {showText && (
        <span className={`font-display ${textSizes[size]} font-black italic uppercase tracking-tighter text-white transition-colors group-hover:text-blue-500`}>
          Pitlane
        </span>
      )}
    </div>
  );
}
