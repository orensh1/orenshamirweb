
import React from 'react';
import SiteContentContext from '../content/SiteContentContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import { SiteContent } from '../content/siteContent';

interface PreviewProps {
    content: SiteContent;
}

export function Preview({ content }: PreviewProps) {
    return (
        <SiteContentContext.Provider value={{ content, isLoading: false }}>
            <div className="origin-top-left transform scale-[0.6] lg:scale-[0.8] w-[166%] lg:w-[125%] h-full overflow-y-auto bg-black pointer-events-none select-none shadow-2xl rounded-xl border border-white/10">
                <div className="relative">
                    <Navbar />
                    <div className="relative z-10">
                        <Hero />
                        <About />
                        <Process />
                        <FAQ />
                        <Contact />
                    </div>
                    <WhatsAppButton />
                </div>
            </div>
        </SiteContentContext.Provider>
    );
}
