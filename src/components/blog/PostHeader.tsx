import Link from 'next/link';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { PostMeta, CATEGORIES } from '@/types/content';

interface PostHeaderProps {
    post: PostMeta;
}

export default function PostHeader({ post }: PostHeaderProps) {
    const category = CATEGORIES.find(c => c.slug === post.category);

    return (
        <header className="mb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
                <span className="text-slate-500">
                    Blog
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                {category && (
                    <>
                        <span className="text-slate-500">
                            {category.nameBahasa}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                    </>
                )}
                <span className="text-slate-400 truncate max-w-[200px]">{post.title}</span>
            </nav>

            {/* Category Badge */}
            {category && (
                <div className="mb-5">
                    <span className={`inline-flex px-3 py-1.5 ${category.color} text-sm font-semibold rounded-full`}>
                        {category.nameBahasa}
                    </span>
                </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.15] tracking-tight">
                {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100">
                {/* Author */}
                <div className="flex items-center gap-3">
                    {post.author.avatar ? (
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-electric/20 to-indigo-500/20 rounded-full flex items-center justify-center ring-2 ring-slate-100">
                            <User className="w-5 h-5 text-electric" />
                        </div>
                    )}
                    <div>
                        <div className="font-semibold text-slate-900">{post.author.name}</div>
                        <div className="text-sm text-slate-500">Penulis</div>
                    </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-slate-200" />

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <span>
                        {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                </div>

                {/* Reading time */}
                {post.readingTime && (
                    <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-5 h-5 text-slate-400" />
                        <span>{post.readingTime}</span>
                    </div>
                )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-full hover:bg-electric/10 hover:text-electric transition-colors cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </header>
    );
}
