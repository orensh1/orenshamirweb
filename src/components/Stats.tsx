import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../content/SiteContentContext';

const Stats: React.FC = () => {
    const { content } = useSiteContent();
    const stats = content.stats;

    if (!stats) return null;

    return (
        <section className="py-24 bg-orange-500 relative overflow-hidden" dir="rtl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
            
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {stats.titleBase}
                        <span className="text-orange-900">
                            {stats.titleHighlight}
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {stats.items.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-7xl md:text-8xl font-black text-white mb-4 drop-shadow-md font-heebo tracking-tighter">
                                {stat.value}
                            </span>
                            <p className="text-orange-100 text-lg md:text-xl font-medium max-w-xs leading-relaxed">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
