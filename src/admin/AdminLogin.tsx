
import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
    onLogin: (password: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app this would check against a hash, here we rely on the server to validate for saving
        // But for UI access, we can set a simple client pin or just let them in to See (save will fail)
        // Changing approach: Let them in, but save will fail if password wrong.
        // However, to mimic "auth", let's just ask.
        if (input.length > 0) {
            onLogin(input);
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-900/50">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter mb-2">Admin Access</h1>
                    <p className="text-slate-400">Enter your secure key to manage content.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="password"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter secure key..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-6 py-5 pr-14 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-lg placeholder:text-slate-600 text-center"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 aspect-square bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-500 transition-colors"
                    >
                        <ArrowRight size={20} />
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-4 text-sm">Please enter a key</p>}
            </div>
        </div>
    );
}
