
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AdminSectionProps {
    id: string;
    title: string;
    icon?: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

export const AdminSection: React.FC<AdminSectionProps> = ({ title, icon, isOpen, onToggle, children }) => {
    return (
        <div className="mb-6 rounded-xl overflow-hidden border border-white/5 shadow-lg bg-slate-900/50 backdrop-blur-md">
            <button
                onClick={onToggle}
                className={cn(
                    "w-full flex items-center justify-between p-4 transition-colors",
                    isOpen ? "bg-slate-800/80 text-white" : "bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800/30"
                )}
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-xl">{icon}</span>}
                    <span className="font-bold text-lg">{title}</span>
                </div>
                {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>

            {isOpen && (
                <div className="p-6 bg-slate-950/30 animate-in slide-in-from-top-2 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};
