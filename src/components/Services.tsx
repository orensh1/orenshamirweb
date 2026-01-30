import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout, Palette, Terminal, TrendingUp, CheckCircle } from 'lucide-react';

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active step based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) setActiveStep(0);
      else if (latest < 0.5) setActiveStep(1);
      else if (latest < 0.75) setActiveStep(2);
      else setActiveStep(3);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#050505] text-white">
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">

        {/* Visual Container (Left on Desktop) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center p-6 md:p-12 relative order-1 md:order-2">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20 blur-[100px] rounded-full animate-pulse" />

            {/* Step 1: Strategic Blueprint (Wireframe) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8 backdrop-blur-sm border border-white/5 rounded-3xl bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* SVG Wireframe Animation */}
              <svg className="w-full h-full text-blue-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <motion.path
                  d="M10,10 L90,10 L90,90 L10,90 Z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: activeStep === 0 ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M10,30 L90,30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: activeStep === 0 ? 1 : 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.circle
                  cx="30" cy="60" r="10"
                  initial={{ scale: 0 }}
                  animate={{ scale: activeStep === 0 ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
                <motion.rect
                  x="50" y="50" width="30" height="20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStep === 0 ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  strokeDasharray="2 2"
                />
              </svg>
            </motion.div>

            {/* Step 2: High-End UI/UX (Glassmorphism) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-3/4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full blur-lg absolute top-4 right-4 group-hover:bg-pink-500/40 transition-colors" />
                  <Layout className="relative text-pink-400 w-8 h-8" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="h-2 w-1/3 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 w-1/2 bg-white/10 rounded"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-blue-500/10 pointer-events-none" />
              </div>
            </motion.div>

            {/* Step 3: Clean Code (Terminal) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full bg-[#0F0F0F] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm max-w-md">
                <div className="bg-zinc-900/50 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  <span className="ml-auto text-xs text-zinc-500">developer.tsx</span>
                </div>
                <div className="p-6 text-zinc-300">
                  <span className="text-purple-400">const</span> <span className="text-yellow-200">Success</span> = <span className="text-blue-400">async</span> () ={'>'} {'{\n'}
                  <span className="pl-4 block"><span className="text-purple-400">await</span> <span className="text-blue-300">optimize</span>(<span className="text-green-300">'performance'</span>);</span>
                  <span className="pl-4 block"><span className="text-purple-400">await</span> <span className="text-blue-300">deploy</span>(<span className="text-green-300">'production'</span>);</span>
                  <span className="pl-4 block text-zinc-500">// Result: 100/100 Lighthouse</span>
                  {'}'}
                  <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-blue-400 inline-block align-middle ml-1"
                  />
                </div>
              </div>
            </motion.div>

            {/* Step 4: Conversion Growth (Graph) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: activeStep === 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-3/4 aspect-square bg-gradient-to-t from-green-500/10 to-transparent border-b border-white/10 relative backdrop-blur-sm rounded-lg p-6 flex items-end justify-between gap-2">
                {[30, 45, 35, 60, 50, 85, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-full bg-green-400/80 rounded-t-sm relative group"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      +{h}%
                    </div>
                  </motion.div>
                ))}
                {/* Floating Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute top-4 left-4 bg-green-500 px-3 py-1 rounded-full flex items-center gap-2 text-black font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  <TrendingUp size={16} />
                  <span>ממוקד המרה</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Text Steps (Right on Desktop) */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start px-8 md:px-24 order-2 md:order-1 relative">
          <div className="absolute top-1/2 -translate-y-1/2 right-8 h-[200px] w-[2px] bg-zinc-800 hidden md:block">
            <motion.div
              className="w-full bg-purple-500"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          <div className="relative h-64 w-full">
            {/* Step 1 Text */}
            <div className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-center ${activeStep === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-blue-400 font-mono tracking-widest text-sm mb-4">STEP 01</span>
              <h3 className="text-4xl font-bold mb-4">אפיון אסטרטגי מדויק</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                אנחנו מתחילים בהבנת העסק, הקהל והמטרות. בונים תוכנית אדריכלית לאתר שמשלבת חווית משתמש עם יעדים עסקיים ברורים. שום דבר לא קורה במקרה.
              </p>
            </div>

            {/* Step 2 Text */}
            <div className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-center ${activeStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-pink-400 font-mono tracking-widest text-sm mb-4">STEP 02</span>
              <h3 className="text-4xl font-bold mb-4">עיצוב UI/UX מודרני</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                לוקחים את האפיון והופכים אותו לויז'ואל עוצר נשימה. שימוש ב-Glassmorphism, טיפוגרפיה מדויקת ואנימציות עדינות שיוצרות תחושת יוקרה ואמינות.
              </p>
            </div>

            {/* Step 3 Text */}
            <div className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-center ${activeStep === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-green-400 font-mono tracking-widest text-sm mb-4">STEP 03</span>
              <h3 className="text-4xl font-bold mb-4">פיתוח נקי ומהיר</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                כותבים כל שורת קוד מאפס. React, TypeScript, Tailwind. ביצועים מקסימליים, קידום אורגני (SEO) מובנה ומהירות טעינה שטסה בכל מכשיר.
              </p>
            </div>

            {/* Step 4 Text */}
            <div className={`absolute inset-0 transition-opacity duration-500 flex flex-col justify-center ${activeStep === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <span className="text-purple-400 font-mono tracking-widest text-sm mb-4">STEP 04</span>
              <h3 className="text-4xl font-bold mb-4">ממוקד המרה וצמיחה</h3>
              <p className="text-zinc-400 text-lg leading-relaxed">
                התוצאה הסופית היא לא רק "אתר יפה", אלא מכונת שיווק שעובדת בשבילך. מסלול לקוח ברור, הנעות לפעולה חכמות ודשבורד נתונים למעקב.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;