-- Supabase Schema for Rekayasa AI Blog
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors table
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW ()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL UNIQUE
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (
        category IN (
            'news',
            'tutorials',
            'artikel'
        )
    ),
    article_type TEXT CHECK (
        article_type IN (
            'top-tools',
            'guide',
            'review',
            'opinion'
        )
    ),
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    published_at TIMESTAMP
    WITH
        TIME ZONE NOT NULL,
        updated_at TIMESTAMP
    WITH
        TIME ZONE,
        featured BOOLEAN DEFAULT FALSE,
        reading_time TEXT,
        author_id UUID REFERENCES authors (id) ON DELETE SET NULL,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW (),
        UNIQUE (category, slug)
);

-- Post-Tags junction table
CREATE TABLE IF NOT EXISTS post_tags (
    post_id UUID REFERENCES posts (id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags (id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts (category);

CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts (featured);

CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts (published_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts (slug);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on authors" ON authors FOR
SELECT USING (true);

CREATE POLICY "Allow public read access on posts" ON posts FOR
SELECT USING (true);

CREATE POLICY "Allow public read access on tags" ON tags FOR
SELECT USING (true);

CREATE POLICY "Allow public read access on post_tags" ON post_tags FOR
SELECT USING (true);