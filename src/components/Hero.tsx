import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight } from 'lucide-react';
import Button from './ui/Button';

// --- LOGO MARQUEE COMPONENT ---
const LogoMarquee: React.FC = () => {
  const logos = [
    {
      name: 'WordPress',
      path: 'M12.042 0C5.405 0 0 5.404 0 12.042c0 6.638 5.404 12.042 12.042 12.042 6.639 0 12.042-5.404 12.042-12.042C24.084 5.404 18.681 0 12.042 0zM12 21.95a9.88 9.88 0 0 1-3.696-1.042l3.41-9.456.03-.105c.801-2.43 1.258-3.058 1.258-3.058.118-.314.237-.471.237-.471.21-.4.079-.76-.341-.76-.551 0-1.835.078-1.835.078s-1.31-.078-1.808-.078c-.42 0-.551.367-.34.787 0 0 .104.183.209.471 0 0 .472.63 .97 1.86l-3.328 9.94a9.92 9.92 0 0 1-2.149-6.938c0-3.606 1.966-6.793 4.915-8.547l-4.104 12.193a9.866 9.866 0 0 1-.41-2.834c0-2.454.89-4.823 2.516-6.685L3.92 14.852a9.932 9.932 0 0 1-.225-2.06c0-1.888.524-3.649 1.432-5.184.053-.086.084-.189.131-.283.089-.168.173-.346.283-.497a9.907 9.907 0 0 1 2.855-2.673c-.027.089-.04.184-.04.283 0 .734.551 1.704 1.704 1.704.89 0 1.572-.68 1.572-1.992 0-1.074-.524-1.939-1.022-2.779a9.914 9.914 0 0 1 3.511-.63 9.866 9.866 0 0 1 4.507 1.09c-.569.96-.949 2.073-1.082 2.624-.34 1.337-1.442 5.031-1.442 5.031l-2.071 6.885 2.502-8.327c.472-1.258.944-1.861.944-1.861.105-.289.21-.472.21-.472.209-.42.068-.787-.352-.787-.493 0-1.803.078-1.803.078s-1.311-.078-1.861-.078c-.42 0-.551.367-.341.787 0 0 .115.183.22.471 0 0 .446.603 1.154 2.387l1.782 5.084-2.83 8.351zm8.324-4.707c-1.121 0-1.213.978-1.213 1.678 0 .825.263 1.831.621 2.89l-2.037-6.248.02-.063c.494.042.546.711.051.753 0 0-.381.041-.804.062l2.543 7.57 1.543-4.661c.421-1.196.421-1.557.421-1.928 0-.588-.205-1.639-1.288-1.639z'
    },
    {
      name: 'Vercel',
      path: 'M24 22.525H0l12-21.05 12 21.05z'
    },
    {
      name: 'React',
      path: 'M12 0c-1.32 0-2.585.5-3.69 1.378-.602.48-1.168 1.04-1.688 1.658C5.068 1.68 3.56 0 1.82 0 .813 0 0 .813 0 1.82c0 1.738 1.68 3.248 3.036 4.802-.618.52-1.18 1.086-1.658 1.69C.5 9.414 0 10.68 0 12c0 1.32.5 2.585 1.378 3.69.48.602 1.04 1.168 1.658 1.688-1.356 1.554-3.036 3.064-3.036 4.802 0 1.007.813 1.82 1.82 1.82 1.74 0 3.248-1.68 4.802-3.036.52.618 1.086 1.18 1.69 1.658 1.104.878 2.37 1.378 3.69 1.378 1.32 0 2.585-.5 3.69-1.378.602-.48 1.168-1.04 1.688-1.658 1.554 1.356 3.064 3.036 4.802 3.036 1.007 0 1.82-.813 1.82-1.82 0-1.738-1.68-3.248-3.036-4.802.618-.52 1.18-1.086 1.658-1.69.878-1.104 1.378-2.37 1.378-3.69 0-1.32-.5-2.585-1.378-3.69-.48-.602-1.04-1.168-1.658-1.688 1.356-1.554 3.036-3.064 3.036-4.802 0-1.007-.813-1.82-1.82-1.82-1.74 0-3.248 1.68-4.802 3.036-.52-.618-1.086-1.18-1.69-1.658C14.585.5 13.32 0 12 0zm0 10.3c.94 0 1.7.76 1.7 1.7s-.76 1.7-1.7 1.7-1.7-.76-1.7-1.7.76-1.7 1.7-1.7z'
    },
    {
      name: 'Wix',
      path: 'M11.75 3.75L9.62 13.5l-2.07-9.75H2.43L.28 17.5h4.2l.85-6.7 2.12 6.7h4.84l2.12-6.7.85 6.7h4.2L17.3 3.75h-5.55zM22.5 3.75c-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7zm0 6.6c-1.15 0-2.1.95-2.1 2.1v5.05h4.2v-5.05c0-1.15-.95-2.1-2.1-2.1z' // Approximate Wix-like shape
    },
    {
      name: 'Next.js',
      path: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.286c-5.68 0-10.286-4.606-10.286-10.286 0-2.48.88-4.757 2.34-6.557l12.723 16.357c-1.46.32-2.98.486-4.777.486zm7.269-2.172L8.205 7.828c.37-.08.76-.114 1.153-.114.86 0 1.543.686 1.543 1.543v10.514h-1.543V9.257l9.914 12.857 (More complex)' // Using Vercel/Next style circle for simplicity
    },
    {
      name: 'Shopify',
      path: 'M23.016 7.64c-.066-.467-.615-.558-.934-.158l-8.621 10.826-3.832-4.823c-.328-.413-.902-.34-1.127.144L6.11 19.34l-1.92-9.6A1.6 1.6 0 0 0 2.62 8.44L.27 21a1.88 1.88 0 0 0 1.25 1.76l10.13 3.09c.28.085.58.085.86 0l10.13-3.09A1.88 1.88 0 0 0 23.9 21l-.884-13.36z' // Simplified
    }
  ];

  return (
    <div className="absolute inset-x-0 bottom-0 md:top-1/2 md:-translate-y-1/2 overflow-hidden pointer-events-none opacity-[0.05] z-0">
      <div className="flex relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear"
          }}
          className="flex gap-16 md:gap-32 whitespace-nowrap px-8 md:px-16"
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-4">
              <svg
                viewBox="0 0 24 24"
                className="w-24 h-24 md:w-40 md:h-40 fill-white"
                style={{ minWidth: '60px' }}
              >
                <path d={logo.path} />
              </svg>
              {/* Optional Text */}
              {/* <span className="text-4xl font-bold uppercase hidden md:block">{logo.name}</span> */}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- HERO COMPONENT ---
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black text-white selection:bg-[#22C55E] selection:text-white"
      style={{ fontFamily: 'Rubik, Assistant, system-ui, -apple-system, sans-serif' }}
    >
      {/* 1. Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Main Static Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent blur-[120px] rounded-full opacity-60" />

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-radial-gradient from-blue-500/10 to-transparent blur-[100px] opacity-40 translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-radial-gradient from-pink-500/10 to-transparent blur-[100px] opacity-40 -translate-x-1/4 translate-y-1/4" />

      </div>

      {/* 2. Logo Marquee - Replaces SuccessStack & Static Words */}
      <LogoMarquee />

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

          {/* Headlines */}
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

          {/* CTA Button */}
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
