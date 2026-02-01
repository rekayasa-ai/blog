'use client';

import { useState } from 'react';
import { Check, Copy, File } from 'lucide-react';

interface CodeBlockProps {
    children: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
}

export default function CodeBlock({
    children,
    language = 'plaintext',
    filename,
    showLineNumbers = false
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = children.trim().split('\n');

    return (
        <div className="my-8 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/50 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    {/* Filename or Language */}
                    {filename ? (
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                            <File className="w-4 h-4" />
                            <span className="font-medium">{filename}</span>
                        </div>
                    ) : language !== 'plaintext' && (
                        <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{language}</span>
                    )}
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Content */}
            <div className="overflow-x-auto">
                <pre className="!m-0 !p-0 !bg-transparent !rounded-none !border-none">
                    <code className={`language-${language} block p-5 text-sm leading-relaxed`}>
                        {showLineNumbers ? (
                            <table className="border-collapse">
                                <tbody>
                                    {lines.map((line, index) => (
                                        <tr key={index}>
                                            <td className="pr-4 text-right text-slate-600 select-none font-mono text-xs w-8">
                                                {index + 1}
                                            </td>
                                            <td className="text-slate-300 font-mono">
                                                {line || ' '}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <span className="text-slate-300 font-mono">{children}</span>
                        )}
                    </code>
                </pre>
            </div>
        </div>
    );
}
