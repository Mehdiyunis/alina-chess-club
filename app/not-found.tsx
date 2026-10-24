import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0b17] text-[#ecebf5] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-[12px] bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center font-bold text-3xl mb-6 shadow-lg shadow-[#7c5cff]/10">
        ♚
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-3">404 - Səhifə Tapılmadı</h1>
      <p className="text-sm text-[#9893b8] max-w-md mb-8">
        Axtardığınız səhifə mövcud deyil və ya ünvan dəyişdirilmişdir.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-[10px] bg-[#7c5cff] hover:bg-[#6845f5] text-white text-sm font-semibold transition-colors shadow-lg shadow-[#7c5cff]/20"
      >
        Ana Səhifəyə Qayıt
      </Link>
    </div>
  );
}
