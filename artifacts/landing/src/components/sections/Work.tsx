import { motion, useScroll, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// === LAYOUT CONSTANTS — deben coincidir con las clases CSS abajo ===
const CARD_VW = 0.40;   // w-[40vw]
const GAP_PX  = 40;     // gap-[40px]
const PL_VW   = 0.05;   // pl-[5vw]
const PR_VW   = 0.05;   // pr-[5vw]
const N       = 4;      // número de cartas

function getScrollDist(vw: number) {
  // track total = PL + N*CARD + (N-1)*GAP + PR
  // scrollDist = track - viewport
  const trackPx = (PL_VW + N * CARD_VW + PR_VW) * vw + (N - 1) * GAP_PX;
  return Math.max(0, Math.round(trackPx - vw));
}

const projects = [
  { id: 1, title: "The Mobile Studio", category: "Production Unit", image: "/gallery/1.webp" },
  { id: 2, title: "Network Hub",        category: "Connectivity",   image: "/gallery/2.png"  },
  { id: 3, title: "Command Center",     category: "Interior Setup", image: "/gallery/3.png"  },
  { id: 4, title: "Field Deployment",   category: "On Location",    image: "/gallery/4.png"  },
];

export default function Work() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const [scrollDist, setScrollDist] = useState(() =>
    typeof window !== "undefined" ? getScrollDist(window.innerWidth) : 1464
  );

  const x = useMotionValue(0);
  const { scrollY } = useScroll();

  // Cache the TRUE top of the section in the document.
  // offsetTop is relative to the nearest positioned parent — WRONG.
  // getBoundingClientRect().top + scrollY = true document offset — CORRECT.
  const sectionTopRef = useRef(0);

  useEffect(() => {
    const measureTop = () => {
      if (sectionRef.current) {
        sectionTopRef.current =
          sectionRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    measureTop();
    window.addEventListener("resize", measureTop);
    return () => window.removeEventListener("resize", measureTop);
  }, []);

  const calcDist = () => setScrollDist(getScrollDist(window.innerWidth));
  useEffect(() => {
    calcDist();
    window.addEventListener("resize", calcDist);
    return () => window.removeEventListener("resize", calcDist);
  }, []);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      const top      = sectionTopRef.current;
      const progress = (y - top) / scrollDist;
      const clamped  = Math.max(0, Math.min(1, progress));
      x.set(-scrollDist * clamped);
    });
    return unsub;
  }, [scrollY, scrollDist, x]);

  return (
    // Altura exacta: 100vh (para que el sticky sea visible) + scrollDist
    // Cuando el usuario ha scrolleado (scrollDist) px desde el tope de la seccion,
    // el ultimo card es completamente visible Y la seccion termina. Cero gap negro.
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#0a0a0a]"
      style={{ height: `calc(100vh + ${scrollDist}px)` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        <div className="absolute top-20 left-8 md:left-16 z-10 pointer-events-none mix-blend-difference">
          <h2 className="text-3xl md:text-6xl font-serif font-bold uppercase tracking-tighter text-white">
            THE BUS
            <br />
            <span className="text-primary text-lg md:text-2xl tracking-widest font-sans">
              Inside &amp; Out
            </span>
          </h2>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-[40px] pl-[5vw] pr-[5vw]"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex-none w-[40vw] h-[65vh] flex flex-col justify-end"
            >
              <div className="absolute inset-0 overflow-hidden bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
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
