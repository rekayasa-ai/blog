import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getCategoryBySlug } from '@/lib/content';
import { generatePostMetadata } from '@/lib/metadata';

import PostHeader from '@/components/blog/PostHeader';
import PostCard from '@/components/blog/PostCard';
import ShareButtons from '@/components/blog/ShareButtons';
import ArticleSchema from '@/components/seo/ArticleSchema';

// Revalidate every 60 seconds - enables ISR for fresh content without redeployment
export const revalidate = 60;
import AIAnalogy from '@/components/mdx/AIAnalogy';
import ProTip from '@/components/mdx/ProTip';
import KeyTakeaway from '@/components/mdx/KeyTakeaway';
import TLDR from '@/components/mdx/TLDR';
import Notes from '@/components/mdx/Notes';
import CodeBlock from '@/components/mdx/CodeBlock';
import AdSlot, { PopunderAd, SmartLink } from '@/components/mdx/AdSlot';

interface PostPageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// MDX components mapping
const mdxComponents = {
    AIAnalogy,
    ProTip,
    KeyTakeaway,
    TLDR,
    Notes,
    CodeBlock,
    AdSlot,
    SmartLink,
    // Override default elements
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre {...props} className="!bg-slate-900 !rounded-none !p-0 overflow-hidden !border !border-slate-800/50">
            {children}
        </pre>
    ),
    code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
        const isInline = !className;
        if (isInline) {
            return (
                <code
                    className="bg-electric/10 text-electric px-1.5 py-0.5 rounded-md text-[0.9em] font-medium"
                    {...props}
                >
                    {children}
                </code>
            );
        }
        return <code className={className} {...props}>{children}</code>;
    },
    a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            href={href}
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-electric font-medium hover:underline underline-offset-2"
            {...props}
        >
            {children}
        </a>
    ),
    blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-electric/30 pl-6 italic text-slate-600 my-8 bg-slate-50 py-4 pr-6 rounded-r-xl"
            {...props}
        >
            {children}
        </blockquote>
    ),
    table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-hidden my-10 rounded-2xl">
            <table className="min-w-full" {...props}>
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-gradient-to-r from-navy via-navy/95 to-navy" {...props}>
            {children}
        </thead>
    ),
    th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider" {...props}>
            {children}
        </th>
    ),
    tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="transition-colors duration-200 hover:bg-electric/[0.03] even:bg-slate-50/50" {...props}>
            {children}
        </tr>
    ),
    td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-6 py-4 text-sm text-slate-700 border-b border-slate-100/80 first:font-semibold first:text-slate-900" {...props}>
            {children}
        </td>
    ),
    hr: () => (
        <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    ),
};

// Generate static params for all posts
export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    return slugs.map(({ category, slug }) => ({
        category,
        slug,
    }));
}

// Generate metadata for the post
export async function generateMetadata({ params }: PostPageProps) {
    const { category, slug } = await params;
    const post = await getPostBySlug(category, slug);

    if (!post) {
        return { title: 'Artikel Tidak Ditemukan' };
    }

    return generatePostMetadata(post);
}

export default async function PostPage({ params }: PostPageProps) {
    const { category: categorySlug, slug } = await params;
    const post = await getPostBySlug(categorySlug, slug);
    const category = getCategoryBySlug(categorySlug);

    if (!post || !category) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(categorySlug, slug, 3);

    return (
        <>
            {/* JSON-LD Schema */}
            <ArticleSchema post={post} />

            <article className="py-12 sm:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Ad Slot - Top Banner */}
                    <AdSlot type="banner" className="mb-10" />

                    {/* Post Header */}
                    <PostHeader post={post} />

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-auto"
                            />
                        </div>
                    )}

                    {/* MDX Content */}
                    <div className="prose prose-sm sm:prose-lg max-w-none">
                        <MDXRemote
                            source={post.content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                    rehypePlugins: [rehypeHighlight, rehypeSlug],
                                },
                            }}
                        />
                    </div>

                    {/* Ad Slot - Native Banner */}
                    <AdSlot type="native-banner" className="mt-12" />

                    {/* Author Box */}
                    <div className="mt-14 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start gap-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-electric/20 to-indigo-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                {post.author.avatar ? (
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-full h-full rounded-2xl object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl">✍️</span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 mb-1">Ditulis oleh</p>
                                <h4 className="font-bold text-slate-900 text-lg mb-2">{post.author.name}</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    {post.author.bio || 'Kontributor Rekayasa AI yang passionate tentang teknologi AI dan dampaknya di Indonesia.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Share */}
                    <div className="mt-10 pt-8 border-t border-slate-200">
                        <ShareButtons
                            url={`https://blog.rekayasaai.space/${categorySlug}/${slug}`}
                            title={post.title}
                        />
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-slate-50/50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Artikel Terkait</h2>
                                <p className="text-slate-600">Mungkin Anda juga tertarik</p>
                            </div>
                            <Link
                                href={`/${categorySlug}`}
                                className="hidden sm:flex items-center gap-2 text-electric font-semibold hover:gap-3 transition-all duration-300"
                            >
                                Lihat Semua
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost, index) => (
                                <PostCard key={relatedPost.slug} post={relatedPost} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Popunder Ad (loads once, delayed) */}
            <PopunderAd />
        </>
    );
}
