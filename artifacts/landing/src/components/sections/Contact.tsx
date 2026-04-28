import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Senior Security: Strict Schema Validation
const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed"),
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email is too short")
    .max(150, "Email is too long"),
  message: z.string()
    .min(20, "Please provide more details (at least 20 chars)")
    .max(2000, "Message is too long"),
  // Honeypot field (hidden from humans)
  website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot Check: If 'website' is filled, it's a bot
    if (data.website) {
      console.warn("Honeypot triggered. Silent rejection.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate Sanitization & Secure Handling
    const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, "").trim();
    
    const securePayload = {
      name: sanitize(data.name),
      email: data.email.toLowerCase().trim(),
      message: sanitize(data.message),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(securePayload),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setIsSuccess(true);
      toast.success("Message sent securely!", {
        description: "We'll get back to you shortly.",
      });
      reset();

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast.error("Message delivery failed.", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              We collaborate with visionary brands and individuals to create experiences that leave a lasting impact.
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
                  <a href="mailto:projects@sixtenet.com" className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
                    projects@sixtenet.com
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
                  <p className="text-xl font-medium group-hover:text-primary transition-colors duration-300 leading-relaxed">
                    SixTenet LLC<br />
                    Dubai Studio City, Dubai, UAE
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

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <CheckCircle2 className="w-20 h-20 text-primary mb-6 animate-pulse" />
                    <h4 className="text-3xl font-serif font-bold mb-4">Securely Received.</h4>
                    <p className="text-muted-foreground">Our team will process your vision shortly.</p>
                  </motion.div>
                ) : (
                  <form className="space-y-10 relative z-10" onSubmit={handleSubmit(onSubmit)}>
                    {/* HONEYPOT: Hidden field for bots */}
                    <div className="hidden">
                      <input {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div className="space-y-2 group/input">
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black group-focus-within/input:text-primary transition-colors">
                          Your Name
                        </label>
                        <div className="relative">
                          <Input
                            {...register("name")}
                            placeholder="ALICE WONDERLAND"
                            disabled={isSubmitting}
                            className={`bg-transparent border-0 border-b-2 focus-visible:ring-0 px-0 h-14 rounded-none font-serif text-xl placeholder:text-white/20 transition-all duration-300 ${errors.name ? 'border-red-500/50' : 'border-white/20 focus-visible:border-primary'
                              }`}
                          />
                          {errors.name && (
                            <span className="text-[10px] text-red-500/70 font-mono tracking-widest absolute -bottom-6 left-0 uppercase">
                              {errors.name.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 group/input">
                        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black group-focus-within/input:text-primary transition-colors">
                          Email Address
                        </label>
                        <div className="relative">
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="hello@example.com"
                            disabled={isSubmitting}
                            className={`bg-transparent border-0 border-b-2 focus-visible:ring-0 px-0 h-14 rounded-none font-serif text-xl placeholder:text-white/20 transition-all duration-300 ${errors.email ? 'border-red-500/50' : 'border-white/20 focus-visible:border-primary'
                              }`}
                          />
                          {errors.email && (
                            <span className="text-[10px] text-red-500/70 font-mono tracking-widest absolute -bottom-6 left-0 uppercase">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 group/input">
                      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-black group-focus-within/input:text-primary transition-colors">
                        Project Details
                      </label>
                      <div className="relative">
                        <Textarea
                          {...register("message")}
                          placeholder="Tell us about the scope, timeline, and vision..."
                          disabled={isSubmitting}
                          className={`bg-transparent border-0 border-b-2 focus-visible:ring-0 px-0 pt-4 min-h-[120px] rounded-none font-serif text-xl placeholder:text-white/20 resize-none transition-all duration-300 ${errors.message ? 'border-red-500/50' : 'border-white/20 focus-visible:border-primary'
                            }`}
                        />
                        {errors.message && (
                          <span className="text-[10px] text-red-500/70 font-mono tracking-widest absolute -bottom-6 left-0 uppercase">
                            {errors.message.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 text-lg font-bold bg-primary hover:bg-white text-background rounded-none uppercase tracking-widest transition-all duration-500 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <span className="flex items-center justify-center gap-4">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing Securely
                          </>
                        ) : (
                          <>
                            Contact Us
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
