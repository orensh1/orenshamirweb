import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../content/SiteContentContext';

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

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-32"
        >
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gray-900">{about.headingLine1}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              {about.headingName}
            </span>
          </h2>
        </motion.div>
        
        <div className="space-y-32 md:space-y-48">
            {about.storyBlocks?.map((block, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
                >
                  <div className="w-full md:w-1/3 flex justify-center md:justify-start relative">
                    <div className="relative">
                      {/* Giant Number Watermark */}
                      <span className="text-[120px] md:text-[180px] font-black text-orange-50 leading-none absolute -top-10 -right-4 md:-top-16 md:-right-16 -z-10 select-none font-heebo">
                        0{i + 1}
                      </span>
                      <h3 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-sm mt-4 md:mt-0 relative z-10">
                        {block.title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <p 
                      className="text-xl md:text-3xl text-gray-600 font-light leading-relaxed md:leading-[1.8]"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default About;