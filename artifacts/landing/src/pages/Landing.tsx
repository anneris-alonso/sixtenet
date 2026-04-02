import { useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import SplineHero from "@/components/sections/SplineHero";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import SplineCarousel from "@/components/sections/SplineCarousel";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/sections/CustomCursor";

export default function Landing() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <SplineHero />
        <Hero />
        <Marquee />
        <SplineCarousel />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
