'use client';

import React, { useState } from 'react';
import { Book, BookLevel } from '@/lib/siteData';
import { Search, Download, ExternalLink, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

interface BooksClientProps {
  initialBooks: Book[];
  initialError?: string | null;
}

export function BooksClient({ initialBooks, initialError }: BooksClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredBooks = initialBooks.filter((book) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.description && book.description.toLowerCase().includes(q));

    const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const getLevelLabel = (level: BookLevel) => {
    switch (level) {
      case 'beginner':
        return 'Başlayan';
      case 'intermediate':
        return 'Orta';
      case 'advanced':
        return 'İrəli';
      default:
        return 'Ümumi';
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-[clamp(1.85rem,3.5vw,2.5rem)] font-bold text-[#ecebf5] tracking-tight">
          Şahmat Kitabları və Dərsliklər
        </h1>
        <p className="mt-2 text-[#9893b8] text-sm sm:text-base leading-relaxed">
          Uşaqlar və şahmat həvəskarları üçün seçilmiş tədris vəsaitlərini onlayn oxuyun və ya endirin.
        </p>
      </div>

      {/* Error state if Supabase unconfigured or query failed */}
      {initialError && (
        <div className="mb-8 p-4 rounded-[12px] bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-rose-200">Məlumat yüklənərkən xəta baş verdi</p>
            <p className="text-xs text-rose-300/90">{initialError}</p>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="card-flat p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
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
            className="w-full pl-9 pr-3.5 py-2 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] placeholder-[#9893b8]/50 focus:outline-hidden focus:border-[#7c5cff] text-xs sm:text-sm"
          />
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'Hamısı' },
            { id: 'beginner', label: 'Başlayan' },
            { id: 'intermediate', label: 'Orta' },
            { id: 'advanced', label: 'İrəli' },
          ].map((item) => {
            const isActive = selectedLevel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedLevel(item.id)}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#7c5cff] text-white'
                    : 'bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] border border-[#2d2750]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Cards Grid */}
      {filteredBooks.length === 0 ? (
        <div className="py-16 text-center card-flat p-8">
          <div className="w-12 h-12 rounded-full bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#ecebf5]">
            {initialBooks.length === 0
              ? 'Hazırda kitabxanada kitab mövcud deyil'
              : 'Axtarışa uyğun kitab tapılmadı'}
          </h3>
          <p className="text-[#9893b8] text-xs mt-1 max-w-sm mx-auto">
            {initialBooks.length === 0
              ? 'Tezliklə yeni şahmat vəsaitləri və kitabları əlavə olunacaq.'
              : 'Axtarış sözünü dəyişdirin və ya seçilmiş filtri sıfırlayın.'}
          </p>
          {(searchQuery || selectedLevel !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('all');
              }}
              className="btn-secondary px-3.5 py-1.5 text-xs mt-4 cursor-pointer"
            >
              Filtri sıfırla
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="card-flat p-5 flex flex-col justify-between"
            >
              <div>
                {/* Book Cover or Dark Placeholder */}
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-44 object-cover rounded-[8px] mb-4 border border-[#2d2750]"
                  />
                ) : (
                  <div className="w-full h-44 rounded-[8px] mb-4 bg-[#171428] border border-[#2d2750] flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-full bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center font-bold text-xl mb-2">
                      ♚
                    </div>
                    <p className="text-xs font-semibold text-[#ecebf5] line-clamp-1">{book.title}</p>
                    <p className="text-[11px] text-[#9893b8] mt-0.5">{book.author}</p>
                  </div>
                )}

                {/* Level and Format Badge */}
                <div className="flex items-center gap-2 text-xs text-[#9893b8] mb-2.5">
                  <span className="text-[#7c5cff] font-medium">{getLevelLabel(book.level)}</span>
                  <span aria-hidden="true">·</span>
                  <span>PDF dərslik</span>
                </div>

                <h3 className="text-base font-bold text-[#ecebf5] mb-1 leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-[#9893b8] font-medium mb-3">
                  Müəllif: {book.author}
                </p>

                {book.description && (
                  <p className="text-xs text-[#9893b8] leading-relaxed line-clamp-3 mb-5">
                    {book.description}
                  </p>
                )}
              </div>

              {/* Read & Download Actions */}
              <div className="pt-3 border-t border-[#2d2750] flex items-center gap-2 mt-auto">
                <a
                  href={book.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-2 px-3 text-xs flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Bax</span>
                </a>
                <a
                  href={book.file_url}
                  download={book.file_name || `${book.title.replace(/\s+/g, '_')}.pdf`}
                  className="btn-secondary py-2 px-3 text-xs flex items-center justify-center gap-1.5"
                  title="Faylı yüklə"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Yüklə</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
