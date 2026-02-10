import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Send } from 'lucide-react';
import LegalModals, { LegalType } from './LegalModals';
import ContactForm from './ContactForm';
import { useSiteContent } from '../content/SiteContentContext';

const Contact: React.FC = () => {
  const [activeModal, setActiveModal] = useState<LegalType>(null);
  const { content } = useSiteContent();
  const c = content.contact;

  const openModal = (e: React.MouseEvent, type: LegalType) => {
    e.preventDefault();
    setActiveModal(type);
  };

  return (
    <>
      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
      <footer id="contact" className="relative pt-20 md:pt-32 pb-10 bg-black overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-900/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Text Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                {c.headingLine1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
                  {c.headingHighlight}
                </span>
              </h2>
              <p className="text-zinc-400 text-xl mb-12 max-w-md">
                {c.subtitle}
              </p>

              <div className="flex flex-col gap-6">
                <a href={`mailto:${c.email}`} className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors group" aria-label={`Send email to ${c.email}`}>
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">{c.email}</span>
                </a>
                <a href={`tel:${c.phone}`} className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors group" aria-label={`Call ${c.phoneDisplay}`}>
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg">{c.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>

            {/* Form Area */}
            <div className="flex flex-col gap-8 w-full lg:w-1/2">
              {/* WhatsApp Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#25D366]/10 backdrop-blur-md p-8 rounded-3xl border border-[#25D366]/20 relative overflow-hidden group hover:border-[#25D366]/40 transition-colors"
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl font-bold text-white mb-2">{c.whatsappTitle}</h3>
                    <p className="text-zinc-400 text-sm">{c.whatsappSubtitle}</p>
                  </div>
                  <a
                    href={`https://wa.me/${c.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-900/20 whitespace-nowrap"
                  >
                    <Send size={18} className="rotate-0 md:rotate-45" />
                    <span>{c.whatsappButtonText}</span>
                  </a>
                </div>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:16px_16px]" />
              </motion.div>


              {/* Working Form with Email Integration */}
              <ContactForm />
            </div>
          </div>


          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center text-xs text-zinc-400 order-2 md:order-1">
              <div className="flex items-center gap-6">
                <button onClick={(e) => openModal(e, 'privacy')} className="hover:text-white transition-colors">מדיניות פרטיות</button>
                <button onClick={(e) => openModal(e, 'accessibility')} className="hover:text-white transition-colors">הצהרת נגישות</button>
                <button onClick={(e) => openModal(e, 'terms')} className="hover:text-white transition-colors">תנאי שימוש</button>
              </div>
              <p>{c.copyrightText}</p>
            </div>

            <div className="flex items-center gap-6 order-1 md:order-2">
              <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-pink-500 transition-colors" aria-label="Instagram Profile">
                <Instagram size={20} />
              </a>
              <a href={`mailto:${c.email}`} className="text-zinc-400 hover:text-white transition-colors" aria-label="Send Email">
                <Mail size={20} />
              </a>
              <a href={`tel:+${c.whatsappNumber}`} className="text-zinc-400 hover:text-white transition-colors" aria-label="Call Now">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Credits Bar */}
          <div className="mt-8 pt-4 border-t border-white/5 text-center">
            <p className="text-zinc-400 text-xs dir-rtl" dir="rtl">
              {c.creditsText}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;