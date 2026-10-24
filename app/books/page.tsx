import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BooksClient } from '@/components/BooksClient';
import { createClient } from '@/lib/supabase/server';
import { Book } from '@/lib/siteData';

export const dynamic = 'force-dynamic';

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

    return { books: (data as Book[]) || [], error: null };
  } catch (err: any) {
    return {
      books: [],
      error:
        err?.message ||
        'Supabase ilə əlaqə qurularkən xəta baş verdi. Mühit dəyişənlərini yoxlayın.',
    };
  }
}

export default async function BooksPage() {
  const { books, error } = await getBooksData();

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b17] text-[#ecebf5]">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <BooksClient initialBooks={books} initialError={error} />
      </main>

      <Footer />
    </div>
  );
}
