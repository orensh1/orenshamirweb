import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import orenImage from '../assets/oren-portrait-new.jpg';
import { Layout, Zap, Smartphone } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentContext';

const iconMap = {
  Smartphone,
  Zap,
  Layout,
} as const;

const colorMap: Record<string, { text: string; bg: string; hoverBg: string }> = {
  purple: { text: 'text-orange-500', bg: 'bg-orange-100', hoverBg: 'group-hover:bg-orange-500' },
  blue: { text: 'text-amber-500', bg: 'bg-amber-100', hoverBg: 'group-hover:bg-amber-500' },
  pink: { text: 'text-rose-500', bg: 'bg-rose-100', hoverBg: 'group-hover:bg-rose-500' },
};

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-10%"]);
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-white min-h-screen border-t border-gray-100">
      {/* Continuous Marquee Text */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
        className="absolute top-1/3 md:top-1/2 -translate-y-1/2 left-0 whitespace-nowrap opacity-[0.15] md:opacity-[0.03] select-none pointer-events-none flex gap-10 w-max z-1"
        style={{ position: 'absolute', zIndex: 1 }}
      >
        <span className="text-[10vw] md:text-[20vw] font-black uppercase text-gray-900">{about.marqueeText}</span>
        <span className="text-[10vw] md:text-[20vw] font-black uppercase text-gray-900">{about.marqueeText}</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              <img
                src={orenImage}
                alt={about.imageAlt}
                width="800"
                height="800"
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-6 right-6 text-white">
                <p className="font-bold text-xl">{about.imageCaption}</p>
                <p className="text-sm opacity-90">{about.imageSubCaption}</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-400 rounded-full blur-[80px] opacity-30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-gray-900">{about.headingLine1}</span>
              <br />
              <span
                style={{
                  background: '-webkit-linear-gradient(45deg, #f97316, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {about.headingName}
              </span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {about.features.map((feature, i) => {
                const IconComponent = iconMap[feature.iconName];
                const colors = colorMap[feature.colorClass] || colorMap.purple;
                return (
                  <div key={i} className="p-4 bg-white shadow-sm border border-orange-100 rounded-2xl flex flex-col items-center gap-2 text-center group hover:border-orange-300 hover:shadow-md transition-all">
                    <div className={`p-3 rounded-full ${colors.bg} ${colors.text} ${colors.hoverBg} group-hover:text-white transition-colors`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;