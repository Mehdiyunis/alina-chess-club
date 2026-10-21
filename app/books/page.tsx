'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Book, BookLevel } from '@/lib/siteData';
import { fetchBooks } from '@/lib/supabase/actions';
import { BookOpen, Search, Download, ExternalLink, Sparkles, Filter, Bookmark } from 'lucide-react';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
      setLoading(false);
    }
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const getLevelBadge = (level: BookLevel) => {
    switch (level) {
      case 'beginner':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            Başlanğıc
          </span>
        );
      case 'intermediate':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
            Orta Səviyyə
          </span>
        );
      case 'advanced':
        return (
          <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
            İrəliləmiş
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b17] text-[#ecebf5]">
      <Navbar />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#7c5cff]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#3b5bdb]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Elektron Şahmat Kitabxanası
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#ecebf5] tracking-tight">
              Şahmat Kitabları və Dərsliklər
            </h1>
            <p className="mt-4 text-[#9893b8] text-base sm:text-lg">
              Uşaqlar və yeni başlayanlar üçün xüsusi seçilmiş təlimat vəsaitlərini pulsuz oxuyun və ya endirin.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-[#171428] border border-[#2d2750] rounded-2xl p-4 sm:p-5 mb-10 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9893b8]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kitab və ya müəllif axtarın..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-none focus:border-[#7c5cff] focus:ring-1 focus:ring-[#7c5cff] text-sm"
              />
            </div>

            {/* Level Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs text-[#9893b8] uppercase font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Səviyyə:
              </span>
              {[
                { id: 'all', label: 'Hamısı' },
                { id: 'beginner', label: 'Başlanğıc' },
                { id: 'intermediate', label: 'Orta' },
                { id: 'advanced', label: 'İrəliləmiş' },
              ].map((item) => {
                const isActive = selectedLevel === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLevel(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#7c5cff] text-white shadow-md shadow-[#7c5cff]/20'
                        : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] hover:bg-[#2d2750] border border-[#2d2750]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Book Cards Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-2 border-[#7c5cff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#9893b8] text-sm">Kitablar yüklənir...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="py-16 text-center bg-[#171428] border border-[#2d2750] rounded-3xl p-8">
              <BookOpen className="w-12 h-12 text-[#9893b8]/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#ecebf5]">Axtarışa uyğun kitab tapılmadı</h3>
              <p className="text-[#9893b8] text-sm mt-1">
                Axtarış sözünü dəyişdirin və ya filtri «Hamısı» olaraq sıfırlayın.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#211c3a] text-[#7c5cff] hover:bg-[#2d2750] text-xs font-semibold cursor-pointer"
              >
                Filtri sıfırla
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-[#171428] border border-[#2d2750] rounded-2xl p-6 hover:border-[#7c5cff]/50 hover:bg-[#1a172e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7c5cff]/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Header with level and bookmark */}
                    <div className="flex items-center justify-between mb-4">
                      {getLevelBadge(book.level)}
                      <div className="w-8 h-8 rounded-lg bg-[#211c3a] border border-[#2d2750] flex items-center justify-center text-[#9a82ff]">
                        <Bookmark className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#ecebf5] mb-1 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#7c5cff] mb-3">
                      Müəllif: {book.author}
                    </p>

                    <p className="text-sm text-[#9893b8] leading-relaxed line-clamp-3 mb-6">
                      {book.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#2d2750] flex items-center gap-3">
                    <a
                      href={book.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#7c5cff] hover:bg-[#9a82ff] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Oxu / Bax</span>
                    </a>
                    <a
                      href={book.file_url}
                      download={book.file_name || 'sahmat_kitabi.pdf'}
                      className="py-2.5 px-3 rounded-xl bg-[#211c3a] border border-[#2d2750] hover:bg-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] text-xs font-bold transition-colors flex items-center justify-center"
                      title="PDF kimi yüklə"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
