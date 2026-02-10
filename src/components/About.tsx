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
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10', hoverBg: 'group-hover:bg-purple-500' },
  blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', hoverBg: 'group-hover:bg-blue-500' },
  pink: { text: 'text-pink-500', bg: 'bg-pink-500/10', hoverBg: 'group-hover:bg-pink-500' },
};

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-10%"]);
  const { content } = useSiteContent();
  const about = content.about;

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-black min-h-screen">
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
        <span className="text-[10vw] md:text-[20vw] font-black uppercase text-white">{about.marqueeText}</span>
        <span className="text-[10vw] md:text-[20vw] font-black uppercase text-white">{about.marqueeText}</span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 right-6 text-white">
                <p className="font-bold text-xl">{about.imageCaption}</p>
                <p className="text-sm opacity-70">{about.imageSubCaption}</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-600 rounded-full blur-[80px] opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">{about.headingLine1}</span>
              <br />
              <span
                style={{
                  background: '-webkit-linear-gradient(45deg, #ff007f, #a200ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {about.headingName}
              </span>
            </h2>
            <div className="space-y-6 text-lg text-gray-200">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {about.features.map((feature, i) => {
                const IconComponent = iconMap[feature.iconName];
                const colors = colorMap[feature.colorClass] || colorMap.purple;
                return (
                  <div key={i} className="p-4 bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center gap-2 text-center group hover:bg-white/5 transition-colors">
                    <div className={`p-3 rounded-full ${colors.bg} ${colors.text} ${colors.hoverBg} group-hover:text-white transition-colors`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="font-bold text-white">{feature.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
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