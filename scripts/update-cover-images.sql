-- Step 1: Create the storage bucket (run in SQL Editor)
-- Go to Supabase Dashboard → Storage → New bucket → Name: "post-images" → Make it PUBLIC

-- Step 2: Upload images via Dashboard
-- Go to Storage → post-images → Upload the 3 images from public/images/

-- Step 3: After uploading images, run this SQL to update posts with image URLs
-- Replace YOUR_PROJECT_ID with your actual Supabase project ID (iedixjrxllaamnplapoh)

UPDATE posts
SET
    cover_image = 'https://iedixjrxllaamnplapoh.supabase.co/storage/v1/object/public/post-images/gpt5-news-cover.png'
WHERE
    slug = 'openai-rilis-gpt-5';

UPDATE posts
SET
    cover_image = 'https://iedixjrxllaamnplapoh.supabase.co/storage/v1/object/public/post-images/code-assistant-cover.png'
WHERE
    slug = 'ai-code-assistant-terbaik-2026';

UPDATE posts
SET
    cover_image = 'https://iedixjrxllaamnplapoh.supabase.co/storage/v1/object/public/post-images/transformer-cover.png'
WHERE
    slug = 'memahami-transformer-arsitektur';

-- Verify the updates
SELECT slug, title, cover_image FROM posts;