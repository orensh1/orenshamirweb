import React, { useRef, useEffect, useState } from 'react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import Accessibility from './components/Accessibility';
import CookieConsent from './components/CookieConsent';

const Home: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [showIntro, setShowIntro] = useState(true);

    // Custom Cursor Logic - Performance Optimized (No State Re-renders)
    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(249, 115, 22, 0.1), transparent 80%)`;
            }
        };
        window.addEventListener('mousemove', updateCursor);
        return () => window.removeEventListener('mousemove', updateCursor);
    }, []);

    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showIntro]);

    return (
        <div className="bg-white min-h-screen text-gray-900 selection:bg-orange-500/30 selection:text-orange-900">
            {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

            {/* Custom Cursor Glow */}
            <div
                ref={cursorRef}
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px at 50% 50%, rgba(249, 115, 22, 0.1), transparent 80%)`
                }}
            />

            <Navbar />

            <main className="relative z-10">
                <Hero />
                <About />
                <Process />
                <FAQ />
                <Contact />
            </main>

            <WhatsAppButton />
            <Accessibility />
            <CookieConsent />
        </div>
    );
};

export default Home;
