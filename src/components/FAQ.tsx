import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { content } = useSiteContent();
    const faq = content.faq;

    return (
        <section id="faq" className="py-20 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center"
                >
                    {faq.titleBase}<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">{faq.titleHighlight}</span>
                </motion.h2>

                <div className="space-y-4">
                    {faq.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-white/10 rounded-2xl bg-zinc-900/30 overflow-hidden hover:border-white/20 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-right text-lg md:text-xl font-medium text-white/90 hover:text-white transition-colors"
                            >
                                <span>{item.question}</span>
                                <span className={`mr-4 p-2 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-pink-500/20 text-pink-500' : 'text-zinc-400'}`}>
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
                                        <div className="px-6 pb-6 text-zinc-400 leading-relaxed font-light">
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
