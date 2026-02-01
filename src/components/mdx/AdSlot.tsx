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
    const popunderKey = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_KEY;

    if (!popunderKey) return null;

    return (
        <Script
            id="adsterra-popunder"
            strategy="afterInteractive"
            src={`//www.highperformanceformat.com/${popunderKey}/invoke.js`}
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

// Social Bar component (fixed position bar)
export function SocialBar() {
    const socialBarKey = process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_KEY;

    if (!socialBarKey) return null;

    return (
        <Script
            id="adsterra-social-bar"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                    atOptions = {
                        'key' : '${socialBarKey}',
                        'format' : 'iframe',
                        'height' : 50,
                        'width' : 320,
                        'params' : {}
                    };
                `
            }}
        />
    );
}
