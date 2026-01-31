import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Accessibility as A11yIcon, X, Type, Sun, Eye, Link as LinkIcon,
    RotateCcw, MousePointer2, ZoomIn, ZoomOut, Monitor, Keyboard, ZapOff
} from 'lucide-react';

const Accessibility: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        fontSize: 0, // 0=normal, 1-4 larger
        contrast: false,
        grayscale: false,
        sepia: false,
        invert: false,
        blackYellow: false,
        underlineLinks: false,
        highlightHeadings: false,
        readableFont: false,
        zoom: 1, // 1 = 100%, 1.1 = 110%, etc.
        bigCursor: false,
        blackCursor: false,
        stopAnimations: false,
        keyboardNav: false,
    });

    // Apply settings
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        // Font Size (Scale rems)
        root.style.fontSize = `${16 + (settings.fontSize * 2)}px`;

        // Zoom (CSS Zoom property - works in Chrome/Edge/Safari, limited FF support but acceptable for web a11y tools)
        (body.style as any).zoom = settings.zoom;

        // Filters logic
        let filterString = '';
        if (settings.grayscale) filterString += ' grayscale(100%)';
        if (settings.sepia) filterString += ' sepia(100%)';
        if (settings.contrast) filterString += ' contrast(150%)';
        if (settings.invert) filterString += ' invert(100%)';
        root.style.filter = filterString;

        // Class Toggles
        root.classList.toggle('a11y-black-yellow', settings.blackYellow);
        body.classList.toggle('a11y-readable-font', settings.readableFont);
        body.classList.toggle('a11y-underline-links', settings.underlineLinks);
        body.classList.toggle('a11y-highlight-headings', settings.highlightHeadings);
        body.classList.toggle('a11y-big-cursor', settings.bigCursor);
        body.classList.toggle('a11y-black-cursor', settings.blackCursor);
        body.classList.toggle('a11y-stop-animations', settings.stopAnimations);
        body.classList.toggle('a11y-keyboard-focus', settings.keyboardNav);

    }, [settings]);

    // Inject Global Styles
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      .a11y-black-yellow { background-color: black !important; color: yellow !important; }
      .a11y-black-yellow * { background-color: black !important; color: yellow !important; border-color: yellow !important; }
      
      .a11y-readable-font, .a11y-readable-font * { font-family: Arial, Helvetica, sans-serif !important; letter-spacing: 0.05em !important; }
      
      .a11y-underline-links a { text-decoration: underline !important; font-weight: bold !important; }
      
      .a11y-highlight-headings h1, .a11y-highlight-headings h2, .a11y-highlight-headings h3, 
      .a11y-highlight-headings h4, .a11y-highlight-headings h5, .a11y-highlight-headings h6 { 
        background-color: yellow !important; color: black !important; padding: 2px 5px; 
      }

      .a11y-big-cursor, .a11y-big-cursor * { cursor: zoom-in !important; }
      .a11y-black-cursor, .a11y-black-cursor * { cursor: cell !important; }
      
      .a11y-stop-animations *, .a11y-stop-animations *::before, .a11y-stop-animations *::after {
        animation: none !important;
        transition: none !important;
        transform: none !important; 
      }

      .a11y-keyboard-focus *:focus {
        outline: 4px solid red !important;
        outline-offset: 2px !important;
      }
    `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    const reset = () => {
        setSettings({
            fontSize: 0, contrast: false, grayscale: false, sepia: false, invert: false,
            blackYellow: false, underlineLinks: false, highlightHeadings: false, readableFont: false,
            zoom: 1, bigCursor: false, blackCursor: false, stopAnimations: false, keyboardNav: false,
        });
    };

    const OptionBtn = ({ icon: Icon, label, active, onClick }: any) => (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all h-[80px] w-full
        ${active ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
        >
            <Icon size={20} className="mb-1" />
            <span className="text-[10px] font-medium leading-tight text-center">{label}</span>
        </button>
    );

    return (
        <>
            <motion.button
                className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Accessibility Menu"
            >
                <A11yIcon size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-20 left-6 z-50 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                        <div className="bg-gray-100 p-3 flex justify-between items-center border-b">
                            <h3 className="font-bold text-gray-800 text-sm">כלי נגישות</h3>
                            <div className="flex gap-2">
                                <button onClick={reset} className="text-red-500 hover:bg-red-50 p-1 rounded text-xs font-bold flex items-center gap-1">
                                    <RotateCcw size={14} /> מאופס
                                </button>
                                <button onClick={() => setIsOpen(false)}><X size={18} className="text-gray-500" /></button>
                            </div>
                        </div>

                        <div className="p-3 grid grid-cols-4 gap-2 max-h-[60vh] overflow-y-auto">
                            {/* 1. Keyboard Nav */}
                            <OptionBtn icon={Keyboard} label="ניווט מקלדת" active={settings.keyboardNav} onClick={() => setSettings(s => ({ ...s, keyboardNav: !s.keyboardNav }))} />

                            {/* 2. Stop Animations */}
                            <OptionBtn icon={ZapOff} label="ביטול הבהובים" active={settings.stopAnimations} onClick={() => setSettings(s => ({ ...s, stopAnimations: !s.stopAnimations }))} />

                            {/* 3. Sepia */}
                            <OptionBtn icon={Monitor} label="מונוכרום" active={settings.grayscale} onClick={() => setSettings(s => ({ ...s, grayscale: !s.grayscale }))} />

                            {/* 4. High Contrast */}
                            <OptionBtn icon={Sun} label="ניגודיות" active={settings.contrast} onClick={() => setSettings(s => ({ ...s, contrast: !s.contrast }))} />

                            {/* 5. Black Yellow */}
                            <OptionBtn icon={Sun} label="שחור צהוב" active={settings.blackYellow} onClick={() => setSettings(s => ({ ...s, blackYellow: !s.blackYellow }))} />

                            {/* 6. Invert */}
                            <OptionBtn icon={Eye} label="היפוך צבעים" active={settings.invert} onClick={() => setSettings(s => ({ ...s, invert: !s.invert }))} />

                            {/* 7. Highlight Headings */}
                            <OptionBtn icon={Type} label="הדגשת כותרות" active={settings.highlightHeadings} onClick={() => setSettings(s => ({ ...s, highlightHeadings: !s.highlightHeadings }))} />

                            {/* 8. Highlight Links */}
                            <OptionBtn icon={LinkIcon} label="הדגשת קישורים" active={settings.underlineLinks} onClick={() => setSettings(s => ({ ...s, underlineLinks: !s.underlineLinks }))} />

                            {/* 9. Readable Font */}
                            <OptionBtn icon={Type} label="גופן קריא" active={settings.readableFont} onClick={() => setSettings(s => ({ ...s, readableFont: !s.readableFont }))} />

                            {/* 10. Font + */}
                            <OptionBtn icon={Type} label="הגדלת גופן" active={settings.fontSize === 2} onClick={() => setSettings(s => ({ ...s, fontSize: Math.min(s.fontSize + 1, 4) }))} />

                            {/* 11. Font - */}
                            <OptionBtn icon={Type} label="הקטנת גופן" active={settings.fontSize === 0} onClick={() => setSettings(s => ({ ...s, fontSize: Math.max(s.fontSize - 1, 0) }))} />

                            {/* 12. Zoom + (Increments by 10%) */}
                            <OptionBtn icon={ZoomIn} label="הגדלת מסך" active={settings.zoom > 1} onClick={() => setSettings(s => ({ ...s, zoom: Math.min(s.zoom + 0.1, 2) }))} />

                            {/* 13. Zoom - (Decrements by 10%) */}
                            <OptionBtn icon={ZoomOut} label="הקטנת מסך" active={settings.zoom < 1} onClick={() => setSettings(s => ({ ...s, zoom: Math.max(s.zoom - 0.1, 0.5) }))} />

                            {/* 14. Big Cursor */}
                            <OptionBtn icon={MousePointer2} label="סמן גדול" active={settings.bigCursor} onClick={() => setSettings(s => ({ ...s, bigCursor: !s.bigCursor }))} />

                            {/* 15. Black Cursor */}
                            <OptionBtn icon={MousePointer2} label="סמן שחור" active={settings.blackCursor} onClick={() => setSettings(s => ({ ...s, blackCursor: !s.blackCursor }))} />

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Accessibility;
