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
        title: "מדיניות פרטיות (Privacy Policy)",
        body: (
            <div dir="rtl" className="space-y-4">
                <p><strong>עדכון אחרון: פברואר 2026</strong></p>
                <p>
                    אורן שמיר ("הנהלת האתר") מכבדת את פרטיות המשתמשים באתר האינטרנט שהיא מנהלת ומפעילה (להלן: "האתר").
                    מטרת התנאים הבאים היא להבהיר למשתמש את מדיניות הפרטיות הנהוגה באתר, לרבות תיאור אופן השימוש במידע הנמסר להנהלת האתר על ידי המשתמשים באתר או הנאסף על ידה בעת השימוש באתר.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">1. כללי</h3>
                <p>
                    בעת שימוש בשירותי האתר נאסף מידע עליך. חלק מהמידע מזהה אותך באופן אישי, כלומר בשמך ובכתובתך, מוצרים ושירותים שרכשת או ביקשת למכור, אמצעי התשלום ששימשו אותך, וכיו"ב. זהו המידע שאתה מוסר ביודעין, לדוגמה בעת רישום לשירותים באתר או שליחת טופס לידים.
                    חלק מהמידע אינו מזהה אותך אישית ואינו נשמר ביחד עם פרטיך. זהו מידע סטטיסטי ומצטבר. לדוגמה, פרסומות שקראת באתר, העמודים שבהם צפית, ההצעות והשירותים שעניינו אותך, כתובת האינטרנט (IP) שממנה פנית ועוד.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">2. רישום לשירותים ומסירת מידע</h3>
                <p>
                    ככל שנדרשים פרטים אישיים בעת רישום לשירותים באתר או בעת רכישת מוצרים בהם, הנהלת האתר תבקש ממך רק את המידע הנחוץ במישרין לאספקת השירותים או לרכישת המוצרים.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">3. מאגר המידע</h3>
                <p>
                    הנתונים שנאספו יישמרו במאגר המידע של הנהלת האתר ובאחריותה. השימוש במידע שנאסף ייעשה רק על פי מדיניות פרטיות זו או על פי הוראות כל דין, על מנת:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>לאפשר להשתמש בשירותים שונים באתר.</li>
                        <li>לשפר ולהעשיר את השירותים והתכנים המוצעים באתר.</li>
                        <li>לשנות או לבטל שירותים ותכנים קיימים.</li>
                        <li>לצורך רכישת מוצרים ושירותים באתר - לרבות פרסום מידע ותכנים.</li>
                        <li>כדי להתאים את המודעות שיוקרנו בעת הביקור באתר לתחומי ההתעניינות שלך.</li>
                    </ul>
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">4. דיוור ישיר אלקטרוני (תיקון 40 לחוק התקשורת)</h3>
                <p>
                    הנהלת האתר מעוניינת לשלוח אליך מדי פעם בדואר אלקטרוני מידע בדבר שירותיה וכן מידע שיווקי ופרסומי.
                    מידע כזה ישוגר אליך רק אם נתת הסכמה מפורשת לכך, ובכל עת תוכל לבטל את הסכמתך ולחדול מקבלתו.
                    הנהלת האתר לא תמסור את פרטיך האישיים למפרסמים לצורך פניה אליך בדיוור ישיר ללא הסכמתך.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">5. מסירת מידע לצד שלישי</h3>
                <p>
                    הנהלת האתר לא תעביר לצדדים שלישיים את פרטיך האישיים והמידע שנאסף על פעילותך באתר, אלא במקרים המפורטים להלן:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>אם תרכוש מוצרים ושירותים מצדדים שלישיים המציעים אותם למכירה באמצעות האתר, יועבר לצדדים שלישיים אלה המידע הדרוש לשם השלמת תהליך הרכישה.</li>
                        <li>במקרה של מחלוקת משפטית בינך לבין הנהלת האתר שתחייב חשיפת פרטיך.</li>
                        <li>אם תבצע באתר פעולות שבניגוד לדין.</li>
                        <li>אם יתקבל צו שיפוטי המורה למסור את פרטיך או המידע אודותיך לצד שלישי.</li>
                    </ul>
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">6. Cookies (עוגיות)</h3>
                <p>
                    אתר זה משתמש ב"עוגיות" (Cookies) לצורך תפעולו השוטף והתקין, ובכלל זה כדי לאסוף נתונים סטטיסטיים אודות השימוש באתר, לאימות פרטים, כדי להתאים את האתר להעדפותיך האישיות ולצורכי אבטחת מידע.
                    דפדפנים מודרניים כוללים אפשרות להימנע מקבלת Cookies. אם אינך יודע כיצד לעשות זאת, בדוק בקובץ העזרה של הדפדפן שבו אתה משתמש.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">7. אבטחת מידע</h3>
                <p>
                    הנהלת האתר מיישמת באתר מערכות ונהלים עדכניים לאבטחת מידע. בעוד שמערכות ונהלים אלה מצמצמים את הסיכונים לחדירה בלתי-מורשית, אין הם מעניקים בטחון מוחלט.
                    לכן, הנהלת האתר לא מתחייבת ששירותיה יהיו חסינים באופן מוחלט מפני גישה בלתי-מורשית למידע המאוחסן בהם.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">8. זכות לעיון במידע</h3>
                <p>
                    על-פי חוק הגנת הפרטיות, התשמ"א - 1981, כל אדם זכאי לעיין במידע שעליו המוחזק במאגר מידע. אדם שעיין במידע שעליו ומצא כי אינו נכון, שלם, ברור או מעודכן, רשאי לפנות לבעל מאגר המידע בבקשה לתקן את המידע או למוחקו.
                    פנייה כזאת יש להפנות אל כתובת המייל: orenshamir5@gmail.com.
                </p>
            </div>
        )
    },
    accessibility: {
        title: "הצהרת נגישות (Accessibility Statement)",
        body: (
            <div dir="rtl" className="space-y-4">
                <p><strong>רמת נגישות: AA לפי תקן ת"י 5568</strong></p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">מבוא</h3>
                <p>
                    אנו רואים חשיבות רבה במתן שירות שוויוני לכלל הגולשים ובשיפור השירות הניתן לבעלי מוגבלויות.
                    לשם כך הושקעו משאבים רבים בהנגשת האתר, במטרה להקל על השימוש בו ולהפוך אותו לזמין יותר עבור אנשים עם מוגבלות.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">התאמות הנגישות שבוצעו באתר</h3>
                <p>
                    האתר נבנה בהתאם להוראות הנגישות המופיעות ב"הנחיות לנגישות תכנים באינטרנט" (WCAG) של ארגון W3C הבינלאומי, ברמה AA.
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>תמיכה בניווט מלא באמצעות המקלדת (Tab, Enter, Esc).</li>
                        <li>התאמה מלאה לקוראי מסך (Screen Readers).</li>
                        <li>שימוש בכותרות ותגיות סמנטיות (H1, H2, button, main וכו').</li>
                        <li>אפשרות לשינוי גודל הגופן וניגודיות הצבעים באמצעות סרגל הנגישות הצף באתר.</li>
                        <li>הימנעות משימוש ברכיבים מהבהבים או בתנועה מהירה שאינה ניתנת לעצירה.</li>
                        <li>תאימות לדפדפנים הנפוצים: Chrome, Firefox, Safari, Edge.</li>
                    </ul>
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">סייגים לנגישות</h3>
                <p>
                    למרות מאמצנו להנגיש את כלל הדפים באתר, ייתכן ויתגלו חלקים שטרם הונגשו.
                    אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לאפשר שימוש בו עבור כלל האוכלוסייה, כולל אנשים עם מוגבלויות.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">רכז נגישות ויצירת קשר</h3>
                <p>
                    במידה ונתקלת בבעיה או בתקלה כלשהי בנושא הנגישות, נשמח שתעדכן אותנו בכדי שנוכל לטפל בה בהקדם.
                    <br />
                    <strong>שם:</strong> אורן שמיר
                    <br />
                    <strong>טלפון:</strong> 052-644-8826
                    <br />
                    <strong>מייל:</strong> orenshamir5@gmail.com
                </p>
            </div>
        )
    },
    terms: {
        title: "תנאי שימוש (Terms of Use)",
        body: (
            <div dir="rtl" className="space-y-4">
                <p>
                    ברוכים הבאים לאתר של אורן שמיר (להלן: "האתר"). השימוש באתר ובשירותים המוצעים בו כפוף לתנאי השימוש המפורטים להלן.
                    הגלישה באתר וביצוע פעולות בו מהווים את הסכמתך לקבל ולנהוג לפי התקנון.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">1. קניין רוחני</h3>
                <p>
                    כל זכויות היוצרים והקניין הרוחני באתר, לרבות בעיצוב האתר, בקוד המקור, בתמונות, בטקסטים ובכל תוכן אחר, הינם רכושו הבלעדי של אורן שמיר (או של צדדים שלישיים שהתירו להנהלת האתר להשתמש בהם).
                    אין להעתיק, לשכפל, להפיץ, למכור, לשווק או לתרגם מידע כלשהו מן האתר בלא קבלת רשותה של הנהלת האתר מראש ובכתב.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">2. הגבלת אחריות</h3>
                <p>
                    התכנים באתר ניתנים לשימוש כמות שהם (AS-IS). לא ניתן להתאימם לצרכיו של כל אדם ואדם. לא תהיה לך כל טענה, תביעה או דרישה כלפי הנהלת האתר בגין תכונות השימוש, המגבלות או התגובות שיעורר הפרסום באתר.
                    הנהלת האתר לא תישא באחריות לכל נזק ישיר או עקיף, כספי או אחר, שייגרם לך כתוצאה משימוש או הסתמכות על המידע המופיע באתר.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">3. קישורים חיצוניים</h3>
                <p>
                    באתר עשויים להופיע קישורים (Links) לאתרים אחרים. הנהלת האתר אינה אחראית לתוכן באותם אתרים, למידת הדיוק שבהם או לאמינותם. הביקור באתרים אלו הוא על אחריותך הבלעדית.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">4. שינויים באתר ובתנאי השימוש</h3>
                <p>
                    הנהלת האתר רשאית לשנות מעת לעת את מבנה האתר, מראהו, היקף וזמינות השירותים וכל היבט אחר הכרוך בהם וזאת ללא צורך להודיע על כך מראש.
                    כמו כן, רשאית הנהלת האתר לשנות את תקנון זה לפי שיקול דעתה הבלעדי.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-2 text-white">5. סמכות שיפוט</h3>
                <p>
                    על שימוש באתר זה יחולו אך ורק דיני מדינת ישראל. מקום השיפוט הבלעדי בגין כל דבר ועניין הנובע מהסכם זה או מהאתר הינו בבתי המשפט המוסמכים במחוז דרום (באר שבע).
                </p>
            </div>
        )
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
                            <div className="p-8 text-gray-200 leading-relaxed text-lg max-h-[70vh] overflow-y-auto">
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
