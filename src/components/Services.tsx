"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { PenTool, Code, Video, Palette, Megaphone, X } from "lucide-react";

const services = [
  { id: "brand", title: "Brand Identity", desc: "Crafting unforgettable brand stories.", icon: PenTool },
  { id: "web", title: "Web Developer", desc: "Building scalable digital experiences.", icon: Code },
  { id: "video", title: "Video Editing", desc: "Action-driven visual narratives.", icon: Video },
  { id: "design", title: "Graphic Design", desc: "Aesthetics that demand attention.", icon: Palette },
  { id: "social", title: "Ad & Social Branding", desc: "Thumb-stopping social content.", icon: Megaphone },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0 }
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const activeService = services.find(s => s.id === selectedService);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (selectedService) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [selectedService]);

  return (
    <section id="services" className="py-32 bg-background relative z-10 overflow-hidden">
      {/* ── Background Aesthetic Elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Huge Parallax Background Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.035 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 select-none"
        >
          <h2 className="text-[25rem] font-display font-black tracking-tighter text-white leading-none">
            SERVICES
          </h2>
        </motion.div>

        {/* Dynamic Glow Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, -60, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 -right-20 w-[700px] h-[700px] bg-teal/20 rounded-full blur-[150px]"
        />

        {/* Technical Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", 
            backgroundSize: "60px 60px" 
          }}
        />
        
        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <div className="overflow-hidden">
            <motion.h2
              variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } } }}
              className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6"
              style={{
                background: "linear-gradient(160deg, #FFFFFF 0%, #F5E6A0 40%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </motion.h2>
          </div>
          <motion.div
            variants={{ hidden: { width: 0 }, visible: { width: 64, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } } }}
            className="h-[2px] bg-gold"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                onClick={() => setSelectedService(service.id)}
                className="relative bg-white/[0.01] backdrop-blur-lg cursor-pointer border border-white/[0.04] rounded-3xl px-8 py-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-all duration-700 overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.03, y: -8 }}
              >
                {/* Premium subtle inner gradient glow & border highlights */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="text-text/70 group-hover:text-gold transition-colors duration-500 mb-12 relative z-10">
                  <Icon size={44} strokeWidth={1.5} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-sans font-medium tracking-wide text-text mb-4 uppercase group-hover:translate-x-1 transition-transform duration-300">{service.title}</h3>
                  <p className="text-text-muted font-sans text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedService && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-2xl flex flex-col overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Fixed Header / Close Button */}
              <div className="absolute top-8 md:top-12 right-8 md:right-12 z-[10001]">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="group flex items-center gap-3 p-3 px-4 bg-white/5 hover:bg-gold/20 text-white hover:text-gold transition-all duration-300 rounded-full border border-white/10 backdrop-blur-md"
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity hidden sm:block">Close</span>
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col items-center p-8 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-12 lg:gap-24">
                  <div className="flex-1">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gold mb-8"
                    >
                      {activeService && <activeService.icon size={64} className="stroke-1" />}
                    </motion.div>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl md:text-7xl font-display font-black tracking-tight text-text mb-8 uppercase"
                    >
                      {activeService?.title}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-text-muted font-sans max-w-xl leading-relaxed mb-12"
                    >
                      {activeService?.desc} Our agency bridges the gap between raw potential and market dominance through elite creative strategies and cutting-edge implementation.
                    </motion.p>
                    <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => setSelectedService(null)}
                      className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-bold font-sans text-gold border-b border-gold pb-1 hover:text-white hover:border-white transition-all duration-300"
                    >
                      Close & Return to Services
                    </motion.button>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 bg-white/[0.03] border border-white/10 p-1 rounded-3xl relative overflow-hidden hidden md:block min-h-[400px]"
                  >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-[10px] text-gold tracking-[0.4em] uppercase font-sans">Featured Work / Case Study</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}


