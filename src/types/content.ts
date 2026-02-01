// Content Types
export interface Author {
    name: string;
    avatar?: string;
    bio?: string;
}

export interface PostFrontmatter {
    title: string;
    slug: string;
    category: 'news' | 'tutorials' | 'artikel';
    excerpt: string;
    publishedAt: string;
    updatedAt?: string;
    author: Author;
    coverImage?: string;
    tags: string[];
    featured?: boolean;
    readingTime?: string;
    // For "artikel" category, specify the type
    articleType?: 'top-tools' | 'guide' | 'review' | 'opinion';
}

export interface Post extends PostFrontmatter {
    content: string;
}

export interface PostMeta extends PostFrontmatter {
    // Metadata only, no content
}

// Category Configuration
export interface CategoryConfig {
    slug: string;
    name: string;
    nameBahasa: string;
    description: string;
    color: string;
    icon: string;
}

export const CATEGORIES: CategoryConfig[] = [
    {
        slug: 'news',
        name: 'AI News',
        nameBahasa: 'Berita AI',
        description: 'Update terbaru dari dunia AI, khususnya yang relevan untuk Indonesia',
        color: 'badge-news',
        icon: 'Newspaper',
    },
    {
        slug: 'tutorials',
        name: 'Tutorials',
        nameBahasa: 'Tutorial',
        description: 'Panduan langkah demi langkah untuk menguasai teknologi AI',
        color: 'badge-tutorials',
        icon: 'BookOpen',
    },
    {
        slug: 'artikel',
        name: 'Articles',
        nameBahasa: 'Artikel',
        description: 'Review tools, panduan, dan artikel mendalam seputar AI',
        color: 'badge-artikel',
        icon: 'FileText',
    },
];

// Article Types for the "artikel" category
export interface ArticleTypeConfig {
    slug: string;
    name: string;
    nameBahasa: string;
}

export const ARTICLE_TYPES: ArticleTypeConfig[] = [
    { slug: 'top-tools', name: 'Top Tools', nameBahasa: 'Tools Terbaik' },
    { slug: 'guide', name: 'Guide', nameBahasa: 'Panduan' },
    { slug: 'review', name: 'Review', nameBahasa: 'Review' },
    { slug: 'opinion', name: 'Opinion', nameBahasa: 'Opini' },
];

// SEO Types
export interface ArticleSchema {
    '@context': 'https://schema.org';
    '@type': 'Article';
    headline: string;
    description: string;
    image?: string;
    author: {
        '@type': 'Person' | 'Organization';
        name: string;
    };
    publisher: {
        '@type': 'Organization';
        name: string;
        logo?: {
            '@type': 'ImageObject';
            url: string;
        };
    };
    datePublished: string;
    dateModified?: string;
}

export interface FAQSchema {
    '@context': 'https://schema.org';
    '@type': 'FAQPage';
    mainEntity: {
        '@type': 'Question';
        name: string;
        acceptedAnswer: {
            '@type': 'Answer';
            text: string;
        };
    }[];
}

// Navigation
export interface NavItem {
    href: string;
    label: string;
    external?: boolean;
}
