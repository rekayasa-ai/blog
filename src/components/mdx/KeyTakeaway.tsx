'use client';

import { Lightbulb } from 'lucide-react';

interface KeyTakeawayProps {
    children: React.ReactNode;
    title?: string;
}

export default function KeyTakeaway({ children, title = 'Key Takeaway' }: KeyTakeawayProps) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-amber-500/[0.08] to-orange-500/[0.04] border border-amber-500/10 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-3 bg-amber-500/[0.06] border-b border-amber-500/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">{title}</span>
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
