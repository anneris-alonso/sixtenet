import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to finish before calling onComplete
      setTimeout(onComplete, 1000);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-2 md:gap-4 select-none">
            {/* SIX - Solid White */}
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 
              }}
              className="text-[12vw] md:text-[8vw] font-sans font-black tracking-tighter text-white leading-none"
            >
              SIX
            </motion.span>

            {/* TENET - Outline White */}
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4
              }}
              className="text-[15vw] md:text-[10vw] font-sans font-black tracking-tighter text-transparent leading-none"
              style={{ WebkitTextStroke: "2px white" }}
            >
              TENET
            </motion.span>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-3 h-3 bg-primary mt-4"
            />
          </div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
