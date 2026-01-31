import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- ENHANCED HERO WITH MAGNETIC BUTTON ---
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Cursor tracking for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Magnetic button effect
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - buttonCenterX;
        const distanceY = e.clientY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Magnetic effect within 150px radius
        if (distance < 150) {
          const strength = (150 - distance) / 150;
          setButtonOffset({
            x: distanceX * strength * 0.3,
            y: distanceY * strength * 0.3
          });
        } else {
          setButtonOffset({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    smoothScrollTo('contact', 1000);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black text-white font-sans selection:bg-[#22C55E] selection:text-white"
    >
      {/* 1. Cursor-Reactive Background - Enhanced */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large cursor-following purple hue */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-600/40 via-fuchsia-600/30 to-pink-600/40 blur-[150px] transition-all duration-200 ease-out"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Subtle base blobs */}
        <div className="absolute top-[-10%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-pink-600/10 blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* 2. Main Layout - Single Column Centered */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* Content & Typography (Hebrew) - Enhanced */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-4xl relative z-20 text-center"
        >
          {/* Top Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/30 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 animate-pulse"></div>
              <span className="text-sm font-bold tracking-wider bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                OREN SHAMIR
              </span>
            </div>
          </motion.div>

          {/* Headlines - Bolder and More Dominant */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-10 relative"
          >
            <span className="block text-white drop-shadow-2xl mb-3">נעים להכיר,</span>
            <span className="block relative">
              {/* Enhanced glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-fuchsia-400 via-pink-400 to-rose-400 bg-clip-text text-transparent blur-md opacity-60"></span>
              <span
                className="relative animate-gradient bg-[length:200%_auto]"
                style={{
                  background: '-webkit-linear-gradient(45deg, #ff007f, #a200ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                אורן שמיר.
              </span>
            </span>
          </motion.h1>

          {/* Subtext - Bolder */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-3xl mb-14"
            dir="rtl"
          >
            אני בונה דפי נחיתה שממירים גולשים ללקוחות ועוזרים לך להכניס יותר{' '}
            <span className="font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              כסף
            </span>
            .
          </motion.p>

          {/* CTA Button - Magnetic Effect */}
          <motion.button
            ref={buttonRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={scrollToContact}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-white text-black rounded-full font-black text-xl flex items-center gap-3 shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:shadow-[0_0_100px_rgba(168,85,247,0.5)] transition-all duration-300"
            style={{
              transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`
            }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>

            <span>אני רוצה אתר כזה</span>
            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-[-3px] group-hover:translate-y-[-3px] transition-transform" />
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
