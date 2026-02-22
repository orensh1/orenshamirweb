import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Video, FileText } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const iconMap = {
    MessageCircle,
    Video,
    FileText,
} as const;

const Process: React.FC = () => {
    const { content } = useSiteContent();
    const process = content.process;

    return (
        <section id="process" className="py-20 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center text-white"
                >
                    {process.titleBase}<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{process.titleHighlight}</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 -z-10" />

                    {process.steps.map((step, index) => {
                        const IconComponent = iconMap[step.iconName];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center relative"
                            >
                                <div className={`w-20 h-20 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-lg shadow-white/5 border border-white/10 relative z-10`}>
                                    <IconComponent size={32} />
                                </div>

                                {/* Step Number Badge */}
                                <div className="absolute top-0 right-[calc(50%-3rem)] bg-zinc-900 border border-white/10 text-xs font-mono px-2 py-1 rounded-full text-zinc-400">
                                    0{index + 1}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-zinc-400 leading-relaxed max-w-xs text-sm">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Process;
