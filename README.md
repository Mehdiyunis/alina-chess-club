# ALİNA Chess Club — Şahmat Məktəbi

Uşaqlar və yeni başlayanlar üçün interaktiv şahmat təhsil portalı. Lokal və onlayn oyun, analiz lövhəsi, kitabxana və çoxdilli interfeys.

## Marşrutlar

| Yol | Təyinat |
| --- | --- |
| `/` | Ana səhifə |
| `/play` | Lokal və onlayn oyun |
| `/play/{KOD}` | Dəvət olunmuş otağa qoşulma |
| `/analysis` | Analiz lövhəsi |
| `/books` | Kitabxana |
| `/profile` | Profil, görünüş rejimi, hesab və aldığım kitablar |
| `/auth` | Qeydiyyat və giriş |

Görünüş rejimi varsayılan olaraq ağdır. Qonaqlar seçimi `localStorage`-da, qeydiyyatlı istifadəçilər isə `public.profiles.theme` sahəsində saxlayır; hesab teması başqa brauzerdə avtomatik tətbiq olunur.

## Texnologiya

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4
- Supabase Auth, Postgres, Realtime və private Storage (`book-files`)
- chess.js, lucide-react
- Şriftlər: Raleway, Cormorant Garamond

## Quraşdırma

```bash
npm install
cp .env.example .env.local
```

`.env.local` faylına Supabase dəyərlərini yazın:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_TRACK_LOCALHOST=false
```

Windows PowerShell üçün `npm.cmd` istifadə edin.

## Supabase qurulumu

Onlayn oyun, otaqlar və təsadüfi rəqib növbəsi üçün `supabase-online-play.sql` faylını Supabase SQL Editor-da icra edin. Script idempotentdır; 7 funksiya və `matchmaking_queue` cədvəli yaranır.

Profil və tema üçün `supabase-profile-theme.sql` faylını icra edin: `profiles.theme` sahəsi, hər istifadəçinin aldığı kitabları saxlayan `public.user_books` cədvəli və RLS qaydaları yaranır. Admin paneli bu cədvələ `(user_id, book_id)` cütlüyü yazaraq kitab təyin edir.

Kitab PDF-ləri `book-files` adlı private bucket-da saxlanılır. Fayllar `/api/books/download?path=...` üzərindən qısaömürlü signed URL ilə verilir; service-role açarı istifadə olunmur.

Deploy-dan sonra Supabase Auth üçün sayt URL-ni və redirect URL-lərini Vercel domenine uyğun təyin edin.

## Komandalar

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # production server
npm run lint    # tsc --noEmit
```

## Layihə strukturu

```text
app/                    Səhifələr, layout, API route və auth callback
components/             Ümumi UI, PlayBoard, AnalysisBoard, Supabase helper-ləri
lib/                    i18n, tiplər, vaxt parametrləri, Supabase client/server
messages/               az.json, en.json, ru.json
public/                 Loqo, fiqur SVG-ləri və müəllim şəkilləri
proxy.ts                Supabase sessiyasının yenilənməsi və təhlükəsizlik header-ləri
supabase-profile-theme.sql  Profil teması, istifadəçi kitabları və RLS
supabase-online-play.sql  Onlayn oyun üçün cədvəl, RLS və RPC-lər
.env.example            Mühit dəyişənləri nümunəsi
```

Administrasiya interfeysi ayrı layihədədir və `public.admin_profiles` üzərindən icazə alır.
