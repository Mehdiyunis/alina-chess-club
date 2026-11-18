import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NewsDetail } from '@/components/NewsDetail';
import { createClient } from '@/lib/supabase/server';
import { getLocale, getDictionary } from '@/lib/i18n';
import { NewsItem, NewsMedia } from '@/lib/news';

export const dynamic = 'force-dynamic';

type NewsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.news.title} - ${dict.hero.title}`,
    description: dict.news.title,
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { id } = await params;

  if (!id) notFound();

  try {
    const supabase = await createClient();

    const { data: news, error } = await supabase
      .from('news')
      .select(
        'id, title_az, title_en, title_ru, body_az, body_en, body_ru, cover_url, is_published, created_at, updated_at'
      )
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.warn('News fetch error:', error.message);
      notFound();
    }

    if (!news) notFound();

    const { data: mediaData, error: mediaError } = await supabase
      .from('news_media')
      .select('id, news_id, media_type, url, file_name, caption, sort_order, created_at')
      .eq('news_id', id)
      .order('sort_order', { ascending: true });

    if (mediaError) {
      console.warn('News media fetch error:', mediaError.message);
    }

    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <Navbar />

        <main className="flex-1 pt-2.5 sm:pt-5 pb-10 sm:pb-14 px-4 sm:px-6">
          <NewsDetail item={news as NewsItem} media={(mediaData as NewsMedia[]) || []} />
        </main>

        <Footer />
      </div>
    );
  } catch (err) {
    console.warn('News detail exception:', err);
    notFound();
  }
}
