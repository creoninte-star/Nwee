"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, Variants } from "framer-motion";
import { PenTool, Code, Video, Palette, Megaphone, X, Diamond } from "lucide-react";

const services = [
  { id: "brand", title: "Brand Identity", desc: "Crafting unforgettable brand stories.", icon: PenTool },
  { id: "web", title: "Web Developer", desc: "Building scalable digital experiences.", icon: Code },
  { id: "video", title: "Video Editing", desc: "Action-driven visual narratives.", icon: Video },
  { id: "design", title: "Graphic Design", desc: "Aesthetics that demand attention.", icon: Palette },
  { id: "social", title: "Ad & Social Branding", desc: "Thumb-stopping social content.", icon: Megaphone },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const activeService = services.find(s => s.id === selectedService);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

function ServiceCard({ service, i, scrollYProgress, setSelectedService, isMobile }: any) {
  const Icon = service.icon;

  // Phase 1: Exploded view coordinates (vw/vh for responsiveness)
  const explodeX = isMobile 
    ? ["-10vw", "10vw", "-15vw", "15vw", "0vw"][i]
    : ["-35vw", "35vw", "-35vw", "35vw", "0vw"][i];
    
  const explodeY = isMobile
    ? ["-30vh", "-15vh", "15vh", "30vh", "0vh"][i]
    : ["-25vh", "-25vh", "25vh", "25vh", "35vh"][i];
    
  const explodeR = [-15, 15, 10, -10, 5][i];

  // Phase 2: Readable Grid coordinates (Nere Nere layout)
  const gridX = isMobile 
    ? "0vw" 
    : ["-20vw", "20vw", "0vw", "-20vw", "20vw"][i];
    
  const gridY = isMobile 
    ? ["-35vh", "-17.5vh", "0vh", "17.5vh", "35vh"][i] 
    : ["-25vh", "-25vh", "0vh", "25vh", "25vh"][i];
    
  const gridR = 0; // No rotation in final readable state

  const x = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.65, 0.85, 1], ["0vw", "0vw", explodeX, explodeX, gridX, gridX]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.65, 0.85, 1], ["0vh", "0vh", explodeY, explodeY, gridY, gridY]);
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.65, 0.85, 1], [0, 0, explodeR, explodeR, gridR, gridR]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.65, 0.85, 1], isMobile ? [0, 0, 0.85, 0.85, 0.7, 0.7] : [0, 0, 1, 1, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.65, 0.85, 1], [0, 0, 1, 1, 1, 1]);
  
  // As they lock into the fan, stack them nicely
  const zIndex = 10 + i;

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex }}
      onClick={() => setSelectedService(service.id)}
      className="absolute w-[280px] sm:w-[320px] bg-gradient-to-b from-[#1a1708]/90 to-[#0c0c0c]/90 backdrop-blur-2xl cursor-pointer border border-gold/40 rounded-3xl p-8 flex flex-col group hover:from-[#26200a]/90 hover:to-[#111]/90 hover:border-gold/60 transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] pointer-events-auto will-change-transform transform-gpu"
      whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
    >
      {/* Premium subtle inner gradient glow & border highlights */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="text-text/70 group-hover:text-gold transition-colors duration-500 mb-8 relative z-10 flex justify-center">
        <div className="p-4 rounded-full bg-white/5 group-hover:bg-gold/10 transition-colors duration-500">
          <Icon size={40} strokeWidth={1.5} />
        </div>
      </div>
      <div className="relative z-10 text-center">
        <h3 className="text-xl font-sans font-medium tracking-wide text-white mb-3 uppercase group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
        <p className="text-text-muted font-sans text-xs leading-relaxed group-hover:text-white/80 transition-colors duration-300">{service.desc}</p>
      </div>
    </motion.div>
  );
}

  // Central Core Mockup Transforms
  const coreScale = useTransform(scrollYProgress, [0, 0.1, 0.45, 0.65, 0.85, 1], [0.8, 1, 1, 1, 0.8, 0.8]);
  const coreOpacity = useTransform(scrollYProgress, [0, 0.1, 0.45, 0.55, 0.85, 1], [0, 1, 1, 0, 0, 0]);
  const coreY = useTransform(scrollYProgress, [0, 0.1, 0.45, 0.65, 0.85, 1], ["50px", "0px", "0px", "0px", "-50px", "-50px"]);

  // Scroll Hint Text
  const hintOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.8, 0.9, 1], [0, 1, 0, 0, 1, 1]);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    <section ref={containerRef} id="services" className="h-[400vh] bg-background relative z-10">
      
      {/* Sticky container that holds the scene */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background Aesthetic Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.035 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 select-none"
          >
            <h2 className="text-[25rem] font-display font-black tracking-tighter text-white leading-none">
              SERVICES
            </h2>
          </motion.div>

          {/* Dynamic Glow Blobs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15], x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gold/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], x: [0, -40, 0], y: [0, -60, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 -right-20 w-[700px] h-[700px] bg-teal/20 rounded-full blur-[150px]"
          />

          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        {/* Central Core Mockup */}
        <motion.div 
          style={{ scale: coreScale, opacity: coreOpacity, y: coreY }}
          className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-gold/30 bg-black/40 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.15)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-md"></div>
            <div className="absolute inset-2 rounded-full border border-white/10 border-dashed animate-[spin_20s_linear_infinite]"></div>
            <Diamond size={64} className="text-gold animate-pulse" strokeWidth={1} />
          </div>
          <h3 className="mt-8 text-2xl md:text-3xl font-display font-bold uppercase tracking-widest text-white">Nwee Core</h3>
          <p className="mt-2 text-gold/70 text-sm font-sans tracking-widest uppercase">Ecosystem</p>
        </motion.div>

        {/* Scroll Hints */}
        <motion.div 
          style={{ opacity: hintOpacity }}
          className="absolute bottom-12 text-white/40 text-[10px] uppercase tracking-[0.3em] font-sans pointer-events-none"
        >
          <span className="block animate-pulse text-center">Scroll to explore</span>
        </motion.div>

        {/* Exploding Service Cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {services.map((service, i) => (
            <ServiceCard 
              key={`${service.id}-${isMobile}`} 
              service={service} 
              i={i} 
              scrollYProgress={scrollYProgress} 
              setSelectedService={setSelectedService} 
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Modal rendered via Portal */}
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
