'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, Search, Sparkles, BookOpen } from 'lucide-react';

// Smart link URL for monetization
const SMART_LINK_URL = 'https://www.effectivegatecpm.com/fkqjxcx6?key=8a49bdb3f699e4666d5d07e3864912ae';

export default function NotFound() {
    useEffect(() => {
        // Load popunder script once on page load
        const script = document.createElement('script');
        script.src = 'https://pl28636005.effectivegatecpm.com/ef/22/69/ef22693b2b254e459eb5901c7680ab08.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const existingScript = document.querySelector('script[src*="pl28636005.effectivegatecpm.com"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-electric/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-lg mx-auto">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[10rem] sm:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-300 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center">
                            <span className="text-5xl animate-bounce">🔍</span>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-slate-600 mb-10 leading-relaxed">
                    Oops! Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan ke lokasi lain.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-electric text-white font-semibold rounded-xl shadow-lg shadow-electric/25 hover:shadow-xl hover:shadow-electric/30 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <Home className="w-5 h-5" />
                        Kembali ke Beranda
                    </Link>
                    {/* Smart Link Button */}
                    <a
                        href={SMART_LINK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <Sparkles className="w-5 h-5" />
                        Lihat Rekomendasi
                    </a>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-slate-200/60">
                    <p className="text-sm text-slate-500 mb-4">Atau kunjungi halaman populer:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/belajar"
                            className="px-4 py-2 bg-slate-100 hover:bg-electric/10 text-slate-600 hover:text-electric text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                            Belajar AI
                        </Link>
                        {/* Smart Link */}
                        <a
                            href={SMART_LINK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-700 text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                            ✨ Penawaran Spesial
                        </a>
                        <Link
                            href="/berita"
                            className="px-4 py-2 bg-slate-100 hover:bg-electric/10 text-slate-600 hover:text-electric text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                            Berita
                        </Link>
                        {/* Smart Link */}
                        <a
                            href={SMART_LINK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 text-emerald-700 text-sm font-medium rounded-lg transition-colors duration-200"
                        >
                            🎁 Promo Terbaru
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
