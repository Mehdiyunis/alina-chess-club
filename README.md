# Şahmat Məktəbi (Next.js App Router)

Uşaqlar və yeni başlayanlar üçün hazırlanmış müasir və interaktiv şahmat təhsil portalı.

Platformanın bütün istifadəçi interfeysi tamamilə **Azərbaycan dilindədir**. Kod və struktur isə təmiz **Next.js (App Router) + TypeScript + Tailwind CSS** və **Supabase** texnologiyaları əsasında qurulmuşdur.

---

## 🎨 Dizayn Xüsusiyyətləri (Lichess İlə İlhamlanmış Qaranlıq Tema)

- **Əsas Fon:** Dərin bənövşəyi / qara (`#0d0b17`)
- **Kart və Səthlər:** `#171428`, qaldırılmış səth `#211c3a`
- **İncə Haşiyələr:** `#2d2750`
- **Əsas Vurğu:** Elektrik bənövşəyi (`#7c5cff`) və hover rəngi (`#9a82ff`)
- **İkinci dərəcəli:** Dərin göy (`#3b5bdb`)
- **Şahmat Lövhəsi:** Açıq xanalar `#b9b0d9`, tünd xanalar `#5b4b9a`, son gediş/seçim bənövşəyi şəffaf işıqlanma
- **Hamar Animasiyalar:** Kartlarda yumşaq qaldırma effekti, toxunuşa həssas SVG fiqurlar

---

## 🚀 Texnoloji Yığın (Tech Stack)

- **Freymvork:** Next.js (App Router, Server və Client komponentlər)
- **Dil:** TypeScript
- **Stil:** Tailwind CSS + PostCSS
- **İkonlar:** Lucide React
- **Backend & Autentifikasiya:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Məlumat Bazası:** PostgreSQL (Row Level Security - RLS siyasətləri ilə qorunan)
- **Fayl Saxlama:** Supabase Storage (`book-files`, `book-covers`)

---

## 📁 Layihə Strukturu

```
├── app/
│   ├── layout.tsx             # Root layout (Metadata, Azərbaycan dili, Tailwind)
│   ├── page.tsx               # Ana səhifə (1-dən 11-ə qədər olan bütün bölmələr)
│   ├── auth/
│   │   ├── page.tsx           # Giriş və Qeydiyyat səhifəsi (Google OAuth + Email/Telefon)
│   │   └── callback/route.ts  # Supabase OAuth yönləndirmə emalçısı
│   ├── books/
│   │   └── page.tsx           # Şahmat kitabxanası (Axtarış, səviyyə filtri, PDF baxış/yükləmə)
│   ├── admin/
│   │   └── page.tsx           # İnzibatçı paneli (Müraciətlərin və Kitabların idarəsi)
│   └── globals.css            # Tailwind CSS qlobal tənzimləmələri və dəyişənlər
├── components/
│   ├── Navbar.tsx             # Yapışqan naviqasiya və hesab vəziyyəti
│   ├── Footer.tsx             # Qaranlıq altlıq və sosial şəbəkələr
│   ├── HeroSection.tsx        # Bölmə 1: Başlıq və "Bizə qoşul" düyməsi
│   ├── TeachersSlider.tsx     # Bölmə 2: Təlimçilər karuseli
│   ├── StartingBoard.tsx      # Bölmə 3: Başlanğıc vəziyyət lövhəsi (çevirmə imkanı ilə)
│   ├── PiecesSection.tsx      # Bölmə 4: Fiqurlar və interaktiv hərəkət nümayişi
│   ├── GameGoalsSection.tsx   # Bölmə 5: Şah, Mat, Pat və Heç-heçə izahı
│   ├── SpecialMovesSection.tsx# Bölmə 6: Rokirovka, Vəzirə çevrilmə, Keçiddə götürmə
│   ├── BeginnerTipsSection.tsx# Bölmə 7: Yeni başlayanlara 6 qızıl qayda
│   ├── FaqSection.tsx         # Bölmə 8: Tez-tez verilən suallar (akordeon)
│   ├── HistorySection.tsx     # Bölmə 9: Azərbaycan şahmat tarixi və qrossmeysterlərimiz
│   ├── ContactSection.tsx     # Bölmə 10: Əlaqə forması (Telefon və ya E-poçt)
│   ├── PositionSetupBoard.tsx # Bölmə 11: Fiqur palitralı sərbəst mövqe qurucusu və FEN generatoru
│   └── ChessPieceSvg.tsx      # Vektorlu (SVG) şahmat fiqurları
├── lib/
│   ├── siteData.ts            # Azərbaycan dilində bütün statik mətnlər və ilkin məlumatlar
│   ├── types.ts               # TypeScript interfeysləri
│   └── supabase/
│       ├── client.ts          # Brauzer üçün Supabase müştərisi (SSR uyğun)
│       ├── server.ts          # Server üçün Supabase müştərisi
│       └── actions.ts         # Müraciətlər və Kitablar üçün server və ehtiyat metodları
├── middleware.ts              # Sessiya yeniləməsi və /admin səhifəsinin server-tərəfli qorunması
├── schema.sql                 # Supabase SQL Editor üçün tam sxem, trigger və RLS qaydaları
├── .env.example               # Mühit dəyişənləri nümunəsi
└── package.json               # Next.js asılılıqları və skriptləri
```

---

## ⚙️ Quraşdırma və İşə Salma

### 1. Asılılıqların quraşdırılması:
```bash
npm install
```

### 2. Mühit dəyişənlərinin tənzimlənməsi:
`.env.example` faylını `.env.local` adı ilə kopyalayın və Supabase məlumatlarınızı daxil edin:
```env
NEXT_PUBLIC_SUPABASE_URL=https://sizin-lahiyeniz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sizin-anonim-acarınız
```

### 3. Supabase Məlumat Bazasının Yaradılması:
`schema.sql` faylının tərkibini kopyalayıb Supabase Dashboard-dakı **SQL Editor** bölməsində icra edin. Bu skript:
- `profiles`, `contact_requests`, `books` cədvəllərini yaradır;
- Qeydiyyatdan keçən istifadəçilərə avtomatik profil yaradan triggeri quraşdırır;
- `book-files` və `book-covers` storage qovluqlarını yaradır;
- Bütün cədvəllər və yaddaş üzrə ciddi Row Level Security (RLS) təhlükəsizlik qaydalarını aktivləşdirir.

### 4. İlk İnzibatçının (Admin) Təyin Olunması:
Qeydiyyatdan keçdikdən sonra həmin istifadəçini inzibatçı etmək üçün Supabase SQL Editor-da yazın:
```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'sizin-emailiniz@example.com');
```

*(Qeyd: Təqdimat və ya sınaq məqsədilə autentifikasiya səhifəsində birbaşa "👑 İnzibatçı" sınaq düyməsi də təqdim olunmuşdur).*

### 5. İnkişaf serverinin işə salınması:
```bash
npm run dev
```
Sayt avtomatik olaraq `http://localhost:3000` ünvanında açılacaq.
