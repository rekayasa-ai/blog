-- Seed data for Rekayasa AI Blog
-- Run this in Supabase SQL Editor AFTER running schema.sql

-- Insert default author
INSERT INTO
    authors (id, name)
VALUES (
        'a0000000-0000-0000-0000-000000000001',
        'Tim Rekayasa AI'
    )
ON CONFLICT DO NOTHING;

-- Insert tags
INSERT INTO
    tags (id, name)
VALUES (
        'b0000000-0000-0000-0000-000000000001',
        'OpenAI'
    ),
    (
        'b0000000-0000-0000-0000-000000000002',
        'GPT-5'
    ),
    (
        'b0000000-0000-0000-0000-000000000003',
        'LLM'
    ),
    (
        'b0000000-0000-0000-0000-000000000004',
        'Breaking News'
    ),
    (
        'b0000000-0000-0000-0000-000000000005',
        'AI Tools'
    ),
    (
        'b0000000-0000-0000-0000-000000000006',
        'IDE'
    ),
    (
        'b0000000-0000-0000-0000-000000000007',
        'Coding'
    ),
    (
        'b0000000-0000-0000-0000-000000000008',
        'Productivity'
    ),
    (
        'b0000000-0000-0000-0000-000000000009',
        'Top Tools'
    ),
    (
        'b0000000-0000-0000-0000-000000000010',
        'Transformer'
    ),
    (
        'b0000000-0000-0000-0000-000000000011',
        'Arsitektur'
    ),
    (
        'b0000000-0000-0000-0000-000000000012',
        'Deep Learning'
    ),
    (
        'b0000000-0000-0000-0000-000000000013',
        'Tutorial'
    )
ON CONFLICT (name) DO NOTHING;

-- Insert post 1: News - OpenAI GPT-5
INSERT INTO
    posts (
        id,
        slug,
        title,
        category,
        excerpt,
        content,
        published_at,
        featured,
        reading_time,
        author_id
    )
