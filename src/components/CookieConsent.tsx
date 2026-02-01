import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const hasConsented = localStorage.getItem('cookieConsent');
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 backdrop-blur-xl"
                >
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-3 text-gray-200 text-sm md:text-base flex-1">
                                <Cookie size={24} className="text-blue-500 flex-shrink-0 mt-1" />
                                <p className="leading-relaxed">
                                    אתר זה משתמש בקובצי עוגיות (Cookies) לשיפור חווית הגלישה וניתוח סטטיסטי בהתאם לתיקון 13 לחוק הגנת הפרטיות. המשך הגלישה מהווה הסכמה למדיניות.
                                </p>
                            </div>
                            <button
                                onClick={handleAccept}
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap shadow-lg"
                            >
                                אני מסכים
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
