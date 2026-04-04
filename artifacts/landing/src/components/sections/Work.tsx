import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * PREMIUM INTERCEPTED SCROLL PATTERN
 * ─────────────────────────────────────────────────────────────
 * 1. SECTION: height = 100vh (NO fake height).
 * 2. WRAPPER: .sticky top-0 h-screen (preserves static titles).
 * 3. INTERCEPTION: Attach 'wheel' and 'touch' listeners when active.
 * 4. HIJACKING: While animating X, call e.preventDefault() to "stick"
 *    the user in place. Release when X reaches 0 or MAX.
 * 5. MOTION: useSpring for inertia and high-end feel.
 * ─────────────────────────────────────────────────────────────
 */

const projects = [
  { id: 1, title: "The Mobile Studio", category: "Production Unit", image: "/gallery/1.webp" },
  { id: 2, title: "Network Hub",        category: "Connectivity",   image: "/gallery/2.png"  },
  { id: 3, title: "4K Production Suite", category: "Advanced Monitoring", image: "/gallery/3.png"  },
  { id: 4, title: "All-Terrain Mobility", category: "Remote Operations",  image: "/gallery/4.png"  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  // Raw value for the target position (0 to targetMax)
  const xTarget = useMotionValue(0);
  
  // Spring-smoothed horizontal position for the high-end feel
  // stiffness: 100, damping: 20 provides a responsive yet organic transition.
  const x = useSpring(xTarget, {
    stiffness: 100,
    damping: 25,
    mass: 1,
  });

  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isReleased, setIsReleased] = useState(false);

  // Exit gate for manual navigation (Navbar clicks)
  useEffect(() => {
    const handleRelease = () => {
      setIsReleased(true);
      // Give it enough time to finish the programmatic scroll
      setTimeout(() => setIsReleased(false), 1500);
    };
    window.addEventListener("app:release-scroll", handleRelease);
    return () => window.removeEventListener("app:release-scroll", handleRelease);
  }, []);

  // Dynamic max translation calculation:
  // trackWidth - viewportWidth
  // We perform this on mount and resize.
  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewWidth  = window.innerWidth;
        // Total distance we can travel horizontally
        setMaxTranslate(trackWidth - viewWidth);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    // Extra calc after short delay to ensure layout is stable
    const t = setTimeout(calc, 500);
    return () => { window.removeEventListener("resize", calc); clearTimeout(t); };
  }, []);

  // SCROLL INTERCEPTION LOGIC
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Much more robust activation: 
      // If the top is near 0 (within 50px) and we haven't finished the horizontal scroll,
      // or if we are scrolling up and haven't reached the start.
      const isVisible = rect.top < viewHeight && rect.bottom > 0;
      if (!isVisible) return;

      const currentX = -xTarget.get();
      const delta    = e.deltaY;

      // Check if we are "locked" in the viewport
      // A tolerance of 50px helps catch fast scrolls
      const isAtTop = Math.abs(rect.top) < 50;

      // LOCK LOGIC:
      // 1. If scrolling DOWN and we have cards to show
      if (!isReleased && delta > 0 && currentX < maxTranslate && isAtTop) {
        e.preventDefault();
        // Force the section to the top to avoid "drifting"
        if (rect.top !== 0) window.scrollTo({ top: el.offsetTop });
        
        const nextX = Math.min(currentX + delta, maxTranslate);
        xTarget.set(-nextX);
      }
      // 2. If scrolling UP and we are not at the first card
      else if (!isReleased && delta < 0 && currentX > 0 && isAtTop) {
        e.preventDefault();
        if (rect.top !== 0) window.scrollTo({ top: el.offsetTop });

        const nextX = Math.max(currentX + delta, 0);
        xTarget.set(-nextX);
      }
      // Otherwise, the scroll event is allowed to propagate, moving the page vertically
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = el.getBoundingClientRect();
      const isAtTop = Math.abs(rect.top) < 50;
      
      if (!isAtTop) return;

      const currentY = e.touches[0].clientY;
      const deltaY   = touchStartY - currentY;
      const currentX = -xTarget.get();
      const multiplier = 1.5;
      const touchDelta = deltaY * multiplier;

      if (!isReleased && touchDelta > 0 && currentX < maxTranslate) {
        e.preventDefault();
        if (rect.top !== 0) window.scrollTo({ top: el.offsetTop });
        const nextX = Math.min(currentX + touchDelta, maxTranslate);
        xTarget.set(-nextX);
      } else if (!isReleased && touchDelta < 0 && currentX > 0) {
        e.preventDefault();
        if (rect.top !== 0) window.scrollTo({ top: el.offsetTop });
        const nextX = Math.max(currentX + touchDelta, 0);
        xTarget.set(-nextX);
      }
      
      touchStartY = currentY;
    };

    // Passive: false is CRITICAL to allow preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [maxTranslate, xTarget]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#0a0a0a] h-screen"
    >
      {/* Sticky wrapper — preserves titles and progress while images move */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Static Title - Mixed Serif/Sans Brutalist Style */}
        <div className="absolute top-20 left-8 md:left-16 z-10 pointer-events-none mix-blend-difference">
          <h2 className="text-3xl md:text-6xl font-serif font-bold uppercase tracking-tighter text-white">
            THE BUS
            <br />
            {/*<span className="text-primary text-lg md:text-2xl tracking-widest font-sans">
              Inside &amp; Out
            </span>*/}
          </h2>
        </div>

        {/* Progress Hint */}
        <motion.div
          className="absolute bottom-10 right-8 md:right-16 z-10 pointer-events-none"
          style={{
            opacity: useTransform(xTarget, [0, -maxTranslate / 4, -maxTranslate], [0, 1, 0.4]),
          }}
        >
          <span className="text-white/40 font-mono text-xs tracking-widest uppercase">
            SCROLL TO EXPLORE
          </span>
        </motion.div>

        {/* 
          HORIZONTAL TRACK
          padding-left: 5vw to align with text.
          padding-right: 5vw to ensure 4th card has breathing room at end.
        */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-[40px] pl-[5vw] pr-[5vw] will-change-transform items-center"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex-none w-[75vw] h-[65vh] flex flex-col justify-end"
            >
              <div className="absolute inset-0 overflow-hidden bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>

              <div className="relative z-10 p-6 md:p-8 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  {String(index + 1).padStart(2, "0")} // {project.category}
                </p>
                <h3 className="text-xl md:text-3xl font-serif font-bold text-white uppercase tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
