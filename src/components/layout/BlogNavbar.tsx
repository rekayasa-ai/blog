'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Newspaper, FileText, Handshake, BookOpen, ExternalLink } from 'lucide-react';

interface NavLink {
    href: string;
    label: string;
    icon: React.ElementType;
    external?: boolean;
}

const navLinks: NavLink[] = [
    { href: 'https://rekayasaai.space', label: 'Belajar', icon: BookOpen, external: true },
    { href: '/news', label: 'Berita AI', icon: Newspaper },
    { href: '/tutorials', label: 'Tutorial', icon: BookOpen },
    { href: '/artikel', label: 'Artikel', icon: FileText },
    { href: '/kolaborasi', label: 'Kolaborasi', icon: Handshake },
];

export default function BlogNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
            : 'bg-white/95 border-b border-slate-100'
            }`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <span className="font-['Hero'] text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-electric transition-colors duration-300">
                            rekayasa<span className="text-electric">.ai</span>
                            <span className="text-slate-400 font-normal ml-1">/blog</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = !link.external && pathname.startsWith(link.href);

                            if (link.external) {
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 text-sm font-medium flex items-center gap-1.5 rounded-lg transition-all duration-200 text-slate-600 hover:text-electric hover:bg-electric/5"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                        <ExternalLink className="w-3 h-3 opacity-50" />
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 text-sm font-medium flex items-center gap-1.5 rounded-lg transition-all duration-200 ${isActive
                                        ? 'text-electric bg-electric/5'
                                        : 'text-slate-600 hover:text-electric hover:bg-electric/5'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:text-electric hover:bg-electric/5 transition-colors"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-x-0 bg-white flex flex-col shadow-xl"
                        style={{ top: '64px', height: 'calc(100vh - 64px)' }}
                    >
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            {navLinks.map((link, index) => {
                                const Icon = link.icon;
                                const isActive = !link.external && pathname.startsWith(link.href);

                                if (link.external) {
                                    return (
                                        <motion.a
                                            key={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-4 rounded-xl text-base font-medium flex items-center gap-3 text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Icon className="w-5 h-5 text-slate-400" />
                                            {link.label}
                                            <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
                                        </motion.a>
                                    );
                                }

                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`px-4 py-4 rounded-xl text-base font-medium flex items-center gap-3 transition-colors ${isActive
                                                ? 'text-electric bg-electric/5'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-electric' : 'text-slate-400'}`} />
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
