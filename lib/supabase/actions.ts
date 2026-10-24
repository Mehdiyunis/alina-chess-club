import { createClient, isSupabaseConfigured } from './client';
import { Book, Teacher } from '../siteData';

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
  return msg || 'Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.';
}

/**
 * Inserts a new contact request into public.contact_requests.
 * Status defaults to 'new' in Supabase.
 * The site never reads or lists this table.
 */
export async function submitContactRequest(
  value: string,
  type: 'email' | 'phone'
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase konfiqurasiyası tapılmadı. Mühit dəyişənlərini yoxlayın.',
    };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('contact_requests')
      .insert([{ value, type, status: 'new' }]);

    if (error) {
      return { success: false, error: translateSupabaseError(error) };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: translateSupabaseError(err) };
  }
}

/**
 * Fetches all books from public.books ordered by created_at descending.
 */
export async function getBooks(): Promise<{ data: Book[]; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      data: [],
      error: 'Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa NEXT_PUBLIC_SUPABASE_URL və NEXT_PUBLIC_SUPABASE_ANON_KEY mühit dəyişənlərini təyin edin.',
    };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('books')
      .select('id, title, author, description, level, cover_url, file_url, file_name, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: translateSupabaseError(error) };
    }
    return { data: (data as Book[]) || [] };
  } catch (err: any) {
    return { data: [], error: translateSupabaseError(err) };
  }
}

export async function fetchBooks(): Promise<Book[]> {
  const res = await getBooks();
  return res.data || [];
}

/**
 * Fetches all teachers from public.teachers ordered by sort_order ascending.
 */
export async function getTeachers(): Promise<{ data: Teacher[]; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      data: [],
      error: 'Supabase konfiqurasiyası tapılmadı. Zəhmət olmasa NEXT_PUBLIC_SUPABASE_URL və NEXT_PUBLIC_SUPABASE_ANON_KEY mühit dəyişənlərini təyin edin.',
    };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('teachers')
      .select('id, first_name, last_name, role_title, description, photo_url, sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      return { data: [], error: translateSupabaseError(error) };
    }
    return { data: (data as Teacher[]) || [] };
  } catch (err: any) {
    return { data: [], error: translateSupabaseError(err) };
  }
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const res = await getTeachers();
  return res.data || [];
}
