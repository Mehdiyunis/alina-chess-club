import { createClient, isSupabaseConfigured } from './client';
import { Book, BookLevel, ContactRequest, initialDemoBooks } from '../siteData';

const LOCAL_STORAGE_KEY_REQUESTS = 'sahmat_contact_requests_demo';
const LOCAL_STORAGE_KEY_BOOKS = 'sahmat_books_demo';

const initialDemoRequests: ContactRequest[] = [
  {
    id: 'req-1',
    value: '+994 50 123 45 67',
    type: 'phone',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'req-2',
    value: 'aydan.valiyeva@example.com',
    type: 'email',
    status: 'contacted',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'req-3',
    value: '+994 55 987 65 43',
    type: 'phone',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export function translateSupabaseError(error: any): string {
  if (!error) return 'Bilinməyən xəta baş verdi.';
  const msg = typeof error === 'string' ? error : error.message || '';

  if (msg.includes('Invalid login credentials') || msg.includes('invalid_grant')) {
    return 'Daxil edilən məlumatlar və ya şifrə yanlışdır.';
  }
  if (msg.includes('User already registered') || msg.includes('already exists')) {
    return 'Bu email və ya nömrə ilə artıq qeydiyyatdan keçilib.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Şifrə ən azı 6 simvoldan ibarət olmalıdır.';
  }
  if (msg.includes('rate limit')) {
    return 'Çox sayda cəhd edildi. Zəhmət olmasa bir qədər gözləyin.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Email təsdiqlənməyib. Zəhmət olmasa poçt qutunuzu yoxlayın.';
  }
  if (msg.includes('network') || msg.includes('Failed to fetch')) {
    return 'İnternet bağlantısında və ya serverdə xəta baş verdi.';
  }
  if (msg.includes('Payload too large') || msg.includes('413')) {
    return 'Faylın həcmi icazə verilən həddi aşır.';
  }
  return msg || 'Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.';
}

// Contact Requests
export async function submitContactRequest(value: string, type: 'email' | 'phone'): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
        const list: ContactRequest[] = stored ? JSON.parse(stored) : [...initialDemoRequests];
        list.unshift({
          id: 'req-' + Date.now(),
          value,
          type,
          status: 'new',
          created_at: new Date().toISOString(),
        });
        localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
      } catch {}
    }
    return { success: true };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('contact_requests').insert([{ value, type, status: 'new' }]);
    if (error) return { success: false, error: translateSupabaseError(error) };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: translateSupabaseError(err) };
  }
}

export async function getContactRequests(): Promise<{ data: ContactRequest[]; error?: string }> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
        return { data: stored ? JSON.parse(stored) : [...initialDemoRequests] };
      } catch {}
    }
    return { data: [...initialDemoRequests] };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return { data: [], error: translateSupabaseError(error) };
    return { data: (data as ContactRequest[]) || [] };
  } catch (err: any) {
    return { data: [], error: translateSupabaseError(err) };
  }
}

export async function fetchContactRequests(): Promise<ContactRequest[]> {
  const res = await getContactRequests();
  return res.data || [];
}

export async function markContactRequestContacted(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
        let list: ContactRequest[] = stored ? JSON.parse(stored) : [...initialDemoRequests];
        list = list.map((item) => (item.id === id ? { ...item, status: 'contacted' } : item));
        localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
      } catch {}
    }
    return { success: true };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('contact_requests').update({ status: 'contacted' }).eq('id', id);
    if (error) return { success: false, error: translateSupabaseError(error) };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: translateSupabaseError(err) };
  }
}

export async function updateContactRequestStatus(id: string, status: 'new' | 'contacted'): Promise<boolean> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
        let list: ContactRequest[] = stored ? JSON.parse(stored) : [...initialDemoRequests];
        list = list.map((item) => (item.id === id ? { ...item, status } : item));
        localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
      } catch {}
    }
    return true;
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('contact_requests').update({ status }).eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteContactRequestItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_REQUESTS);
        let list: ContactRequest[] = stored ? JSON.parse(stored) : [...initialDemoRequests];
        list = list.filter((item) => item.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY_REQUESTS, JSON.stringify(list));
      } catch {}
    }
    return { success: true };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('contact_requests').delete().eq('id', id);
    if (error) return { success: false, error: translateSupabaseError(error) };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: translateSupabaseError(err) };
  }
}

export async function deleteContactRequest(id: string): Promise<boolean> {
  const res = await deleteContactRequestItem(id);
  return res.success;
}

// Books API
export async function getBooks(): Promise<{ data: Book[]; error?: string }> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
        return { data: stored ? JSON.parse(stored) : [...initialDemoBooks] };
      } catch {}
    }
    return { data: [...initialDemoBooks] };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (error) {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
        return { data: stored ? JSON.parse(stored) : [...initialDemoBooks] };
      }
      return { data: [...initialDemoBooks] };
    }
    return { data: (data as Book[]) || [] };
  } catch (err: any) {
    return { data: [...initialDemoBooks], error: translateSupabaseError(err) };
  }
}

export async function fetchBooks(): Promise<Book[]> {
  const res = await getBooks();
  return res.data || [];
}

export async function uploadStorageFile(
  bucket: 'book-covers' | 'book-files',
  file: File,
  prefix: string = ''
): Promise<{ url?: string; error?: string }> {
  if (!isSupabaseConfigured) {
    return { url: URL.createObjectURL(file) };
  }

  try {
    const supabase = createClient();
    const ext = file.name.split('.').pop() || 'dat';
    const cleanPrefix = prefix ? prefix.replace(/[^a-zA-Z0-9_-]/g, '_') : 'file';
    const filePath = `${cleanPrefix}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (uploadError) return { error: translateSupabaseError(uploadError) };

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return { url: data.publicUrl };
  } catch (err: any) {
    return { error: translateSupabaseError(err) };
  }
}

export async function uploadBookFile(file: File, bucket: 'book-covers' | 'book-files' = 'book-files'): Promise<{ success: boolean; url?: string; error?: string }> {
  const res = await uploadStorageFile(bucket, file, 'chess_book');
  if (res.error) {
    return { success: false, error: res.error };
  }
  return { success: true, url: res.url };
}

export async function createBook(bookData: {
  title: string;
  author: string;
  description: string;
  level: BookLevel;
  cover_url: string | null;
  file_url: string;
  file_name: string;
}): Promise<Book | null> {
  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
      const list: Book[] = stored ? JSON.parse(stored) : [...initialDemoBooks];
      const newBook: Book = {
        id: 'book-' + Date.now(),
        ...bookData,
        created_at: new Date().toISOString(),
      };
      list.unshift(newBook);
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKS, JSON.stringify(list));
      return newBook;
    }
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('books').insert([bookData]).select().single();
    if (error) return null;
    return (data as Book) || null;
  } catch {
    return null;
  }
}

export async function deleteBook(bookOrId: Book | string): Promise<boolean> {
  const id = typeof bookOrId === 'string' ? bookOrId : bookOrId.id;

  if (!isSupabaseConfigured) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKS);
      let list: Book[] = stored ? JSON.parse(stored) : [...initialDemoBooks];
      list = list.filter((b) => b.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKS, JSON.stringify(list));
    }
    return true;
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('books').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}
