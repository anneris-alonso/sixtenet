import { motion } from "framer-motion";

export default function SplineHero() {

  return (
    <section className="relative w-full h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-background">

      {/* 
        BLOQUE IZQUIERDO (SIDEBAR EDITORIAL)
        Ocupa un 25% en escritorio y un 20vh en móvil. 
        Color turquesa con tipografía brutalista en vertical.
      */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-[30%] md:w-[30%] lg:w-[25%] h-full bg-primary flex flex-col items-center justify-between z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)] absolute top-0 left-0 md:relative py-8 md:py-16"
      >

        <div className="flex flex-col gap-1 md:gap-2 items-center leading-none font-sans font-black tracking-tighter uppercase select-none mt-10 md:mt-16">
          {/* Palabra SIX horizontal grande */}
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-[7vw] md:text-[6vw] text-background"
          >
            SIX
          </motion.span>

          {/* Palabra TENET en rotación vertical (no apilada, sino girada 90 grados) */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="text-transparent md:[writing-mode:vertical-rl] md:rotate-180 text-[9vw] md:text-[11vw] mt-1"
            style={{ WebkitTextStroke: "3px hsl(var(--background))", lineHeight: "0.9" }}
          >
            TENET
          </motion.span>
        </div>

        {/* Espaciador flexible */}
        <div className="flex-1 min-h-[60px] md:min-h-[80px] w-full"></div>

        {/* Botón hacia la sección Contact al fondo de la barra */}
        <motion.a
          href="#contact"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mb-10 w-[80%] max-w-[200px] text-center border-2 border-background text-background font-bold uppercase tracking-widest text-xs md:text-sm py-4 hover:bg-background hover:text-primary transition-all duration-300 hover:scale-105"
        >
          Contact Us
        </motion.a>
      </motion.div>

      {/* 
        BLOQUE DERECHO (ESCENA 3D)
      */}
      <div className="w-full md:w-[70%] lg:w-[75%] h-[100dvh] relative z-10 bg-[#050505] overflow-hidden ml-auto">

        {/* Sombra exclusiva para el menú superior */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />

        {/* El video 3D renderizado, configurado en loop infinito sin tirones */}
        <motion.div
          initial={{ x: "-20%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <video
            src="/hero.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          ></video>
        </motion.div>

        {/* Pequeño adorno editorial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute top-24 right-8 z-30 hidden md:block mix-blend-difference pointer-events-none"
        >
          <p className="text-white/50 text-xs tracking-[0.4em] uppercase font-mono text-right">
            Interactive_01
            <br />
            <span className="text-primary tracking-widest">v.26</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
