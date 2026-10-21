import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Şahmat Məktəbi - Uşaqlar və Yeni Başlayanlar üçün Şahmat',
  description: 'Uşaqlar və yeni başlayanlar üçün interaktiv şahmat öyrənmə portalı - qaydalar, fiqurların hərəkəti, müəllimlər və şahmat lövhəsi qurucusu.',
  openGraph: {
    title: 'Şahmat Məktəbi - Uşaqlar və Yeni Başlayanlar üçün Şahmat',
    description: 'Uşaqlar və yeni başlayanlar üçün interaktiv şahmat öyrənmə portalı - qaydalar, fiqurların hərəkəti, müəllimlər və şahmat lövhəsi qurucusu.',
    type: 'website',
    locale: 'az_AZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Şahmat Məktəbi',
    description: 'Uşaqlar və yeni başlayanlar üçün interaktiv şahmat öyrənmə portalı.',
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
    <html lang="az" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0d0b17] text-[#ecebf5] antialiased selection:bg-[#7c5cff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
