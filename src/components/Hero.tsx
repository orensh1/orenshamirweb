import React, { useRef } from 'react';
// v36 - Original Solar Orbit (Restored & Clean)
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { LayoutTemplate, Zap, BarChart3, Palette, ArrowUpRight } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- ORBIT NODE COMPONENT ---
const OrbitNodeInline = ({ icon, label, desc, styleClass, parentSpeed }: any) => {
  // Determine counter-rotation animation based on parent
  const duration = parentSpeed === 'cw' ? '40s' : parentSpeed === 'mid' ? '30s' : '20s';
  const direction = parentSpeed === 'cw' || parentSpeed === 'fast' ? 'orbitRotateCCW' : 'orbitRotate';

  return (
    <div
      className={`absolute flex flex-col items-center gap-2 z-20 group/node ${styleClass}`}
      style={{
        animation: `${direction} ${duration} linear infinite`
      }}
    >
      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/node:scale-125 group-hover/node:bg-white/20 group-hover/node:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer relative">
        {icon}

        {/* TOOLTIP */}
        <div className="absolute top-full mt-4 w-48 p-3 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col gap-1 text-center scale-95 group-hover/node:scale-100 origin-top shadow-2xl">
          <div className="text-white font-bold text-sm border-b border-white/10 pb-1 mb-1">{label}</div>
          <div className="text-gray-300 text-xs leading-relaxed" dir="rtl">{desc}</div>
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs text-white whitespace-nowrap opacity-100 group-hover/node:opacity-0 transition-opacity">
        {label}
      </div>
    </div>
  )
};

// --- MAIN HERO COMPONENT ---
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
        {/* Restored Aurora Blobs */}
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] rounded-full bg-purple-600/20 blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-pink-600/20 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
      </div>

      {/* 2. Main Layout - 2 Columns */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-12 pt-[120px] pb-16 md:py-24 min-h-[90vh]">



        {/* RIGHT COLUMN: Content & Typography (Hebrew)
            Order: 1 on Mobile (Top), 2 on Desktop (Right).
        */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center md:items-end w-full md:w-1/2 relative z-20 order-1 md:order-2 text-center md:text-right"
        >
          {/* Top Tag - Clean "Oren Shamir" */}
          <div className="mb-8 flex items-center gap-3 opacity-60">
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
          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-lg mb-12" dir="rtl">
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר <span className="font-bold text-[#22C55E]">כסף</span>.
          </p>

          {/* CTA Button - Black Pill */}
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
