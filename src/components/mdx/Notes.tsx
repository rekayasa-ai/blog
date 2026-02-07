'use client';

import { StickyNote } from 'lucide-react';

interface NotesProps {
    children: React.ReactNode;
    title?: string;
}

export default function Notes({ children, title = 'Notes' }: NotesProps) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-purple-500/[0.08] to-violet-500/[0.04] border border-purple-500/10 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-3 bg-purple-500/[0.06] border-b border-purple-500/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <StickyNote className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">{title}</span>
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
