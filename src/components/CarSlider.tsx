import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '../hooks/useGSAP';
import gsap from 'gsap';

const CAR_IMAGES = [
  '/images/f1_car_1.png',
  '/images/f1_car_2.png',
  '/images/f1_car_3.png',
  '/images/f1_car_1.png', // Re-using for some length
  '/images/f1_car_2.png',
];

export function CarSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // Disable interaction on mobile/touch devices (fallback to CSS overflow scroll)
    if (isMobile) return;

    const container = containerRef.current;
    const gallery = galleryRef.current;
    if (!container || !gallery) return;

    /**
     * GSAP quickTo provides a high-performance way to update a property
     * with a built-in "lerp" (linear interpolation) feel.
     * duration: 0.8 creates a smooth lag effect for a luxury feel.
     */
    const xTo = gsap.quickTo(gallery, 'x', { duration: 0.8, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // 1. Get cursor X position relative to the slider container
      const mouseX = e.clientX - rect.left;
      
      // 2. Calculate the ratio (0 to 1) of the cursor's horizontal position
      const ratio = mouseX / rect.width;
      
      /**
       * 3. Calculate max travel distance.
       * maxTravel is the width of the gallery minus the visible container width.
       * This ensures the images stay within boundaries.
       */
      const maxTravel = gallery.offsetWidth - container.offsetWidth;
      if (maxTravel <= 0) return;

      /**
       * 4. Map ratio to translation.
       * 0% cursor -> 0px (start of gallery)
       * 100% cursor -> -maxTravel px (end of gallery)
       */
      const targetX = -ratio * maxTravel;
      
      // 5. Update the translation with the smooth GSAP setter
      xTo(targetX);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef, dependencies: [isMobile] });

  return (
    <div 
      ref={containerRef} 
      className={`anim-reveal relative w-full overflow-hidden py-12 bg-carbon-950/50 border-y border-carbon-500/50 cursor-none-on-desktop
        ${isMobile ? 'overflow-x-auto snap-x scrollbar-hide' : ''}`}
    >
      {/* Decorative gradients */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-0 z-10 h-full w-48  from-carbon-950 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 z-10 h-full w-48  from-carbon-950 to-transparent pointer-events-none" />
        </>
      )}
      
      <div 
        ref={galleryRef} 
        className={`flex gap-8 px-12 transition-none will-change-transform
          ${isMobile ? 'w-max' : ''}`}
      >
        {CAR_IMAGES.map((src, i) => (
          <div 
            key={i} 
            className="group relative w-[300px] sm:w-[500px] aspect-video overflow-hidden rounded-sm border border-carbon-500/50 transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 snap-center"
          >
            <img
              src={src}
              alt={`F1 Car ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Glossy overlay */}
            <div className="absolute inset-0  from-carbon-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">2026 Tech Spec</span>
              </div>
              <p className="text-white font-display text-xl font-black uppercase italic tracking-tighter">Carbon Prototype #{i + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Indicator for Desktop */}
      {!isMobile && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
          <div className="w-12 h-0.5 bg-carbon-500" />
          <span className="text-[8px] font-bold uppercase tracking-widest text-carbon-300">Move Cursor to Explore</span>
          <div className="w-12 h-0.5 bg-carbon-500" />
        </div>
      )}
    </div>
  );
}
