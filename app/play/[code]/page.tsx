import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PlayClient } from '@/components/PlayClient';
import { getLocale, getDictionary } from '@/lib/i18n';

type RoomPageProps = {
  params: Promise<{ code: string }>;
};

function normalizeRoomCode(value: string) {
  try {
    return decodeURIComponent(value).trim().toUpperCase();
  } catch {
    return value.trim().toUpperCase();
  }
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const [{ code }, locale] = await Promise.all([params, getLocale()]);
  const dict = await getDictionary(locale);

  return {
    title: `${dict.navbar.play} · ${normalizeRoomCode(code)} - ${dict.hero.title}`,
    description: dict.sandbox.subtitle,
  };
}

export default async function PlayRoomPage({ params }: RoomPageProps) {
  const { code } = await params;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#1E2A22]">
      <Navbar />

      <main className="flex-1">
        <PlayClient initialRoomCode={normalizeRoomCode(code)} />
      </main>

      <Footer />
    </div>
  );
}
