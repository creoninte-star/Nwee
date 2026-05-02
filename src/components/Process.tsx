"use client";

import { motion, Variants } from "framer-motion";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding your brand, audience, and goals deeply." },
  { num: "02", title: "Design", desc: "Crafting visual identities and stunning prototypes." },
  { num: "03", title: "Build", desc: "Developing scalable, performant custom solutions." },
  { num: "04", title: "Launch", desc: "Going live and optimizing for growth and scale." },
];

const circleVariants: Variants = {
  hidden: { 
    borderColor: "rgba(10, 35, 66, 0.1)",
    boxShadow: "0 0 0px rgba(10, 35, 66, 0)",
    y: 20,
    opacity: 0
  },
  visible: (i: number) => ({
    borderColor: "rgba(43, 76, 126, 1)",
    boxShadow: "0 0 50px rgba(43, 76, 126, 0.6)",
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.6, delay: i * 0.1 },
      borderColor: { delay: i * 1.2, duration: 0.5 },
      boxShadow: { delay: i * 1.2, duration: 0.5 },
    }
  })
};

const numVariants: Variants = {
  hidden: { color: "rgba(10, 35, 66, 0.3)" },
  visible: (i: number) => ({
    color: "rgba(10, 35, 66, 1)",
    transition: {
      delay: i * 1.2,
      duration: 0.5
    }
  })
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    scaleY: 1,
    transition: {
      delay: i * 1.2 + 0.4,
      duration: 0.8,
      ease: "easeInOut" as const
    }
  })
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 1.2 + 0.2,
      duration: 0.6
    }
  })
};

export default function Process() {
  return (
    <section id="process" className="py-32 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black tracking-tight text-text mb-6 uppercase"
          >
            Our Process
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            className="h-[2px] bg-navy mx-auto"
          ></motion.div>
        </div>

        <div className="relative mt-24">
          {/* Main timeline line (Static background line) */}
          <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-navy/5"></div>
          <div className="md:hidden absolute left-1/2 top-16 bottom-16 w-[1px] bg-navy/5 -translate-x-1/2"></div>
          
          <div className="flex flex-col md:flex-row justify-between relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={step.num} 
                className="relative flex-1 md:text-center group px-4 mb-20 md:mb-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={i}
              >
                {/* Connector overlay line animation */}
                {i < steps.length - 1 && (
                  <>
                    <motion.div 
                      variants={lineVariants}
                      custom={i}
                      className="hidden md:block absolute top-[4.5rem] left-1/2 w-full h-[2px] bg-gradient-to-r from-navy to-navy-light origin-left z-0"
                    ></motion.div>
                    <motion.div 
                      variants={lineVariants}
                      custom={i}
                      className="md:hidden absolute left-1/2 top-32 w-[2px] h-[calc(100%+1rem)] bg-gradient-to-b from-navy to-navy-light origin-top -translate-x-1/2 z-0"
                    ></motion.div>
                  </>
                )}

                {/* Premium Glass Circle */}
                <motion.div 
                  variants={circleVariants}
                  custom={i}
                  className="w-32 h-32 md:w-36 md:h-36 mx-auto bg-white rounded-full border flex flex-col items-center justify-center mb-10 relative z-20"
                >
                  <motion.span 
                    variants={numVariants}
                    custom={i}
                    className="text-4xl md:text-5xl font-bebas tracking-widest relative z-10"
                  >
                    {step.num}
                  </motion.span>
                  
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-full bg-navy-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(43,76,126,0.3)]" />
                </motion.div>

                <motion.div variants={textVariants} custom={i}>
                  <h3 className="text-2xl font-bebas mb-4 uppercase text-navy tracking-wider group-hover:text-navy transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-navy/60 group-hover:text-navy/90 font-sans text-sm md:text-base max-w-[16rem] mx-auto text-left md:text-center leading-relaxed transition-colors duration-500">
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



