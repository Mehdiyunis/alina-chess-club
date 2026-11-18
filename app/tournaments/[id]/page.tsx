import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TournamentDetail } from '@/components/TournamentDetail';
import { createClient } from '@/lib/supabase/server';
import { getLocale, getDictionary } from '@/lib/i18n';
import {
  Tournament,
  TournamentDay,
  TournamentMatch,
  TournamentPlayer,
  TournamentRound,
} from '@/lib/tournaments';

export const dynamic = 'force-dynamic';

type TournamentPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.tournaments.title} - ${dict.hero.title}`,
    description: dict.tournaments.title,
  };
}

export default async function TournamentDetailPage({ params }: TournamentPageProps) {
  const { id } = await params;

  if (!id) notFound();

  try {
    const supabase = await createClient();

    const { data: tournament, error } = await supabase
      .from('tournaments')
      .select(
        'id, title_az, title_en, title_ru, description_az, description_en, description_ru, cover_url, starts_at, ends_at, round_count, status, is_published, created_at, updated_at'
      )
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.warn('Tournament fetch error:', error.message);
      notFound();
    }

    if (!tournament) notFound();

    const [daysResult, playersResult, roundsResult, matchesResult] = await Promise.all([
      supabase
        .from('tournament_days')
        .select('id, tournament_id, starts_at, ends_at, note_az, note_en, note_ru, sort_order')
        .eq('tournament_id', id)
        .order('sort_order', { ascending: true }),
      supabase
        .from('tournament_players')
        .select('id, tournament_id, profile_id, full_name, age_category, grade, created_at')
        .eq('tournament_id', id)
        .order('full_name', { ascending: true }),
      supabase
        .from('tournament_rounds')
        .select('id, tournament_id, round_number, is_manual, generated_at')
        .eq('tournament_id', id)
        .order('round_number', { ascending: true }),
      supabase
        .from('tournament_matches')
        .select(
          'id, tournament_id, round_id, round_number, board_number, age_category, grade, white_player_id, black_player_id, result, is_bye, updated_at'
        )
        .eq('tournament_id', id)
        .order('round_number', { ascending: true })
        .order('board_number', { ascending: true }),
    ]);

    if (daysResult.error) console.warn('Tournament days error:', daysResult.error.message);
    if (playersResult.error) console.warn('Tournament players error:', playersResult.error.message);
    if (roundsResult.error) console.warn('Tournament rounds error:', roundsResult.error.message);
    if (matchesResult.error) console.warn('Tournament matches error:', matchesResult.error.message);

    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <Navbar />

        <main className="flex-1 pt-5 sm:pt-10 pb-10 sm:pb-14 px-4 sm:px-6">
          <TournamentDetail
            item={tournament as Tournament}
            days={(daysResult.data as TournamentDay[]) || []}
            players={(playersResult.data as TournamentPlayer[]) || []}
            rounds={(roundsResult.data as TournamentRound[]) || []}
            matches={(matchesResult.data as TournamentMatch[]) || []}
          />
        </main>

        <Footer />
      </div>
    );
  } catch (err) {
    console.warn('Tournament detail exception:', err);
    notFound();
  }
}
