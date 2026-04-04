import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  { id: "01", name: "ALEXANDER WOOD", role: "FOUNDER & CEO", image: "/team/alexander.png" },
  { id: "02", name: "ANGELICA BAÑARES", role: "2D DESIGNER", image: "/team/angelica.jpg" },
  { id: "03", name: "CHRISTIAN PASCUAL", role: "TECHNICAL ARCHITECT", image: "/team/chris.jpg" },
  { id: "04", name: "DAMIAN RODRIGUEZ", role: "SOFTWARE ENGINEER", image: "/team/damian.jpg" },
  { id: "05", name: "IRIS ABUSO", role: "OPERATIONS MANAGER", image: "/team/iris.jpg" },
  { id: "06", name: "JADE MARTINEZ", role: "3D DESIGNER", image: "/team/jade.jpg" },
  { id: "07", name: "MALAKA PRABATH", role: "SOUND ENGINEER", image: "/team/malaka.jpg" },
  { id: "08", name: "PAUL CAJIUAT", role: "IT SPECIALIST", image: "/team/paul.jpg" },
  { id: "09", name: "PETER MAGHARI", role: "CONTENT ASSOCIATE", image: "/team/pete.jpg" },
  { id: "10", name: "ROMAN ROMANO", role: "SENIOR EDITOR", image: "/team/roman.jpg" },
  { id: "11", name: "SIMRAN HEMNANI", role: "PRODUCTION ASSISTANT", image: "/team/simra.jpg" },
  { id: "12", name: "TOM NAUW", role: "LIGHTING GAFFER", image: "/team/tom.jpg" },
  { id: "13", name: "VICTOR ORTEGA", role: "GRAPHIC DESIGNER", image: "/team/victor.jpg" },
  { id: "14", name: "BINARA ABAYAWARDANA", role: "GRAPHIC DESIGNER", image: "/team/binara.jpg" },
  { id: "15", name: "ANNE ALONSO", role: "SOFTWARE ENGINEER", image: "/team/anne.jpeg" },
];

export default function Team() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = teamMembers[activeIndex];

  // Split name for editorial styling
  const nameParts = activeMember.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  // Auto-play logic (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const progress = ((activeIndex + 1) / teamMembers.length) * 100;

  // Get up to 3 upcoming slides (excluding active member) for more "aire"
  const getUpcomingSlides = () => {
    const slides = [];
    for (let i = 1; i <= 3; i++) {
      const index = (activeIndex + i) % teamMembers.length;
      slides.push(teamMembers[index]);
    }
    return slides;
  };

  return (
    <section className="py-32 bg-background border-t border-white/5 relative overflow-hidden" id="team">
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-4 md:px-8"
      >

        {/* Label Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-primary"
          >
            Our Team
          </motion.p>
        </div>

        {/* Main Grid: Left (Large Image) | Right (Info, Track, Controls) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">

          {/* LEFT: Active Member Image */}
          <div className="md:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 glassmorphism shadow-2xl grayscale"
              >
                <img
                  src={activeMember.image}
                  alt={activeMember.name}
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Stack (Info -> Track -> Controls) */}
          <div className="md:col-span-7 flex flex-col justify-between h-auto md:h-full min-h-[500px] lg:min-h-[600px]">

            {/* TOP: Active Info (Name & Role) - Aligned with top of image */}
            <div className="mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-start"
                >
                  <span className="text-xs font-mono tracking-[0.3em] text-primary mb-4 block uppercase">
                    {activeMember.role}
                  </span>
                  <div className="flex flex-col leading-none">
                    <h3 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tighter uppercase mb-2">
                      {firstName}
                    </h3>
                    <h3 className="text-5xl md:text-8xl font-serif font-bold tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
                      {lastName}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* MIDDLE: Carousel Track (Slides) - 3 slides for more "aire" */}
            <div className="mb-12 md:mb-16">
              <div className="flex gap-6 overflow-hidden">
                {getUpcomingSlides().map((member, index) => (
                  <motion.button
                    key={member.id}
                    onClick={() => {
                      const actualIndex = teamMembers.findIndex(m => m.id === member.id);
                      setActiveIndex(actualIndex);
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex-none w-[calc(33.33%-16px)] aspect-[3/4] relative overflow-hidden group border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 cursor-none"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale"
                    />
                    <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* BOTTOM: Editorial Controls - Aligned with bottom of image */}
            <div className="flex items-center justify-between gap-8 pt-8 border-t border-white/10">

              {/* Navigation & Progress */}
              <div className="flex items-center gap-12 flex-grow">
                {/* Arrows */}
                <div className="flex gap-4">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-none group"
                  >
                    <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                  </button>
                  <button
                    onClick={() => nextSlide()}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-none group"
                  >
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                  </button>
                </div>

                {/* Progress Bar Container */}
                <div className="hidden lg:flex flex-col gap-2 flex-grow max-w-[300px]">
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-white/40 uppercase">
                    <span>{activeIndex + 1}</span>
                    <span>{teamMembers.length}</span>
                  </div>
                  <div className="h-[2px] bg-white/10 w-full relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-primary"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Current Slide Number (Large Indicator) */}
              <div className="flex items-baseline gap-1">
                <span className="text-6xl md:text-8xl font-serif font-bold text-white/10 leading-none select-none">
                  {activeMember.id}
                </span>
                <span className="text-xl font-mono text-primary/40 font-bold">
                  /{teamMembers.length}
                </span>
              </div>

            </div>

          </div>
        </div>
      </motion.div>

      {/* Decorative Blur */}
      <div className="absolute top-[20%] right-[-5%] w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

    </section>
  );
}
