import { useScroll } from "framer-motion";
import { useRef, useEffect } from "react";

export default function VideoScrollBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is "ready" for scrubbing
    video.load();
    video.pause();

    const handleScroll = () => {
      const progress = scrollYProgress.get();
      const duration = video.duration;
      
      if (duration && !isNaN(duration)) {
        // requestAnimationFrame for optimal smoothness
        requestAnimationFrame(() => {
          video.currentTime = progress * duration;
        });
      }
    };

    // Subscribing to motion value changes
    const unsubscribe = scrollYProgress.on("change", handleScroll);
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="/bus.mp4"
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-60 contrast-[1.05] brightness-[0.85]"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Editorial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_80%,rgba(0,0,0,0.9)_100%)] z-10" />
      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-20" />
    </div>
  );
}
