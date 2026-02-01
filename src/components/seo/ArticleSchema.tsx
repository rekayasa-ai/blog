import { PostMeta } from '@/types/content';

interface ArticleSchemaProps {
    post: PostMeta;
}

export default function ArticleSchema({ post }: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage || 'https://blog.rekayasaai.space/images/og-default.png',
        author: {
            '@type': 'Person',
            name: post.author.name,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Rekayasa AI',
            logo: {
                '@type': 'ImageObject',
                url: 'https://blog.rekayasaai.space/images/logo.png',
            },
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://blog.rekayasaai.space/${post.category}/${post.slug}`,
        },
        keywords: post.tags.join(', '),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
