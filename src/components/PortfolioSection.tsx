import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Smartphone, BarChart3, Video as VideoIcon, Sparkles } from 'lucide-react';

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
        <section id="portfolio" className="py-24 bg-[#050505] relative overflow-hidden" dir="rtl">
            {/* Animated Background Blobs */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.1, 0.15, 0.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 60, 0], opacity: [0.08, 0.12, 0.08] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6"
                    >
                        <Sparkles size={12} />
                        PORTFOLIO 2024
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
                    >
                        פרויקטים <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">מהשטח</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        ככה זה נראה כשהתוכן מדויק, השפה אותנטית והתוצאות מדברות בעצמן
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">

                    {/* Left Side: Client Info */}
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-8 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-xl border border-white/5 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-400 shadow-inner">
                                    🥊
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Vatos Martial Arts</h3>
                                    <p className="text-sm text-zinc-500">ניהול סושיאל & הפקת תוכן</p>
                                </div>
                            </div>

                            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                                ניהול עמוד סושיאל מאפס, הפקה וימי צילום בשטח, ועריכת סרטונים דינמיים שמעבירים את האנרגיות של המועדון ובונים נוכחות דיגיטלית חזקה.
                            </p>

                            <motion.a
                                whileHover={{ scale: 1.02, x: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                href="https://www.instagram.com/vatosisrael/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn flex items-center justify-between w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                                <span className="text-white font-bold">להצצה בעמוד המלא של Vatos</span>
                                <ExternalLink size={18} className="text-blue-400" />
                            </motion.a>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-4 px-4">
                            {[
                                { icon: VideoIcon, label: 'הפקת רילס' },
                                { icon: BarChart3, label: 'שיפור חשיפה' },
                                { icon: Smartphone, label: 'ניהול מלא' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-blue-400 hover:border-blue-500/20 transition-all duration-300">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: iPhone Mockup Carousel */}
                    <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center">
                        <div className="relative w-full max-w-[340px] group">

                            {/* iPhone Frame Mockup */}
                            <div className="relative z-20 w-full aspect-[9/19] bg-[#1a1a1a] rounded-[3.5rem] p-2.5 border-[8px] border-[#2a2a2a] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10">
                                {/* Dynamic Island */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#2a2a2a] rounded-b-3xl z-40 flex items-center justify-center">
                                    <div className="w-12 h-1 bg-black/40 rounded-full" />
                                </div>

                                <div
                                    className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-black"
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <AnimatePresence custom={direction} mode="popLayout">
                                        <motion.div
                                            key={current}
                                            custom={direction}
                                            initial={{ x: direction > 0 ? 340 : -340, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: direction > 0 ? -340 : 340, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
                                className="absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-16 z-30 w-14 h-14 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-xl"
                            >
                                <ChevronRight size={24} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute top-1/2 -translate-y-1/2 -left-8 lg:-left-16 z-30 w-14 h-14 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all shadow-xl"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        </div>

                        {/* Pagination */}
                        <div className="mt-10 flex flex-col items-center gap-4">
                            <div className="flex gap-2.5">
                                {reels.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i, i > current ? 1 : -1)}
                                        className="relative"
                                    >
                                        <motion.div
                                            animate={{
                                                width: i === current ? 32 : 10,
                                                backgroundColor: i === current ? '#3b82f6' : '#3f3f46'
                                            }}
                                            className="h-2.5 rounded-full"
                                        />
                                    </button>
                                ))}
                            </div>
                            <span className="text-zinc-600 font-mono text-sm tracking-widest uppercase">
                                PROJECT {current + 1} // 0{reels.length}
                            </span>
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
