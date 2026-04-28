import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Server, Shield, Share2, Database, Cpu, Layers } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/sections/CustomCursor";
import Preloader from "@/components/sections/Preloader";


export default function NuroxCaseStudy() {
  const [showPreloader, setShowPreloader] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = "unset"; };
  }, [showPreloader]);

  return (
    <div ref={containerRef} className="text-foreground min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      <CustomCursor />
      <AnimatePresence>
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>
      {/* Static Image Background Overlay */}
      <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
        <img
          src="/potfolio/nurox.png"
          alt="Background"
          className="w-full h-full object-cover opacity-20 grayscale contrast-[1.1] brightness-[0.7]"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,1)_100%)] z-10" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-20" />
      </div>
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="container relative z-10 px-6 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-6">Case Study 02</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black leading-[0.9] uppercase tracking-tighter mb-8">
                High-Throughput<br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>AI Logistics Platform</span>
                <span className="text-primary">.</span>
              </h1>
              <div className="flex flex-wrap gap-4 mb-8">
                {["Rigid Systems", "Vanity Infrastructure", "False Ownership"].map((tenet) => (
                  <span key={tenet} className="px-4 py-1 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest text-white/60">
                    {tenet}
                  </span>
                ))}
              </div>
              <a
                href="https://nurox.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-primary/50 text-primary text-sm font-mono uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 group"
              >
                Visit Client Site
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-40 relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-md">
          <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary">Overview</p>
                <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
                  Engineering for <br /> <span className="italic text-primary">enterprise scale.</span>
                </h2>
              </div>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-xl">
                A jet fuel logistics platform required a highly scalable, fault-tolerant architecture capable of handling massive transaction volumes while integrating with legacy enterprise systems.
              </p>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary">The Problem</p>
                <ul className="space-y-6">
                  {[
                    "Complex domain logic across suppliers and billing",
                    "High transaction volume (500K+ daily)",
                    "Fragmented integrations with SAP/Oracle systems",
                    "Lack of observability and system reliability"
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 text-lg text-white/80"
                    >
                      <span className="text-primary mt-1.5"><Server size={18} /></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DIAGNOSIS */}
        <section className="py-40 relative z-10 border-b border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary">The Diagnosis</p>
              <blockquote className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                "The system risk wasn’t scale — 
                <span className="block mt-6 text-4xl md:text-6xl text-primary font-bold not-italic">
                  it was rigidity and lack of adaptability under load.
                </span>"
              </blockquote>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="py-40 relative z-10 bg-black/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mb-20">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4">The Solution</p>
              <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">System Built<span className="text-primary">.</span></h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Hexagonal Architecture", desc: "Domain-driven design with CQRS separation.", icon: Layers },
                { title: "Event Streaming", desc: "High-performance Kafka & RabbitMQ messaging.", icon: Share2 },
                { title: "Enterprise Sync", desc: "Secure OAuth2 integrations with SAP/Oracle.", icon: Shield },
                { title: "AI Decision Support", desc: "Behavior-based scoring and operational optimization.", icon: Cpu },
                { title: "DB Optimization", desc: "High-performance PostgreSQL tuning for heavy load.", icon: Database },
                { title: "Observability Pipeline", desc: "Real-time monitoring with ELK stack & Grafana.", icon: Server }
              ].map((feature, i) => (
                <div key={i} className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
                  <feature.icon className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} strokeWidth={1.5} />
                  <h4 className="text-xl font-serif font-bold uppercase mb-4 tracking-wider">{feature.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="py-40 relative z-10 border-t border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter mb-8">
                  The <span className="text-primary">Impact.</span>
                </h2>
                <div className="space-y-12">
                  {[
                    { label: "Operational Costs", value: "-25%" },
                    { label: "Data Consistency", value: "90%" },
                    { label: "Log Loss", value: "0.1%" }
                  ].map((stat, i) => (
                    <div key={i} className="border-b border-white/10 pb-6">
                      <p className="text-5xl md:text-7xl font-serif font-bold text-white mb-2">{stat.value}</p>
                      <p className="text-xs font-mono uppercase tracking-[0.3em] text-primary">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/20 p-12 space-y-8">
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-primary">Insight</p>
                <p className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                  The best systems don’t just scale. They <span className="italic text-primary">adapt without breaking.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
