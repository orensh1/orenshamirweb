import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';
import Button from './ui/Button';

// --- PREMIUM OPTIMIZED HERO WITH NOISE & MOBILE PERFORMANCE ---
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Optimized cursor tracking - Disabled on mobile for performance
  useEffect(() => {
    // Check if device is mobile/touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (cursorGlowRef.current) {
          cursorGlowRef.current.style.left = `${e.clientX}px`;
          cursorGlowRef.current.style.top = `${e.clientY}px`;
        }
      });

      // Magnetic button effect - Desktop only
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distanceX = e.clientX - buttonCenterX;
        const distanceY = e.clientY - buttonCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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

  // Hebrew floating words
  const hebrewWords = [
    { text: 'המרה', delay: 0 },
    { text: 'לקוחות', delay: 0.3 },
    { text: 'שיווק', delay: 0.6 },
    { text: 'דיגיטל', delay: 0.9 },
    { text: 'תוצאות', delay: 1.2 },
    { text: 'הצלחה', delay: 1.5 }
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black text-white selection:bg-[#22C55E] selection:text-white"
      style={{ fontFamily: 'Rubik, Assistant, system-ui, -apple-system, sans-serif' }}
    >
      {/* 1. Background Elements */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Cursor Glow - Desktop Only */}
        <div
          ref={cursorGlowRef}
          className="hidden md:block absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-[150px] will-change-transform"
          style={{
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />

        {/* Mobile Static Glow - Center bloom for mobile */}
        <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-purple-600/20 blur-[80px]" />

        {/* Subtle base blobs */}
        <div className="absolute top-[-10%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[100px] animate-blob will-change-transform" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[100px] animate-blob animation-delay-2000 will-change-transform" />
      </div>

      {/* 2. Hebrew Background Animation */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        {hebrewWords.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.08, 0.08, 0],
              y: [100, -20, -20, -150],
              x: [0, Math.sin(i) * 50, 0]
            }}
            transition={{
              duration: 12,
              delay: word.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-7xl md:text-9xl font-black text-white/5 whitespace-nowrap will-change-transform"
            style={{
              left: `${10 + (i * 15)}%`,
              top: '50%'
            }}
          >
            {word.text}
          </motion.div>
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
          {/* Top Panel */}
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

          {/* Headlines - Text Balance for Mobile */}
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

          {/* Subtext - Optimized Line Height */}
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

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            ref={buttonRef}
            style={{
              transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`
            }}
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
