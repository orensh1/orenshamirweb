
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import orenImage from '../assets/oren-portrait-new.jpg'; // Ensure this path is correct based on About.tsx usage or similar
import heroPoster from '../assets/hero-poster.png';

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
      {/* Aurora Background (Global) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <div className="absolute top-[-10%] -right-[20%] w-[80vw] h-[80vw] md:top-[-20%] md:right-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-purple-600/30 md:bg-purple-900/20 blur-[80px] md:blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] -left-[20%] w-[80vw] h-[80vw] md:bottom-[-20%] md:left-[-10%] md:w-[80vw] md:h-[80vw] rounded-full bg-pink-600/30 md:bg-pink-900/10 blur-[80px] md:blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 pt-[100px] pb-12 flex flex-col justify-center min-h-[90vh]">

        {/* Desktop: 2-Column Layout (Left: Visual, Right: Text) */}
        {/* Mobile: Vertical Stack (Text -> Visual -> CTA) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">

          {/* RIGHT COLUMN (Desktop) / TOP (Mobile): Text Content */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="flex flex-col items-center md:items-start text-center md:text-right w-full md:w-1/2 order-1 md:order-2"
          >
            {/* Pill: Start Today */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full mb-8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]"></span>
              <span className="text-sm font-bold text-white tracking-wide">התחילו היום</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6.5rem] font-black leading-[1.1] tracking-[-0.03em] font-[Heebo] mb-6">
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
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] to-[#7928CA] pb-3"
              >
                דף נחיתה
              </motion.div>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-300 max-w-lg leading-relaxed font-light mb-8 md:mb-12"
            >
              האתר שלכם צריך לעשות את העבודה. אני בונה דפים שנראים טוב ורצים מהר שפשוט מביאים לכם פניות מלקוחות חדשים
            </motion.p>

            {/* Desktop CTA & Profile */}
            <div className="hidden md:flex flex-col items-start gap-8 w-full">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-extrabold text-xl tracking-tight transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] min-w-[280px]"
              >
                <span>רוצה אתר כזה?</span>
                <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
              </a>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-colors">
                  <img src={orenImage} alt="Oren" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.style.backgroundColor = '#333' }} />
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-base leading-tight">דברו איתי בוואטסאפ</p>
                  <p className="text-zinc-400 text-sm">זמין לפרויקטים חדשים</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:-translate-x-1">
                  <ArrowLeft size={16} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* LEFT COLUMN (Desktop) / MIDDLE (Mobile): Visual "Poster" */}
          {/* LEFT COLUMN: Visual "Poster" Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center md:justify-end relative order-2 md:order-1"
          >
            <div
              className="relative w-full max-w-[420px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden"
              style={{
                backgroundImage: `url(${heroPoster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </motion.div>

        </div>

        {/* MOBILE ONLY: CTA & Profile (Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="md:hidden flex flex-col items-center mt-12 gap-6 order-3"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-xl tracking-tight transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full"
          >
            <span>רוצה אתר כזה?</span>
            <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </a>

          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img src={orenImage} alt="Oren" className="w-full h-full object-cover" />
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