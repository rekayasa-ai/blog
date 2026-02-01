'use client';

import { Lightbulb } from 'lucide-react';

interface AIAnalogyProps {
    concept: string;
    analogy: string;
}

export default function AIAnalogy({ concept, analogy }: AIAnalogyProps) {
    return (
        <div className="my-8 rounded-2xl bg-gradient-to-br from-electric/[0.08] to-indigo-500/[0.04] border border-electric/10 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 bg-electric/[0.06] border-b border-electric/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-electric/20 rounded-xl flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-electric" />
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-electric uppercase tracking-wider">Analogi</div>
                        <div className="font-bold text-slate-900">{concept}</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
                <p className="text-slate-700 leading-relaxed text-lg italic">
                    "{analogy}"
                </p>
            </div>
        </div>
    );
}
