import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility as A11yIcon, X, Type, Sun, Eye, Link as LinkIcon, RotateCcw } from 'lucide-react';

const Accessibility: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        fontSize: 0, // 0 = normal, 1 = large, 2 = extra large
        contrast: false,
        grayscale: false,
        underlineLinks: false,
    });

    // Apply settings to document
    useEffect(() => {
        const root = document.documentElement;

        // Font Size
        if (settings.fontSize === 0) root.style.fontSize = '16px';
        if (settings.fontSize === 1) root.style.fontSize = '18px';
        if (settings.fontSize === 2) root.style.fontSize = '20px';

        // Contrast & Grayscale
        root.style.filter = `
      ${settings.grayscale ? 'grayscale(100%)' : ''} 
      ${settings.contrast ? 'contrast(150%)' : ''}
    `;

        // Underline Links
        if (settings.underlineLinks) {
            document.body.classList.add('a11y-underline-links');
        } else {
            document.body.classList.remove('a11y-underline-links');
        }

    }, [settings]);

    // Inject CSS for link underlining
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      .a11y-underline-links a { text-decoration: underline !important; }
    `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    const reset = () => {
        setSettings({
            fontSize: 0,
            contrast: false,
            grayscale: false,
            underlineLinks: false,
        });
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                className="fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="תפריט נגישות"
            >
                <A11yIcon size={24} />
            </motion.button>

            {/* Menu Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-20 left-6 z-50 w-72 bg-white text-black rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="bg-gray-100 p-4 flex items-center justify-between border-b border-gray-200">
                            <h3 className="font-bold text-lg">תפריט נגישות</h3>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-200 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Controls */}
                        <div className="p-4 grid grid-cols-2 gap-3">

                            {/* Text Size */}
                            <button
                                onClick={() => setSettings(s => ({ ...s, fontSize: (s.fontSize + 1) % 3 }))}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${settings.fontSize > 0 ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Type size={24} className="mb-2" />
                                <span className="text-xs font-medium">גודל טקסט ({settings.fontSize === 0 ? 'רגיל' : settings.fontSize === 1 ? 'גדול' : 'ענק'})</span>
                            </button>

                            {/* Grayscale */}
                            <button
                                onClick={() => setSettings(s => ({ ...s, grayscale: !s.grayscale }))}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${settings.grayscale ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Eye size={24} className="mb-2" />
                                <span className="text-xs font-medium">גווני אפור</span>
                            </button>

                            {/* High Contrast */}
                            <button
                                onClick={() => setSettings(s => ({ ...s, contrast: !s.contrast }))}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${settings.contrast ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Sun size={24} className="mb-2" />
                                <span className="text-xs font-medium">ניגודיות</span>
                            </button>

                            {/* Underline Links */}
                            <button
                                onClick={() => setSettings(s => ({ ...s, underlineLinks: !s.underlineLinks }))}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${settings.underlineLinks ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                                <LinkIcon size={24} className="mb-2" />
                                <span className="text-xs font-medium">הדגשת קישורים</span>
                            </button>

                            {/* Reset */}
                            <button
                                onClick={reset}
                                className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <RotateCcw size={18} />
                                <span className="text-sm font-medium">אפס הגדרות</span>
                            </button>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Accessibility;
