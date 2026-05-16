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
      <footer id="contact" className="relative pt-20 md:pt-32 pb-10 bg-white overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-orange-100/50 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Text Area */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
                {c.headingLine1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  {c.headingHighlight}
                </span>
              </h2>
              <p className="text-gray-500 text-xl mb-12 max-w-md">
                {c.subtitle}
              </p>

              <div className="flex flex-col gap-6">
                <a href={`mailto:${c.email}`} className="flex items-center gap-4 text-gray-800 hover:text-orange-500 transition-colors group" aria-label={`Send email to ${c.email}`}>
                  <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="text-lg">{c.email}</span>
                </a>
                <a href={`tel:${c.phone}`} className="flex items-center gap-4 text-gray-800 hover:text-orange-500 transition-colors group" aria-label={`Call ${c.phoneDisplay}`}>
                  <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="text-lg">{c.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>

            {/* Form Area */}
            <div className="flex flex-col gap-8 w-full lg:w-1/2">
              {/* Working Form with Email Integration */}
              <ContactForm />
            </div>
          </div>


          <div className="mt-24 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center text-xs text-gray-500 order-2 md:order-1">
              <div className="flex items-center gap-6">
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">מדיניות פרטיות</a>
                <a href="/accessibility" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">הצהרת נגישות</a>
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">תנאי שימוש</a>
              </div>
              <p>{c.copyrightText}</p>
            </div>
            <p className="text-[11px] text-gray-400 order-3 mt-2 text-center md:text-right w-full" dir="rtl">
              * הנגשת אתרי הלקוחות הינה באחריות הלקוח בלבד. לפרטים נוספים ראו <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">תנאי שימוש</a>.
            </p>

            <div className="flex items-center gap-6 order-1 md:order-2">
              <a href={c.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors" aria-label="Instagram Profile">
                <Instagram size={20} />
              </a>
              <a href={`mailto:${c.email}`} className="text-gray-500 hover:text-orange-500 transition-colors" aria-label="Send Email">
                <Mail size={20} />
              </a>
              <a href={`tel:${c.phone}`} className="text-gray-500 hover:text-orange-500 transition-colors" aria-label="Call Now">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Credits Bar */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-400 text-xs dir-rtl" dir="rtl">
              {c.creditsText}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;