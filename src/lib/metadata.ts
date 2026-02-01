import { Metadata } from 'next';
import { PostMeta, CategoryConfig } from '@/types/content';

const SITE_URL = 'https://blog.rekayasaai.space';
const SITE_NAME = 'Rekayasa AI Blog';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

/**
 * Generate metadata for a blog post
 */
export function generatePostMetadata(post: PostMeta): Metadata {
    const url = `${SITE_URL}/${post.category}/${post.slug}`;
    const ogImage = post.coverImage || DEFAULT_OG_IMAGE;

    return {
        title: `${post.title} | ${SITE_NAME}`,
        description: post.excerpt,
        authors: [{ name: post.author.name }],
        keywords: post.tags,
        openGraph: {
            type: 'article',
            url,
            title: post.title,
            description: post.excerpt,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author.name],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
        },
    };
}

/**
 * Generate metadata for a category page
 */
export function generateCategoryMetadata(category: CategoryConfig): Metadata {
    const url = `${SITE_URL}/${category.slug}`;

    return {
        title: `${category.nameBahasa} | ${SITE_NAME}`,
        description: category.description,
        openGraph: {
            type: 'website',
            url,
            title: `${category.nameBahasa} | ${SITE_NAME}`,
            description: category.description,
            siteName: SITE_NAME,
            images: [
                {
                    url: DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: category.nameBahasa,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${category.nameBahasa} | ${SITE_NAME}`,
            description: category.description,
            images: [DEFAULT_OG_IMAGE],
        },
        alternates: {
            canonical: url,
        },
    };
}

/**
 * Generate default site metadata
 */
export function generateDefaultMetadata(): Metadata {
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: SITE_NAME,
            template: `%s | ${SITE_NAME}`,
        },
        description: 'Blog resmi Rekayasa AI - Tutorial, Berita AI, Tools Terbaik, dan Analogi AI untuk komunitas Indonesia.',
        keywords: [
            'AI', 'Artificial Intelligence', 'Machine Learning',
            'Tutorial AI', 'Berita AI', 'Indonesia',
            'LLM', 'ChatGPT', 'OpenAI', 'Deep Learning'
        ],
        authors: [{ name: 'Tim Rekayasa AI' }],
        creator: 'Rekayasa AI',
        publisher: 'Rekayasa AI',
        openGraph: {
            type: 'website',
            locale: 'id_ID',
            url: SITE_URL,
            siteName: SITE_NAME,
            images: [
                {
                    url: DEFAULT_OG_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: SITE_NAME,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@rekayasaai',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            // Add your verification codes here
            // google: 'your-google-verification-code',
        },
    };
}
