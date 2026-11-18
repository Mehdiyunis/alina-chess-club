import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProfileClient } from '@/components/ProfileClient';
import { createClient } from '@/lib/supabase/server';
import { getSupabaseConfig } from '@/lib/supabase/config';
import { Book, BookLevel } from '@/lib/siteData';
import { getLocale, getDictionary } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.profile.title} - ${dict.meta.title}`,
    description: dict.profile.subtitle,
  };
}

interface ProfileUser {
  id: string;
  name: string;
  email: string;
}

interface BookRow {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  level: BookLevel;
  cover_url: string | null;
  file_url: string;
  file_name: string | null;
}

interface UserBookRow {
  book_id: string;
  books: BookRow | BookRow[] | null;
}

async function getProfileData(): Promise<{
  user: ProfileUser | null;
  books: Book[];
  error: string | null;
}> {
  if (!getSupabaseConfig().isConfigured) {
    return { user: null, books: [], error: null };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { user: null, books: [], error: null };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();

    const { data: rows, error } = await supabase
      .from('user_books')
      .select(
        'book_id, books ( id, title, author, description, level, cover_url, file_url, file_name )'
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return {
        user: {
          id: user.id,
          name:
            profile?.full_name ||
            user.user_metadata?.full_name ||
            user.email?.split('@')[0] ||
            'Tələbə',
          email: user.email || '',
        },
        books: [],
        error: error.message,
      };
    }

    const parsedRows = (rows as unknown as UserBookRow[]) || [];
    const books: Book[] = parsedRows
      .flatMap((row) => {
        const embedded = row.books;
        const book = Array.isArray(embedded) ? embedded[0] : embedded;
        return book ? [book] : [];
      })
      .map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author || '',
        description: book.description || '',
        level: book.level,
        cover_url: book.cover_url,
        file_url: `/api/books/download?path=${encodeURIComponent(book.file_url)}`,
        file_name: book.file_name || book.title,
        created_at: new Date().toISOString(),
      }));

    return {
      user: {
        id: user.id,
        name:
          profile?.full_name ||
          user.user_metadata?.full_name ||
          user.email?.split('@')[0] ||
          'Tələbə',
        email: user.email || '',
      },
      books,
      error: null,
    };
  } catch (err: any) {
    return {
      user: null,
      books: [],
      error: err?.message || 'Supabase connection error.',
    };
  }
}

export default async function ProfilePage() {
  const { user, books, error } = await getProfileData();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <ProfileClient user={user} books={books} error={error} />
      </main>

      <Footer />
    </div>
  );
}
