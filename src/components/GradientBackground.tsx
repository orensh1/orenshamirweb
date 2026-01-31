import React from 'react';

const GradientBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]">
            {/* 
        Wave Gradient Structure 
        Simulating a fluid wave using elongated, rotated, high-blur elements.
        Colors: Cyan/Blue -> Purple -> Pink/Magenta
      */}

            {/* 1. Base Blue/Cyan Wave (Left) */}
            <div
                className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] rounded-[100%] opacity-60 blur-[80px] will-change-transform animate-wave-slow mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(59,130,246,0) 70%)',
                    transform: 'rotate(25deg)',
                    animationDelay: '0s'
                }}
            />

            {/* 2. Central Purple Wave (Middle) */}
            <div
                className="absolute top-[30%] left-[25%] w-[50%] h-[60%] rounded-[100%] opacity-50 blur-[90px] will-change-transform animate-wave-medium mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(147,51,234,0.5) 0%, rgba(147,51,234,0) 70%)',
                    transform: 'rotate(-15deg)',
                    animationDelay: '-2s'
                }}
            />

            {/* 3. Pink/Magenta Wave (Right) */}
            <div
                className="absolute top-[10%] right-[-5%] w-[50%] h-[70%] rounded-[100%] opacity-60 blur-[80px] will-change-transform animate-wave-slow mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(219,39,119,0) 70%)',
                    transform: 'rotate(15deg)',
                    animationDelay: '-4s'
                }}
            />

            {/* 4. Deep Blue Undertone (Bottom Fill) */}
            <div
                className="absolute bottom-[-20%] left-[10%] w-[80%] h-[40%] rounded-[100%] opacity-20 blur-[100px] will-change-transform"
                style={{ background: '#1e3a8a' }}
            />

            {/* 5. Sparkles / Stars */}
            <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[40%] left-[70%] w-1.5 h-1.5 bg-blue-200 rounded-full opacity-70 blur-[1px] animate-twinkle" style={{ animationDelay: '3s' }} />
            <div className="absolute top-[60%] left-[50%] w-1 h-1 bg-purple-200 rounded-full opacity-50 animate-twinkle" style={{ animationDelay: '5s' }} />
            <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-white rounded-full opacity-40 blur-[2px] animate-twinkle" style={{ animationDelay: '0s' }} />
            <div className="absolute bottom-[30%] left-[20%] w-1 h-1 bg-pink-200 rounded-full opacity-60 animate-twinkle" style={{ animationDelay: '2.5s' }} />

        </div>
    );
};

export default GradientBackground;
