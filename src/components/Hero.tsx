import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- CLEAN APPLE-STYLE HERO COMPONENT ---
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#050505] text-white font-sans selection:bg-[#22C55E] selection:text-white"
    >
      {/* 1. Global Background */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Aurora Blobs */}
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-purple-600/20 blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-pink-600/20 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
      </div>

      {/* 2. Main Layout - Single Column Centered */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* Content & Typography (Hebrew) - Clean Apple Style */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-4xl relative z-20 text-center"
        >
          {/* Top Tag - Clean "Oren Shamir" */}
          <div className="mb-8 flex items-center gap-3 opacity-60">
            <div className="h-[1px] w-8 bg-white/40"></div>
            <span className="text-[11px] tracking-[0.25em] font-bold uppercase text-white/80">OREN SHAMIR</span>
            <div className="h-[1px] w-8 bg-white/40"></div>
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.95] tracking-tight text-white mb-8 drop-shadow-2xl">
            <span className="block">לא עוד סתם</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-400">
              דף נחיתה
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mb-12" dir="rtl">
            אני בונה דפי נחיתה שממירים גולשים ללקוחות ועוזרים לך להכניס יותר <span className="font-bold text-[#22C55E]">כסף</span>.
          </p>

          {/* CTA Button - White Pill */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-shadow"
          >
            <span>אני רוצה אתר כזה</span>
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
