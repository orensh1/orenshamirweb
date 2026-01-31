import React, { useRef } from 'react';
// v34 - Apple-Style Premium Minimalism
import { motion, useScroll, useTransform } from 'framer-motion';
import { smoothScrollTo } from '../utils/smoothScroll';
import { User, Mail, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import SuccessStack from './ui/SuccessStack';

// --- LEAD CARD COMPONENT ---
const LeadCard = ({ icon: Icon, name, type, time, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay }}
      className="relative flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl w-[320px] md:w-[380px] mb-6 group hover:bg-white/15 transition-colors"
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center shadow-inner">
        <Icon className="w-6 h-6 text-black/70" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">{name}</h3>
            <span className="text-xs text-white/40 font-mono">{time}</span>
        </div>
        <p className="text-white/60 text-xs mt-0.5">{type}</p>
      </div>

      {/* New Lead Badge */}
      <div className="absolute top-4 left-4 bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_2px_10px_rgba(34,197,94,0.3)] flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        NEW LEAD
      </div>
    </motion.div>
  );
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

  const leads = [
    { icon: User, name: "דניאל כהן", type: "השאיר פרטים באתר נדל״ן", time: "לפני דקה", delay: 0.2 },
    { icon: Phone, name: "מיכל לוי", type: "התקשרה לקליניקה", time: "לפני 5 דק׳", delay: 0.6 },
    { icon: Mail, name: "רועי פרידמן", type: "ביקש הצעת מחיר", time: "לפני 12 דק׳", delay: 1.0 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#050505] text-white font-sans selection:bg-[#22C55E] selection:text-white"
    >
      {/* 1. Subtle Background */}
      <SuccessStack />
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] right-[-10%] w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[150px] mix-blend-overlay" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[800px] h-[800px] bg-[#22C55E]/5 rounded-full blur-[120px] mix-blend-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24 pt-[120px] pb-16 md:py-24 min-h-[90vh]">

        {/* LEFT COLUMN: Visuals (Lead Cards) */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center relative z-20 order-2 md:order-1 perspective-[1000px]">
           {leads.map((lead, index) => (
             <motion.div
                key={index}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 1.5 }}
             >
               <LeadCard {...lead} />
             </motion.div>
           ))}
           
           {/* Background Glow behind cards */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-gradient-to-b from-white/5 to-transparent blur-3xl -z-10 rounded-full" />
        </div>


        {/* RIGHT COLUMN: Content & Typography (Hebrew) */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center md:items-end w-full md:w-1/2 relative z-20 order-1 md:order-2 text-center md:text-right"
        >
          {/* Version Tag */}
          <div className="mb-8 flex items-center gap-3 opacity-50">
             <span className="text-[10px] tracking-[0.2em] font-medium uppercase">v34 • APPLE PREM</span>
             <div className="h-[1px] w-8 bg-white/50"></div>
          </div>

          {/* Headlines */}
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[1.1] tracking-tight text-white mb-8">
            <span className="block opacity-90">לא עוד סתם</span>
            <span className="block bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
              דף נחיתה
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-2xl text-white/70 font-light leading-relaxed max-w-lg mb-12">
            בלי סיפורים – אני בונה אתרים שעוזרים לכם להכניס יותר <span className="font-bold text-[#22C55E]">כסף</span>.
          </p>

          {/* CTA Button - Black Pill */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 bg-white text-black rounded-full font-medium text-lg flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
          >
            <span>אני רוצה אתר כזה</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
          
          {/* Trust Badges */}
          <div className="mt-12 flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs">בנייה מהירה</span>
             </div>
             <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs">אחריות מלאה</span>
             </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
