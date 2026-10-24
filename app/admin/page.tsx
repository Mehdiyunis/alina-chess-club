'use client';

import React, { useState, useEffect } from 'react';
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
  Inbox,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminPage() {
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

  const handleToggleStatus = async (id: string, currentStatus: 'new' | 'contacted') => {
    const newStatus = currentStatus === 'new' ? 'contacted' : 'new';
    const ok = await updateContactRequestStatus(id, newStatus);
    if (ok) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Bu müraciəti silmək istədiyinizə əminsiniz?')) return;
    const ok = await deleteContactRequest(id);
    if (ok) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('Bu kitabı kitabxanadan silmək istədiyinizə əminsiniz?')) return;
    const ok = await deleteBook(id);
    if (ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

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

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-5 border-b border-[#2d2750]">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#ecebf5]">
                İnzibatçı Paneli
              </h1>
              <p className="text-xs text-[#9893b8] mt-1">
                Əlaqə müraciətlərini idarə edin və kitabxana vəsaitlərini yeniləyin.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#171428] border border-[#2d2750] rounded-[10px] self-start md:self-auto">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'requests'
                    ? 'bg-[#7c5cff] text-white'
                    : 'text-[#9893b8] hover:text-[#ecebf5]'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Müraciətlər ({requests.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('books')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === 'books'
                    ? 'bg-[#7c5cff] text-white'
                    : 'text-[#9893b8] hover:text-[#ecebf5]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kitabxana ({books.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: CONTACT REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#ecebf5] uppercase tracking-wider">
                  Daxil olan müraciətlər
                </h2>
                <button
                  onClick={loadRequests}
                  className="btn-secondary px-2.5 py-1 text-xs cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Yenilə</span>
                </button>
              </div>

              {loadingRequests ? (
                <div className="py-16 text-center">
                  <p className="text-xs text-[#9893b8]">Müraciətlər yüklənir...</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="py-12 text-center card-flat p-6">
                  <p className="text-sm text-[#9893b8]">Hələ heç bir müraciət daxil olmayıb.</p>
                </div>
              ) : (
                <div className="card-flat overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#211c3a] text-[#9893b8] uppercase font-semibold text-[11px] border-b border-[#2d2750]">
                        <tr>
                          <th className="py-3 px-4 sm:px-5">Əlaqə</th>
                          <th className="py-3 px-4 sm:px-5">Növ</th>
                          <th className="py-3 px-4 sm:px-5">Status</th>
                          <th className="py-3 px-4 sm:px-5">Tarix</th>
                          <th className="py-3 px-4 sm:px-5 text-right">Sil</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2d2750]">
                        {requests.map((item) => (
                          <tr key={item.id} className="hover:bg-[#211c3a]/40 transition-colors">
                            <td className="py-3 px-4 sm:px-5 font-medium text-[#ecebf5]">
                              {item.value}
                            </td>
                            <td className="py-3 px-4 sm:px-5 text-xs text-[#9893b8]">
                              <span className="inline-flex items-center gap-1">
                                {item.type === 'phone' ? (
                                  <>
                                    <Phone className="w-3 h-3 text-emerald-400" /> Telefon
                                  </>
                                ) : (
                                  <>
                                    <Mail className="w-3 h-3 text-blue-400" /> E-poçt
                                  </>
                                )}
                              </span>
                            </td>
                            <td className="py-3 px-4 sm:px-5">
                              <button
                                onClick={() => handleToggleStatus(item.id, item.status)}
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-[6px] border cursor-pointer transition-colors ${
                                  item.status === 'new'
                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                }`}
                              >
                                {item.status === 'new' ? 'Yeni' : 'Əlaqə saxlanılıb'}
                              </button>
                            </td>
                            <td className="py-3 px-4 sm:px-5 text-[#9893b8] text-xs font-mono">
                              {new Date(item.created_at).toLocaleDateString('az-AZ', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </td>
                            <td className="py-3 px-4 sm:px-5 text-right">
                              <button
                                onClick={() => handleDeleteRequest(item.id)}
                                className="p-1 rounded-[6px] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[#ecebf5] uppercase tracking-wider">
                    Kitablar ({books.length})
                  </h2>
                </div>
                <button
                  onClick={() => setShowAddBookModal(true)}
                  className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Yeni Kitab</span>
                </button>
              </div>

              {loadingBooks ? (
                <div className="py-16 text-center">
                  <p className="text-xs text-[#9893b8]">Kitablar yüklənir...</p>
                </div>
              ) : books.length === 0 ? (
                <div className="py-12 text-center card-flat p-6">
                  <p className="text-sm text-[#9893b8]">Kitabxana boşdur.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {books.map((b) => (
                    <div
                      key={b.id}
                      className="card-flat p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold text-[#7c5cff]">
                            {b.level === 'beginner'
                              ? 'Başlanğıc'
                              : b.level === 'intermediate'
                              ? 'Orta'
                              : 'İrəliləmiş'}
                          </span>
                          <button
                            onClick={() => handleDeleteBook(b.id)}
                            className="p-1 rounded-[6px] text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Kitabı sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h3 className="text-sm font-bold text-[#ecebf5] mb-0.5">{b.title}</h3>
                        <p className="text-xs text-[#9893b8] mb-2 font-medium">Müəllif: {b.author}</p>
                        <p className="text-xs text-[#9893b8] line-clamp-3 leading-relaxed mb-3">
                          {b.description}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-[#2d2750] flex items-center justify-between text-xs">
                        <span className="text-[#9893b8] truncate max-w-[140px] text-[11px]">
                          {b.file_name}
                        </span>
                        <a
                          href={b.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7c5cff] hover:text-[#9a82ff] font-semibold flex items-center gap-1 text-[11px]"
                        >
                          <span>Bax</span>
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
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
            <div className="card-flat p-6 sm:p-7 w-full max-w-lg">
              <h3 className="text-lg font-bold text-[#ecebf5] mb-4">
                Yeni Şahmat Kitabı
              </h3>

              {formError && (
                <div className="mb-3.5 p-2.5 rounded-[8px] bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreateBook} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    Kitabın adı
                  </label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Şahmatın Əsasları"
                    className="w-full px-3 py-2 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-hidden focus:border-[#7c5cff]"
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
                    placeholder="Təlimçi adı"
                    className="w-full px-3 py-2 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-hidden focus:border-[#7c5cff]"
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
                    className="w-full px-3 py-2 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-hidden focus:border-[#7c5cff]"
                  >
                    <option value="beginner">Başlanğıc (Beginner)</option>
                    <option value="intermediate">Orta (Intermediate)</option>
                    <option value="advanced">İrəliləmiş (Advanced)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    Qısa təsvir
                  </label>
                  <textarea
                    rows={3}
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                    placeholder="Kitabın qısa məzmunu..."
                    className="w-full px-3 py-2 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-hidden focus:border-[#7c5cff]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#9893b8] mb-1">
                    PDF faylı və ya URL linki
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="w-full text-xs text-[#9893b8] file:mr-2.5 file:py-1.5 file:px-2.5 file:rounded-[6px] file:border-0 file:text-xs file:font-semibold file:bg-[#211c3a] file:text-[#ecebf5] hover:file:bg-[#2d2750] cursor-pointer"
                  />
                  <input
                    type="url"
                    value={bookPdfUrl}
                    onChange={(e) => setBookPdfUrl(e.target.value)}
                    placeholder="və ya birbaşa PDF URL: https://example.com/kitab.pdf"
                    className="w-full mt-2 px-3 py-1.5 rounded-[8px] bg-[#0d0b17] border border-[#2d2750] text-[#ecebf5] focus:outline-hidden focus:border-[#7c5cff] text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#2d2750]">
                  <button
                    type="button"
                    onClick={() => setShowAddBookModal(false)}
                    className="btn-secondary py-1.5 px-3 text-xs"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBook}
                    className="btn-primary py-1.5 px-4 text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingBook ? 'Yadda saxlanılır...' : 'Əlavə et'}
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
