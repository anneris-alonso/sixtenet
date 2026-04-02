import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: "01",
    title: "Brand Strategy",
    description: "We define your core purpose, positioning, and voice to build a resilient brand foundation that resonates with your audience."
  },
  {
    id: "02",
    title: "Digital Design",
    description: "Crafting immersive, high-end interfaces that perfectly balance aesthetics with intuitive user experience."
  },
  {
    id: "03",
    title: "Development",
    description: "Bringing designs to life with robust, scalable engineering and cutting-edge frontend technologies."
  },
  {
    id: "04",
    title: "Motion & 3D",
    description: "Elevating digital experiences with bespoke animations, micro-interactions, and cinematic 3D visuals."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 border-t border-white/5 overflow-hidden" id="expertise">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Título con entrada desde el lateral izquierdo */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4"
          >
            Our Expertise
          </motion.p>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-serif font-bold max-w-3xl leading-tight"
            >
              We don't just build websites. 
              <span className="italic text-primary">We architect digital flagship experiences.</span>
            </motion.p>
          </div>
        </div>

        {/* Lista de servicios con Stagger */}
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              variants={rowVariants}
              className="border-b border-white/10 relative group hover-trigger"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-none relative z-10">
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-xl md:text-2xl text-muted-foreground font-light tabular-nums">{service.id}</span>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold group-hover:translate-x-4 group-hover:text-primary transition-all duration-500">
                    {service.title}
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
                      <p className="w-[300px] text-muted-foreground text-sm leading-relaxed shrink-0">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="md:hidden text-muted-foreground text-sm mt-4">
                  {service.description}
                </p>
              </div>

              {/* Hover Background Fill — ahora con color primary tenue */}
              <div className="absolute inset-0 bg-primary/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
