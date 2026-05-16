import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Code2, Rocket } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const iconMap = {
    MessageCircle,
    Code2,
    Rocket,
} as const;

const Process: React.FC = () => {
    const { content } = useSiteContent();
    const process = content.process;

    return (
        <section id="process" className="py-20 bg-gray-50 relative overflow-hidden border-t border-gray-100">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-center text-gray-900"
                >
                    {process.titleBase}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">{process.titleHighlight}</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 -z-10" />

                    {process.steps.map((step, index) => {
                        const IconComponent = iconMap[step.iconName];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-center text-center relative"
                            >
                                <div className={`w-20 h-20 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-sm border border-orange-100 relative z-10 bg-white`}>
                                    <IconComponent size={32} />
                                </div>

                                {/* Step Number Badge */}
                                <div className="absolute top-0 right-[calc(50%-3rem)] bg-white border border-orange-200 text-xs font-mono px-2 py-1 rounded-full text-orange-600 shadow-sm">
                                    0{index + 1}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed max-w-xs text-sm">
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
