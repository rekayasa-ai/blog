'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { PostMeta, CATEGORIES } from '@/types/content';

interface PostCardProps {
    post: PostMeta;
    index?: number;
    featured?: boolean;
}

export default function PostCard({ post, index = 0, featured = false }: PostCardProps) {
    const category = CATEGORIES.find(c => c.slug === post.category);

    if (featured) {
        return (
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card overflow-hidden group"
            >
                <Link href={`/${post.category}/${post.slug}`} className="block sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-slate-100 to-slate-50 relative min-h-[180px] sm:min-h-[320px]">
                        {post.coverImage ? (
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-electric/5 to-indigo-500/5">
                                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-4xl">📚</span>
                                </div>
                            </div>
                        )}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1.5 bg-gradient-to-r from-electric to-indigo-500 text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                                Featured
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
                        {/* Category Badge */}
                        {category && (
                            <div className="mb-3">
                                <span className={`inline-flex px-2.5 py-1 ${category.color} text-xs font-semibold rounded-full`}>
                                    {category.nameBahasa}
                                </span>
                            </div>
                        )}

                        {/* Meta - Date and reading time */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 sm:mb-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>
                                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            {post.readingTime && (
                                <>
                                    <span className="text-slate-300">•</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{post.readingTime}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-base sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-snug group-hover:text-electric transition-colors duration-300">
                            {post.title}
                        </h2>

                        {/* Excerpt - 2 lines with ellipsis on mobile */}
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-2 mb-3 sm:mb-6">
                            {post.excerpt}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-electric font-semibold text-sm sm:text-base group-hover:gap-3 transition-all duration-300 mt-3 sm:mt-4">
                            Baca Selengkapnya
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="card overflow-hidden group"
        >
            <Link href={`/${post.category}/${post.slug}`}>
                {/* Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-50 relative overflow-hidden">
                    {post.coverImage ? (
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-electric/5 to-indigo-500/5">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-2xl">📚</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                            {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                        {post.readingTime && (
                            <>
                                <span className="text-slate-300">•</span>
                                <span>{post.readingTime}</span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-electric transition-colors duration-300">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
            </Link>
        </motion.article>
    );
}
