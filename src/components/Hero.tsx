import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import Button from './ui/Button';
import Magnetic from './ui/Magnetic';
import { useSiteContent } from '../content/SiteContentContext';
import orenImage from '../assets/oren-portrait-transparent.png';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();
  const hero = content.hero;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const scrollToContact = () => {
    smoothScrollTo('contact', 1000);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-premium-stripes min-h-screen overflow-hidden flex flex-col items-center justify-center pt-32 pb-20">
      {/* Spotlight Effect behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-orange-500/5 to-transparent pointer-events-none blur-3xl z-0" />

      <motion.div
        style={{ y: yText }}
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
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-2 relative text-balance text-gray-900 z-10 font-heebo"
          dir="rtl"
        >
          <span className="block drop-shadow-none">
            {hero.headlineLine1}
          </span>
          <span className="block bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm pb-1 text-5xl md:text-7xl lg:text-8xl">
            {hero.headlineLine2}
          </span>
        </motion.h1>

        {/* Image Container (Middle) */}
        <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl mx-auto relative mt-2 mb-8 z-20 flex justify-center"
        >
            <div className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl">
                <img 
                    src={orenImage} 
                    alt="Oren Shamir" 
                    className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                />
                {/* Background decorative glow for image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-orange-400/20 rounded-full blur-[80px] z-0 pointer-events-none" />
            </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-3xl text-gray-600 font-medium leading-relaxed max-w-3xl mb-12 px-4 drop-shadow-none font-heebo relative z-30"
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
                className="relative !text-base md:!text-2xl !px-10 md:!px-16 !py-4 md:!py-6 w-auto max-w-xs md:max-w-none rounded-full !font-heebo !font-extrabold !tracking-tighter border-2 border-orange-400 overflow-hidden shadow-lg transition-colors duration-300"
              >
                <span className="relative z-20 flex items-center justify-center gap-3" dangerouslySetInnerHTML={{ __html: hero.ctaText }}></span>
              </Button>
            </div>
          </Magnetic>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Hero;
