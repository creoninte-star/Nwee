"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionKey, setTransitionKey] = useState(pathname);

  useEffect(() => {
    if (pathname !== transitionKey) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionKey(pathname);
        setTransitioning(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children, transitionKey]);

  return (
    <>
      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>

      {/* Cinematic sweep overlay */}
      <AnimatePresence>
        {transitioning && (
          <>
            {/* Gold leading curtain */}
            <motion.div
              key="curtain-navy"
              className="fixed inset-0 z-[9998] pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #0A0A0A 0%, #1a1100 50%, #0A0A0A 100%)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
            {/* NWEE wordmark center */}
            <motion.div
              key="curtain-logo"
              className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span
                className="text-5xl md:text-7xl font-display font-black tracking-[-0.01em]"
                style={{
                  background: "linear-gradient(160deg, #F5E6A0 0%, #D4AF37 40%, #A07C18 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                NWEE
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
