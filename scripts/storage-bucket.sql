-- Create a storage bucket for post images
-- Run this in Supabase SQL Editor

-- First, insert the bucket into storage.buckets
INSERT INTO
    storage.buckets (id, name, public)
VALUES (
        'post-images',
        'post-images',
        true
    )
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow public read access
CREATE POLICY "Public read access for post images" ON storage.objects FOR
SELECT USING (bucket_id = 'post-images');

-- Create a policy to allow authenticated uploads (optional - for admin)
CREATE POLICY "Allow authenticated uploads to post images" ON storage.objects FOR INSERT
WITH
    CHECK (bucket_id = 'post-images');