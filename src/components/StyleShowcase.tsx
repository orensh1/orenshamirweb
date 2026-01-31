import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Monitor, Moon, Sun, Zap } from 'lucide-react';

type ThemeType = 'hitech' | 'minimal' | 'bold';

interface ThemeConfig {
    id: ThemeType;
    label: string;
    colors: {
        bg: string;
        text: string;
        accent: string;
        card: string;
        border: string;
        sectionBg?: string;
        sectionText?: string;
    };
    font: string;
    glow?: string;
}

const themes: ThemeConfig[] = [
    {
        id: 'hitech',
        label: 'הייטק',
        colors: {
            bg: '#0a0a0a',
            text: '#ffffff',
            accent: '#3B82F6',
            card: 'rgba(255, 255, 255, 0.05)',
            border: 'rgba(59, 130, 246, 0.3)',
            sectionBg: '#000000',
            sectionText: '#ffffff'
        },
        font: 'Rubik, sans-serif',
        glow: '0 0 30px rgba(59, 130, 246, 0.3)',
    },
    {
        id: 'minimal',
        label: 'מינימליסטי',
        colors: {
            bg: '#ffffff',
            text: '#111827',
            accent: '#9CA3AF',
            card: '#f3f4f6',
            border: '#e5e7eb',
            sectionBg: '#f0f0f0', // Light gray section bg
            sectionText: '#111827'
        },
        font: 'Heebo, sans-serif',
        glow: '0 10px 25px rgba(0,0,0,0.05)',
    },
    {
        id: 'bold',
        label: 'עוצמתי',
        colors: {
            bg: '#18181b', // Mockup bg
            text: '#ffffff',
            accent: '#EF4444',
            card: '#27272a',
            border: '#EF4444',
            sectionBg: '#27272a', // Dark Gray/Zinc section bg
            sectionText: '#ffffff'
        },
        font: 'Rubik, sans-serif',
        glow: '0 0 20px rgba(239, 68, 68, 0.4)',
    },
];

const StyleShowcase: React.FC = () => {
    const [activeTheme, setActiveTheme] = useState<ThemeType>('hitech');

    const currentTheme = themes.find((t) => t.id === activeTheme) || themes[0];

    return (
        <motion.section
            animate={{ backgroundColor: currentTheme.colors.sectionBg }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="py-24 relative overflow-hidden text-right"
            dir="rtl"
        >
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.h2
                        animate={{ color: currentTheme.colors.sectionText }}
                        className="text-3xl md:text-5xl font-bold mb-8 transition-colors"
                    >
                        איך ייראה דף הנחיתה שלכם?
                    </motion.h2>

                    {/* Theme Switcher Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-sm shadow-lg">
                        {themes.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => setActiveTheme(theme.id)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${activeTheme === theme.id
                                    ? 'text-black shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {activeTheme === theme.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 mix-blend-exclusion ${activeTheme === theme.id ? 'text-black' : 'text-gray-200'}`}>{theme.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Browser Mockup */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        animate={{
                            backgroundColor: currentTheme.colors.bg,
                            borderColor: activeTheme === 'hitech' || activeTheme === 'bold' ? currentTheme.colors.border : 'transparent',
                            boxShadow: currentTheme.glow,
                        }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border overflow-hidden relative shadow-2xl h-[400px] md:h-[500px] transform transition-transform hover:scale-[1.01]"
                    >
                        {/* Browser Header */}
                        <div className={`h-10 backdrop-blur-md flex items-center px-4 gap-2 border-b w-full absolute top-0 z-20 ${activeTheme === 'minimal' ? 'bg-gray-100/80 border-gray-200' : 'bg-black/10 border-white/5'}`}>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className={`flex-1 text-center text-[10px] font-mono opacity-50 ${activeTheme === 'minimal' ? 'text-gray-600' : 'text-gray-500'}`}>
                                website-preview.com
                            </div>
                        </div>

                        {/* Mockup Content */}
                        <div className="h-full pt-10 flex flex-col items-center justify-center p-8 relative">

                            {/* Background Decoration based on theme */}
                            <AnimatePresence mode="wait">
                                {activeTheme === 'hitech' && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none"
                                    />
                                )}
                                {activeTheme === 'bold' && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 to-transparent pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                            <motion.div
                                key={activeTheme}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10 text-center w-full max-w-lg"
                            >
                                {/* Mockup Badge */}
                                <motion.div
                                    animate={{
                                        color: currentTheme.colors.accent,
                                        backgroundColor: activeTheme === 'minimal' ? '#f3f4f6' : 'rgba(255,255,255,0.1)'
                                    }}
                                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-6"
                                >
                                    {activeTheme === 'hitech' ? 'FUTURE READY' : activeTheme === 'minimal' ? 'LESS IS MORE' : 'POWER'}
                                </motion.div>

                                {/* Mockup Headline */}
                                <motion.h3
                                    animate={{ color: currentTheme.colors.text }}
                                    className={`text-4xl md:text-5xl mb-6 leading-tight ${activeTheme === 'minimal' ? 'font-light tracking-wide' : 'font-black tracking-tighter'}`}
                                    style={{ fontFamily: currentTheme.font }}
                                >
                                    אנחנו בונים <br />
                                    <span style={{ color: currentTheme.colors.accent }}>תוצאות עסקיות.</span>
                                </motion.h3>

                                {/* Mockup Button */}
                                <motion.button
                                    animate={{
                                        backgroundColor: currentTheme.colors.accent,
                                        color: '#ffffff',
                                        boxShadow: activeTheme === 'hitech' ? '0 0 20px ' + currentTheme.colors.accent : 'none'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 mx-auto`}
                                >
                                    <span>צור קשר</span>
                                    <ArrowLeft size={16} />
                                </motion.button>

                                {/* Mockup Cards (Bottom) */}
                                <div className="grid grid-cols-2 gap-4 mt-12 w-full">
                                    {[1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                backgroundColor: currentTheme.colors.card,
                                                borderColor: currentTheme.colors.border,
                                            }}
                                            className={`p-4 rounded-xl border ${activeTheme === 'hitech' ? 'backdrop-blur-md' : ''}`}
                                        >
                                            <div className="w-8 h-8 rounded-full mb-3" style={{ backgroundColor: currentTheme.colors.accent, opacity: 0.2 }} />
                                            <div className="h-2 w-2/3 rounded mb-2" style={{ backgroundColor: currentTheme.colors.text, opacity: 0.3 }} />
                                            <div className="h-2 w-1/2 rounded" style={{ backgroundColor: currentTheme.colors.text, opacity: 0.1 }} />
                                        </motion.div>
                                    ))}
                                </div>

                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default StyleShowcase;
