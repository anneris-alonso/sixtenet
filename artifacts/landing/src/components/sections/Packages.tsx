import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    id: "01",
    name: "Starter Growth System",
    price: "$3K – $6K",
    tag: "One-time",
    description: "Para empresas que necesitan una base sólida para crecer.",
    highlight: false,
    items: [
      "Website redesign (conversion-focused)",
      "Basic SEO + GEO targeting",
      "Analytics + tracking setup",
      "Lead funnel setup",
      "Initial ad campaign structure",
    ],
  },
  {
    id: "02",
    name: "Growth Engine",
    price: "$8K – $20K",
    tag: "Monthly retainer",
    description: "Un sistema de crecimiento activo y en constante optimización.",
    highlight: true,
    items: [
      "Everything in Starter",
      "Paid ads management",
      "A/B testing systems",
      "CRM / lead management system",
      "Automation workflows",
      "Monthly optimization cycle",
    ],
  },
  {
    id: "03",
    name: "Scale & Automation",
    price: "$20K – $50K+",
    tag: "Custom engagement",
    description: "Para negocios que necesitan operar, escalar y automatizar sin límites.",
    highlight: false,
    items: [
      "Everything in Growth Engine",
      "Custom platform or SaaS development",
      "AI agents (n8n, GPT workflows)",
      "Predictive analytics",
      "Full business process automation",
    ],
  },
];

export default function Packages() {
  return (
    <section className="py-32 border-t border-white/5" id="packages">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4"
          >
            Investment
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-serif font-bold max-w-3xl leading-tight"
            >
              Choose your{" "}
              <span className="italic text-primary">growth system.</span>
            </motion.h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative flex flex-col p-8 md:p-10 ${
                pkg.highlight
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-[#0a0a0a]"
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-px left-0 right-0 h-px bg-primary" />
              )}

              {pkg.highlight && (
                <span className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-[0.3em] text-primary bg-primary/10 border border-primary/30 px-3 py-1">
                  Most Popular
                </span>
              )}

              {/* Package number */}
              <p className="text-xs font-mono text-white/20 mb-6">{pkg.id}</p>

              {/* Name */}
              <h3 className={`text-xl md:text-2xl font-serif font-bold uppercase tracking-tight mb-2 leading-tight ${pkg.highlight ? "text-primary" : "text-white"}`}>
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="mb-2">
                <span className="text-3xl md:text-4xl font-serif font-black text-white">{pkg.price}</span>
              </div>
              <p className="text-xs font-mono text-primary/60 uppercase tracking-[0.2em] mb-6">{pkg.tag}</p>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 pb-8 border-b border-white/10">
                {pkg.description}
              </p>

              {/* Items */}
              <ul className="space-y-4 flex-1">
                {pkg.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                    <Check
                      size={14}
                      className={`shrink-0 mt-0.5 ${pkg.highlight ? "text-primary" : "text-primary/60"}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`mt-10 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                  pkg.highlight
                    ? "bg-primary text-black hover:bg-primary/90"
                    : "border border-white/20 text-white hover:border-primary hover:text-primary"
                }`}
              >
                Start a Project →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
