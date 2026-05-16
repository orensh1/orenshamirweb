import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { useSiteContent } from '../content/SiteContentContext';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();
  const hero = content.hero;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    smoothScrollTo('contact', 1000);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-premium-stripes h-screen min-h-[800px] overflow-hidden flex flex-col items-center justify-center pt-24">
      {/* Spotlight Effect behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-orange-500/5 to-transparent pointer-events-none blur-3xl z-0" />

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="flex flex-col items-center w-full max-w-5xl mx-auto relative z-20 text-center px-4"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
      >
        {hero.badgeText && (
          <motion.div variants={itemVariants} className="mb-3">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 border border-orange-100 backdrop-blur-xl shadow-sm">
              <span className="text-sm font-black tracking-wide text-gray-800 drop-shadow-none">
                {hero.badgeText}
              </span>
            </div>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-black leading-[1] tracking-tighter mb-6 relative text-balance text-gray-900 z-10 font-heebo"
          dir="rtl"
        >
          <span className="block drop-shadow-none">
            {hero.headlineLine1}
          </span>
          <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm pb-2 text-7xl md:text-[140px]">
            {hero.headlineLine2}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-3xl text-gray-600 font-medium leading-relaxed max-w-3xl mb-12 px-4 drop-shadow-none font-heebo"
          dir="rtl"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="relative z-30 w-full flex justify-center mb-16"
        >
          <Magnetic>
            <div className="group relative">
              {/* Gradient Border Glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 opacity-20 blur-md group-hover:opacity-60 group-hover:blur-lg transition-all duration-500" />

              <Button
                variant="primary"
                onClick={scrollToContact}
                className="relative !text-base md:!text-2xl !px-10 md:!px-16 !py-4 md:!py-6 w-auto max-w-xs md:max-w-none rounded-full bg-orange-500 hover:bg-orange-600 text-white !font-heebo !font-extrabold !tracking-tighter border-2 border-orange-400 overflow-hidden shadow-lg transition-colors duration-300"
              >
                <span className="relative z-20 flex items-center justify-center gap-3" dangerouslySetInnerHTML={{ __html: hero.ctaText }}></span>
              </Button>
            </div>
          </Magnetic>
        </motion.div>

        {/* Placeholder Image Container */}
        <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl mx-auto h-[400px] mt-8 relative"
        >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 md:w-96 h-full flex items-end justify-center">
                <div className="w-full h-full bg-gradient-to-t from-orange-50/80 to-transparent rounded-t-full border border-orange-200 backdrop-blur-sm flex items-center justify-center text-orange-500 font-heebo font-bold p-8 text-center shadow-[0_0_30px_rgba(249,115,22,0.05)]">
                    [ Your Photo Here ]<br/>Send your photo later
                </div>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Hero;
