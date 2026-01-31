import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import Button from './ui/Button';
import { WavyBackground } from './ui/wavy-background';
import Magnetic from './ui/Magnetic';

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
        colors={['#3B82F6', '#06B6D4', '#A855F7', '#EC4899']}
        waveWidth={50}
        blur={10}
      >
        {/* Spotlight Effect behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-white/10 to-transparent pointer-events-none blur-3xl z-0" />

        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-4xl mx-auto relative z-20 text-center"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.2),inset_0_0_10px_rgba(255,255,255,0.05)]">
              <span className="text-sm font-black tracking-wide text-white/90 drop-shadow-md">
                אורן שמיר | בונה דפי נחיתה מקצועיים
              </span>
            </div>
          </motion.div>

          {/* Headline: "לא עוד סתם דף נחיתה" (Preserved & Enhanced) */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-10 relative text-balance text-white z-10"
            dir="rtl"
          >
            <span className="block drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              לא עוד סתם
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] pb-2">
              דף נחיתה
            </span>
          </motion.h1>

          {/* Subtext: Depth & Glow */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-3xl mb-14 px-4 drop-shadow-md"
            dir="rtl"
          >
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר{' '}
            <span className="relative inline-block whitespace-nowrap align-middle">
              <span className="absolute inset-0 bg-green-500/30 blur-xl rounded-full"></span>
              <span className="relative font-black text-[#4ADE80] drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] text-[1.1em]">
                כסף
              </span>
            </span>
            .
          </motion.p>

          {/* CTA Button: Magnetic, Glowing, Themed */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 w-full flex justify-center"
          >
            <Magnetic>
              <div className="group relative">
                {/* Gradient Border Glow */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

                <Button
                  variant="primary"
                  onClick={scrollToContact}
                  className="relative !text-xl md:!text-2xl !px-12 !py-5 w-[90%] md:w-auto rounded-full bg-white text-black !font-['Rubik'] !font-extrabold !tracking-tighter border border-white/10 overflow-hidden"
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/5 to-transparent z-10 pointer-events-none" />

                  <span className="relative z-20 flex items-center justify-center gap-3">
                    אני רוצה אתר כזה
                  </span>
                </Button>
              </div>
            </Magnetic>
          </motion.div>

        </motion.div>

      </WavyBackground>
    </div>
  );
};

export default Hero;
