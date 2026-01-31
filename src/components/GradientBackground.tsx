import React from 'react';

const GradientBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            {/* 
        Aurora Aurora Layers 
        Using 'will-change-transform' and 'translate3d' for 60FPS performance 
      */}

            {/* Deep Purple Base - Slow Movement */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-40 blur-[100px] will-change-transform animate-aurora-1"
                style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(0, 0, 0, 0) 70%)' }}
            />

            {/* Pink/Rose Accent - Medium Movement */}
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-30 blur-[120px] will-change-transform animate-aurora-2"
                style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(0, 0, 0, 0) 70%)' }}
            />

            {/* Brand Green Highlight - Faster, Subtle Flow */}
            <div
                className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full opacity-20 blur-[90px] will-change-transform animate-aurora-3"
                style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(0, 0, 0, 0) 70%)' }}
            />

            {/* Blue Deep Undertone */}
            <div
                className="absolute bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full opacity-30 blur-[110px] will-change-transform animate-aurora-2"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
                    animationDelay: '-5s'
                }}
            />

        </div>
    );
};

export default GradientBackground;
