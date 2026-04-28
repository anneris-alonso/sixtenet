import { motion } from "framer-motion";
import { Zap, Code, Globe, BarChart3, Cpu, Target, Megaphone, Video } from "lucide-react";

const services = [
  {
    id: "01",
    icon: Zap,
    title: "Core Growth Engineering",
    items: [
      "Growth Systems Architecture",
      "Funnel Engineering & Conversion Systems",
      "Customer Acquisition Infrastructure",
      "Performance Marketing (Meta, Google, LinkedIn)",
      "GEO Targeting & Market Localization",
      "Data-driven Growth Strategy",
    ],
  },
  {
    id: "02",
    icon: Code,
    title: "Software & Platform Development",
    items: [
      "Custom Web Platforms (React / Vue / Full-stack)",
      "SaaS Product Development",
      "Internal Business Systems (CRM, Automation Tools)",
      "API Integrations & Data Pipelines",
      "AI-powered Business Tools",
      "Workflow Automation (n8n, Zapier, custom pipelines)",
    ],
  },
  {
    id: "03",
    icon: Globe,
    title: "Web Experience & Conversion",
    items: [
      "High-end Website Design (Awwwards-level)",
      "Conversion-focused UX/UI",
      "Interactive Storytelling Websites",
      "Landing Page Systems",
      "Web Performance Optimization",
    ],
  },
  {
    id: "04",
    icon: BarChart3,
    title: "Data, Analytics & Optimization",
    items: [
      "Analytics Setup (GA4, tracking, events)",
      "Conversion Tracking & Attribution",
      "Data Dashboards (custom)",
      "A/B Testing Systems",
      "Behavioral Analytics",
    ],
  },
  {
    id: "05",
    icon: Cpu,
    title: "AI & Automation",
    items: [
      "AI Marketing Automation",
      "Lead Qualification Agents",
      "Chatbots & Conversational Systems",
      "AI Personalization Engines",
      "Predictive Customer Models",
    ],
  },
  {
    id: "06",
    icon: Target,
    title: "Branding & Market Positioning",
    items: [
      "Brand Strategy (data-backed, not fluff)",
      "Brand Identity Systems",
      "Messaging & Positioning",
      "Market Segmentation",
      "Rebranding",
    ],
  },
  {
    id: "07",
    icon: Megaphone,
    title: "Acquisition Channels",
    items: [
      "SEO (technical + content + GEO SEO)",
      "Paid Advertising (full funnel)",
      "Social Media Systems (no posting, SYSTEMS)",
      "Email Marketing Automation",
      "Influencer Campaign Systems",
    ],
  },
  {
    id: "08",
    icon: Video,
    title: "Content & Creative",
    sub: "On-demand via our freelancer network",
    items: [
      "Motion Design",
      "Video Production",
      "Creative Campaign Assets",
      "Ad Creatives",
    ],
  },
];

export default function Services() {
  return (
    <section className="py-32 border-t border-white/5" id="expertise">
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
            Our Services
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-serif font-bold max-w-3xl leading-tight"
            >
              <span className="italic text-primary">Full-spectrum systems. </span>
              We build what growth actually requires.
            </motion.h2>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-[#0a0a0a] p-7 flex flex-col gap-6 hover:bg-white/[0.04] transition-colors duration-500"
            >
              {/* Icon + number */}
              <div className="flex items-center justify-between">
                <service.icon className="text-primary" size={24} strokeWidth={1.5} />
                <span className="text-xs font-mono text-white/20 group-hover:text-primary/50 transition-colors duration-500">
                  {service.id}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base font-serif font-bold uppercase tracking-wide text-white leading-tight group-hover:text-primary transition-colors duration-500">
                  {service.title}
                </h3>
                {service.sub && (
                  <p className="text-xs text-primary/60 font-mono mt-1">{service.sub}</p>
                )}
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-primary/30 group-hover:w-full group-hover:bg-primary/60 transition-all duration-700" />

              {/* Items list */}
              <ul className="space-y-2 flex-1">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-primary/50 mt-0.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
