import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../content/SiteContentContext';
import orenSmilingImage from '../assets/oren-portrait-smiling.png';

const About: React.FC = () => {
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="py-24 md:py-40 relative overflow-hidden bg-white min-h-screen border-t border-gray-100" dir="rtl">
      {/* Continuous Marquee Text */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
        className="absolute top-1/4 left-0 whitespace-nowrap opacity-[0.03] select-none pointer-events-none flex gap-10 w-max z-1"
        style={{ position: 'absolute', zIndex: 1 }}
      >
        <span className="text-[15vw] font-black uppercase text-gray-900">{about.marqueeText}</span>
        <span className="text-[15vw] font-black uppercase text-gray-900">{about.marqueeText}</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gray-900">{about.headingLine1}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              {about.headingName}
            </span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Smiling Photo Column (Sticky on desktop, top on mobile) */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full flex justify-center lg:sticky lg:top-36 z-20 mb-12 lg:mb-0"
          >
            <div className="relative w-full max-w-[320px] md:max-w-[360px] lg:max-w-[400px] aspect-[4/5] flex items-end justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-orange-50/50 to-amber-50/30 border border-orange-100/60 shadow-xl">
              {/* Background ambient glow inside container */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-400/20 rounded-full blur-[60px] z-0 pointer-events-none" />
              <img 
                src={orenSmilingImage} 
                alt="אורן שמיר" 
                className="w-full h-auto object-contain relative z-10 scale-[1.12] origin-bottom -translate-y-[3%] drop-shadow-[0_15px_35px_rgba(0,0,0,0.1)]"
              />
            </div>
          </motion.div>

          {/* Story Column */}
          <div className="lg:col-span-7 space-y-20 md:space-y-32">
            {about.storyBlocks?.map((block, i) => {
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col md:flex-row items-start gap-6 md:gap-10"
                >
                  <div className="flex-shrink-0 relative select-none">
                    <span className="text-6xl md:text-8xl font-black text-orange-100/60 leading-none font-heebo">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex-1 pt-2 md:pt-4">
                    <p 
                      className="text-lg md:text-2xl text-gray-700 font-light leading-relaxed md:leading-[1.8]"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;