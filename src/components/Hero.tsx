import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { ArrowUpRight, Calendar, TrendingUp, Mail } from 'lucide-react';
import Button from './ui/Button';
import { AuroraBackground } from './ui/AuroraBackground';

// --- AURORA HERO COMPONENT (v52) ---
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

  // Glass Cards Data
  const cards = [
    {
      icon: <Calendar className="w-5 h-5 text-green-400" />,
      bg: "bg-green-500/20",
      title: "שיחה נקבעה",
      time: "לפני 2 דקות"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
      bg: "bg-blue-500/20",
      title: "+150% תנועה",
      time: "השבוע"
    },
    {
      icon: <Mail className="w-5 h-5 text-purple-400" />,
      bg: "bg-purple-500/20",
      title: "ליד חדש התקבל",
      time: "עכשיו"
    }
  ];

  return (
    <AuroraBackground className="h-screen">
      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center gap-12 pt-[80px]"
        style={{ fontFamily: 'Rubik, Assistant, system-ui, -apple-system, sans-serif' }}
      >

        {/* Left Side: 3 Glassmorphic Cards (Restored) */}
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-6 w-[280px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.2), type: "spring" }}
              className="group relative px-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-default hover:scale-105 hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${card.bg}`}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{card.title}</div>
                  <div className="text-xs text-gray-400">{card.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center lg:items-end w-full max-w-4xl ml-auto relative z-20 text-center lg:text-right"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {/* Top Panel - Glassmorphic */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <span className="text-xs md:text-sm font-bold tracking-wider text-white/90 pr-2">
                OREN SHAMIR CREATIVE
              </span>
            </div>
          </motion.div>

          {/* Headline: "לא עוד סתם דף נחיתה" */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] md:leading-[0.9] tracking-tighter mb-8 relative text-balance"
            dir="rtl"
          >
            <span className="block text-white drop-shadow-2xl">
              לא עוד סתם
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              דף נחיתה
            </span>
          </motion.h1>

          {/* Subtext: High conversion & Money */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed max-w-2xl mb-12 lg:ml-auto"
            dir="rtl"
          >
            אני בונה דפים שמדברים תכלס, נראים מיליון דולר, ועוזרים לעסק שלך להכניס יותר{' '}
            <span className="font-black text-[#22C55E] drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              כסף
            </span>
            .
          </motion.p>

          {/* CTA Button - Magnetic Logic (Re-implemented wrapper) */}
          <motion.div
            variants={itemVariants}
            className="relative z-10"
          >
            {/* Simple magnetic effect via Framer Motion hover */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                onClick={scrollToContact}
                className="!text-lg md:!text-xl !px-10 !py-4 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] w-full md:w-auto rounded-full bg-white text-black font-bold flex items-center justify-center gap-3"
              >
                אני רוצה אתר כזה
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </AuroraBackground>
  );
};

export default Hero;
