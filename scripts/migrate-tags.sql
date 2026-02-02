-- Migration: Add tags column to posts table
-- Run this in Supabase SQL Editor to migrate existing database

-- Step 1: Add tags column as TEXT array
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags TEXT [] DEFAULT '{}';

-- Step 2: Create GIN index for efficient tag array searches
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN (tags);

-- Step 3 (Optional): Migrate existing tags from junction table
-- Uncomment and run this if you have existing data in post_tags/tags tables
/*
UPDATE posts p
SET tags = (
SELECT COALESCE(array_agg(t.name), '{}')
FROM post_tags pt
JOIN tags t ON t.id = pt.tag_id
WHERE pt.post_id = p.id
);
*/

-- Step 4 (Optional): Drop old tables after verifying migration
-- Only run after confirming Step 3 worked correctly!
/*
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS tags;
*/