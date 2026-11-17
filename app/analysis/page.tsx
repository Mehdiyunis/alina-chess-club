import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnalysisBoard } from '@/components/AnalysisBoard';
import { getLocale, getDictionary } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.navbar.analysis} - ${dict.hero.title}`,
    description: dict.sandbox.subtitle,
  };
}

export default function AnalysisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#1E2A22]">
      <Navbar />

      <main className="flex-1 py-1 sm:py-2">
        <AnalysisBoard />
      </main>

      <Footer />
    </div>
  );
}
