
import React, { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { Lock, ArrowRight } from 'lucide-react';

export interface AdminLoginProps {
    onLogin: (token: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    useEffect(() => {
        // Initialize Netlify Identity
        netlifyIdentity.init();

        // Check if user is already logged in
        const user = netlifyIdentity.currentUser();
        if (user && user.token?.access_token) {
            onLogin(user.token.access_token);
        }

        // Listen for login events
        netlifyIdentity.on('login', (user) => {
            if (user && user.token?.access_token) {
                onLogin(user.token.access_token);
                netlifyIdentity.close();
            }
        });

        return () => {
            netlifyIdentity.off('login');
        };
    }, [onLogin]);

    const handleLogin = () => {
        netlifyIdentity.open();
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-4">
            <div className="w-full max-w-md text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-purple-900/50">
                    <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black tracking-tighter mb-2">Admin Access</h1>
                <p className="text-slate-400 mb-8">Login via Netlify Identity to manage content.</p>

                <button
                    onClick={handleLogin}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                    <span>Login with Netlify Identity</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};