VALUES (
        'c0000000-0000-0000-0000-000000000001',
        'openai-rilis-gpt-5',
        'OpenAI Rilis GPT-5: Kemampuan Reasoning Setara PhD',
        'news',
        'OpenAI mengumumkan GPT-5 dengan kemampuan reasoning tingkat lanjut yang diklaim setara dengan mahasiswa PhD dalam berbagai bidang.',
        '# OpenAI Rilis GPT-5: Kemampuan Reasoning Setara PhD

**San Francisco, 1 Februari 2026** — OpenAI hari ini mengumumkan peluncuran GPT-5, model bahasa terbaru mereka yang diklaim memiliki kemampuan reasoning setara dengan mahasiswa PhD dalam berbagai bidang akademis.

## Apa yang Baru di GPT-5?

Menurut pengumuman resmi OpenAI, GPT-5 membawa beberapa peningkatan signifikan:

1. **Extended Context Window** - Mampu memproses hingga 500.000 tokens
2. **Advanced Reasoning** - Performa 95% pada benchmark GPQA (Graduate-Level Physics Q&A)
3. **Multimodal Native** - Pemrosesan teks, gambar, audio, dan video secara native
4. **Real-time Learning** - Kemampuan belajar dari interaksi tanpa fine-tuning

<ProTip>
GPT-5 sudah tersedia untuk pengguna ChatGPT Plus dan Enterprise. API akan menyusul dalam beberapa minggu ke depan.
</ProTip>

## Implikasi untuk Indonesia

Bagi ekosistem AI Indonesia, peluncuran ini membuka peluang baru:

- **Riset akademis** - Kolaborasi dengan AI untuk penelitian tingkat lanjut
- **Enterprise automation** - Kemampuan reasoning kompleks untuk proses bisnis
- **Pendidikan** - AI tutor dengan kemampuan penjelasan setara dosen

## Respons Komunitas

Komunitas AI global memberikan respons beragam terhadap pengumuman ini. Beberapa menyambut positif kemajuan teknologi, sementara yang lain mengkhawatirkan implikasi etis dari AI dengan kemampuan reasoning tingkat tinggi.

---

*Artikel ini akan diperbarui seiring tersedianya informasi baru. Follow [Rekayasa AI di Discord](https://discord.gg/s9jwwtXc6V) untuk diskusi lebih lanjut.*',
        '2026-02-01',
        false,
        '2 min read',
        'a0000000-0000-0000-0000-000000000001'
    )
ON CONFLICT (category, slug) DO
UPDATE
SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    published_at = EXCLUDED.published_at,
    featured = EXCLUDED.featured,
    reading_time = EXCLUDED.reading_time;

-- Insert post 2: Artikel - AI Code Assistants
INSERT INTO
    posts (
        id,
        slug,
        title,
        category,
        article_type,
        excerpt,
        content,
        published_at,
        featured,
        reading_time,
        author_id
    )
VALUES (
        'c0000000-0000-0000-0000-000000000002',
        'ai-code-assistant-terbaik-2026',
        '5 AI Code Assistant Terbaik untuk Developer Indonesia (2026)',
        'artikel',
        'top-tools',
        'Review lengkap 5 AI coding assistant terbaik yang bisa membantu developer Indonesia menulis code lebih cepat dan efisien.',
        '# 5 AI Code Assistant Terbaik untuk Developer Indonesia (2026)

AI code assistants telah menjadi tools esensial bagi developer modern. Dari autocomplete sederhana hingga full code generation, tools ini bisa meningkatkan produktivitas hingga 50%.

Mari kita review 5 AI code assistant terbaik yang bisa kamu gunakan hari ini.

## 1. GitHub Copilot

**Rating: ⭐⭐⭐⭐⭐ (Best Overall)**

GitHub Copilot adalah standar industri untuk AI coding assistant. Didukung oleh OpenAI Codex, Copilot terintegrasi langsung dengan VS Code, JetBrains, dan editor populer lainnya.

**Kelebihan:**
- Autocomplete yang sangat akurat
- Mendukung hampir semua bahasa pemrograman
- Chat interface untuk Q&A
- Integrasi dengan GitHub ecosystem

**Kekurangan:**
- Berbayar ($10-19/bulan)
- Memerlukan koneksi internet

```python
# Copilot bisa generate function dari comment
# Function to calculate fibonacci sequence
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

<ProTip>
Student dan maintainer open source project bisa dapat akses gratis ke GitHub Copilot!
</ProTip>

---

## 2. Cursor

**Rating: ⭐⭐⭐⭐⭐ (Best for Power Users)**

Cursor adalah IDE berbasis VS Code yang dibangun dari ground-up untuk AI. Fitur unggulannya adalah kemampuan memahami seluruh codebase kamu.

**Kelebihan:**
- Memahami context seluruh project
- CMD+K untuk inline editing
- Multi-file editing sekaligus
- Bisa reference documentation

**Kekurangan:**
- Learning curve untuk fitur advanced
- Memerlukan subscription untuk AI models terbaik

---

## 3. Codeium

**Rating: ⭐⭐⭐⭐ (Best Free Option)**

Codeium menawarkan autocomplete AI yang powerful secara gratis untuk individual developers.

**Kelebihan:**
- **GRATIS** untuk individual use
- Mendukung 70+ bahasa
- Ada fitur chat
- Privacy-focused

---

## 4. Amazon CodeWhisperer

**Rating: ⭐⭐⭐⭐ (Best for AWS Users)**

Jika kamu banyak bekerja dengan AWS services, CodeWhisperer adalah pilihan tepat.

**Kelebihan:**
- Gratis untuk individual use
- Terintegrasi dengan AWS SDK
- Security scanning built-in

---

## 5. Tabnine

**Rating: ⭐⭐⭐⭐ (Best for Privacy)**

Tabnine menawarkan AI completion yang bisa berjalan locally.

**Kelebihan:**
- Bisa run fully offline
- Model bisa di-training dengan codebase sendiri
- Tidak mengirim code ke cloud

---

## Perbandingan Harga

| Tool | Free Tier | Pro Price |
|------|-----------|-----------|
| GitHub Copilot | Tidak | $10/bulan |
| Cursor | Terbatas | $20/bulan |
| Codeium | Ya, unlimited | $12/bulan |
| CodeWhisperer | Ya | $19/bulan |
| Tabnine | Terbatas | $12/bulan |

## Rekomendasi Kami

- **Pemula**: Mulai dengan **Codeium** (gratis)
- **Professional**: **GitHub Copilot** atau **Cursor**
- **AWS Developer**: **Amazon CodeWhisperer**
- **Enterprise/Privacy**: **Tabnine**

---

*Tertarik dengan AI tools lainnya? Join [Discord Rekayasa AI](https://discord.gg/s9jwwtXc6V) untuk rekomendasi dan diskusi!*',
        '2026-02-01',
        false,
        '5 min read',
        'a0000000-0000-0000-0000-000000000001'
    )
ON CONFLICT (category, slug) DO
UPDATE
SET
    title = EXCLUDED.title,
    article_type = EXCLUDED.article_type,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    published_at = EXCLUDED.published_at,
    featured = EXCLUDED.featured,
    reading_time = EXCLUDED.reading_time;

-- Insert post 3: Tutorial - Transformer
INSERT INTO
    posts (
        id,
        slug,
        title,
        category,
        excerpt,
        content,
        published_at,
        featured,
        reading_time,
        author_id
    )
VALUES (
        'c0000000-0000-0000-0000-000000000003',
        'memahami-transformer-arsitektur',
        'Memahami Transformer: Arsitektur di Balik ChatGPT',
        'tutorials',
        'Panduan lengkap memahami arsitektur Transformer, fondasi dari semua model bahasa modern seperti GPT, BERT, dan LLaMA. Dijelaskan dengan analogi sederhana.',
        '# Memahami Transformer: Arsitektur di Balik ChatGPT

Transformer adalah arsitektur neural network yang menjadi fondasi dari semua model AI modern seperti ChatGPT, GPT-4, dan LLaMA. Paper aslinya, "Attention Is All You Need", dirilis oleh Google pada 2017 dan mengubah sepenuhnya cara kita membangun model AI.

## Mengapa Transformer Penting?

Sebelum Transformer, model bahasa menggunakan RNN (Recurrent Neural Networks) yang memproses data secara berurutan. Ini lambat dan sulit menangkap hubungan antara kata-kata yang berjauhan.

<ProTip>
Transformer memungkinkan pemrosesan paralel, yang berarti training bisa 10-100x lebih cepat dibanding RNN pada hardware modern.
</ProTip>

## Komponen Utama Transformer

### 1. Self-Attention Mechanism

Self-Attention adalah "mata" dari Transformer. Mekanisme ini memungkinkan model untuk memperhatikan semua posisi dalam input secara bersamaan.

```python
def self_attention(query, key, value):
    # Hitung attention scores
    scores = torch.matmul(query, key.transpose(-2, -1))
    scores = scores / math.sqrt(d_k)
    
    # Apply softmax untuk mendapat weights
    attention_weights = F.softmax(scores, dim=-1)
    
    # Multiply dengan values
    output = torch.matmul(attention_weights, value)
    return output
```

### 2. Multi-Head Attention

Alih-alih satu attention, Transformer menggunakan multiple "heads" yang masing-masing bisa fokus pada aspek berbeda dari input.

### 3. Feed-Forward Networks

Setelah attention, setiap token diproses melalui fully-connected layers:

```python
class FeedForward(nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        return self.linear2(self.relu(self.linear1(x)))
```

## Bagaimana Training Dilakukan?

Model Transformer ditraining dengan memprediksi token berikutnya dalam sequence. Ini disebut **causal language modeling**:

1. Input: "Saya suka makan"
2. Target: "suka makan nasi"
3. Model belajar memprediksi setiap token berikutnya

## Implementasi Praktis

Untuk mulai eksperimen dengan Transformer, kamu bisa menggunakan library seperti Hugging Face:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load pre-trained model
model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Generate text
input_text = "Artificial Intelligence adalah"
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(**inputs, max_length=50)

print(tokenizer.decode(outputs[0]))
```

## Kesimpulan

Transformer telah merevolusi bidang AI dan menjadi arsitektur standar untuk:

- **Large Language Models** (GPT, LLaMA, Gemini)
- **Computer Vision** (ViT, CLIP)
- **Speech** (Whisper)
- **Multimodal** (GPT-4V, Gemini)

<ProTip>
Ingin belajar lebih dalam? Baca paper original "Attention Is All You Need" dan coba implementasi sendiri di PyTorch!
</ProTip>

---

*Artikel ini adalah bagian dari seri Tutorial AI dari Rekayasa AI. Bergabunglah dengan [komunitas Discord](https://discord.gg/s9jwwtXc6V) untuk diskusi lebih lanjut!*',
        '2026-02-01',
        true,
        '5 min read',
        'a0000000-0000-0000-0000-000000000001'
    )
ON CONFLICT (category, slug) DO
UPDATE
SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    published_at = EXCLUDED.published_at,
    featured = EXCLUDED.featured,
    reading_time = EXCLUDED.reading_time;

-- Link posts to tags
-- Post 1: OpenAI GPT-5 News
INSERT INTO
    post_tags (post_id, tag_id)
VALUES (
        'c0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000001'
    ),
    (
        'c0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000002'
    ),
    (
        'c0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000003'
    ),
    (
        'c0000000-0000-0000-0000-000000000001',
        'b0000000-0000-0000-0000-000000000004'
    )
ON CONFLICT DO NOTHING;

-- Post 2: AI Code Assistants
INSERT INTO
    post_tags (post_id, tag_id)
VALUES (
        'c0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000005'
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000006'
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000007'
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000008'
    ),
    (
        'c0000000-0000-0000-0000-000000000002',
        'b0000000-0000-0000-0000-000000000009'
    )
ON CONFLICT DO NOTHING;

-- Post 3: Transformer Tutorial
INSERT INTO
    post_tags (post_id, tag_id)
VALUES (
        'c0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000010'
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000003'
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000011'
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000012'
    ),
    (
        'c0000000-0000-0000-0000-000000000003',
        'b0000000-0000-0000-0000-000000000013'
    )
ON CONFLICT DO NOTHING;