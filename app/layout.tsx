import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Şahmat Məktəbi - Uşaqlar və Yeni Başlayanlar üçün Şahmat',
  description: 'Uşaqlar və yeni başlayanlar üçün şahmat təhsili: qaydalar, fiqurların hərəkəti, dərsliklər və interaktiv şahmat lövhəsi.',
  openGraph: {
    title: 'Şahmat Məktəbi',
    description: 'Uşaqlar və yeni başlayanlar üçün sadə və aydın şahmat dərsləri.',
    type: 'website',
    locale: 'az_AZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Şahmat Məktəbi',
    description: 'Uşaqlar və yeni başlayanlar üçün sadə və aydın şahmat dərsləri.',
  },
  icons: {
    icon: '/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png',
    apple: '/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#100c08',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="az"
      className={`${manrope.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#100c08] text-[#f3ece1] font-sans antialiased selection:bg-[#e9cfa0]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
