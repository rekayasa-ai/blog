import Link from 'next/link';
import { ArrowRight, Newspaper, FileText, BookOpen, TrendingUp } from 'lucide-react';
import { getRecentPosts, getFeaturedPosts } from '@/lib/content';
import { CATEGORIES } from '@/types/content';
import PostCard from '@/components/blog/PostCard';

// Revalidate every 60 seconds - enables ISR for fresh content without redeployment
export const revalidate = 60;

const iconMap: Record<string, React.ElementType> = {
  Newspaper,
  FileText,
  BookOpen,
};

export default async function HomePage() {
  const recentPosts = await getRecentPosts(8);
  const featuredPosts = await getFeaturedPosts(1);
  const featured = featuredPosts[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50/50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-electric/8 via-indigo-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-violet-500/5 via-transparent to-transparent rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
              Baca. Pelajari.{' '}
              <span className="relative">
                <span className="gradient-text">Kuasai AI.</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5Q50 1 100 5.5T199 5.5" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#0ea5e9" />
                      <stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
              Berita AI terkini, tutorial mendalam, dan artikel berkualitas
              seputar kecerdasan buatan khusus untuk komunitas Indonesia.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon] || Newspaper;
              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl ${category.color} font-semibold text-sm hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/50`}
                >
                  <Icon className="w-4 h-4" />
                  {category.nameBahasa}
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          {/* Featured Post */}
          {featured && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                  <TrendingUp className="w-4 h-4 text-electric" />
                  Featured Article
                </span>
              </div>
              <PostCard post={featured} featured index={0} />
            </div>
          )}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-24 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Artikel Terbaru</h2>
              <p className="text-slate-600 text-lg">Konten terbaru dari tim Rekayasa AI</p>
            </div>
            <Link
              href="/artikel"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-electric hover:text-white transition-all duration-300"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Newspaper className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Belum ada artikel</h3>
              <p className="text-slate-500">Artikel pertama akan segera hadir!</p>
            </div>
          )}

          {/* Mobile CTA */}
          <div className="sm:hidden text-center mt-10">
            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-xl"
            >
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-electric/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Jelajahi Kategori</h2>
            <p className="text-slate-600 text-lg max-w-lg mx-auto">
              Temukan konten yang sesuai dengan minat dan kebutuhan belajar Anda
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {CATEGORIES.map((category, index) => {
              const Icon = iconMap[category.icon] || Newspaper;
              return (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-electric/30 hover:shadow-2xl hover:shadow-electric/5 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-electric transition-colors duration-300">
                      {category.nameBahasa}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-electric font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Jelajahi
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-electric/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-electric/10 to-violet-500/10 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" style={{ color: 'white' }}>
            Ingin berkontribusi dalam
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-indigo-400">
              pengembangan AI di Indonesia?
            </span>
          </h2>
          <p className="text-slate-300 mb-12 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Kami membuka kolaborasi untuk penulis yang ingin berbagi pengetahuan
            seputar AI dengan komunitas Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/kolaborasi"
              className="px-8 py-4 bg-gradient-to-r from-electric to-indigo-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-electric/30 transition-all duration-300 hover:scale-105"
            >
              Ajukan Kolaborasi
            </Link>
            <a
              href="https://discord.gg/s9jwwtXc6V"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Join Discord Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
