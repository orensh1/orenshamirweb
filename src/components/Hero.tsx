
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Filter, Coins } from 'lucide-react';
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

          {/* LEFT COLUMN: DesignJoy Card (Text Content) */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="w-full md:w-1/2 flex justify-center md:justify-start order-1"
          >
            <div className="hero__member-card relative w-full max-w-[500px] rounded-[24px] overflow-hidden p-10 text-right" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              {/* Background */}
              <div className="card-background absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at 10% 20%, rgb(255, 13, 255) 0%, rgb(0, 153, 255) 90%)' }}></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-start h-full w-full">
                <div className="badge bg-black text-white px-4 py-2 rounded-full self-start text-sm mb-4 font-bold">
                  🟢 התחילו היום
                </div>
                <h2 className="text-[40px] leading-[1.1] text-white font-bold mb-4">
                  לא עוד סתם<br /><span style={{ color: '#ff00ff' }}>דף נחיתה</span>
                </h2>
                <p className="text-white/90 text-[18px] mb-8 font-medium">
                  האתר שלכם צריך לעשות עבודה. בונה דפים שמביאים פניות.
                </p>
                <a href="#contact" className="main-cta bg-white text-black border-none py-4 px-6 rounded-xl font-bold cursor-pointer w-full text-[18px] mb-6 text-center shadow-lg transition-transform hover:scale-[1.02] block">
                  רוצה אתר כזה?
                </a>
                <div className="profile-row flex items-center gap-3 mt-auto">
                  <div className="avatar w-10 h-10 bg-[#333] rounded-full bg-cover border border-white/20" style={{ backgroundImage: `url(${orenImage})` }}></div>
                  <div className="text-right text-white">
                    <div className="font-bold text-[14px]">דברו איתי בוואטסאפ</div>
                    <div className="text-[12px] opacity-80">זמין לפרויקטים חדשים</div>
                  </div>
                </div>
                {/* Floating Rocket */}
                <div className="absolute top-4 right-4 text-4xl animate-float opacity-80" style={{ animationDuration: '3s' }}>
                  🚀
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Visual "Poster" (Moved from Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center md:justify-end relative order-2"
          >
            {/* Poster Container with Background Image */}
            <div
              className="relative w-full max-w-[420px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col items-center p-6"
              style={{
                backgroundImage: `url(${heroPoster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* 1. Floating Glass Card */}
              <div className="animate-float mt-12 md:mt-16 w-full max-w-[280px] aspect-[3.5/5] rounded-[2rem] bg-white/[0.05] backdrop-blur-md border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-40 rounded-[2rem] pointer-events-none" />
                <div className="relative mb-6 w-24 h-24">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.8)]">
                    <Filter size={56} fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-0 right-2 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                    <Coins size={40} fill="currentColor" fillOpacity={0.2} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 leading-tight drop-shadow-md">יצירת לידים איכותיים</h3>
                <p className="text-white/60 text-base font-medium">הגדלת הכנסות</p>
              </div>
            </div>
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