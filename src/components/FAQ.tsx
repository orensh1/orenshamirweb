import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';
import orenImage from '../assets/oren-portrait-transparent.png';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { content } = useSiteContent();
    const faq = content.faq;

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 md:py-32 bg-gray-900 relative overflow-hidden" dir="rtl">
            {/* Background subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-2xl">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center text-white"
                >
                    {faq.titleBase}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{faq.titleHighlight}</span>
                </motion.h2>

                {/* Chat Interface */}
                <div className="flex flex-col gap-3">
                    {faq.items.map((item, index) => (
                        <div key={index} className="flex flex-col gap-3">
                            {/* Question Bubble (Visitor - Right side) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="flex justify-start"
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className={`group flex items-center gap-3 px-5 py-3.5 rounded-2xl rounded-tr-md text-right transition-all duration-300 max-w-[85%] md:max-w-[75%] ${
                                        openIndex === index
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                            : 'bg-gray-800 text-gray-200 hover:bg-gray-750 hover:text-white border border-gray-700/50'
                                    }`}
                                >
                                    <Plus
                                        size={18}
                                        className={`flex-shrink-0 transition-transform duration-300 ${
                                            openIndex === index ? 'rotate-45' : ''
                                        }`}
                                    />
                                    <span className="text-base md:text-lg font-medium leading-snug">
                                        {item.question}
                                    </span>
                                </button>
                            </motion.div>

                            {/* Answer Bubble (Oren - Left side with avatar) */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex justify-end gap-3 items-end"
                                    >
                                        {/* Avatar */}
                                        <div className="w-9 h-9 rounded-full bg-orange-500 overflow-hidden flex-shrink-0 border-2 border-orange-400 shadow-md hidden md:block">
                                            <img
                                                src={orenImage}
                                                alt="Oren"
                                                className="w-full h-full object-cover object-top"
                                            />
                                        </div>
                                        {/* Message Bubble */}
                                        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl rounded-bl-md px-5 py-4 max-w-[85%] md:max-w-[75%]">
                                            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Typing indicator decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-end gap-3 items-end mt-4"
                >
                    <div className="w-9 h-9 rounded-full bg-orange-500 overflow-hidden flex-shrink-0 border-2 border-orange-400 shadow-md hidden md:block">
                        <img
                            src={orenImage}
                            alt="Oren"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700/30 rounded-2xl rounded-bl-md px-5 py-3.5">
                        <div className="flex gap-1.5 items-center">
                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0ms]" />
                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
