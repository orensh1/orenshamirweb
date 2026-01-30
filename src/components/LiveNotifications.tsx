import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Bell } from 'lucide-react';

const notifications = [
    { text: "ליד חדש התקבל!", icon: CheckCircle2, color: "text-green-400" },
    { text: "שיחה נכנסת מלקוח...", icon: Bell, color: "text-blue-400" },
    { text: "פנייה חדשה מהאתר", icon: CheckCircle2, color: "text-purple-400" },
    { text: "הזמנה חדשה נוצרה", icon: CheckCircle2, color: "text-pink-400" }
];

const LiveNotifications: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % notifications.length);
                setIsVisible(true);
            }, 1000); // Wait for exit animation
        }, 4000); // Total cycle time

        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = notifications[currentIndex].icon;

    return (
        <div className="absolute top-1/3 left-4 md:left-20 z-0 pointer-events-none">
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex items-center gap-4 px-5 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/20"
                    >
                        <div className={`p-2 rounded-full bg-white/5 border border-white/5 ${notifications[currentIndex].color}`}>
                            <CurrentIcon size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-medium text-sm md:text-base tracking-wide">
                                {notifications[currentIndex].text}
                            </span>
                            <span className="text-xs text-white/40">לפני רגע</span>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveNotifications;
