import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sun, Satellite, Camera, Truck, Monitor, Coffee, Mic } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/sections/CustomCursor";
import Preloader from "@/components/sections/Preloader";
import VideoScrollBackground from "@/components/sections/VideoScrollBackground";


export default function TheBusStory() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');

    // Lock scroll while preloader is active
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPreloader]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Video Opacity & Scale
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  // Gallery Horizontal Scroll
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="text-foreground min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      <CustomCursor />

      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      <VideoScrollBackground />

      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* HERO CONTENT - NO STICKY VIDEO HERE AS IT IS NOW GLOBAL */}
        <section ref={videoSectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="container relative z-10 px-6 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <h1 className="text-[12vw] md:text-[10vw] font-serif font-black leading-[0.85] uppercase tracking-tighter mb-8">
                The<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Bus</span><br />Story<span className="text-primary">.</span>
              </h1>
              <p className="text-xl md:text-3xl font-light text-muted-foreground max-w-2xl leading-relaxed tracking-tight">
                From a vision on the road to a state-of-the-art mobile production office. This is how we built our sanctuary of creativity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* NARRATIVE BREAK: THE OBJECTIVE & SPECS MERGER */}
        <section className="py-40 relative z-10 border-y border-white/5 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Left Column: Narrative */}
            <div className="space-y-12">
              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4"
                >
                  The Objective
                </motion.p>
                <div className="overflow-hidden font-serif">
                  <motion.h2
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
                  >
                    Stories behind <br /> <span className="italic text-primary font-serif">the skyline.</span>
                  </motion.h2>
                </div>
              </div>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                In this current uncertain season, founders are still showing up, and businesses are still running.
                We chose to build THE BUS to maintain continuity and tell the stories that matter, wherever they happen.
              </p>
            </div>

            {/* Right Column: Key Capabilities Grid */}
            <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-12 self-center pt-8">
              {[
                { title: "Solar-Powered", desc: "Fully off the grid. No venue required.", icon: Sun },
                { title: "Satellite-Connected", desc: "High-speed connectivity anywhere.", icon: Satellite },
                { title: "Fully Equipped", desc: "Green screen, lights, 4k cameras.", icon: Camera },
                { title: "Road-Legal", desc: "Cross-border across the Middle East.", icon: Truck }
              ].map((spec, i) => (
                <motion.div 
                  key={spec.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-4"
                >
                  <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary mb-6">
                    <spec.icon strokeWidth={1} size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[20px] font-serif font-bold uppercase tracking-widest text-white leading-tight">{spec.title}</h4>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{spec.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* THE ARCHITECTURE - REAL EXPERTISE STYLE WITH HOVER REVEAL */}
        <section className="py-40 relative z-10 border-t border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-20">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4"
              >
                The Architecture
              </motion.p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight max-w-4xl leading-tight">
                The architecture of <br /> <span className="text-primary italic">production.</span>
              </h2>
            </div>

            <div className="w-full">
              {[
                {
                  id: "01",
                  title: "Editing Suite",
                  description: "High-end production suite with dual-monitor arrangement and soundproofing for focused editing anywhere."
                },
                {
                  id: "02",
                  title: "Hospitality Studio",
                  description: "Premium hospitality area designed for crew comfort, including coffee station and relaxing seating during long shoots."
                },
                {
                  id: "03",
                  title: "Technical Hub",
                  description: "On-board equipment storage housing 4k cameras, professional microphones, and a full lighting array."
                },
                {
                  id: "04",
                  title: "Global Network",
                  description: "High-speed satellite connectivity and off-grid power systems for 100% operational continuity in any location."
                }
              ].map((item, index) => (
                <div
                  key={item.id}
                  className="border-b border-white/10 relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-none relative z-10">
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="text-xl md:text-2xl text-muted-foreground font-light tabular-nums group-hover:text-primary transition-colors duration-500">
                        {item.id}
                      </span>
                      <h3 className="text-4xl md:text-6xl font-serif font-bold group-hover:text-primary transition-all duration-500">
                        {item.title}
                      </h3>
                    </div>

                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="hidden md:block overflow-hidden"
                        >
                          <p className="w-[400px] text-muted-foreground text-sm leading-relaxed shrink-0">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <p className="md:hidden text-muted-foreground text-sm mt-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-48 relative overflow-hidden z-10">
          <div className="container mx-auto px-4 md:px-8 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h3 className="text-4xl md:text-8xl font-serif font-black tracking-tighter text-white leading-none">GLOBAL AMBITION.</h3>
              <h3 className="text-4xl md:text-8xl font-serif font-black tracking-tighter text-transparent leading-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>LOCAL ENTREPRENEURS.</h3>
              <h3 className="text-4xl md:text-8xl font-serif font-black tracking-tighter text-primary leading-none">HOMEGROWN IMPACT.</h3>
            </motion.div>
            <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto" />
          </div>
        </section>

      </motion.main>
      <Footer />
    </div>
  );
}
