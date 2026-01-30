
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

          {/* LEFT COLUMN: DesignJoy Card (Specific HTML Structure) */}
          <motion.div
            style={{ y: yText, opacity: opacityText }}
            className="w-full md:w-1/2 flex justify-center md:justify-start order-1"
          >
            <div className="hero__member-card" style={{ position: 'relative', width: '100%', height: '600px', borderRadius: '24px', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              {/* 1. Background Gradient */}
              <div style={{ position: 'absolute', inset: '0', background: 'radial-gradient(circle at 10% 20%, rgb(255, 13, 255) 0%, rgb(0, 153, 255) 90%)', zIndex: '1', borderRadius: '24px' }}></div>

              {/* 2. Glass Splash Card */}
              <div className="hero__member-card-splash" style={{ position: 'relative', zIndex: '10', width: '85%', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '40px', textAlign: 'right', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>

                <div style={{ background: '#000', color: '#fff', padding: '8px 16px', borderRadius: '50px', display: 'inline-block', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                  🟢 התחילו היום
                </div>

                <h1 style={{ color: '#fff', fontSize: '48px', lineHeight: '1.1', marginBottom: '10px', fontWeight: '800' }}>
                  לא עוד סתם<br /><span style={{ color: '#ffbdf7' }}>דף נחיתה</span>
                </h1>

                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '30px' }}>
                  האתר שלכם צריך לעשות עבודה. אני בונה דפים שנראים טוב ומביאים לידים.
                </p>

                <a href="#contact" style={{ display: 'block', width: '100%', background: '#fff', color: '#000', textAlign: 'center', padding: '18px', borderRadius: '12px', fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', transition: 'transform 0.2s' }}>
                  רוצה אתר כזה?
                </a>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', gap: '12px' }}>
                  <div style={{ textAlign: 'left', color: '#fff' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>דברו איתי בוואטסאפ</div>
                    <div style={{ fontSize: '13px', opacity: '0.8' }}>זמין לפרויקטים</div>
                  </div>
                  <div style={{ width: '42px', height: '42px', background: '#333', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', backgroundImage: `url(${orenImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
              </div>

              {/* 3. Floating Rocket Mockup */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/3214/3214746.png"
                className="hero__member-card-mockup"
                alt="Rocket"
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  width: '180px',
                  zIndex: '20',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))',
                  transform: 'translate3d(0px, -10px, 0px) rotateZ(-10deg)',
                  animation: 'float 6s ease-in-out infinite'
                }}
              />
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