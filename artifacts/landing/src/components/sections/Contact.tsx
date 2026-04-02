import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, User, ArrowRight, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-sm font-medium tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary"></span>
              Get in Touch
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8">
              Let's build something <span className="text-primary">extraordinary.</span>
            </h3>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-md mb-12 font-light">
              We collaborate with visionary brands and individuals to create digital experiences that leave a lasting impact.
            </p>

            <div className="space-y-8">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-none"
              >
                <div className="w-14 h-14 border-2 border-white/20 flex items-center justify-center bg-transparent group-hover:bg-primary group-hover:border-primary transition-all duration-300 rounded-none transform group-hover:rotate-6">
                  <Mail className="w-6 h-6 text-white/70 group-hover:text-background transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.2em] font-bold">Email Us</p>
                  <a href="mailto:hello@thebus.agency" className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
                    hello@thebus.agency
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group cursor-none"
              >
                <div className="w-14 h-14 border-2 border-white/20 flex items-center justify-center bg-transparent group-hover:bg-primary group-hover:border-primary transition-all duration-300 rounded-none transform group-hover:rotate-6">
                  <MapPin className="w-6 h-6 text-white/70 group-hover:text-background transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.2em] font-bold">Visit Us</p>
                  <p className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
                    123 Innovation Drive, NY 10001
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Editorial Form Container */}
            <div className="bg-[#0a0a0a] border-t-2 border-l-2 border-r-2 border-[#111] p-8 md:p-12 relative overflow-hidden group shadow-[20px_20px_0px_0px_rgba(123,212,234,0.1)] transition-transform hover:-translate-y-2 hover:-translate-x-2 duration-500">
              
              <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-2 group/input">
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black group-focus-within/input:text-primary transition-colors">
                      Your Name
                    </label>
                    <div className="relative">
                      <Input 
                        placeholder="ALICE WONDERLAND" 
                        className="bg-transparent border-0 border-b-2 border-white/20 focus-visible:border-primary focus-visible:ring-0 px-0 h-14 rounded-none font-serif text-xl placeholder:text-white/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 group/input">
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black group-focus-within/input:text-primary transition-colors">
                      Email Address
                    </label>
                    <div className="relative">
                      <Input 
                        type="email"
                        placeholder="HELLO@EXAMPLE.COM" 
                        className="bg-transparent border-0 border-b-2 border-white/20 focus-visible:border-primary focus-visible:ring-0 px-0 h-14 rounded-none font-serif text-xl placeholder:text-white/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 group/input">
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black group-focus-within/input:text-primary transition-colors">
                    Project Details
                  </label>
                  <div className="relative">
                    <Textarea 
                      placeholder="Tell us about the scope, timeline, and vision..." 
                      className="bg-transparent border-0 border-b-2 border-white/20 focus-visible:border-primary focus-visible:ring-0 px-0 pt-4 min-h-[120px] rounded-none font-serif text-xl placeholder:text-white/20 resize-none transition-all duration-300"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 text-lg font-bold bg-primary hover:bg-white text-background rounded-none uppercase tracking-widest transition-all duration-500 hover:scale-[1.02]"
                >
                  <span className="flex items-center justify-center gap-4">
                    Contact Us 
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
