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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b17] text-[#ecebf5]">
      {/* Sticky Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Teachers Slider */}
        <TeachersSlider />

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
