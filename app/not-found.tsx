import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-18 h-18 rounded-[18px] overflow-hidden bg-[var(--surface)] border border-[var(--border)] mb-6 shadow-xs flex items-center justify-center">
        <Image
          src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
          alt="ALİNA Chess Club"
          width={72}
          height={72}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-3 text-[var(--ink)]">
        404 - Səhifə Tapılmadı
      </h1>
      <p className="text-sm text-[var(--ink-muted)] max-w-md mb-8 leading-relaxed">
        Axtardığınız səhifə mövcud deyil və ya ünvan dəyişdirilmişdir. / Page not found / Страница не найдена.
      </p>
      <Link
        href="/"
        className="btn-primary px-6 py-3 text-sm font-semibold shadow-xs"
      >
        Ana Səhifəyə Qayıt
      </Link>
    </div>
  );
}
