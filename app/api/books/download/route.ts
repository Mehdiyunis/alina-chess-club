import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const SAFE_STORAGE_PATH = /^[\p{L}\p{N}._\-/ ]+$/u;

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path');

  if (
    !path ||
    path.length > 300 ||
    !SAFE_STORAGE_PATH.test(path) ||
    path.includes('\\') ||
    path.includes('\0') ||
    !/\.pdf$/i.test(path) ||
    path.split('/').some((part) => !part || part === '.' || part === '..')
  ) {
    return NextResponse.json({ error: 'Etibarsız fayl yolu' }, { status: 400 });
  }

  try {
    // Bucket icazələri Supabase RLS tərəfindən yoxlanılır; service-role açarı istifadə olunmur.
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from('book-files').createSignedUrl(path, 300);
    if (error || !data?.signedUrl) {
      return NextResponse.json(
        { error: 'Fayla baxış icazəsi yoxdur və ya fayl tapılmadı' },
        { status: 404 }
      );
    }
    return NextResponse.redirect(data.signedUrl, {
      status: 302,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Fayl linki yaradıla bilmədi' }, { status: 500 });
  }
}
