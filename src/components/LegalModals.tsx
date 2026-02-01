import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type LegalType = 'privacy' | 'accessibility' | 'terms' | null;

interface LegalModalsProps {
    activeModal: LegalType;
    onClose: () => void;
}

const content = {
    privacy: {
        title: "תנאי שימוש, מדיניות פרטיות והצהרת נגישות",
        body: (
            <div dir="rtl">
                <p><strong>עדכון אחרון: פברואר 2026</strong></p>

                <h3 className="text-xl font-bold mt-6 mb-3 text-white">1. מדיניות פרטיות ואבטחת מידע (תיקון 13)</h3>
                <p className="mb-4">
                    אורן שמיר מכבד את פרטיות המשתמשים ומחויב להגן על המידע האישי בהתאם לתיקון 13 לחוק הגנת הפרטיות.
                    המידע הנאסף באתר (שם וטלפון) נמסר על ידך מרצונך החופשי לצורך יצירת קשר בלבד.
                    האתר משתמש ב-Cookies ובכלי ניתוח (Google Analytics, Microsoft Clarity) לאיסוף מידע סטטיסטי אנונימי.
                </p>

                <h4 className="text-lg font-bold mt-4 mb-2 text-white">אבטחת מידע</h4>
                <p className="mb-4">
                    האתר נוקט באמצעי הגנה טכנולוגיים מחמירים למניעת דלף מידע.
                    האתר מאוחסן בשרתים מאובטחים העומדים בתקני אבטחה בינלאומיים.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3 text-white">2. הצהרת נגישות</h3>
                <p className="mb-4">
                    האתר הונגש בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות.
                    הוא מותאם לניווט מקלדת, קוראי מסך ובעל ניגודיות צבעים תקינה.
                    בכל בעיה ניתן לפנות לאורן שמיר בטלפון 052-644-8826.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3 text-white">3. תנאי שימוש</h3>
                <p className="mb-4">
                    כל התכנים באתר הם קניינו הבלעדי של אורן שמיר. אין להעתיק או לשכפל תוכן ללא אישור.
                </p>
            </div>
        )
    },
    accessibility: {
        title: "הצהרת נגישות",
        body: `אני רואה חשיבות עליונה במתן שירות שוויוני לכלל הגולשים ובפרט לבעלי מוגבלויות. האתר נבנה בהתאם להוראות נגישות תכנים באינטרנט (WCAG) ברמה AA. בוצעו התאמות לגלישה באמצעות מקלדת וקוראי מסך. אם נתקלתם בקושי לגלוש באתר, אנא פנו אליי ישירות בטלפון 052-644-8826 ואדאג לטפל בבעיה מיידית.`
    },
    terms: {
        title: "תנאי שימוש",
        body: `השימוש באתר מוצע כמות שהוא (AS-IS). התכנים באתר נועדו למטרות אינפורמטיביות ושיווקיות. אין להעתיק תכנים או תמונות מהאתר ללא אישור בכתב. בעלי האתר לא יישא באחריות לכל נזק עקיף או ישיר שייגרם כתוצאה מהשימוש באתר.`
    }
};

const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {activeModal && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative cursor-default"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                                <h3 className="text-xl font-bold text-white">{content[activeModal].title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8 text-gray-200 leading-relaxed text-lg">
                                {typeof content[activeModal].body === 'string'
                                    ? <div className="whitespace-pre-wrap">{content[activeModal].body}</div>
                                    : content[activeModal].body
                                }
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 bg-black/20 text-center">
                                <button
                                    onClick={onClose}
                                    className="px-8 py-2 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                                >
                                    סגור
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LegalModals;
