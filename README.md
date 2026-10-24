# Şahmat Məktəbi (Next.js App Router)

Uşaqlar və yeni başlayanlar üçün hazırlanmış müasir və interaktiv şahmat təhsil portalı.

Platformanın bütün istifadəçi interfeysi tamamilə **Azərbaycan dilindədir**. Bütün dinamik məlumatlar (müəllimlər, kitablar, əlaqə müraciətləri və profillər) birbaşa **Supabase** üzərindən idarə olunur.

> **Qeyd:** Bu sayt yalnız ictimai istifadəçilər üçündür (User-Facing). Saytın məzmununu idarə etmək (müəllimlərin və kitabların əlavə edilməsi, əlaqə müraciətlərinin cavablandırılması) üçün gələcəkdə eyni Supabase layihəsinə qoşulan **ayrıca İnzibatçı (Admin) saytı** qurulacaqdır.

---

## 🎨 Dizayn Xüsusiyyətləri

- **Əsas Fon:** Dərin bənövşəyi / qara (`#0d0b17`)
- **Kart və Səthlər:** `#171428`, yüksəldilmiş səth `#211c3a`
- **İncə Haşiyələr:** `#2d2750`
- **Əsas Vurğu:** Bənövşəyi (`#7c5cff`) və hover rəngi (`#9a82ff`)
- **Şahmat Lövhəsi:** Açıq xanalar `#b9b0d9`, tünd xanalar `#5b4b9a`
- **Tipoqrafiya:** Azərbaycan dilinin xüsusi hərflərini (ə, Ə, ı, İ, ğ, Ğ, ş, Ş, ç, Ç, ö, Ö, ü, Ü) tam dəstəkləyən `latin-ext` şrifti.

---

## 🚀 Texnoloji Yığın (Tech Stack)

- **Freymvork:** Next.js (App Router, Server və Client komponentlər)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **İkonlar:** Lucide React
- **Backend & Autentifikasiya:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Məlumat Bazası:** PostgreSQL (Row Level Security - RLS siyasətləri ilə)
- **Fayl Saxlama:** Supabase Storage (`book-files`, `book-covers`)

---

## 📁 Layihə Strukturu

```
├── app/
│   ├── layout.tsx             # Root layout (Metadata, Azərbaycan dili, Tailwind)
│   ├── page.tsx               # Ana səhifə (Dinamik müəllimlər və interaktiv bölmələr)
│   ├── auth/
│   │   ├── page.tsx           # Giriş və Qeydiyyat səhifəsi (Google OAuth + Email/Telefon)
│   │   └── callback/route.ts  # Supabase OAuth yönləndirmə emalçısı
│   ├── books/
│   │   └── page.tsx           # Şahmat kitabxanası (Axtarış, səviyyə filtri, baxış və yükləmə)
│   └── globals.css            # Tailwind CSS qlobal tənzimləmələri
├── components/
│   ├── Navbar.tsx             # İstifadəçi avatarı və menyu
│   ├── Footer.tsx             # Altlıq və sosial şəbəkə keçidləri
│   ├── HeroSection.tsx        # Başlıq və şahmat lövhəsi
│   ├── TeachersSlider.tsx     # public.teachers cədvəlindən oxunan müəllimlər karuseli
│   ├── StartingBoard.tsx      # Başlanğıc vəziyyət lövhəsi
│   ├── PiecesSection.tsx      # Fiqurlar və hərəkət qaydaları
│   ├── GameGoalsSection.tsx   # Şah, Mat, Pat və Heç-heçə qaydaları
│   ├── SpecialMovesSection.tsx# Rokirovka, Vəzirə çevrilmə, Keçiddə götürmə
│   ├── BeginnerTipsSection.tsx# Yeni başlayanlara 6 qızıl qayda
│   ├── FaqSection.tsx         # Tez-tez verilən suallar
│   ├── HistorySection.tsx     # Azərbaycan şahmat tarixi və qrossmeysterlərimiz
│   ├── ContactSection.tsx     # public.contact_requests cədvəlinə yazan əlaqə forması
│   ├── PositionSetupBoard.tsx # Mövqe qurucusu və FEN generatoru
│   ├── BooksClient.tsx        # Kitabların axtarışı və səviyyə üzrə filtri
│   └── ChessPieceSvg.tsx      # Vektorlu (SVG) şahmat fiqurları
├── lib/
│   ├── siteData.ts            # Statik maarifləndirici mətnlər və TypeScript tipləri
│   ├── types.ts               # Tip ixracları
│   └── supabase/
│       ├── client.ts          # Brauzer Supabase müştərisi (SSR)
│       ├── server.ts          # Server Supabase müştərisi
│       ├── actions.ts         # Server əməliyyatları (Müraciət göndərmə, kitablar, müəllimlər)
│       └── config.ts          # Supabase URL və konfiqurasiya yoxlayıcısı
├── middleware.ts              # Supabase istifadəçi sessiyasının avtomatik yenilənməsi
├── schema.sql                 # Supabase cədvəllərinin sənədləşdirməsi
├── .env.example               # Mühit dəyişənləri nümunəsi
└── package.json               # Asılılıqlar və skriptlər
```

---

## ⚙️ Quraşdırma və İşə Salma

### 1. Asılılıqların quraşdırılması:
```bash
npm install
```

### 2. Mühit dəyişənlərinin tənzimlənməsi:
`.env.example` faylını `.env.local` adı ilə kopyalayın və Supabase layihənizin məlumatlarını daxil edin:
```env
NEXT_PUBLIC_SUPABASE_URL="https://sizin-lahiyeniz.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sizin-anonim-acarınız"
```

### 3. Supabase Məlumat Bazası Cədvəlləri:
Sayt aşağıdakı cədvəllərdən istifadə edir:
- `public.teachers`: Müəllimlər siyahısı (`first_name`, `last_name`, `role_title`, `description`, `photo_url`, `sort_order`).
- `public.books`: Şahmat kitabları (`title`, `author`, `description`, `level`, `cover_url`, `file_url`, `file_name`, `created_at`).
- `public.contact_requests`: Əlaqə formasından göndərilən müraciətlər (`value`, `type`, `status`).
- `public.profiles`: Qeydiyyatdan keçmiş istifadəçi məlumatları (`full_name`, `role`).

Tam cədvəl strukturu və nümunələr üçün `schema.sql` sənədinə baxa bilərsiniz.

### 4. İnkişaf serverinin işə salınması:
```bash
npm run dev
```
Sayt `http://localhost:3000` ünvanında açılacaq.

---

## ♟️ Şahmat Vektorları (Attribution)

Bu layihədə istifadə olunan vektor (SVG) şahmat fiqurları **Colin M.L. Burnett (Cburnett)** tərəfindən hazırlanmış və [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces) vasitəsilə **Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)** lisenziyası ilə təqdim olunmuşdur. Fiqurlar `/public/pieces/` qovluğunda saxlanılır.
