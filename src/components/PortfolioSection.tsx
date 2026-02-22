import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const reels = [
    'https://www.instagram.com/p/C4loAKboAE4/',
    'https://www.instagram.com/p/C7hFGIioIMe/',
    'https://www.instagram.com/p/C8RD3SfoJ5d/',
    'https://www.instagram.com/p/C9xfRebIVkd/',
    'https://www.instagram.com/p/C-CJhEHIdLk/',
];

// Convert Instagram post URL to embed URL
const toEmbedUrl = (url: string) => url.replace(/\/$/, '') + '/embed/';

const PortfolioSection: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const goTo = useCallback(
        (index: number, dir: number) => {
            setDirection(dir);
            setCurrent((prev) => {
                const next = (index + reels.length) % reels.length;
                return next;
            });
        },
        []
    );

    const handleNext = () => goTo(current + 1, 1);
    const handlePrev = () => goTo(current - 1, -1);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

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

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 340 : -340,
            opacity: 0,
            scale: 0.92,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -340 : 340,
            opacity: 0,
            scale: 0.92,
            transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
        }),
    };

    return (
        <section
            id="portfolio"
            className="py-20 bg-[#050505] relative overflow-hidden"
            dir="rtl"
        >
            {/* Background glow blobs */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-4 text-center text-white"
                >
                    פרויקטים{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                        מהשטח
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-center text-lg mb-12 max-w-xl mx-auto leading-relaxed"
                >
                    תוצאות אמיתיות מלקוחות אמיתיים
                </motion.p>

                {/* Case Study Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="max-w-4xl mx-auto rounded-3xl bg-zinc-900/60 backdrop-blur-md border border-blue-500/20 p-8 md:p-10 shadow-xl"
                >
                    {/* Client badge */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                            🥊
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 mb-0.5">לקוח</p>
                            <p className="font-bold text-white text-sm">מועדון אומנויות לחימה Vatos</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-300 leading-relaxed mb-8 text-sm md:text-base">
                        ניהול עמוד סושיאל מאפס, הפקה וימי צילום בשטח, ועריכת סרטונים דינמיים שמעבירים את האנרגיות של המועדון ובונים נוכחות דיגיטלית חזקה.
                    </p>

                    {/* Carousel */}
                    <div
                        className="relative select-none"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Video window */}
                        <div className="relative overflow-hidden rounded-2xl mx-auto"
                            style={{ maxWidth: 340 }}
                        >
                            <div
                                className="relative bg-black rounded-2xl overflow-hidden mx-auto border border-white/10"
                                style={{ width: '100%', aspectRatio: '9/16', maxWidth: 340 }}
                            >
                                <AnimatePresence custom={direction} mode="popLayout">
                                    <motion.div
                                        key={current}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <iframe
                                            src={toEmbedUrl(reels[current])}
                                            className="w-full h-full border-0"
                                            allowFullScreen
                                            scrolling="no"
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                            title={`Vatos Reel ${current + 1}`}
                                            loading="lazy"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={handlePrev}
                            aria-label="הקודם"
                            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-6 z-20 w-10 h-10 rounded-full bg-zinc-800/80 border border-white/10 hover:bg-blue-600/70 hover:border-blue-500/50 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm shadow-lg"
                        >
                            <ChevronRight size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="הבא"
                            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-6 z-20 w-10 h-10 rounded-full bg-zinc-800/80 border border-white/10 hover:bg-blue-600/70 hover:border-blue-500/50 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm shadow-lg"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-2 mt-5">
                            {reels.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i, i > current ? 1 : -1)}
                                    aria-label={`מעבר לסרטון ${i + 1}`}
                                    className={`rounded-full transition-all duration-300 ${i === current
                                        ? 'bg-blue-500 w-6 h-2.5'
                                        : 'bg-zinc-600 hover:bg-zinc-400 w-2.5 h-2.5'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Counter */}
                        <p className="text-center text-xs text-zinc-500 mt-2">
                            {current + 1} / {reels.length}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8 flex justify-center">
                        <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            href="https://www.instagram.com/vatosisrael/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-l from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-blue-900/30 transition-all duration-300"
                        >
                            להצצה בעמוד המלא של Vatos 🥊
                            <ExternalLink size={15} className="shrink-0" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioSection;
