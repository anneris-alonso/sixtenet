import { motion } from "framer-motion";

export default function Marquee() {
  const words = [
    "SIXTENET", "·",
    "GROWTH SYSTEMS", "·",
    "REVENUE ENGINEERING", "·",
    "CONVERSION ARCHITECTURE", "·",
    "AI AUTOMATION", "·",
    "CUSTOM PLATFORMS", "·",
    "PERFORMANCE MARKETING", "·",
    "DATA-DRIVEN GROWTH", "·",
    "SAAS DEVELOPMENT", "·",
    "BUSINESS INFRASTRUCTURE", "·",
    "GROWTH SYSTEMS", "·",
    "REVENUE ENGINEERING", "·",
    "CONVERSION ARCHITECTURE", "·",
    "AI AUTOMATION", "·",
    "CUSTOM PLATFORMS", "·",
  ];

  return (
    <section className="w-full py-12 overflow-hidden bg-white/5 border-y border-white/5 flex items-center">
      <div className="relative flex whitespace-nowrap overflow-hidden w-full">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: [0, -1035] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`text-4xl md:text-6xl font-serif font-bold uppercase ${
                word === "·" ? "text-primary" : "text-transparent"
              }`}
              style={word !== "·" ? { WebkitTextStroke: "1px rgba(255,255,255,0.8)" } : {}}
            >
              {word}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {words.map((word, i) => (
            <span
              key={`dup-${i}`}
              className={`text-4xl md:text-6xl font-serif font-bold uppercase ${
                word === "·" ? "text-primary" : "text-transparent"
              }`}
              style={word !== "·" ? { WebkitTextStroke: "1px rgba(255,255,255,0.8)" } : {}}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
