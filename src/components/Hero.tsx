"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { TubesBackground } from "@/components/ui/tubes-background";
import { MousePointer2 } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.6 },
  },
};

const wordVariants: Variants = {
  hidden: { y: 60, opacity: 0, rotateX: -15 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (!lenis) {
      window.location.hash = href;
      return;
    }
    lenis.scrollTo(href, {
      duration: 1.0,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)),
    });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

      {/* ── WebGL tubes interactive background ── */}
      <TubesBackground />

      {/* ── Subtle horizontal light streak at center ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-[1]"
        style={{
          top: "42%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, rgba(10,35,66,0.06) 20%, rgba(10,35,66,0.12) 50%, rgba(10,35,66,0.06) 80%, transparent 100%)",
        }}
      />

      {/* ── Hero content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 container mx-auto pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: "1200px" }}
      >
        {/* Premium Eyebrow Badge */}
        <motion.div variants={fadeVariants} className="mb-10">
          <div className="relative group/badge inline-block">
            {/* Soft outer glow */}
            <div className="absolute inset-0 rounded-full bg-navy/5 blur-[8px] opacity-0 group-hover/badge:opacity-100 transition-opacity duration-700" />
            
            <span className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full 
              bg-white/[0.03] border border-navy/10 backdrop-blur-xl
              text-[9px] md:text-[10px] font-sans font-bold uppercase tracking-[0.45em] text-navy/40
              shadow-[0_0_25px_rgba(0,0,0,0.3),inset_0_0_10px_rgba(255,255,255,0.02)]
              transition-all duration-500 group-hover/badge:text-navy/70 group-hover/badge:border-navy/20
              cursor-default">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-navy/60 shadow-[0_0_10px_rgba(10,35,66,0.5)]"></span>
              </span>
              Creative Agency
            </span>
          </div>
        </motion.div>

        {/* Nwee wordmark */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            variants={wordVariants}
            className="text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-display font-black tracking-[-0.01em] leading-none"
            style={{
              background:
                "linear-gradient(160deg, #F5E6A0 0%, #D4AF37 40%, #A07C18 75%, #6B5010 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 60px rgba(10,35,66,0.12))",
            }}
          >
            NWEE
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={fadeVariants}
          className="text-sm md:text-base text-navy/50 max-w-lg font-sans tracking-[0.18em] font-light mb-14 uppercase"
        >
          Born Creative. Built to Scale.
        </motion.p>

        {/* CTAs — Premium Liquid Glass style */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-col sm:flex-row gap-8 justify-center mt-10 pointer-events-auto"
        >
          {/* Primary — Liquid Glass Gold */}
          <LiquidButton
            onClick={(e) => handleNavClick(e as any, "#services")}
            className="px-12 py-5"
          >
            <div className="flex items-center gap-3">
              <span className="font-sans font-bold tracking-[0.2em] uppercase text-sm text-navy">Work With Us</span>
              <ArrowRight
                size={16}
                className="text-navy opacity-70 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </LiquidButton>

          {/* Secondary — Liquid Glass Silver/White */}
          <LiquidButton
            onClick={() => window.open("https://shop.nwee.agency", "_blank")}
            className="px-12 py-5"
          >
            <span className="font-sans font-bold tracking-[0.2em] uppercase text-sm text-navy/80">Visit Store</span>
          </LiquidButton>
        </motion.div>

        {/* Interaction Hint */}
        <motion.div 
          variants={fadeVariants}
          className="absolute -bottom-24 flex flex-col items-center gap-2 text-navy/40 animate-pulse pointer-events-none"
        >
          <MousePointer2 className="w-5 h-5 text-navy/60" />
          <span className="text-[10px] uppercase tracking-widest font-sans">Move cursor & Click</span>
        </motion.div>
      </motion.div>

      {/* ── Bottom editorial divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[9px] font-sans tracking-[0.35em] uppercase text-navy/20">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </motion.div>

    </section>
  );
}



