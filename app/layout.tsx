import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import './globals.css';
import { VisitTracker } from '@/components/VisitTracker';
import { LanguageProvider } from '@/components/LanguageProvider';
import { LanguageSync } from '@/components/LanguageSync';
import { getLocale, getDictionary } from '@/lib/i18n';

const raleway = Raleway({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      type: 'website',
      locale: locale === 'az' ? 'az_AZ' : locale === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.description,
    },
    icons: {
      icon: '/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png',
      apple: '/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#F7F3EA',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${raleway.variable} ${cormorant.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#F7F3EA] text-[#1E2A22] font-sans antialiased selection:bg-[#2F5D46]/20 selection:text-[#1E2A22]"
        suppressHydrationWarning
      >
        <LanguageProvider initialLocale={locale} initialDictionary={dict}>
          <VisitTracker />
          <LanguageSync />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
