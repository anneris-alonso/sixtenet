import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Animación de contador con entrada suave
function Counter({ from, to, label, suffix = "" }: { from: number, to: number, label: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    let start = from;
    const duration = 1800;
    const stepTime = Math.abs(Math.floor(duration / (to - from)));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === to) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, from, to]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex flex-col gap-3 border-l-2 border-primary pl-6"
    >
      <div className="text-5xl md:text-7xl font-serif font-bold tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">
        {label}
      </div>
    </motion.div>
  );
}

// Variantes para revelar las líneas de texto una a una
const lineVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Parallax suave para el fondo oscuro
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const headlineLines = [
    "We Are A Creative",
    "Force Of Nature.",
  ];

  return (
    <section ref={sectionRef} className="pt-12 pb-32 px-6 md:px-12 container mx-auto relative overflow-hidden" id="agency">
      {/* Linea decorativa paralaxada de fondo */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent pointer-events-none"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        
        {/* LEFT — Entra desde la izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-8">About Us</p>
          
          <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-10 overflow-hidden">
            {headlineLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="block"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={lineVariants}
                >
                  {i === 1 ? (
                    <span className="text-primary italic">{line}</span>
                  ) : line}
                </motion.span>
              </div>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-12"
          >
            Born from a desire to challenge the ordinary, we exist to build brands 
            that leave a mark. Strategy meets obsessive craftsmanship to deliver 
            experiences that transform businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="inline-block border-2 border-white text-white font-bold uppercase tracking-widest text-sm px-10 py-5 hover:bg-primary hover:border-primary hover:text-background transition-all duration-400 cursor-none"
            >
              Discover Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Entra desde la derecha */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid grid-cols-2 gap-x-10 gap-y-14 content-center"
        >
          <Counter from={0} to={120} suffix="+" label="Projects Delivered" />
          <Counter from={0} to={15} suffix="+" label="Industry Awards" />
          <Counter from={0} to={8} label="Years Active" />
          <Counter from={0} to={40} suffix="+" label="Global Clients" />
        </motion.div>
      </div>
    </section>
  );
}
