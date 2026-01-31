import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';
import Button from './ui/Button';

// --- ULTRA-LIGHTWEIGHT HERO (Static BG, No JS Tracking) ---
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Removed all cursor tracking logic for maximum FPS
  // No RAF loop, no mouse listeners

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContact = () => {
    smoothScrollTo('contact', 1000);
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
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

  // Hebrew words - Reduced count and simplified for performance
  const hebrewWords = [
    { text: 'המרה', top: '15%', left: '10%' },
    { text: 'לקוחות', top: '25%', left: '85%' },
    { text: 'שיווק', top: '65%', left: '15%' },
    { text: 'תוצאות', top: '75%', left: '80%' }
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black text-white selection:bg-[#22C55E] selection:text-white"
      style={{ fontFamily: 'Rubik, Assistant, system-ui, -apple-system, sans-serif' }}
    >
      {/* 1. Static Optimized Background */}
      {/* Use static gradients instead of heavy blurs/cursor tracking */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Main Static Glow - Replaces cursor tracking */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent blur-[120px] rounded-full opacity-60" />

        {/* Corner Accents - Static */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial-gradient from-blue-500/10 to-transparent blur-[100px] opacity-40 translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial-gradient from-pink-500/10 to-transparent blur-[100px] opacity-40 -translate-x-1/4 translate-y-1/4" />

      </div>

      {/* Success Stack - Keeping logic but ensuring it's not fighting for resources */}
      <div className="opacity-60">
        <SuccessStack />
      </div>

      {/* 2. Simplified Hebrew Background - Reduced animations */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none select-none">
        {hebrewWords.map((word, i) => (
          <div
            key={i}
            className="absolute text-6xl md:text-8xl font-black text-white/[0.03]"
            style={{
              top: word.top,
              left: word.left,
              transform: 'rotate(-5deg)'
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* 3. Main Layout */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center gap-8 md:gap-12 pt-[100px] pb-16 md:py-24 min-h-[90vh]">

        {/* Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-4xl relative z-20 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Panel - Static Glass */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black"></div>
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black"></div>
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider text-white/90 pr-2">
                OREN SHAMIR <span className="text-white/40 font-normal mx-1">|</span> V27
              </span>
            </div>
          </motion.div>

          {/* Headlines - Same Premium Look, Less CPU */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] md:leading-[0.9] tracking-tight mb-8 md:mb-10 relative text-balance"
          >
            <span className="block text-white drop-shadow-2xl mb-2 md:mb-3">לא עוד סתם</span>
            <span className="block relative">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent blur-md opacity-50"></span>
              <span
                className="relative animate-gradient bg-[length:200%_auto]"
                style={{
                  background: '-webkit-linear-gradient(45deg, #3B82F6, #A855F7, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                דף נחיתה
              </span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-3xl text-gray-300 font-medium leading-relaxed max-w-3xl mb-10 md:mb-14 px-4 text-balance"
            dir="rtl"
          >
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר{' '}
            <span className="relative inline-block whitespace-nowrap" style={{ fontSize: '1.4em' }}>
              <span className="absolute inset-0 bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 bg-clip-text text-transparent blur-sm animate-pulse opacity-70"></span>
              <span className="relative font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                כסף
              </span>
            </span>
            .
          </motion.p>

          {/* CTA Button - No Magnetic Wrapper (JS Free) */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 w-full flex justify-center"
          >
            <Button
              variant="primary"
              onClick={scrollToContact}
              className="!text-lg md:!text-xl !px-8 md:!px-10 !py-4 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 w-[90%] md:w-auto"
            >
              אני רוצה אתר כזה
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
