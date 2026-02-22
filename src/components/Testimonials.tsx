import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'מיכל לוי',
        role: 'בעלת בוטיק "מיכל L"',
        text: 'מאז שאורן מנהל לי את האינסטגרם העסק פשוט הפך לאחר. קיבלתי פניות אורגניות כל יום, וכמות העוקבים שלי הוכפלה תוך חודשיים. הכי חשוב – אני סוף סוף יכולה להתמקד בעסק ולא בסושיאל.',
        color: 'purple',
        stars: 5,
    },
    {
        name: 'רועי אברהם',
        role: 'מנהל "RG פיטנס קלאב"',
        text: 'ימי הצילום עם אורן היו משהו שלא ציפיתי אליו. הוא הגיע מוכן, ידע בדיוק מה לצלם, ואיך לגרום לזה להיראות מקצועי. הרילסים שיצאו ממש הפיצו אותנו – אחד מהם הגיע לחצי מיליון צפיות.',
        color: 'blue',
        stars: 5,
    },
    {
        name: 'שרית כהן',
        role: 'בעלת קליניקה לטיפוח פנים',
        text: 'אורן בנה לי דף נחיתה שממיר מטורף. הלקוחות שמגיעים מהסושיאל אל הדף – ממש ממלאים פנייה. היחס שלו אישי, הוא תמיד זמין ותמיד יש לו רעיון אחד קדימה. ממליצה בחום לכל בעל עסק.',
        color: 'pink',
        stars: 5,
    },
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    purple: {
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        glow: 'group-hover:shadow-purple-900/30',
    },
    blue: {
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        glow: 'group-hover:shadow-blue-900/30',
    },
    pink: {
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'border-pink-500/20',
        glow: 'group-hover:shadow-pink-900/30',
    },
};

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-4 text-center text-white"
                    dir="rtl"
                >
                    לקוחות{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                        ממליצים
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-center text-lg mb-16 max-w-xl mx-auto"
                    dir="rtl"
                >
                    מה אומרים עסקים שכבר עובדים איתנו
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {testimonials.map((t, index) => {
                        const colors = colorMap[t.color] || colorMap.purple;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`group flex flex-col p-7 rounded-3xl bg-zinc-900/60 backdrop-blur-md border ${colors.border} hover:${colors.bg} transition-all duration-300 shadow-lg ${colors.glow} hover:shadow-xl`}
                                dir="rtl"
                            >
                                {/* Quote Icon */}
                                <div className={`mb-4 ${colors.text}`}>
                                    <Quote size={28} className="opacity-70" />
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.stars }).map((_, i) => (
                                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-zinc-300 leading-relaxed text-sm flex-1 mb-6">
                                    "{t.text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <div className={`w-10 h-10 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center font-bold text-lg shrink-0`}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{t.name}</p>
                                        <p className="text-xs text-zinc-500">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
