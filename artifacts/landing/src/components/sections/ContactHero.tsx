import { motion } from "framer-motion";

/**
 * Sección de llamada a la acción antes del formulario de contacto.
 * 
 * Tipografía idéntica al SplineHero:
 *   - Primera línea "LET'S TALK" → font-sans font-black, sólida en blanco (como "THE")
 *   - Segunda línea "IDEAS."     → font-sans font-black, texto TRANSPARENTE con borde (como "BUS")
 * 
 * Fondo: video the_bus_hero.mp4 en loop, cubierto por overlay oscuro.
 */
export default function ContactHero() {
  return (
    <section className="relative w-full h-[70vh] md:h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Video de fondo en loop */}
      <div className="absolute inset-0 z-0">
        <video
          src="/the_bus_hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Overlay oscuro para que el texto sea legible */}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Contenido encima del video */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* LET'S TALK — sólido, blanco, igual que "THE" en SplineHero */}
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="block font-sans font-black uppercase text-white leading-none tracking-tighter"
          style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", lineHeight: 0.9 }}
        >
          LET'S TALK
        </motion.span>

        {/* IDEAS. — transparente con borde blanco, igual que "BUS" en SplineHero */}
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="block font-sans font-black uppercase text-transparent leading-none tracking-tighter"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 14rem)",
            lineHeight: 0.9,
            WebkitTextStroke: "3px white",
          }}
        >
          IDEAS.
        </motion.span>

        {/* CTA button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 inline-block border-2 border-white text-white font-bold uppercase tracking-widest text-xs md:text-sm px-12 py-5 hover:bg-primary hover:border-primary hover:text-background transition-all duration-300"
        >
          Start a Project
        </motion.a>
      </div>
    </section>
  );
}
