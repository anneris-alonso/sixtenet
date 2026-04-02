import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [mousePos, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const targetX = clientX - window.innerWidth / 2;
      const targetY = clientY - window.innerHeight / 2;
      setMousePosition({ x: targetX * 0.05, y: targetY * 0.05 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const text = "DIGITAL CRAFT.";

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.2)_0%,transparent_60%)] mix-blend-screen" />
        <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container px-4 md:px-6 relative z-10 flex flex-col items-center justify-center text-center mt-16"
      >
        <motion.div
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
          className="mb-8 overflow-hidden flex flex-wrap justify-center max-w-6xl"
        >
          {text.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1 + i * 0.04,
                duration: 0.9,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="text-[14vw] md:text-[11vw] lg:text-[9vw] font-serif font-bold leading-none tracking-tight text-foreground uppercase"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed"
          >
            We build digital experiences that refuse to be ignored. <br className="hidden md:block"/>
            Confident design, bold engineering, and zero compromises.
          </motion.p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">Scroll to explore</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [-64, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
