import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content';
import { CATEGORIES } from '@/types/content';

const SITE_URL = 'https://blog.rekayasaai.space';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get all posts
    const posts = await getAllPosts();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(category => ({
        url: `${SITE_URL}/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    // Post pages
    const postPages: MetadataRoute.Sitemap = posts.map(post => ({
        url: `${SITE_URL}/${post.category}/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...postPages];
}
