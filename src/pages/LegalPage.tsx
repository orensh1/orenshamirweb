import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { legalContent } from '../content/legalContent';

type LegalType = keyof typeof legalContent;

interface LegalPageProps {
    type: LegalType;
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
    const content = legalContent[type];

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="container mx-auto px-6 py-12 md:py-20">

                {/* Back Button */}
                <a
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowRight className="group-hover:-translate-x-1 transition-transform" />
                    חזרה לדף הבית
                </a>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        {content.title}
                    </h1>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 leading-relaxed text-lg text-gray-300">
                        {content.body}
                    </div>

                    <div className="mt-12 text-center">
                        <a href="/" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            חזרה לאתר
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
