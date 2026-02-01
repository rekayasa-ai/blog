'use client';

import { useEffect, useRef } from 'react';

interface AdSlotProps {
    type?: 'banner' | 'sidebar' | 'in-article' | 'video' | 'native';
    className?: string;
}

// Adsterra ad configurations
// You need to get these script URLs from your Adsterra dashboard for each ad format
const adConfig: Record<string, { minHeight: string; adKey?: string; adWidth?: number; adHeight?: number }> = {
    banner: {
        minHeight: '90px',
        adKey: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY,
        adWidth: 728,
        adHeight: 90,
    },
    sidebar: {
        minHeight: '250px',
        adKey: process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY,
        adWidth: 300,
        adHeight: 250,
    },
    'in-article': {
        minHeight: '120px',
        adKey: process.env.NEXT_PUBLIC_ADSTERRA_INARTICLE_KEY,
        adWidth: 468,
        adHeight: 60,
    },
    video: {
        minHeight: '280px',
        adKey: process.env.NEXT_PUBLIC_ADSTERRA_VIDEO_KEY,
        adWidth: 640,
        adHeight: 360,
    },
    native: {
        minHeight: '250px',
        adKey: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY,
    },
};

export default function AdSlot({ type = 'banner', className = '' }: AdSlotProps) {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const config = adConfig[type];

    useEffect(() => {
        // Only run on client and if ad key is configured
        if (!config.adKey || !adContainerRef.current) return;

        // Create the ad script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;

        // Adsterra Display Ads script format
        script.src = `//www.highperformanceformat.com/${config.adKey}/invoke.js`;

        // Create the ad options
        const optionsScript = document.createElement('script');
        optionsScript.type = 'text/javascript';
        optionsScript.innerHTML = `
            atOptions = {
                'key': '${config.adKey}',
                'format': '${type === 'native' ? 'native' : 'iframe'}',
                'height': ${config.adHeight || 250},
                'width': ${config.adWidth || 300},
                'params': {}
            };
        `;

        // Append scripts to the container
        adContainerRef.current.appendChild(optionsScript);
        adContainerRef.current.appendChild(script);

        // Cleanup on unmount
        return () => {
            if (adContainerRef.current) {
                adContainerRef.current.innerHTML = '';
            }
        };
    }, [config.adKey, type]);

    // Show placeholder if no ad key is configured
    if (!config.adKey) {
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
            className={`ad-slot flex items-center justify-center ${className}`}
            style={{ minHeight: config.minHeight }}
        />
    );
}
