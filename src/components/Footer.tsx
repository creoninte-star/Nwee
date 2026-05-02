"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const socialIcons = [
  {
    name: "Instagram",
    path: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.902 4.902 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
  },
  {
    name: "Twitter",
    path: "M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
  },
  {
    name: "Linkedin",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  }
];

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -8 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background pt-32 pb-12 border-t border-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <motion.div
            className="mb-12 md:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <div className="overflow-hidden">
              <motion.h2
                variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } } }}
                className="text-6xl md:text-8xl font-display font-black tracking-tight text-text mb-6"
              >
                LET'S <span className="text-gold">TALK.</span>
              </motion.h2>
            </div>
            <motion.a
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              href="mailto:hello@nwee.agency"
              className="text-xl md:text-2xl font-sans text-text-muted hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-2 flex items-center gap-2 w-max"
            >
              hello@nwee.agency <ArrowUpRight size={24} />
            </motion.a>
          </motion.div>
          <div className="flex gap-6">
            {socialIcons.map((icon, i) => (
              <motion.a 
                key={i} 
                href="#" 
                className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-text/70 hover:border-gold/40 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                whileHover={{ scale: 1.08, y: -3 }}
                aria-label={icon.name}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d={icon.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-secondary pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm font-sans uppercase tracking-widest">
            © 2026 NWEE. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-text-muted hover:text-text text-sm font-sans uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-text-muted hover:text-text text-sm font-sans uppercase tracking-widest transition-colors">Terms</a>
          </div>
          <button 
            onClick={scrollToTop} 
            className="text-gold text-sm font-sans uppercase tracking-widest hover:text-text transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}


