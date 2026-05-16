import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 2.8-second duration total
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800); // Trigger exit at 2.8s

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", pointerEvents: "none" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <div className="overflow-hidden p-8">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-9xl font-['Playball'] text-center"
            >
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
                Oren Shamir
              </span>
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 flex justify-center gap-2"
            >
                <div className="w-2 h-2 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
