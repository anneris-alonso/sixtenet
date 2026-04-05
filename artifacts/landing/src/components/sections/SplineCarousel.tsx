import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "ON WHEELS",
  "ON CAPABLE",
  "SO CONNECTED",
  "STORIES THAT TRAVEL",
  "LEXICONLORE",
  "PRODUCTION ON WHEELS",
  "HIGH-END CONTENT",
  "THE BUS",
  "ON LOCATION",
  "MOBILE STUDIO",
];

const TICKER_H = 56; // px — coincide con h-14

export default function SplineCarousel() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      className="w-full relative overflow-hidden m-0 p-0"
      style={{ height: "100vh" }}
    >
      {/* ── FILA PRINCIPAL ── */}
      <div
        className="flex flex-row w-full"
        style={{ height: `calc(100vh - ${TICKER_H}px)` }}
      >
        {/* LEFT — iframe */}
        <div
          className="relative bg-[#050505] overflow-hidden"
          style={{ width: "80%", height: "100%" }}
        >
          <div
            className="absolute left-0 right-0"
            style={{ top: "-18%", height: "calc(118% + 60px)" }}
          >
            <iframe
              src="https://my.spline.design/herocopy-kfNEEpXzBxV3dYzQltVBQAy3-5DI/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="w-full h-full border-none pointer-events-auto"
              title="Spline 3D Carousel"
            />
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "150px",
              background: "linear-gradient(to bottom, transparent 0%, hsl(240,10%,4%) 60%, hsl(240,10%,4%) 100%)",
              zIndex: 5,
            }}
          />
        </div>

        {/* RIGHT — Panel turquesa */}
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-primary flex flex-col items-center justify-between shadow-[-20px_0_50px_rgba(0,0,0,0.5)] pt-12 pb-8 relative"
          style={{ width: "20%", height: "100%", zIndex: 20 }}
        >
          <p className="text-background/50 text-[12px] tracking-[0.4em] uppercase font-mono">
            02 / Showcase
          </p>

          {/* IN / MOTION — Serif Editorial Style */}
          <div className="flex flex-col items-center select-none">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-serif font-bold uppercase text-background block"
              style={{ fontSize: "clamp(3.5rem, 7vw, 12rem)", lineHeight: 1 }}
            >
              IN
            </motion.span>
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 1 }}
              className="font-serif font-bold uppercase text-transparent block [writing-mode:vertical-rl] rotate-180 mt-4"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 7rem)",
                lineHeight: 1,
                WebkitTextStroke: "2px hsl(var(--background))",
              }}
            >
              MOTION
            </motion.span>
          </div>

          <div className="w-px h-16 bg-background/30" />
        </motion.div>
      </div>

      {/* ── TICKER ── */}
      <div
        className="w-full bg-black border-t border-white/10 overflow-hidden flex items-center"
        style={{ height: `${TICKER_H}px`, position: "relative", zIndex: 10 }}
      >
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 text-[11px] tracking-[0.35em] uppercase text-white/40 font-mono shrink-0"
            >
              {item}
              <span className="w-1 h-1 bg-primary/60 inline-block" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
