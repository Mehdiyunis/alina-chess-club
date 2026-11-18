import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Raleway } from 'next/font/google';
import './globals.css';
import { VisitTracker } from '@/components/VisitTracker';
import { LanguageProvider } from '@/components/LanguageProvider';
import { LanguageSync } from '@/components/LanguageSync';
import { ThemeProvider, Theme } from '@/components/ThemeProvider';
import { getLocale, getDictionary } from '@/lib/i18n';
import { createClient } from '@/lib/supabase/server';
import { getSupabaseConfig } from '@/lib/supabase/config';

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
  width: 'device-width',
  initialScale: 1,
};

async function getThemeState(): Promise<{
  theme: Theme;
  isAuthenticated: boolean;
}> {
  if (!getSupabaseConfig().isConfigured) {
    return { theme: 'light', isAuthenticated: false };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { theme: 'light', isAuthenticated: false };
    }

    const { data } = await supabase
      .from('profiles')
      .select('theme')
      .eq('id', user.id)
      .maybeSingle();

    return {
      theme: data?.theme === 'dark' ? 'dark' : 'light',
      isAuthenticated: true,
    };
  } catch {
    return { theme: 'light', isAuthenticated: false };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const { theme, isAuthenticated } = await getThemeState();

  // Runs before paint: guests get the browser choice, members get the account choice.
  const themeScript = `(function(){try{var t=${JSON.stringify(
    theme
  )};var a=${JSON.stringify(
    isAuthenticated
  )};var s=localStorage.getItem('chess-theme');if(!a&&(s==='light'||s==='dark'))t=s;document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content=t;}catch(e){}})();`;

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={`${raleway.variable} ${cormorant.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content={theme} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans antialiased selection:bg-[var(--primary-bg)]/20 selection:text-[var(--ink)]"
        suppressHydrationWarning
      >
        <ThemeProvider initialTheme={theme} isAuthenticated={isAuthenticated}>
          <LanguageProvider initialLocale={locale} initialDictionary={dict}>
            <VisitTracker />
            <LanguageSync />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
