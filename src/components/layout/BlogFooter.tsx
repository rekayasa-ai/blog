import Link from 'next/link';
import { CATEGORIES } from '@/types/content';
import { ExternalLink, MessageCircle } from 'lucide-react';

export default function BlogFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="inline-block font-['Hero'] text-2xl font-bold mb-4">
                            rekayasa<span className="text-electric">.ai</span>
                            <span className="text-slate-400 font-normal ml-1">/blog</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Blog resmi Rekayasa AI — Sumber terpercaya untuk berita, tutorial,
                            dan artikel AI untuk komunitas Indonesia.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider" style={{ color: 'white' }}>Kategori</h4>
                        <ul className="space-y-3">
                            {CATEGORIES.map((category) => (
                                <li key={category.slug}>
                                    <Link
                                        href={`/${category.slug}`}
                                        className="text-slate-400 hover:text-electric transition-colors text-sm"
                                    >
                                        {category.nameBahasa}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/kolaborasi"
                                    className="text-slate-400 hover:text-electric transition-colors text-sm"
                                >
                                    Kolaborasi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider" style={{ color: 'white' }}>Tautan</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://rekayasaai.space"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-electric transition-colors text-sm inline-flex items-center gap-1.5"
                                >
                                    Rekayasa AI
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://discord.gg/s9jwwtXc6V"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-electric transition-colors text-sm inline-flex items-center gap-1.5"
                                >
                                    Discord
                                    <MessageCircle className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Placeholder */}
                    <div>
                        <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider" style={{ color: 'white' }}>Stay Updated</h4>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                            Join komunitas Discord untuk update terbaru.
                        </p>
                        <a
                            href="https://discord.gg/s9jwwtXc6V"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-electric text-white font-semibold rounded-xl hover:bg-electric/90 transition-colors text-sm"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Join Discord
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © {currentYear} Rekayasa AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
