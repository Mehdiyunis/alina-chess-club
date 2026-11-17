import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BooksClient } from '@/components/BooksClient';
import { createClient } from '@/lib/supabase/server';
import { Book } from '@/lib/siteData';
import { getLocale, getDictionary } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: `${dict.books.title} - ${dict.hero.title}`,
    description: dict.books.subtitle,
  };
}

async function getBooksData(): Promise<{ books: Book[]; error: string | null }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('books')
      .select('id, title, author, description, level, cover_url, file_url, file_name, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return { books: [], error: error.message };
    }

    const books = (data as Book[]) || [];
    return {
      books: books.map((book) => ({ ...book, file_url: `/api/books/download?path=${encodeURIComponent(book.file_url)}` })),
      error: null,
    };
  } catch (err: any) {
    return {
      books: [],
      error:
        err?.message ||
        'Supabase connection error.',
    };
  }
}

export default async function BooksPage() {
  const { books, error } = await getBooksData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EA] text-[#1E2A22]">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <BooksClient initialBooks={books} initialError={error} />
      </main>

      <Footer />
    </div>
  );
}
