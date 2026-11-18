import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PlayClient } from '@/components/PlayClient';
import { getLocale, getDictionary } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.navbar.play} - ${dict.hero.title}`,
    description: dict.sandbox.subtitle,
  };
}

export default function PlayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1">
        <PlayClient />
      </main>

      <Footer />
    </div>
  );
}
