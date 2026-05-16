import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { content } = useSiteContent();
    const faq = content.faq;

    return (
        <section id="faq" className="py-20 bg-white relative overflow-hidden" dir="rtl">
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center text-gray-900"
                >
                    {faq.titleBase}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{faq.titleHighlight}</span>
                </motion.h2>

                <div className="space-y-4">
                    {faq.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="border border-orange-100 rounded-2xl bg-white shadow-sm overflow-hidden hover:border-orange-300 hover:shadow-md transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-right text-lg md:text-xl font-medium text-gray-800 hover:text-gray-900 transition-colors"
                            >
                                <span>{item.question}</span>
                                <span className={`ms-4 p-2 rounded-full bg-orange-50 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-orange-100 text-orange-600' : 'text-orange-400'}`}>
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed font-light">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
