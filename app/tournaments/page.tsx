import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TournamentList } from '@/components/TournamentList';
import { createClient } from '@/lib/supabase/server';
import { getLocale, getDictionary } from '@/lib/i18n';
import { Tournament } from '@/lib/tournaments';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.tournaments.title} - ${dict.hero.title}`,
    description: dict.tournaments.title,
  };
}

async function getTournaments(): Promise<{
  items: Tournament[];
  error: string | null;
}> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('tournaments')
      .select(
        'id, title_az, title_en, title_ru, description_az, description_en, description_ru, cover_url, starts_at, ends_at, round_count, status, is_published, created_at, updated_at'
      )
      .eq('is_published', true)
      .order('starts_at', { ascending: false });

    if (error) {
      return { items: [], error: error.message };
    }

    return { items: (data as Tournament[]) || [], error: null };
  } catch (err: any) {
    return { items: [], error: err?.message || 'Supabase connection error.' };
  }
}

export default async function TournamentsPage() {
  const { items, error } = await getTournaments();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <TournamentList items={items} error={error} />
      </main>

      <Footer />
    </div>
  );
}
