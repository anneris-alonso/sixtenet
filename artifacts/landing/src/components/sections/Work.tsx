import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";

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
  { 
    id: 1, 
    title: "Eliminating Revenue Friction", 
    category: "Revenue Systems", 
    image: "/potfolio/mycosmetic.avif",
    slug: "my-cosmetic-surgery"
  },
  { 
    id: 2, 
    title: "AI-Driven Logistics Platform", 
    category: "System Architecture", 
    image: "/potfolio/nurox.png",
    slug: "nurox"
  },
  { 
    id: 3, 
    title: "High-Impact Interactive Experience", 
    category: "Digital Storytelling", 
    image: "/potfolio/thebus.png",
    slug: "the-bus"
  },
  { 
    id: 4, 
    title: "Scaling Event Operations", 
    category: "Operational Systems", 
    image: "/potfolio/lexiconlore.png",
    slug: "lexiconlore"
  },
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
      if (isReleased) return;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate absolute scroll position of the section
      const absoluteTop = window.pageYOffset + rect.top;
      
      const currentX = -xTarget.get();
      const delta    = e.deltaY;

      // ACTIVATION THRESHOLD:
      // We want to "capture" the scroll if the section is close to the top
      // and we still have horizontal content to show.
      const isNearTop = rect.top < 100 && rect.top > -100;

      // 1. If scrolling DOWN and we have cards to show
      if (delta > 0 && currentX < maxTranslate && isNearTop) {
        e.preventDefault();
        // Force the section to snap exactly to the top if not already there
        if (Math.abs(rect.top) > 1) {
          window.scrollTo({ top: absoluteTop, behavior: 'auto' });
        }
        
        const nextX = Math.min(currentX + delta, maxTranslate);
        xTarget.set(-nextX);
      }
      // 2. If scrolling UP and we are not at the first card
      else if (delta < 0 && currentX > 0 && isNearTop) {
        e.preventDefault();
        if (Math.abs(rect.top) > 1) {
          window.scrollTo({ top: absoluteTop, behavior: 'auto' });
        }

        const nextX = Math.max(currentX + delta, 0);
        xTarget.set(-nextX);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isReleased) return;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      const isNearTop = rect.top < 100 && rect.top > -100;
      
      if (!isNearTop) return;

      const currentY = e.touches[0].clientY;
      const deltaY   = touchStartY - currentY;
      const currentX = -xTarget.get();
      const multiplier = 1.5;
      const touchDelta = deltaY * multiplier;

      if (touchDelta > 0 && currentX < maxTranslate) {
        e.preventDefault();
        if (Math.abs(rect.top) > 1) {
          window.scrollTo({ top: absoluteTop, behavior: 'auto' });
        }
        const nextX = Math.min(currentX + touchDelta, maxTranslate);
        xTarget.set(-nextX);
      } else if (touchDelta < 0 && currentX > 0) {
        e.preventDefault();
        if (Math.abs(rect.top) > 1) {
          window.scrollTo({ top: absoluteTop, behavior: 'auto' });
        }
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

        {/* Static Label — small caps style matching "About Us" */}
        <div className="absolute top-20 left-8 md:left-16 z-10 pointer-events-none">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
            Case Studies
          </p>
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
            <Link 
              href={`/case-study/${project.slug}`} 
              key={project.id}
              className="group relative flex-none w-[75vw] h-[65vh] flex flex-col justify-end cursor-pointer block"
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
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
