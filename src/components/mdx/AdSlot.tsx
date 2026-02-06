'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

type AdType = 'native-banner' | 'banner' | 'social-bar';

interface AdSlotProps {
    type?: AdType;
    className?: string;
}

// Adsterra ad configurations
const adConfig: Record<AdType, { minHeight: string; width?: number; height?: number }> = {
    'native-banner': {
        minHeight: '250px',
    },
    banner: {
        minHeight: '90px',
        width: 728,
        height: 90,
    },
    'social-bar': {
        minHeight: '50px',
        width: 320,
        height: 50,
    },
};

export default function AdSlot({ type = 'banner', className = '' }: AdSlotProps) {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const config = adConfig[type];

    // Get the appropriate ad key based on type
    const getAdKey = () => {
        switch (type) {
            case 'native-banner':
                return process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY;
            case 'banner':
                return process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY;
            case 'social-bar':
                return process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY;
            default:
                return null;
        }
    };

    const adKey = getAdKey();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !adKey || !adContainerRef.current) return;

        // Clear previous content
        adContainerRef.current.innerHTML = '';

        if (type === 'native-banner') {
            // Native Banner uses different format with container div
            const container = document.createElement('div');
            container.id = `container-${adKey}`;
            adContainerRef.current.appendChild(container);

            const script = document.createElement('script');
            script.async = true;
            script.setAttribute('data-cfasync', 'false');
            script.src = `https://pl28621946.effectivegatecpm.com/${adKey}/invoke.js`;
            adContainerRef.current.appendChild(script);
        } else {
            // Banner uses atOptions format
            const optionsScript = document.createElement('script');
            optionsScript.type = 'text/javascript';
            optionsScript.innerHTML = `
                atOptions = {
                    'key' : '${adKey}',
                    'format' : 'iframe',
                    'height' : ${config.height || 250},
                    'width' : ${config.width || 300},
                    'params' : {}
                };
            `;
            adContainerRef.current.appendChild(optionsScript);

            const invokeScript = document.createElement('script');
            invokeScript.type = 'text/javascript';
            invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
            invokeScript.async = true;
            adContainerRef.current.appendChild(invokeScript);
        }

        return () => {
            if (adContainerRef.current) {
                adContainerRef.current.innerHTML = '';
            }
        };
    }, [isClient, adKey, type, config]);

    // Show placeholder if no ad key is configured or not on client
    if (!isClient || !adKey) {
        return (
            <div
                className={`ad-slot rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center gap-2 ${className}`}
                style={{ minHeight: config.minHeight }}
            >
                <div className="px-3 py-1 bg-slate-200/70 rounded-full">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Advertisement
                    </span>
                </div>
                <p className="text-slate-400 text-sm">Ad space available</p>
            </div>
        );
    }

    return (
        <div
            ref={adContainerRef}
            className={`ad-slot flex items-center justify-center overflow-hidden ${className}`}
            style={{ minHeight: config.minHeight }}
        />
    );
}

// Popunder Ad component (runs once on page load)
export function PopunderAd() {
    return (
        <Script
            id="adsterra-popunder"
            strategy="afterInteractive"
            src="https://pl28636005.effectivegatecpm.com/ef/22/69/ef22693b2b254e459eb5901c7680ab08.js"
        />
    );
}

// Smart Link component (affiliate links)
export function SmartLink({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const smartLinkUrl = process.env.NEXT_PUBLIC_ADSTERRA_SMARTLINK_URL;

    if (!smartLinkUrl) {
        return <span className={className}>{children}</span>;
    }

    return (
        <a
            href={smartLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {children}
        </a>
    );
}

// Social Bar component - Custom wrapper with elegant design
// Creates a visible slide-up bar that contains the Adsterra ad script
export function SocialBar({
    delay = 5000,
    sessionOnly = true
}: {
    delay?: number;
    sessionOnly?: boolean;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const adContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);

        // Check if user has dismissed the bar before
        const storage = sessionOnly ? sessionStorage : localStorage;
        const wasDismissed = storage.getItem('socialBarDismissed') === 'true';

        if (wasDismissed) {
            setIsDismissed(true);
            return;
        }

        // Show bar after delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, sessionOnly]);

    // Load the ad script when visible
    useEffect(() => {
        if (!isVisible || !adContainerRef.current || isDismissed) return;

        // Clear previous content
        adContainerRef.current.innerHTML = '';

        // Create and inject the Adsterra script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pl28623810.effectivegatecpm.com/a8/dd/22/a8dd2252d768d071d06bd30e4bac231a.js';
        adContainerRef.current.appendChild(script);

        return () => {
            if (adContainerRef.current) {
                adContainerRef.current.innerHTML = '';
            }
        };
    }, [isVisible, isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);

        // Store dismissal preference
        const storage = sessionOnly ? sessionStorage : localStorage;
        storage.setItem('socialBarDismissed', 'true');

        // Clean up after animation
        setTimeout(() => setIsDismissed(true), 400);
    };

    if (isDismissed || !isClient) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[99999] transform transition-all duration-500 ease-out ${isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
        >
            {/* Main container with glassmorphism effect */}
            <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-white/10 shadow-2xl">
                {/* Decorative top gradient line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

                {/* Content wrapper */}
                <div className="relative flex items-center justify-between px-4 py-3">
                    {/* Sponsor label */}
                    <div className="flex-shrink-0 mr-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            Sponsor
                        </span>
                    </div>

                    {/* Ad content area */}
                    <div
                        ref={adContainerRef}
                        className="flex-1 flex items-center justify-center min-h-[50px] overflow-hidden"
                    >
                        {/* Placeholder while ad loads */}
                        <div className="flex items-center gap-3 text-slate-500">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs text-slate-500">Loading...</span>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 ml-4 flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-all duration-200 hover:scale-105"
                        aria-label="Tutup iklan"
                        title="Tutup"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                        Tutup
                    </button>
                </div>

                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
        </div>
    );
}

