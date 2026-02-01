import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Newspaper, FileText, BookOpen } from 'lucide-react';
import { getPostsByCategory, getCategoryBySlug } from '@/lib/content';
import { generateCategoryMetadata } from '@/lib/metadata';
import { CATEGORIES } from '@/types/content';
import PostCard from '@/components/blog/PostCard';

const iconMap: Record<string, React.ElementType> = {
    Newspaper,
    FileText,
    BookOpen,
};

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    return CATEGORIES.map((category) => ({
        category: category.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        return { title: 'Kategori Tidak Ditemukan' };
    }

    return generateCategoryMetadata(category);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    const posts = await getPostsByCategory(categorySlug);
    const Icon = iconMap[category.icon] || Newspaper;

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 sm:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-electric/10 via-indigo-500/5 to-transparent rounded-full blur-3xl opacity-50" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="text-center">
                        {/* Icon */}
                        <div className={`inline-flex w-20 h-20 ${category.color} rounded-2xl items-center justify-center mb-6`}>
                            <Icon className="w-10 h-10" />
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                            {category.nameBahasa}
                        </h1>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            {category.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-16 bg-slate-50/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts.length > 0 ? (
                        <>
                            <div className="mb-10">
                                <p className="text-slate-600">
                                    Menampilkan <span className="font-semibold text-slate-900">{posts.length}</span> artikel
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {posts.map((post, index) => (
                                    <PostCard key={post.slug} post={post} index={index} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <Icon className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                Belum ada artikel di kategori ini
                            </h3>
                            <p className="text-slate-500 mb-8">
                                Artikel pertama untuk {category.nameBahasa} akan segera hadir!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-xl hover:bg-electric/90 transition-colors"
                            >
                                Jelajahi Kategori Lain
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
