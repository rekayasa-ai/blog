import { supabase, DbPost } from './supabase';
import { Post, PostMeta, CATEGORIES, CategoryConfig, Author } from '@/types/content';

/**
 * Transform database post to PostMeta format
 */
function transformToPostMeta(dbPost: DbPost & { author: { name: string; avatar?: string | null; bio?: string | null } | null }): PostMeta {
    return {
        title: dbPost.title,
        slug: dbPost.slug,
        category: dbPost.category,
        excerpt: dbPost.excerpt,
        publishedAt: dbPost.published_at,
        updatedAt: dbPost.updated_at || undefined,
        author: {
            name: dbPost.author?.name || 'Tim Rekayasa AI',
            avatar: dbPost.author?.avatar || undefined,
            bio: dbPost.author?.bio || undefined,
        },
        coverImage: dbPost.cover_image || undefined,
        tags: dbPost.tags || [],
        featured: dbPost.featured,
        readingTime: dbPost.reading_time || undefined,
        articleType: dbPost.article_type || undefined,
    };
}

/**
 * Transform database post to full Post format
 */
function transformToPost(dbPost: DbPost & { author: { name: string; avatar?: string | null; bio?: string | null } | null }): Post {
    return {
        ...transformToPostMeta(dbPost),
        content: dbPost.content,
    };
}

/**
 * Get all posts from a specific category
 */
export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(*)
        `)
        .eq('category', category)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }

    return (data || []).map(transformToPostMeta);
}

/**
 * Get all posts from all categories
 */
export async function getAllPosts(): Promise<PostMeta[]> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(*)
        `)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching all posts:', error);
        return [];
    }

    return (data || []).map(transformToPostMeta);
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit = 5): Promise<PostMeta[]> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(*)
        `)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured posts:', error);
        return [];
    }

    return (data || []).map(transformToPostMeta);
}

/**
 * Get recent posts
 */
export async function getRecentPosts(limit = 10): Promise<PostMeta[]> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(*)
        `)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent posts:', error);
        return [];
    }

    return (data || []).map(transformToPostMeta);
}

/**
 * Get a single post by category and slug
 */
export async function getPostBySlug(category: string, slug: string): Promise<Post | null> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(*)
        `)
        .eq('category', category)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }

    return data ? transformToPost(data) : null;
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<{ category: string; slug: string }[]> {
    const { data, error } = await supabase
        .from('posts')
        .select('category, slug');

    if (error) {
        console.error('Error fetching all post slugs:', error);
        return [];
    }

    return data || [];
}

/**
 * Get category configuration by slug
 */
export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
    return CATEGORIES.find(cat => cat.slug === slug);
}

/**
 * Get related posts (same category, excluding current)
 */
export async function getRelatedPosts(
    category: string,
    currentSlug: string,
    limit = 4
): Promise<PostMeta[]> {
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:authors(*)
        `)
        .eq('category', category)
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }

    return (data || []).map(transformToPostMeta);
}
