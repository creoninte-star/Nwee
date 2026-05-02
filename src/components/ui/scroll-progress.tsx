"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(to right, #343A40, #0A2342, #2B4C7E, #0A2342)",
      }}
      aria-hidden="true"
    />
  );
}
