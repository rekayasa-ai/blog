'use client';

import { Zap } from 'lucide-react';

interface TLDRProps {
    children: React.ReactNode;
    title?: string;
}

export default function TLDR({ children, title = 'TL;DR' }: TLDRProps) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-blue-500/[0.08] to-cyan-500/[0.04] border border-blue-500/10 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-3 bg-blue-500/[0.06] border-b border-blue-500/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">{title}</span>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
                <div className="text-slate-700 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
