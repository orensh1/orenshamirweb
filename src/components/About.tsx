import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSiteContent } from '../content/SiteContentContext';



const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-10%"]);
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-white min-h-screen border-t border-gray-100">
      {/* Continuous Marquee Text */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
        className="absolute top-1/3 md:top-1/2 -translate-y-1/2 left-0 whitespace-nowrap opacity-[0.15] md:opacity-[0.03] select-none pointer-events-none flex gap-10 w-max z-1"
        style={{ position: 'absolute', zIndex: 1 }}
      >
        <span className="text-[10vw] md:text-[20vw] font-black uppercase text-gray-900">{about.marqueeText}</span>
        <span className="text-[10vw] md:text-[20vw] font-black uppercase text-gray-900">{about.marqueeText}</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-3xl text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
            <span className="text-gray-900">{about.headingLine1}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              {about.headingName}
            </span>
          </h2>
          
          <div className="space-y-8 text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.15), duration: 0.8 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;