import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- ENHANCED HERO COMPONENT ---
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
      {/* 1. Enhanced Background */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Aurora Blobs - More Vibrant */}
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-500/20 to-violet-600/25 blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-pink-500/30 via-rose-500/20 to-orange-500/25 blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      {/* 2. Main Layout - Single Column Centered */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* Content & Typography (Hebrew) - Enhanced */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-4xl relative z-20 text-center"
        >
          {/* Top Tag - Animated with Sparkle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-purple-400 to-fuchsia-400"></div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20">
              <Sparkles className="w-3 h-3 text-fuchsia-400" />
              <span className="text-[10px] tracking-[0.2em] font-bold uppercase bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">OREN SHAMIR</span>
            </div>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-purple-400 to-fuchsia-400"></div>
          </motion.div>

          {/* Headlines - Multi-layered Animated Gradient */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[7.5rem] font-black leading-[0.9] tracking-tight mb-8 relative"
          >
            <span className="block text-white drop-shadow-2xl">לא עוד סתם</span>
            <span className="block relative">
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse"></span>
              <span className="relative bg-gradient-to-r from-purple-400 via-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                דף נחיתה
              </span>
            </span>
          </motion.h1>

          {/* Subtext - Animated Entry */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl mb-12"
            dir="rtl"
          >
            אני בונה דפי נחיתה שממירים גולשים ללקוחות ועוזרים לך להכניס יותר{' '}
            <span className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              כסף
            </span>
            .
          </motion.p>

          {/* CTA Button - Enhanced with Gradient Border */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={scrollToContact}
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] transition-all duration-300"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10"></div>

            <span>אני רוצה אתר כזה</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
