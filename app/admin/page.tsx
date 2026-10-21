'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactRequest, Book, BookLevel } from '@/lib/siteData';
import {
  fetchContactRequests,
  updateContactRequestStatus,
  deleteContactRequest,
  fetchBooks,
  createBook,
  deleteBook,
  uploadBookFile,
} from '@/lib/supabase/actions';
import {
  ShieldAlert,
  Inbox,
  BookOpen,
  PlusCircle,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  RefreshCw,
  Upload,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'requests' | 'books'>('requests');

  // Contact requests state
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Books state
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  // New book form state
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [bookLevel, setBookLevel] = useState<BookLevel>('beginner');
  const [bookPdfUrl, setBookPdfUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingBook, setIsSubmittingBook] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Load data
  const loadRequests = async () => {
    setLoadingRequests(true);
    const data = await fetchContactRequests();
    setRequests(data);
    setLoadingRequests(false);
  };

  const loadBooksList = async () => {
    setLoadingBooks(true);
    const data = await fetchBooks();
    setBooks(data);
    setLoadingBooks(false);
  };

  useEffect(() => {
    loadRequests();
    loadBooksList();
  }, []);

  // Handle status toggle
  const handleToggleStatus = async (id: string, currentStatus: 'new' | 'contacted') => {
    const newStatus = currentStatus === 'new' ? 'contacted' : 'new';
    const ok = await updateContactRequestStatus(id, newStatus);
    if (ok) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
  };

  // Handle delete request
  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Bu müraciəti silmək istədiyinizə əminsiniz?')) return;
    const ok = await deleteContactRequest(id);
    if (ok) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Handle delete book
  const handleDeleteBook = async (id: string) => {
    if (!confirm('Bu kitabı kitabxanadan silmək istədiyinizə əminsiniz?')) return;
    const ok = await deleteBook(id);
    if (ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  // Handle create book
  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!bookTitle.trim() || !bookAuthor.trim() || !bookDescription.trim()) {
      setFormError('Zəhmət olmasa bütün sahələri doldurun.');
      return;
    }

    let fileUrl = bookPdfUrl.trim();
    let fileName = 'kitab.pdf';

    setIsSubmittingBook(true);

    if (selectedFile) {
      const uploadRes = await uploadBookFile(selectedFile, 'book-files');
      if (uploadRes.success && uploadRes.url) {
        fileUrl = uploadRes.url;
        fileName = selectedFile.name;
      } else {
        setFormError(uploadRes.error || 'Faylın yüklənməsi zamanı xəta baş verdi.');
        setIsSubmittingBook(false);
        return;
      }
    }

    if (!fileUrl) {
      fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    }

    const created = await createBook({
      title: bookTitle.trim(),
      author: bookAuthor.trim(),
      description: bookDescription.trim(),
      level: bookLevel,
      cover_url: null,
      file_url: fileUrl,
      file_name: fileName,
    });

    setIsSubmittingBook(false);

    if (created) {
      setBooks((prev) => [created, ...prev]);
      setShowAddBookModal(false);
      // Reset form
      setBookTitle('');
      setBookAuthor('');
      setBookDescription('');
      setBookLevel('beginner');
      setBookPdfUrl('');
      setSelectedFile(null);
    } else {
      setFormError('Kitab əlavə edilərkən xəta baş verdi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0b17] text-[#ecebf5]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#7c5cff]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-[#2d2750]">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#ecebf5]">
                  İdarəetmə Paneli (Admin)
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-[#9893b8] mt-1.5">
                Daxil olan əlaqə müraciətlərini idarə edin və kitabxana vəsaitlərini yeniləyin.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#171428] border border-[#2d2750] rounded-xl self-start md:self-auto">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'requests'
                    ? 'bg-[#7c5cff] text-white shadow-md'
                    : 'text-[#9893b8] hover:text-[#ecebf5]'
                }`}
              >
                <Inbox className="w-4 h-4" />
                <span>Müraciətlər ({requests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('books')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'books'
                    ? 'bg-[#7c5cff] text-white shadow-md'
                    : 'text-[#9893b8] hover:text-[#ecebf5]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Kitabxana ({books.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: CONTACT REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#ecebf5]">
                  Daxil Olmuş Əlaqə Müraciətləri
                </h2>
                <button
                  onClick={loadRequests}
                  className="p-2 rounded-xl bg-[#171428] border border-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Yenilə</span>
                </button>
              </div>

              {loadingRequests ? (
                <div className="py-20 text-center">
                  <div className="w-8 h-8 border-2 border-[#7c5cff] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-[#9893b8]">Müraciətlər yüklənir...</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="py-16 text-center bg-[#171428] border border-[#2d2750] rounded-2xl p-8">
                  <Inbox className="w-12 h-12 text-[#9893b8]/40 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#ecebf5]">Hələ heç bir müraciət daxil olmayıb</h3>
                  <p className="text-xs text-[#9893b8] mt-1">
                    Saytın ana səhifəsindəki əlaqə formundan göndərilən sorğular burada görünəcək.
                  </p>
                </div>
              ) : (
                <div className="bg-[#171428] border border-[#2d2750] rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#211c3a] text-[#9893b8] uppercase font-bold text-[11px] border-b border-[#2d2750]">
                        <tr>
                          <th className="py-3.5 px-4 sm:px-6">Əlaqə Vasitəsi</th>
                          <th className="py-3.5 px-4 sm:px-6">Növ</th>
                          <th className="py-3.5 px-4 sm:px-6">Status</th>
                          <th className="py-3.5 px-4 sm:px-6">Tarix</th>
                          <th className="py-3.5 px-4 sm:px-6 text-right">Əməliyyatlar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2d2750]">
                        {requests.map((item) => (
                          <tr key={item.id} className="hover:bg-[#211c3a]/50 transition-colors">
                            <td className="py-4 px-4 sm:px-6 font-semibold text-[#ecebf5]">
                              {item.value}
                            </td>
                            <td className="py-4 px-4 sm:px-6">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#211c3a] text-xs font-medium text-[#9893b8]">
                                {item.type === 'phone' ? (
                                  <>
                                    <Phone className="w-3 h-3 text-emerald-400" /> Telefon
                                  </>
                                ) : (
                                  <>
                                    <Mail className="w-3 h-3 text-cyan-400" /> E-poçt
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-4 px-4 sm:px-6">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                                  item.status === 'new'
                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                                }`}
                              >
                                {item.status === 'new' ? (
                                  <>
                                    <Clock className="w-3 h-3" /> Yeni
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-3 h-3" /> Əlaqə saxlanılıb
                                  </>
                                )}
                              </button>
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-[#9893b8] text-xs">
                              {new Date(item.created_at).toLocaleDateString('az-AZ', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-right">
                              <button
                                onClick={() => handleDeleteRequest(item.id)}
                                className="p-2 rounded-lg bg-[#211c3a] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                title="Müraciəti sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BOOKS MANAGEMENT */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#ecebf5]">Şahmat Kitabxanası</h2>
                  <p className="text-xs text-[#9893b8]">Kitab əlavə edin, redaktə edin və ya silin.</p>
                </div>
                <button
                  onClick={() => setShowAddBookModal(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#7c5cff] hover:bg-[#9a82ff] text-white text-xs font-bold transition-all shadow-md shadow-[#7c5cff]/20 flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Yeni Kitab Əlavə Et</span>
                </button>
              </div>

              {loadingBooks ? (
                <div className="py-20 text-center">
                  <div className="w-8 h-8 border-2 border-[#7c5cff] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-[#9893b8]">Kitablar yüklənir...</p>
                </div>
              ) : books.length === 0 ? (
                <div className="py-16 text-center bg-[#171428] border border-[#2d2750] rounded-2xl p-8">
                  <BookOpen className="w-12 h-12 text-[#9893b8]/40 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-[#ecebf5]">Kitabxana boşdur</h3>
                  <p className="text-xs text-[#9893b8] mt-1">
                    «Yeni Kitab Əlavə Et» düyməsinə klikləyərək ilk kitabı yükləyin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {books.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#171428] border border-[#2d2750] rounded-2xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#211c3a] text-xs font-semibold text-[#9a82ff] border border-[#2d2750]">
                            {b.level === 'beginner'
                              ? 'Başlanğıc'
                              : b.level === 'intermediate'
                              ? 'Orta'
                              : 'İrəliləmiş'}
                          </span>
                          <button
                            onClick={() => handleDeleteBook(b.id)}
                            className="p-1.5 rounded-lg bg-[#211c3a] text-rose-400 hover:bg-rose-500/15 transition-colors cursor-pointer"
                            title="Kitabı sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h3 className="text-base font-bold text-[#ecebf5] mb-1">{b.title}</h3>
                        <p className="text-xs text-[#7c5cff] mb-2 font-medium">Müəllif: {b.author}</p>
                        <p className="text-xs text-[#9893b8] line-clamp-3 leading-relaxed mb-4">
                          {b.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#2d2750] flex items-center justify-between text-xs">
                        <span className="text-[#9893b8] truncate max-w-[150px]">
                          {b.file_name}
                        </span>
                        <a
                          href={b.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7c5cff] hover:text-[#9a82ff] font-semibold flex items-center gap-1"
                        >
                          <span>Fayla bax</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL: ADD BOOK */}
        {showAddBookModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#171428] border border-[#2d2750] rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-fadeIn">
              <h3 className="text-xl font-bold text-[#ecebf5] mb-4">
                Yeni Şahmat Kitabı Əlavə Et
              </h3>

              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreateBook} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    Kitabın Adı
                  </label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Məs: Şahmatın Qızıl Qaydaları"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-none focus:border-[#7c5cff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    Müəllif
                  </label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    placeholder="Məs: Qrossmeyster Fərid Məmmədov"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-none focus:border-[#7c5cff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    Səviyyə
                  </label>
                  <select
                    value={bookLevel}
                    onChange={(e) => setBookLevel(e.target.value as BookLevel)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-none focus:border-[#7c5cff]"
                  >
                    <option value="beginner">Başlanğıc (Beginner)</option>
                    <option value="intermediate">Orta (Intermediate)</option>
                    <option value="advanced">İrəliləmiş (Advanced)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    Qısa Təsvir
                  </label>
                  <textarea
                    rows={3}
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                    placeholder="Kitabın məzmunu və hədəf kütləsi haqqında qısa izah..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-none focus:border-[#7c5cff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    PDF Faylı Yüklə və ya Link Qeyd Et
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-[#9893b8] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#211c3a] file:text-[#ecebf5] hover:file:bg-[#2d2750] cursor-pointer"
                  />
                  <div className="mt-2">
                    <span className="text-[11px] text-[#9893b8]/70 block mb-1">və ya birbaşa PDF URL daxil edin:</span>
                    <input
                      type="url"
                      value={bookPdfUrl}
                      onChange={(e) => setBookPdfUrl(e.target.value)}
                      placeholder="https://example.com/kitab.pdf"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-none focus:border-[#7c5cff] text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2d2750]">
                  <button
                    type="button"
                    onClick={() => setShowAddBookModal(false)}
                    className="py-2.5 px-4 rounded-xl bg-[#211c3a] hover:bg-[#2d2750] text-[#9893b8] hover:text-[#ecebf5] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Ləğv Et
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBook}
                    className="py-2.5 px-5 rounded-xl bg-[#7c5cff] hover:bg-[#9a82ff] text-white text-xs font-bold transition-all shadow-md shadow-[#7c5cff]/20 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingBook ? 'Yadda saxlanılır...' : 'Kitabı Əlavə Et'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
