import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Rocket, TrendingUp } from 'lucide-react';
import orenImage from '../assets/oren-portrait-new.jpg'; // Ensure this path is correct based on About.tsx usage or similar

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden text-white will-change-transform transform-gpu bg-[#050505]"
    >
      {/* Aurora Mesh Gradient Background (Original) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] md:top-[-20%] md:right-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-purple-600/40 md:bg-purple-900/30 blur-[80px] md:blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] md:bottom-[-20%] md:left-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-pink-600/40 md:bg-pink-900/20 blur-[80px] md:blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-[20%] left-[10%] w-[60vw] h-[60vw] md:top-[20%] md:left-[20%] md:w-[60vw] md:h-[60vw] rounded-full bg-blue-600/30 md:bg-blue-900/20 blur-[80px] md:blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 pt-[100px] pb-12 flex flex-col justify-center min-h-[90vh]">

        {/* 2-Column Desktop Layout / Stacked Mobile */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">

          {/* LEFT COLUMN: Text Content */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="flex flex-col items-center md:items-start text-center md:text-right w-full md:w-1/2"
          >
            {/* Pill: Start Today */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
              <span className="text-sm font-medium text-white/90">התחילו היום</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-black leading-[1.1] tracking-[-0.02em] font-[Heebo] mb-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                לא עוד סתם
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 pb-2"
              >
                דף נחיתה
              </motion.div>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-zinc-300 max-w-lg leading-relaxed font-light mb-8 md:mb-0"
            >
              האתר שלכם צריך לעשות את העבודה. אני בונה דפים שנראים טוב ורצים מהר שפשוט מביאים לכם פניות מלקוחות חדשים
            </motion.p>
          </motion.div>

          {/* RIGHT COLUMN: Glass Growth Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full md:w-auto flex justify-center md:justify-end relative"
          >
            {/* The Floating Glass Card */}
            <div className="animate-float relative w-[280px] md:w-[320px] aspect-[4/5] rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center p-8 group overflow-hidden">
              {/* Glossy Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />

              {/* Icon Container with Neon Glow */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/30 blur-[40px] rounded-full" />
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <Rocket className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] -rotate-45" strokeWidth={1.5} />
                  <TrendingUp className="absolute bottom-0 right-0 w-10 h-10 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" strokeWidth={2} />
                </div>
              </div>

              {/* Card Text */}
              <h3 className="text-3xl font-bold text-white mb-2 text-center drop-shadow-lg">צמיחה עסקית</h3>
              <p className="text-white/60 text-lg font-medium tracking-wide">עוד לידים</p>

              {/* Card Border Glow on Hover */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
            </div>
          </motion.div>

        </div>

        {/* BOTTOM SECTION: CTA & Profile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center mt-16 md:mt-24 gap-8"
        >
          {/* Main CTA Button */}
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-xl tracking-tight transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full md:w-auto max-w-md"
          >
            <span>רוצה אתר כזה?</span>
            <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </a>

          {/* Profile Section */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-default">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              {/* If image missing, fallback to gray div */}
              <img src={orenImage} alt="Oren" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.style.backgroundColor = '#333' }} />
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-sm leading-tight">דברו איתי בוואטסאפ</p>
              <p className="text-zinc-400 text-xs text-right">זמין לפרויקטים חדשים</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowLeft size={14} />
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Hero;