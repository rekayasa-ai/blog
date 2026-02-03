import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, PenLine, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kolaborasi | Rekayasa AI Blog',
    description: 'Bergabunglah sebagai penulis kontributor di Rekayasa AI Blog. Bagikan pengetahuan AI Anda dengan komunitas Indonesia.',
};

const benefits = [
    {
        icon: Users,
        title: 'Jangkauan Luas',
        description: 'Artikel Anda akan dibaca oleh ribuan praktisi AI di Indonesia',
    },
    {
        icon: PenLine,
        title: 'Platform Profesional',
        description: 'Tulis di platform yang dioptimasi untuk SEO dan AI discoverability',
    },
    {
        icon: MessageSquare,
        title: 'Komunitas Aktif',
        description: 'Bergabung dengan komunitas Discord untuk diskusi dan networking',
    },
];

const requirements = [
    'Memiliki pengalaman atau pengetahuan mendalam di bidang AI/ML',
    'Mampu menulis artikel dalam Bahasa Indonesia yang baik',
    'Bersedia mengikuti pedoman penulisan kami',
    'Artikel harus original dan belum dipublikasikan di tempat lain',
];

const topics = [
    'Tutorial AI & Machine Learning',
    'Review dan Perbandingan Tools AI',
    'Berita AI yang Relevan untuk Indonesia',
    'Studi Kasus Implementasi AI',
    'Tips & Best Practices',
    'Penjelasan Konsep AI untuk Pemula',
];

export default function KolaborasiPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 sm:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-electric/10 via-indigo-500/5 to-transparent rounded-full blur-3xl opacity-60" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Kolaborasi dengan{' '}
                        <span className="font-['Hero'] font-bold tracking-tight">
                            rekayasa<span className="text-electric">.ai</span>
                        </span>
                    </h1>

                    <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Apakah Anda memiliki pengetahuan AI yang ingin dibagikan?
                        Bergabunglah sebagai penulis kontributor dan reach ribuan pembaca di Indonesia.
                    </p>

                    <a
                        href="mailto:mail.rekayasaai@gmail.com?subject=Kolaborasi%20Blog%20Rekayasa%20AI"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric/90 transition-all duration-300 hover:shadow-lg hover:shadow-electric/25 text-lg"
                    >
                        <Mail className="w-5 h-5" />
                        Hubungi Kami
                    </a>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 bg-slate-50/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                            Mengapa Menulis di Rekayasa AI?
                        </h2>
                        <p className="text-slate-600">Keuntungan menjadi kontributor</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={benefit.title} className="card p-8 text-center">
                                    <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                        <Icon className="w-7 h-7 text-electric" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2 text-lg">{benefit.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* What We're Looking For */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Requirements */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">
                                Syarat Kontributor
                            </h2>
                            <ul className="space-y-5">
                                {requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-slate-600 leading-relaxed">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Topics */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">
                                Topik yang Kami Cari
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {topics.map((topic, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-electric/10 hover:text-electric transition-colors cursor-default"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-5">
                        Siap untuk Berkontribusi?
                    </h2>
                    <p className="text-slate-300 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
                        Kirim email ke kami dengan ide artikel Anda. Kami akan merespons dalam 2-3 hari kerja.
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-white/10">
                        <p className="text-slate-400 text-sm mb-2">Email:</p>
                        <a
                            href="mailto:mail.rekayasaai@gmail.com"
                            className="text-electric text-xl font-bold hover:underline flex items-center justify-center gap-2"
                        >
                            mail.rekayasaai@gmail.com
                            <ArrowRight className="w-5 h-5" />
                        </a>
                        <p className="text-slate-500 text-sm mt-4">
                            Subject: Kolaborasi Blog Rekayasa AI
                        </p>
                    </div>

                    <div className="mt-10">
                        <a
                            href="https://discord.gg/s9jwwtXc6V"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Atau hubungi via Discord
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
