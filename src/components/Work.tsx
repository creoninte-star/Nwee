"use client";

import { motion, Variants } from "framer-motion";

const projects = [
  { id: 1, title: "Nexus Rebrand", category: "Brand Identity", img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80", height: "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]" },
  { id: 2, title: "Aflah & Nihana Wedding", category: "Web Development", img: "/images/wedding_invitation_thumb.png", height: "md:col-span-1 md:row-span-1 h-[300px]", link: "https://wedding-invitation-aflah-nihana.vercel.app" },
  { id: 3, title: "Rafeel & Rizwan Wedding", category: "Web Development", img: "/images/wedding_invitation_thumb.png", height: "md:col-span-1 md:row-span-1 h-[300px]", link: "https://wedding-invitation-rafeel-rizwan.vercel.app/" },
  { id: 4, title: "Velocity Campaign", category: "Video Editing", img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80", height: "md:col-span-1 md:row-span-2 h-[450px] md:h-full" },
  { id: 5, title: "Echo Festival", category: "Brand Identity", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80", height: "md:col-span-2 md:row-span-1 h-[350px]" },
  { id: 6, title: "Noir Social Campaign", category: "Ad & Social Branding", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80", height: "md:col-span-1 md:row-span-1 h-[350px]" },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }
  })
};

export default function Work() {
  return (
    <section id="work" className="py-32 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <div>
            <div className="overflow-hidden">
              <motion.h2
                variants={{ hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } } }}
                className="text-5xl md:text-7xl font-display font-black tracking-tight text-text mb-6 uppercase"
              >
                Selected Work
              </motion.h2>
            </div>
            <motion.div
              variants={{ hidden: { width: 0 }, visible: { width: 64, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } } }}
              className="h-[2px] bg-gold"
            />
          </div>
          <motion.a
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
            href="#"
            className="uppercase tracking-[0.2em] text-sm font-sans text-gold hover:text-teal transition-colors border-b border-gold hover:border-teal pb-1"
          >
            View Archive
          </motion.a>
        </motion.div>

        {/* CSS Grid Masonry approximation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(0,1fr)]">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id} 
              className={`relative overflow-hidden group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-gold/30 transition-all duration-500 shadow-2xl ${project.height}`}
              onClick={() => project.link && window.open(project.link, "_blank")}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Image Base */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                style={{ backgroundImage: `url(${project.img})` }}
              ></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>
              {/* Gold glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="text-gold text-xs font-sans uppercase tracking-[0.2em] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.category}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


