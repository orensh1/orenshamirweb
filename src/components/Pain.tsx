import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Timer, MousePointerClick } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const iconMap = [AlertTriangle, Timer, MousePointerClick];

const Pain: React.FC = () => {
    const { content } = useSiteContent();
    const pain = content.pain;

    if (!pain) return null;

    return (
        <section className="py-20 bg-white relative overflow-hidden border-t border-gray-100" dir="rtl">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50/50 via-white to-white pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        {pain.titleBase}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            {pain.titleHighlight}
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pain.cards.map((card, index) => {
                        const Icon = iconMap[index] || AlertTriangle;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white border border-red-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                                
                                <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center mb-6 shadow-sm border border-red-200">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Pain;
