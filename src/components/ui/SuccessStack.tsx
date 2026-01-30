import React from 'react';
import { User, TrendingUp, Phone } from 'lucide-react';

const SuccessStack: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex items-center justify-center -translate-x-1/4 translate-y-20 opacity-60">
            <div className="relative w-[300px] h-[400px]">
                {/* Card 1: New Lead */}
                <div
                    className="absolute left-0 bottom-0 animate-float-up"
                    style={{ animationDelay: '0s' }}
                >
                    <GlassCard icon={<User size={20} className="text-blue-400" />} text="New Lead Generated" />
                </div>

                {/* Card 2: Traffic */}
                <div
                    className="absolute left-10 bottom-24 animate-float-up"
                    style={{ animationDelay: '2.5s' }}
                >
                    <GlassCard icon={<TrendingUp size={20} className="text-green-400" />} text="+150% Traffic" />
                </div>

                {/* Card 3: Call Scheduled */}
                <div
                    className="absolute -left-8 bottom-48 animate-float-up"
                    style={{ animationDelay: '5s' }}
                >
                    <GlassCard icon={<Phone size={20} className="text-purple-400" />} text="Call Scheduled" />
                </div>
            </div>
        </div>
    );
};

const GlassCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-2xl min-w-[220px]">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            {icon}
        </div>
        <span className="text-sm font-medium text-white/90">{text}</span>
    </div>
);

export default SuccessStack;
