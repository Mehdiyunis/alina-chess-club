import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
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
};

export const viewport: Viewport = {
  themeColor: '#0d0b17',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={`${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#0d0b17] text-[#ecebf5] font-sans antialiased selection:bg-[#7c5cff]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
