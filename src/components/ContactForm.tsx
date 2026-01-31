import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Loader2, User, Phone, Briefcase, MessageSquare } from 'lucide-react';

const ContactForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        business: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Updated to point to Netlify Function
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setFormState({ name: '', phone: '', business: '', message: '' });
                // Reset success message after 5 seconds if desired, currently sticking to success view per logic
            } else {
                console.error('Submission failed:', data);
                alert('שגיאה בשליחת הטופס. אנא נסו שנית.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('שגיאת תקשורת. בדקו את החיבור שלכם.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact-form-section" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22C55E]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">בואו נדבר</h2>
                        <p className="text-gray-400">השאירו פרטים ואחזור אליכם עם אסטרטגיה מותאמת אישית.</p>
                    </div>

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#22C55E]/20 border border-[#22C55E]/50 rounded-2xl p-8 text-center flex flex-col items-center gap-4"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center shadow-[0_0_30px_#22C55E]">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">הפרטים נשלחו בהצלחה!</h3>
                            <p className="text-gray-300">אצור קשר בשעות הקרובות.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <User className="w-4 h-4 text-[#22C55E]" /> שם מלא
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22C55E]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                        placeholder="ישראל ישראלי"
                                    />
                                </div>
                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-[#22C55E]" /> טלפון
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formState.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22C55E]/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                        placeholder="050-0000000"
                                    />
                                </div>
                            </div>

                            {/* Business Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-[#22C55E]" /> סוג העסק
                                </label>
                                <select
                                    name="business"
                                    value={formState.business}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22C55E]/50 focus:bg-white/10 transition-all appearance-none"
                                >
                                    <option value="" className="bg-gray-900 text-gray-500">בחרו תחום..</option>
                                    <option value="ecommerce" className="bg-gray-900 text-white">חנות אינטרנטית</option>
                                    <option value="services" className="bg-gray-900 text-white">נותן שירותים</option>
                                    <option value="startup" className="bg-gray-900 text-white">סטארטאפ / הייטק</option>
                                    <option value="realestate" className="bg-gray-900 text-white">נדל״ן</option>
                                    <option value="other" className="bg-gray-900 text-white">אחר</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-[#22C55E]" /> איך אוכל לעזור?
                                </label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22C55E]/50 focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none"
                                    placeholder="ספרו לי קצת על הפרויקט..."
                                />
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms-checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0 cursor-pointer"
                                />
                                <label htmlFor="terms-checkbox" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                                    אני מאשר/ת את תנאי השירות ומדיניות הפרטיות ומסכים/ה לקבל פניות מהחברה.
                                </label>
                            </div>

                            {/* Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting || !termsAccepted}
                                type="submit"
                                className="w-full bg-[#22C55E] hover:bg-[#1ea851] text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> שולח...</>
                                ) : (
                                    <><Send className="w-5 h-5" /> שליחת פרטים</>
                                )}
                            </motion.button>

                            <p className="text-center text-xs text-white/30 mt-4">
                                * הפרטים נשמרים בדיסקרטיות ומשמשים ליצירת קשר בלבד.
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
