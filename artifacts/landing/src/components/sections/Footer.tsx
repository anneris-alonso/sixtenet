import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-background pt-0 pb-8 overflow-hidden border-t border-white/10" id="contact">

      {/* ─── SECCIÓN CTA: Let's Talk / Ideas. con fondo de imagen ─── */}
      <div className="relative w-full py-32 md:py-40 flex flex-col items-center justify-center overflow-hidden bg-black">

        {/* Fondo negro con la imagen grid_bg.png superpuesta */}
        <div className="absolute inset-0 z-0">
          <img
            src="/grid_bg.png"
            alt="Grid Pattern"
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        {/* LET'S TALK — sólido blanco (como "THE" en SplineHero) */}
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 block font-sans font-black uppercase text-white tracking-tighter leading-none"
          style={{ fontSize: "clamp(3rem, 11vw, 13rem)", lineHeight: 0.9 }}
        >
          LET'S TALK
        </motion.span>

        {/* IDEAS. — transparente con borde (como "BUS" en SplineHero) */}
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 block font-sans font-black uppercase text-transparent tracking-tighter leading-none mb-12"
          style={{
            fontSize: "clamp(3rem, 11vw, 13rem)",
            lineHeight: 0.9,
            WebkitTextStroke: "3px white",
          }}
        >
          IDEAS.
        </motion.span>

        {/* Botón brutalista — cuadrado, sin redondear */}
        <motion.a
          href="mailto:anneris.alonso@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 inline-block border-2 border-white text-white font-bold uppercase tracking-widest text-xs md:text-sm px-14 py-5 hover:bg-primary hover:border-primary hover:text-background transition-all duration-300"
        >
          Contact Us
        </motion.a>
      </div>

      {/* Footer links y copyright */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-12 border-t border-white/10 text-sm">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif font-bold text-2xl mb-4 tracking-tight">SixTenet<span className="text-primary">.</span></h3>
            <p className="text-muted-foreground max-w-xs">
              Eliminating friction and engineering growth systems for high-performance businesses.
            </p>
          </div>

          <div>
            <h4 className="font-medium tracking-widest uppercase mb-6 text-xs text-muted-foreground">Socials</h4>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'Twitter / X', 'LinkedIn'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-primary transition-colors hover-trigger">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium tracking-widest uppercase mb-6 text-xs text-muted-foreground">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="mailto:projects@sixtenet.com" className="hover:text-primary transition-colors hover-trigger">projects@sixtenet.com</a></li>
              {/* <li><a href="tel:+1234567890" className="hover:text-primary transition-colors hover-trigger">+1 (234) 567-890</a></li> */}
              <li className="mt-4 text-muted-foreground">
                SixTenet LLC<br />
                Dubai Studio City, Dubai, UAE
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground py-6 border-t border-white/5">
          <p>© {new Date().getFullYear()} SixTenet. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors hover-trigger">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors hover-trigger">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
