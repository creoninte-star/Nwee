"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Work", href: "#work" },
  { name: "Store", href: "https://shop.nwee.agency" },
];

const navVariants: Variants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const }
  },
  exit: { opacity: 0 }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#services");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ["#services", "#process", "#work"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.querySelector(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("http")) {
      if (isOpen) setIsOpen(false);
      return;
    }
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (isOpen) setIsOpen(false);

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
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
          isScrolled ? "bg-background py-4 border-b border-secondary" : "bg-transparent py-8"
        )}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="text-xl font-sans font-bold tracking-widest text-navy uppercase">
            NWEE
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              const isActive = !isExternal && activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={isExternal ? undefined : (e) => handleNavClick(e, link.href)}
                  className="relative text-xs font-sans uppercase tracking-[0.2em] transition-colors duration-300 group"
                  style={{ color: isActive ? "#0A2342" : undefined }}
                >
                  <span className={isActive ? "text-navy" : "text-text group-hover:text-navy transition-colors duration-300"}>
                    {link.name}
                  </span>
                  {/* Active underline */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-navy"
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </a>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-navy z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-12"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-sans font-light tracking-widest uppercase text-text hover:text-navy transition-colors"
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

