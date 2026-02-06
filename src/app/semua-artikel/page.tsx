import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowLeft } from 'lucide-react';
import { getAllPosts } from '@/lib/content';
import PostCard from '@/components/blog/PostCard';

// Revalidate every 10 seconds - fast updates while maintaining cache performance
export const revalidate = 10;

export const metadata: Metadata = {
    title: 'Semua Artikel | Rekayasa AI',
    description: 'Kumpulan lengkap semua artikel, berita, dan tutorial seputar kecerdasan buatan dari Rekayasa AI.',
    openGraph: {
        title: 'Semua Artikel | Rekayasa AI',
        description: 'Kumpulan lengkap semua artikel, berita, dan tutorial seputar kecerdasan buatan dari Rekayasa AI.',
        type: 'website',
    },
};

export default async function AllPostsPage() {
    const allPosts = await getAllPosts();

    return (
        <>
            {/* All Posts Grid */}
            <section className="py-16 bg-slate-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-electric transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                    </Link>
                    {allPosts.length > 0 ? (
                        <>
                            <div className="mb-10">
                                <p className="text-slate-600">
                                    Menampilkan <span className="font-semibold text-slate-900">{allPosts.length}</span> artikel dari semua kategori
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allPosts.map((post, index) => (
                                    <PostCard key={`${post.category}-${post.slug}`} post={post} index={index} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <Newspaper className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                Belum ada artikel
                            </h3>
                            <p className="text-slate-500 mb-8">
                                Artikel pertama akan segera hadir!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-xl hover:bg-electric/90 transition-colors"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
