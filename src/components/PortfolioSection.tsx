import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Smartphone, BarChart3, Video as VideoIcon, Sparkles, Award } from 'lucide-react';

const reels = [
    '/vatosvideo1.mp4',
    '/vatosvideo2.mp4',
    '/vatosvideo3.mp4',
    '/vatosvideo4.mp4',
    '/vatosvideo5.mp4',
];

const PortfolioSection: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const goTo = useCallback((index: number, dir: number) => {
        setDirection(dir);
        setCurrent((index + reels.length) % reels.length);
    }, []);

    const handleNext = () => goTo(current + 1, 1);
    const handlePrev = () => goTo(current - 1, -1);

    const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.changedTouches[0].clientX; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const diff = touchStartX.current - touchEndX.current;
            if (Math.abs(diff) > 50) {
                if (diff > 0) handleNext();
                else handlePrev();
            }
        }
    };

    return (
        <section id="portfolio" className="py-32 bg-[#050505] relative overflow-hidden" dir="rtl">
            {/* Ambient Background Lights */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
                    >
                        <Sparkles size={12} className="text-blue-400" />
                        Selected Projects 2024
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold mb-8 text-white tracking-tight"
                    >
                        פרויקטים <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">מהשטח</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        ככה זה נראה כשהתוכן מדויק, השפה אותנטית והתוצאות מדברות בעצמן
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-center max-w-7xl mx-auto">

                    {/* Left Side: Premium Client Card */}
                    <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-10 rounded-[3rem] bg-gradient-to-br from-zinc-900/60 to-black/60 backdrop-blur-3xl border border-white/10 relative group overflow-hidden shadow-2xl"
                        >
                            {/* Card Decorative Elements */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all duration-700" />
                            <div className="absolute top-8 left-8 text-white/5 font-black text-8xl pointer-events-none select-none italic">
                                01
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-[1.25rem] bg-zinc-900 border border-white/10 flex items-center justify-center text-3xl shadow-inner relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                                            🥊
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white tracking-tight">Vatos Martial Arts</h3>
                                            <div className="flex items-center gap-2 mt-1 px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 w-fit">
                                                <Award size={12} className="text-blue-400" />
                                                <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Case Study</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12">
                                    <p className="text-zinc-300 text-xl leading-relaxed">
                                        ניהול עמוד סושיאל מאפס, הפקה וימי צילום בשטח, ועריכת סרטונים דינמיים שמעבירים את האנרגיות של המועדון ובונים נוכחות דיגיטלית חזקה.
                                    </p>
                                    <div className="h-px w-full bg-gradient-to-l from-transparent via-white/10 to-transparent" />
                                </div>

                                <motion.a
                                    whileHover={{ scale: 1.02, x: -10 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    href="https://www.instagram.com/vatosisrael/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn flex items-center justify-between w-full p-6 rounded-[1.5rem] bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2.5s_infinite]" />
                                    <span className="font-bold text-lg">להצצה בעמוד המלא של Vatos</span>
                                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover/btn:bg-black/10 transition-colors">
                                        <ExternalLink size={20} className="text-black" />
                                    </div>
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Refined Feature Icons */}
                        <div className="grid grid-cols-3 gap-6 px-4">
                            {[
                                { icon: VideoIcon, label: 'הפקת רילס' },
                                { icon: BarChart3, label: 'שיפור חשיפה' },
                                { icon: Smartphone, label: 'ניהול מלא' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 group/icon">
                                    <div className="w-16 h-16 rounded-[1.25rem] bg-zinc-900/50 backdrop-blur-md border border-white/5 flex items-center justify-center text-zinc-500 group-hover/icon:text-blue-400 group-hover/icon:border-blue-500/30 group-hover/icon:bg-blue-500/5 transition-all duration-500">
                                        <item.icon size={24} />
                                    </div>
                                    <span className="text-[11px] text-zinc-600 group-hover/icon:text-zinc-400 font-bold uppercase tracking-widest transition-colors">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: iPhone Mockup Carousel */}
                    <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center">
                        <div className="relative w-full max-w-[360px] group">

                            {/* iPhone Frame Mockup */}
                            <div className="relative z-20 w-full aspect-[9/19] bg-[#0c0c0c] rounded-[4rem] p-3 border-[10px] border-[#1a1a1a] shadow-[0_0_100px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10">
                                {/* Dynamic Island */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/90 rounded-b-[2rem] z-40 flex items-center justify-center border-x border-b border-white/5">
                                    <div className="w-14 h-1.5 bg-white/10 rounded-full" />
                                </div>

                                <div
                                    className="relative w-full h-full rounded-[3.2rem] overflow-hidden bg-black"
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <AnimatePresence custom={direction} mode="popLayout">
                                        <motion.div
                                            key={current}
                                            custom={direction}
                                            initial={{ x: direction > 0 ? 360 : -360, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: direction > 0 ? -360 : 360, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <video
                                                key={reels[current]}
                                                src={reels[current]}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: 'inherit',
                                                    display: 'block',
                                                }}
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Floating Controls */}
                            <button
                                onClick={handlePrev}
                                aria-label="Next project"
                                className="absolute top-1/2 -translate-y-1/2 -right-10 lg:-right-20 z-30 w-16 h-16 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all shadow-2xl group/nav"
                            >
                                <ChevronRight size={28} className="group-hover/nav:scale-110 transition-transform" />
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Previous project"
                                className="absolute top-1/2 -translate-y-1/2 -left-10 lg:-left-20 z-30 w-16 h-16 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:scale-110 transition-all shadow-2xl group/nav"
                            >
                                <ChevronLeft size={28} className="group-hover/nav:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Refined Pagination / Counter */}
                        <div className="mt-14 flex flex-col items-center gap-6">
                            <div className="flex gap-3">
                                {reels.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i, i > current ? 1 : -1)}
                                        className="relative h-2.5 outline-none"
                                        aria-label={`Go to project ${i + 1}`}
                                    >
                                        <motion.div
                                            animate={{
                                                width: i === current ? 40 : 12,
                                                backgroundColor: i === current ? '#3b82f6' : 'rgba(255,255,255,0.1)'
                                            }}
                                            className="h-full rounded-full transition-colors duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-blue-400 font-mono text-[10px] tracking-[0.3em] font-black uppercase">
                                    Project 0{current + 1}
                                </span>
                                <div className="w-10 h-px bg-white/10" />
                                <span className="text-zinc-600 font-mono text-[10px] tracking-[0.3em] uppercase">
                                    0{reels.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </section>
    );
};

export default PortfolioSection;
