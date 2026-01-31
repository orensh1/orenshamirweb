import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import Button from './ui/Button';
import { WavyBackground } from './ui/wavy-background';

// --- Wavy HERO COMPONENT (v53) ---
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Removed "Success Cards" as requested

  return (
    <div ref={containerRef} className="relative bg-black h-screen overflow-hidden">
      <WavyBackground
        className="max-w-4xl mx-auto pb-40 flex flex-col items-center justify-center text-center px-4"
        containerClassName="h-screen"
        colors={['#3B82F6', '#06B6D4', '#22C55E', '#A855F7', '#EC4899']}
        waveWidth={50}
        blur={10}
      >

        <motion.div
          style={{ y: yText, opacity: opacityText }}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="w-full flex flex-col items-center"
        >
          {/* Top Panel - Glassmorphic */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black"></div>
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black"></div>
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider text-white/90 pr-2">
                OREN SHAMIR <span className="text-white/40 font-normal mx-1">|</span> V53
              </span>
            </div>
          </motion.div>

          {/* Headline: "לא עוד סתם דף נחיתה" (Preserved) */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] md:leading-[0.9] tracking-tighter mb-8 relative text-balance text-white drop-shadow-2xl"
            dir="rtl"
          >
            לא עוד סתם{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              דף נחיתה
            </span>
          </motion.h1>

          {/* Subtext: High conversion & Money */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-3xl text-gray-300 font-medium leading-relaxed max-w-3xl mb-12 px-4"
            dir="rtl"
          >
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר{' '}
            <span className="relative inline-block whitespace-nowrap" style={{ fontSize: '1.4em' }}>
              <span className="relative font-black text-[#22C55E] drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                כסף
              </span>
            </span>
            .
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 w-full flex justify-center"
          >
            <Button
              variant="primary"
              onClick={scrollToContact}
              className="!text-lg md:!text-xl !px-10 !py-4 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 w-[90%] md:w-auto rounded-full"
            >
              אני רוצה אתר כזה
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </motion.div>

        </motion.div>

      </WavyBackground>
    </div>
  );
};

export default Hero;
