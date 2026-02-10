
import React, { useState } from 'react';
import { useContent } from './useContent';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { AdminLogin } from './AdminLogin';
import { Loader2, Save, ExternalLink, Monitor, Smartphone, Layout } from 'lucide-react';
import { cn } from '../utils/cn';

export default function AdminPage() {
    const { content, loading, saving, error, updateSection, saveContent } = useContent();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

    if (!isAuthenticated) {
        return <AdminLogin onLogin={(pass) => { setPassword(pass); setIsAuthenticated(true); }} />;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden">
            {/* Sidebar / Editor */}
            <div className="w-[500px] flex-shrink-0 border-r border-white/10 flex flex-col h-screen bg-[#0f172a]">
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-slate-900/50 backdrop-blur-md z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                            Admin <span className="text-purple-500">Dashboard</span>
                        </h1>
                        <p className="text-xs text-slate-400 font-mono mt-1">v2.0 • Custom React Build</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => saveContent(password)}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-sm transition-all shadow-lg shadow-purple-900/20"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            Error: {error}
                        </div>
                    )}
                    <Editor content={content} onUpdate={updateSection} />
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-[#050505] relative flex flex-col h-screen overflow-hidden">
                {/* Toolbar */}
                <div className="h-14 border-b border-white/5 flex items-center justify-center gap-4 bg-black/50 backdrop-blur text-sm text-slate-400">
                    <span className="uppercase tracking-widest text-[10px] font-bold">Live Preview</span>
                    <div className="h-4 w-px bg-white/10"></div>
                    <button
                        onClick={() => setPreviewMode('desktop')}
                        className={cn("p-2 rounded hover:bg-white/5 transition-colors", previewMode === 'desktop' && "text-white bg-white/10")}
                    >
                        <Monitor size={16} />
                    </button>
                    <button
                        onClick={() => setPreviewMode('mobile')}
                        className={cn("p-2 rounded hover:bg-white/5 transition-colors", previewMode === 'mobile' && "text-white bg-white/10")}
                    >
                        <Smartphone size={16} />
                    </button>
                    <div className="h-4 w-px bg-white/10"></div>
                    <a href="/" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                        <ExternalLink size={14} /> View Site
                    </a>
                </div>

                {/* Viewport */}
                <div className="flex-1 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 flex items-center justify-center p-8 bg-black">
                    <div className={cn(
                        "transition-all duration-500 ease-in-out border border-white/10 shadow-2xl overflow-hidden bg-black",
                        previewMode === 'mobile' ? "w-[375px] h-[700px] rounded-[3rem] border-4 border-slate-800" : "w-full h-full rounded-lg"
                    )}>
                        <div className={cn("w-full h-full overflow-y-auto scrollbar-thin", previewMode === 'desktop' ? "scale-100" : "")}>
                            <Preview content={content} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
