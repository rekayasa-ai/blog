import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for Supabase tables
export interface DbAuthor {
    id: string;
    name: string;
    avatar: string | null;
    bio: string | null;
    created_at: string;
}

export interface DbPost {
    id: string;
    slug: string;
    title: string;
    category: 'news' | 'tutorials' | 'artikel';
    article_type: 'top-tools' | 'guide' | 'review' | 'opinion' | null;
    excerpt: string;
    content: string;
    cover_image: string | null;
    published_at: string;
    updated_at: string | null;
    featured: boolean;
    reading_time: string | null;
    author_id: string;
    created_at: string;
    // Joined data
    author?: DbAuthor;
    tags?: DbTag[];
}

export interface DbTag {
    id: string;
    name: string;
}

export interface DbPostTag {
    post_id: string;
    tag_id: string;
}
