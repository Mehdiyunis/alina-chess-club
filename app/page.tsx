import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { TeachersSlider } from '@/components/TeachersSlider';
import { StartingBoard } from '@/components/StartingBoard';
import { PiecesSection } from '@/components/PiecesSection';
import { GameGoalsSection } from '@/components/GameGoalsSection';
import { SpecialMovesSection } from '@/components/SpecialMovesSection';
import { BeginnerTipsSection } from '@/components/BeginnerTipsSection';
import { FaqSection } from '@/components/FaqSection';
import { HistorySection } from '@/components/HistorySection';
import { ContactSection } from '@/components/ContactSection';
import { PositionSetupBoard } from '@/components/PositionSetupBoard';
import { Footer } from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { Teacher } from '@/lib/siteData';

export const dynamic = 'force-dynamic';

async function getTeachersData(): Promise<Teacher[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('teachers')
      .select('id, first_name, last_name, role_title, description, photo_url, sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Failed to load teachers from Supabase:', error.message);
      return [];
    }
    return (data as Teacher[]) || [];
  } catch (err) {
    console.warn('Teachers fetch exception:', err);
    return [];
  }
}

export default async function HomePage() {
  const teachers = await getTeachersData();

  return (
    <div className="min-h-screen flex flex-col bg-[#100c08] text-[#f3ece1]">
      {/* Sticky Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Teachers Slider (Dynamic from Supabase; hides if table is empty) */}
        <TeachersSlider teachers={teachers} />

        {/* Section 3: Starting Position Board */}
        <StartingBoard />

        {/* Section 4: Chess Pieces */}
        <PiecesSection />

        {/* Section 5: Goals of the Game (Shah, Mat, Pat, Hech-heche) */}
        <GameGoalsSection />

        {/* Section 6: Special Moves (Rokirovka, Piyadanın Vəzirə Çevrilməsi, Keçiddə Götürmə) */}
        <SpecialMovesSection />

        {/* Section 7: Beginner Tips (6 Golden Rules) */}
        <BeginnerTipsSection />

        {/* Section 8: FAQ Accordion */}
        <FaqSection />

        {/* Section 9: Azerbaijan Chess Heritage & Grandmasters */}
        <HistorySection />

        {/* Section 10: Contact Form */}
        <ContactSection />

        {/* Section 11: Position-Setup Sandbox Chessboard */}
        <PositionSetupBoard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
