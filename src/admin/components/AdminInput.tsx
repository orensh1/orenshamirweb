
import React from 'react';
import { cn } from '../../utils/cn';

interface AdminInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: 'text' | 'textarea' | 'image';
    className?: string;
}

export function AdminInput({ label, value, onChange, type = 'text', className }: AdminInputProps) {
    return (
        <div className={cn("mb-6", className)}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {label}
            </label>

            {type === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-slate-700/50 transition-all font-sans text-base leading-relaxed"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-slate-700/50 transition-all font-sans text-base"
                />
            )}
        </div>
    );
}
