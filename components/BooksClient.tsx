'use client';

import { useState } from 'react';
import { Book, BookLevel } from '@/lib/siteData';
import { Search, Download, ExternalLink, BookOpen, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface BooksClientProps {
  initialBooks: Book[];
  initialError?: string | null;
}

export function BooksClient({ initialBooks, initialError }: BooksClientProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredBooks = initialBooks.filter((book) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (book.title ?? '').toLowerCase().includes(q) ||
      (book.author ?? '').toLowerCase().includes(q) ||
      (book.description ?? '').toLowerCase().includes(q);

    const matchesLevel = selectedLevel === 'all' || book.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const getLevelLabel = (level: BookLevel) => {
    switch (level) {
      case 'beginner':
        return t('books.filterBeginner');
      case 'intermediate':
        return t('books.filterIntermediate');
      case 'advanced':
        return t('books.filterAdvanced');
      default:
        return t('books.filterAll');
    }
  };

  const getLevelBadgeClass = (level: BookLevel) => {
    switch (level) {
      case 'beginner':
        return 'bg-[#DCE6D0] text-[#1E2A22]'; // --sage-200
      case 'intermediate':
        return 'bg-[#F6E7B4] text-[#1E2A22]'; // --butter
      case 'advanced':
        return 'bg-[#F4D9C6] text-[#1E2A22]'; // --peach
      default:
        return 'bg-[#E4EBD9] text-[#1E2A22]';
    }
  };

  const getDownloadUrl = (fileUrl: string, rawFileName?: string | null) => {
    if (!fileUrl) return '#';
    let fileName = (rawFileName || 'book').trim();
    if (!fileName.toLowerCase().endsWith('.pdf')) {
      fileName = `${fileName}.pdf`;
    }
    const separator = fileUrl.includes('?') ? '&download=' : '?download=';
    return `${fileUrl}${separator}${encodeURIComponent(fileName)}`;
  };

  const filterOptions = [
    { id: 'all', label: t('books.filterAll') },
    { id: 'beginner', label: t('books.filterBeginner') },
    { id: 'intermediate', label: t('books.filterIntermediate') },
    { id: 'advanced', label: t('books.filterAdvanced') },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-serif text-[clamp(2.2rem,4vw,3rem)] font-normal text-[#1E2A22] tracking-tight leading-[1.1]">
          {t('books.title')}
        </h1>
        <p className="mt-2 text-[#5E6B62] text-sm sm:text-base leading-relaxed">
          {t('books.subtitle')}
        </p>
      </div>

      {/* Error state if Supabase unconfigured or query failed */}
      {initialError && (
        <div className="mb-8 p-4 rounded-[16px] bg-rose-500/10 border border-rose-500/20 text-[#B3261E] text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-[#B3261E] mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#B3261E]">{t('books.errorLoading')}</p>
            <p className="text-xs text-[#B3261E]/90">{initialError}</p>
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-[#FFFFFF] rounded-[18px] border border-[#E3DCCB] p-4 sm:p-5 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5E6B62]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('books.searchPlaceholder')}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-[12px] bg-[#FFFFFF] border border-[#E3DCCB] text-[#1E2A22] placeholder-[#5E6B62]/60 focus:outline-hidden focus:border-[#2F5D46] focus:ring-2 focus:ring-[#2F5D46]/35 text-xs sm:text-sm"
          />
        </div>

        {/* Level Filters: fully rounded pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {filterOptions.map((item) => {
            const isActive = selectedLevel === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedLevel(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2F5D46] text-[#F7F3EA] shadow-xs'
                    : 'bg-[#EFE9DB] text-[#5E6B62] hover:text-[#1E2A22] border border-[#E3DCCB]'
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
        <div className="py-16 text-center bg-[#FFFFFF] rounded-[18px] border border-[#E3DCCB] p-8 shadow-[0_1px_2px_rgba(30,42,34,0.06)]">
          <div className="w-12 h-12 rounded-full bg-[#E4EBD9] border border-[#E3DCCB] text-[#2F5D46] flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-normal text-[#1E2A22]">
            {initialBooks.length === 0
              ? t('books.emptyLibrary')
              : t('books.emptySearch')}
          </h3>
          <p className="text-[#5E6B62] text-xs mt-1 max-w-sm mx-auto">
            {initialBooks.length === 0
              ? t('books.emptyLibraryDesc')
              : t('books.emptySearchDesc')}
          </p>
          {(searchQuery || selectedLevel !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('all');
              }}
              className="btn-secondary px-4 py-2 text-xs mt-4 cursor-pointer"
            >
              {t('books.resetFilter')}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#FFFFFF] rounded-[18px] border border-[#E3DCCB] p-5 flex flex-col justify-between shadow-[0_1px_2px_rgba(30,42,34,0.06)] hover:shadow-md transition-all"
            >
              <div>
                {/* Book Cover or Placeholder */}
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-44 object-cover rounded-[14px] mb-4 border border-[#E3DCCB] shadow-xs"
                  />
                ) : (
                  <div className="w-full h-44 rounded-[14px] mb-4 bg-[#E4EBD9] border border-[#E3DCCB] flex flex-col items-center justify-center p-4 text-center select-none relative overflow-hidden group shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#E3DCCB] text-[#2F5D46] flex items-center justify-center font-bold text-xl mb-2 shadow-xs">
                      ♚
                    </div>
                    <p className="font-serif text-xs font-normal text-[#1E2A22] line-clamp-1">{book.title}</p>
                    <p className="text-[11px] text-[#5E6B62] mt-0.5">{book.author}</p>
                  </div>
                )}

                {/* Level and Format Badge */}
                <div className="flex items-center gap-2 text-xs text-[#5E6B62] mb-2.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getLevelBadgeClass(book.level)}`}>
                    {getLevelLabel(book.level)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{t('books.pdfBadge')}</span>
                </div>

                <h3 className="font-serif text-lg font-normal text-[#1E2A22] mb-1 leading-snug">
                  {book.title}
                </h3>
                <p className="text-xs text-[#5E6B62] font-medium mb-3">
                  {t('books.author', { author: book.author })}
                </p>

                {book.description && (
                  <p className="text-xs text-[#5E6B62] leading-relaxed line-clamp-3 mb-5">
                    {book.description}
                  </p>
                )}
              </div>

              {/* Read & Download Actions */}
              <div className="pt-3 border-t border-[#E3DCCB] flex items-center gap-2 mt-auto">
                <a
                  href={book.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 py-2 px-3 text-xs flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t('books.viewBtn')}</span>
                </a>
                <a
                  href={getDownloadUrl(book.file_url, book.file_name || book.title)}
                  className="btn-primary flex-1 py-2 px-3 text-xs flex items-center justify-center gap-1.5 font-semibold"
                  title={t('books.downloadTitle')}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('books.downloadBtn')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
