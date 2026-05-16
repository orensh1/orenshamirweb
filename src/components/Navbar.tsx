import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Button from './ui/Button';
import { Menu, X } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { useSiteContent } from '../content/SiteContentContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { content } = useSiteContent();
  const nav = content.navbar;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id, 1000);
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'
        }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6">
        <div className={`
          relative flex items-center justify-between gap-2 px-4 md:px-6 py-3 rounded-2xl transition-all duration-500
          ${isScrolled ? 'bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg' : 'bg-transparent'}
        `}>
          {/* Mobile Menu Toggle - Left Side */}
          <button
            className="md:hidden text-gray-900 flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Desktop Only (Left) */}
          <a href="#" className="hidden md:block text-3xl font-black tracking-tighter text-gray-900 font-heebo">
            {nav.logoImage ? (
              <img src={nav.logoImage} alt={nav.logoText} className="h-10 w-auto object-contain" />
            ) : (
              <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">{nav.logoText}</span>
            )}
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {nav.links.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group font-heebo"
              >
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA - Desktop Only */}
          <div className="hidden md:block">
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
              <Button variant="primary" className="!py-2 !px-6 text-sm flex items-center gap-2 rounded-full font-heebo font-bold transition-colors">
                <span dangerouslySetInnerHTML={{ __html: nav.ctaText }}></span>
              </Button>
            </a>
          </div>

          {/* Logo - Mobile Only (Right Side) */}
          <a href="#" className="md:hidden text-2xl font-black tracking-tighter text-gray-900 flex-shrink-0 font-heebo">
            {nav.logoImage ? (
              <img src={nav.logoImage} alt={nav.logoText} className="h-8 w-auto object-contain" />
            ) : (
              <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">{nav.logoText}</span>
            )}
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 p-4 md:hidden"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 flex flex-col gap-4">
            {nav.links.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-lg font-medium text-gray-700 active:text-gray-900"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>
              <Button className="w-full justify-center font-heebo font-bold">
                <span dangerouslySetInnerHTML={{ __html: nav.ctaText }}></span>
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default React.memo(Navbar);