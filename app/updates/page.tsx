import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NewsList } from '@/components/NewsList';
import { createClient } from '@/lib/supabase/server';
import { getLocale, getDictionary } from '@/lib/i18n';
import { NewsItem } from '@/lib/news';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.news.title} - ${dict.hero.title}`,
    description: dict.news.title,
  };
}

async function getNewsData(): Promise<{ items: NewsItem[]; error: string | null }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('news')
      .select(
        'id, title_az, title_en, title_ru, body_az, body_en, body_ru, cover_url, is_published, created_at, updated_at'
      )
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return { items: [], error: error.message };
    }

    return { items: (data as NewsItem[]) || [], error: null };
  } catch (err: any) {
    return { items: [], error: err?.message || 'Supabase connection error.' };
  }
}

export default async function NewsPage() {
  const { items, error } = await getNewsData();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <NewsList items={items} error={error} />
      </main>

      <Footer />
    </div>
  );
}
