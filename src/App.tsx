import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StyleShowcase from './components/StyleShowcase';

import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import Accessibility from './components/Accessibility';



const App: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Logic - Performance Optimized (GPU Composite Only + rAF)
  useEffect(() => {
    let rafId: number;

    const updateCursor = (e: MouseEvent) => {
      // Cancel previous frame to ensure we only render the latest position
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 400}px, ${e.clientY - 400}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden">

      {/* Custom Cursor Glow - Optimized */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-0 opacity-30 blur-[100px] transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.4) 0%, transparent 70%)',
          transform: 'translate3d(-100%, -100%, 0)' // Start off-screen
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Process />
        <StyleShowcase />
        <FAQ />
        <Contact />
      </main>

      <WhatsAppButton />
      <Accessibility />
    </div>
  );
};

export default App;