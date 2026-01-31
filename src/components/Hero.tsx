import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight, Calendar, TrendingUp, Mail } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- ENHANCED HERO WITH SIDEBAR CARDS & PREMIUM ANIMATIONS ---
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

  // Cursor tracking for background & magnetic button
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

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: custom * 0.2
      }
    })
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black text-white font-sans selection:bg-[#22C55E] selection:text-white"
    >
      {/* 1. Cursor-Reactive Background */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large cursor-following purple hue */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-600/40 via-fuchsia-600/30 to-pink-600/40 blur-[150px]"
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

      {/* 2. Glassmorphic Sidebar Cards - Left Side */}
      <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
        <div className="group relative px-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-default">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-500/20">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">שיחה נקבעה</div>
              <div className="text-xs text-gray-400">לפני 2 דקות</div>
            </div>
          </div>
        </div>

        <div className="group relative px-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-default">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-500/20">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">+150% תנועה</div>
              <div className="text-xs text-gray-400">השבוע</div>
            </div>
          </div>
        </div>

        <div className="group relative px-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-default">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">ליד חדש התקבל</div>
              <div className="text-xs text-gray-400">עכשיו</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Layout - Single Column Centered */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col items-center justify-center gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* Content & Typography (Hebrew) - Stagger Animation */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center w-full max-w-4xl relative z-20 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Panel */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/30 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400 animate-pulse"></div>
              <span className="text-sm font-bold tracking-wider bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                OREN SHAMIR
              </span>
            </div>
          </motion.div>

          {/* Headlines - Premium Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-10 relative"
            style={{ fontFamily: 'Rubik, Assistant, system-ui, -apple-system, sans-serif' }}
          >
            <span className="block text-white drop-shadow-2xl mb-3">לא עוד סתם</span>
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
                דף נחיתה
              </span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-3xl text-gray-200 font-medium leading-relaxed max-w-3xl mb-14"
            dir="rtl"
          >
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר{' '}
            <span className="relative inline-block" style={{ fontSize: '1.4em' }}>
              <span className="absolute inset-0 bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 bg-clip-text text-transparent blur-sm animate-pulse opacity-70"></span>
              <span className="relative font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                כסף
              </span>
            </span>
            .
          </motion.p>

          {/* CTA Button - Magnetic Effect */}
          <motion.button
            ref={buttonRef}
            variants={itemVariants}
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
