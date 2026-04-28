import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Diagnose",
    body: "We identify hidden friction across your acquisition, conversion, and operations. Data, not assumptions.",
  },
  {
    id: "02",
    title: "Design",
    body: "We architect a system tailored to your business — connecting marketing, data, and internal workflows.",
  },
  {
    id: "03",
    title: "Build",
    body: "We implement the infrastructure: tracking, funnels, automation, and platforms.",
  },
  {
    id: "04",
    title: "Optimize",
    body: "We continuously improve performance through data, testing, and AI-driven insights.",
  },
  {
    id: "05",
    title: "Scale",
    body: "Once the system works, we scale it — without increasing complexity.",
  },
];

export default function Process() {
  return (
    <section className="py-32 border-t border-white/5 overflow-hidden" id="process">
      <div className="container mx-auto px-4 md:px-8">

        {/* Label + heading */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4"
          >
            How We Work
          </motion.p>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-serif font-bold max-w-3xl leading-tight"
            >
              A repeatable system,{" "}
              <span className="italic text-primary">not a one-off project.</span>
            </motion.p>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-5 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative border-l border-white/10 pl-8 pr-6 py-10 group hover:border-primary/60 transition-colors duration-500"
            >
              {/* Step number */}
              <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.3em] mb-6 group-hover:text-primary transition-colors">
                {step.id}
              </p>

              {/* Connector dot */}
              <div className="absolute -left-[5px] top-10 w-[9px] h-[9px] rounded-full border-2 border-primary/40 bg-background group-hover:bg-primary group-hover:border-primary transition-all duration-500" />

              <h3 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
